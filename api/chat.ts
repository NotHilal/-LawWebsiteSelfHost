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

const presentCategoryChoices = {
  name: "present_category_choices",
  description:
    "Actually invoke this function call (not just a sentence describing it) once you have the visitor's name, email, and a real description of what they need help with, at the exact moment you are ready to ask which category fits best. Required every single time you reach this point — do not instead just write text saying you are ready. Do not list the category options in your text reply either — the interface displays them. Just briefly say you're ready for them to pick one. Only used for the full consultation flow, never for a one-off question.",
  parameters: { type: "object", properties: {} },
};

const submitConsultationRequest = {
  name: "submit_consultation_request",
  description:
    "Submits a consultation request to the Summit Management Consultancy team once the visitor has provided their name, email, a description, and a category, and has explicitly confirmed they want to send it.",
  parameters: {
    type: "object",
    properties: {
      name: { type: "string", description: "The visitor's name — a first name alone is fine." },
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

const submitQuestion = {
  name: "submit_question",
  description:
    "Submits a one-off question to the Summit Management Consultancy team, who will reply by email. Use this instead of the full consultation flow when the visitor just wants to ask something specific and get a direct answer by email, rather than requesting a consultation. Only call this after the visitor has given their email and explicitly confirmed they want to send the question.",
  parameters: {
    type: "object",
    properties: {
      email: { type: "string", description: "The visitor's email address, so the team can reply." },
      question: { type: "string", description: "The visitor's question, in their own words." },
      name: { type: "string", description: "The visitor's name, if they gave one — optional, never ask for it specifically." },
    },
    required: ["email", "question"],
  },
};

const TOOLS = [{ functionDeclarations: [presentCategoryChoices, submitConsultationRequest, submitQuestion] }];

const SYSTEM_INSTRUCTION =
  "You are an assistant for Summit Management Consultancy, based in Doha, Qatar. Answer general questions about practice areas. You are not a lawyer and do not give legal advice. Never ask for confidential case details. " +
  "You cannot book, schedule, or confirm appointments yourself, and you have no calendar access — never say you will check availability or confirm a booking. " +
  "There are two distinct things a visitor might want, and you should keep them separate: a full consultation request, or just a one-off question they want answered by email. " +
  "CONSULTATION FLOW: when a visitor wants a consultation, collect these in this exact order, asking only one at a time and waiting for their reply before moving on: (1) their name, (2) their email, (3) a brief description of what they need help with. A first name alone is completely fine for the name — never ask for a last name or a full name specifically. " +
  "Apply the same scrutiny to every field, not just email: if the name is a single letter or clearly not a name at all, ask them to confirm or provide a different one. For the description, the only bar is length — if it's under about 20 characters, ask for a bit more detail; 20 characters or more is enough, don't judge it further than that. " +
  "Once you have all three, you must make an actual function call to present_category_choices in that same turn — never respond with only a text sentence saying you're ready or that you're about to ask; the function call itself is mandatory, not optional, every time you reach this point. Do not type out the category list yourself. " +
  "After the visitor picks a category (their next message will be one of the exact option strings), summarize everything you've gathered including the category and ask them to confirm they want to send it. Only call submit_consultation_request after they explicitly confirm. " +
  "Organization, title, and phone are optional — only ask if it flows naturally, before calling present_category_choices. " +
  "After submit_consultation_request succeeds, tell them the team will follow up directly — make clear this is a request for someone to reach out, not a confirmed appointment time. " +
  "QUESTION FLOW: if instead a visitor just wants to ask a specific question and get a direct reply by email, rather than a full consultation, keep it minimal — do not run the consultation flow for this. Ask for their email if you don't already have it, confirm back the exact question you're about to send, and only call submit_question after they explicitly confirm. Never ask for their name, a category, or any other field in this flow. " +
  "After submit_question succeeds, tell them the team will review it and reply by email — make clear there's no guaranteed reply time. " +
  "CAN'T ANSWER: if a visitor asks something you genuinely can't answer — something outside your knowledge of Summit's practice areas, a specific case history, or anything needing real legal advice — say so plainly, then let them know they're welcome to submit it as a question and the team will reply by email. Include the exact text /ask-a-question on its own somewhere in that reply (not as a markdown link, just the bare path) so the interface can turn it into a clickable link — don't paraphrase or alter that path. This takes priority over offering a consultation: even if the topic sounds related to a practice area, do not pivot into asking for their name or starting the consultation flow on your own — only start it if the visitor explicitly asks for a consultation afterward. " +
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
    tools: TOOLS,
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
    if (!call) {
      return res.status(200).json({ reply: response.text });
    }

    if (call.name === "present_category_choices") {
      const followUp = await runFunctionResponseTurn(contents, response, call.name, { acknowledged: true });
      return res.status(200).json({ reply: followUp, showCategoryPicker: true });
    }

    if (call.name === "submit_consultation_request") {
      const args = (call.args ?? {}) as Record<string, string | undefined>;
      const submitted = !!(args.name?.trim() && args.email?.trim() && args.message?.trim() && args.interest?.trim());

      if (submitted) {
        await insertRequest({
          id: crypto.randomUUID(),
          type: "consultation",
          name: args.name!.trim(),
          organization: args.organization?.trim() ?? "",
          title: args.title?.trim() ?? "",
          email: args.email!.trim(),
          phone: args.phone?.trim() ?? "",
          interest: args.interest!.trim(),
          message: args.message!.trim(),
          created_at: new Date().toISOString(),
        });
      }

      const followUp = await runFunctionResponseTurn(
        contents,
        response,
        call.name,
        submitted
          ? { success: true }
          : { success: false, error: "Missing required fields: name, email, message, or interest." },
      );
      return res.status(200).json({ reply: followUp });
    }

    if (call.name === "submit_question") {
      const args = (call.args ?? {}) as Record<string, string | undefined>;
      const submitted = !!(args.email?.trim() && args.question?.trim());

      if (submitted) {
        await insertRequest({
          id: crypto.randomUUID(),
          type: "question",
          name: args.name?.trim() ?? "",
          organization: "",
          title: "",
          email: args.email!.trim(),
          phone: "",
          interest: "",
          message: args.question!.trim(),
          created_at: new Date().toISOString(),
        });
      }

      const followUp = await runFunctionResponseTurn(
        contents,
        response,
        call.name,
        submitted ? { success: true } : { success: false, error: "Missing required fields: email or question." },
      );
      return res.status(200).json({ reply: followUp });
    }

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("[api/chat] generate failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function runFunctionResponseTurn(
  contents: Content[],
  response: Awaited<ReturnType<GoogleGenAI["models"]["generateContent"]>>,
  functionName: string,
  functionResult: Record<string, unknown>,
): Promise<string> {
  const modelTurn = response.candidates?.[0]?.content;
  const followUpContents: Content[] = [
    ...contents,
    ...(modelTurn ? [modelTurn] : []),
    {
      role: "user",
      parts: [{ functionResponse: { name: functionName, response: functionResult } }],
    },
  ];

  const followUp = await ai().models.generateContent({
    model: "gemini-flash-lite-latest",
    contents: followUpContents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: TOOLS,
      toolConfig: { functionCallingConfig: { mode: FunctionCallingConfigMode.AUTO } },
    },
  });
  return followUp.text ?? "";
}
