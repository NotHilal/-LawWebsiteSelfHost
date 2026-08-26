import crypto from "node:crypto";
import type { VercelRequest } from "@vercel/node";

const SESSION_MS = 24 * 60 * 60 * 1000;

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET is not configured");
  return s;
}

export function createToken(email: string): string {
  const payload = { email, role: "authenticated", exp: Date.now() + SESSION_MS };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = crypto.createHmac("sha256", secret()).update(payloadStr).digest("base64");
  return `${payloadStr}.${signature}`;
}

export function isAuthorized(req: VercelRequest): boolean {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) return false;

    const token = header.slice("Bearer ".length);
    const [payloadStr, signature] = token.split(".");
    if (!payloadStr || !signature) return false;

    const expected = crypto.createHmac("sha256", secret()).update(payloadStr).digest("base64");
    if (signature !== expected) return false;

    const payload = JSON.parse(Buffer.from(payloadStr, "base64").toString("utf8"));
    if (Date.now() > payload.exp) return false;

    return payload.role === "authenticated";
  } catch {
    return false;
  }
}
