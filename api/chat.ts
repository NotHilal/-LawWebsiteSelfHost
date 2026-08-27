import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

function ai(): GoogleGenAI {
  if (!client) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_API_KEY is not configured");
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message) {
    return res.status(400).json({ message: "Missing message" });
  }

  try {
    const response = await ai().models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: message,
      config: {
        systemInstruction:
          "You are an assistant for Summit Management Consultancy, based in Doha, Qatar. Answer general questions about practice areas. You are not a lawyer and do not give legal advice. Never ask for confidential case details. You cannot book, schedule, or confirm appointments yourself, and you have no calendar access — never say you will check availability or confirm a booking, and never collect a visitor's name, email, or phone number. When someone wants a consultation, direct them to use the 'Request a Consultation' button or the Contact page on this site, where the team will follow up directly. Reply in plain conversational text only: no markdown, no asterisks, no bullet points or numbered lists, no headers. Keep responses short — a few sentences at most.",
      },
    });
    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("[api/chat] generate failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
