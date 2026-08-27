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
          "You are an assistant for Summit Management Consultancy, based in Doha, Qatar. Answer general questions about practice areas and help visitors book a consultation. You are not a lawyer and do not give legal advice. Never ask for confidential case details.",
      },
    });
    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("[api/chat] generate failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
