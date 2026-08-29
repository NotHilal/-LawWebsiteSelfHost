import { Router } from "express";
import crypto from "node:crypto";
import { insertRequest } from "../lib/db.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body ?? {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const consent = body.consent === true;
  const type = body.type === "question" ? "question" : "consultation";

  if (!name || !email || !message || !consent || !emailPattern.test(email)) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    await insertRequest({
      id: crypto.randomUUID(),
      type,
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
});

export default router;
