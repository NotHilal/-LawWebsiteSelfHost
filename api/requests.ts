import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthorized } from "./_lib/auth.js";
import { listRequests, markRequestRead, deleteRequest } from "./_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAuthorized(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (req.method === "GET") {
      const data = await listRequests();
      return res.status(200).json({ data });
    }

    if (req.method === "PATCH") {
      const { id, read } = req.body ?? {};
      if (typeof id !== "string" || typeof read !== "boolean") {
        return res.status(400).json({ message: "Missing id or read" });
      }
      await markRequestRead(id, read);
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const { id } = req.body ?? {};
      if (typeof id !== "string") {
        return res.status(400).json({ message: "Missing id" });
      }
      await deleteRequest(id);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("[api/requests] failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
