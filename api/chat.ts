import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";
import { GoogleGenAI, FunctionCallingConfigMode, type Content } from "@google/genai";
import { insertRequest } from "./_lib/db.js";

let client: GoogleGenAI | null = null;

function ai(): GoogleGenAI {
  if (!client) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_API_KEY is not configured");
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

const AREAS_OF_INTEREST = [
  "Strategic Advisory",
  "Project Management",
  "Tender / Procurement Advisory",
  "Executive Decision Support",
  "Contract & Commercial Strategy",
  "Claims / Dispute Support",
  "Legal Practice Support",
  "Government / Institutional Advisory",
  "Other",
];

const submitConsultationRequest = {
  name: "submit_consultation_request",
  description:
    "Submits a consultation request to the Summit Management Consultancy team once the visitor has provided their name, email, and what they need help with, and has explicitly confirmed they want to send it.",
  parameters: {
    type: "object",
    properties: {
      name: { type: "string", description: "The visitor's full name." },
      email: { type: "string", description: "The visitor's email address." },
      message: {
        type: "string",
        description: "A brief summary of what the visitor needs help with.",
      },
      organization: { type: "string", description: "The visitor's organization, if given." },
      title: { type: "string", description: "The visitor's job title, if given." },
      phone: { type: "string", description: "The visitor's phone number, if given." },
      interest: {
        type: "string",
        enum: AREAS_OF_INTEREST,
        description: "The area of interest the visitor selected from the fixed category list.",
      },
    },
    required: ["name", "email", "message", "interest"],
  },
};

const SYSTEM_INSTRUCTION =
  "You are an assistant for Summit Management Consultancy, based in Doha, Qatar. Answer general questions about practice areas. You are not a lawyer and do not give legal advice. Never ask for confidential case details. " +
  "You cannot book, schedule, or confirm appointments yourself, and you have no calendar access — never say you will check availability or confirm a booking. " +
  "When a visitor wants a consultation, gather what's needed through natural conversation, asking one question at a time: their name, email, a brief description of what they need help with, and which category best fits their need are all required. " +
  `For the category, ask which of these fits best: ${AREAS_OF_INTEREST.join(", ")}. There's also a list icon next to the message box the visitor can tap to pick one instead of typing — you can mention that once. Only use a value from this exact list when you call the function. ` +
  "Organization, title, and phone are optional — only ask if it flows naturally. " +
  "Before submitting, summarize back what you've gathered and ask the visitor to confirm they want to send it. Only call submit_consultation_request after they explicitly confirm. " +
  "After it's submitted, tell them the team will follow up directly — make clear this is a request for someone to reach out, not a confirmed appointment time. " +
  "Reply in plain conversational text only: no markdown, no asterisks, no bullet points or numbered lists, no headers. Keep responses short — a few sentences at most.";

type ChatTurn = { role: "user" | "assistant"; content: string };

function toContents(history: ChatTurn[]): Content[] {
  return history.map((turn) => ({
    role: turn.role === "assistant" ? "model" : "user",
    parts: [{ text: turn.content }],
  }));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const body = req.body ?? {};
  const rawMessages = Array.isArray(body.messages) ? body.messages : null;
  const history: ChatTurn[] = rawMessages
    ? rawMessages
        .filter(
          (m: unknown): m is ChatTurn =>
            typeof m === "object" &&
            m !== null &&
            (m as ChatTurn).role !== undefined &&
            typeof (m as ChatTurn).content === "string" &&
            (m as ChatTurn).content.trim() !== "",
        )
        .map((m: ChatTurn) => ({ role: m.role, content: m.content.trim() }))
    : [];

  if (history.length === 0) {
    return res.status(400).json({ message: "Missing messages" });
  }

  const config = {
    systemInstruction: SYSTEM_INSTRUCTION,
    tools: [{ functionDeclarations: [submitConsultationRequest] }],
    toolConfig: { functionCallingConfig: { mode: FunctionCallingConfigMode.AUTO } },
  };

  try {
    const contents = toContents(history);
    const response = await ai().models.generateContent({
      model: "gemini-flash-lite-latest",
      contents,
      config,
    });

    const call = response.functionCalls?.[0];
    if (!call || call.name !== "submit_consultation_request") {
      return res.status(200).json({ reply: response.text });
    }

    const args = (call.args ?? {}) as Record<string, string | undefined>;
    let submitted = true;
    if (!args.name?.trim() || !args.email?.trim() || !args.message?.trim() || !args.interest?.trim()) {
      submitted = false;
    } else {
      await insertRequest({
        id: crypto.randomUUID(),
        name: args.name.trim(),
        organization: args.organization?.trim() ?? "",
        title: args.title?.trim() ?? "",
        email: args.email.trim(),
        phone: args.phone?.trim() ?? "",
        interest: args.interest?.trim() ?? "",
        message: args.message.trim(),
        created_at: new Date().toISOString(),
      });
    }

    const modelTurn = response.candidates?.[0]?.content;
    const followUpContents: Content[] = [
      ...contents,
      ...(modelTurn ? [modelTurn] : []),
      {
        role: "user",
        parts: [
          {
            functionResponse: {
              name: call.name,
              response: submitted
                ? { success: true }
                : { success: false, error: "Missing required fields: name, email, message, or interest." },
            },
          },
        ],
      },
    ];

    const followUp = await ai().models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: followUpContents,
      config,
    });

    return res.status(200).json({ reply: followUp.text });
  } catch (error) {
    console.error("[api/chat] generate failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
