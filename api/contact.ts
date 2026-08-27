import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";
import { insertRequest } from "./_lib/db.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const body = req.body ?? {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const consent = body.consent === true;

  if (!name || !email || !message || !consent || !emailPattern.test(email)) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    await insertRequest({
      id: crypto.randomUUID(),
      type: "consultation",
      name,
      organization: typeof body.organization === "string" ? body.organization.trim() : "",
      title: typeof body.title === "string" ? body.title.trim() : "",
      email,
      phone: typeof body.phone === "string" ? body.phone.trim() : "",
      interest: typeof body.interest === "string" ? body.interest.trim() : "",
      message,
      created_at: new Date().toISOString(),
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[api/contact] insert failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
