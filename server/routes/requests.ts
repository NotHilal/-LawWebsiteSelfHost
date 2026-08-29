import { Router } from "express";
import { isAuthorized } from "../lib/auth.js";
import { listRequests, markRequestRead, deleteRequest } from "../lib/db.js";

const router = Router();

// Gate every method on this router behind the admin token.
router.use((req, res, next) => {
  if (!isAuthorized(req.headers.authorization)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

router.get("/", async (_req, res) => {
  try {
    const data = await listRequests();
    return res.status(200).json({ data });
  } catch (error) {
    console.error("[api/requests] list failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/", async (req, res) => {
  const { id, read } = req.body ?? {};
  if (typeof id !== "string" || typeof read !== "boolean") {
    return res.status(400).json({ message: "Missing id or read" });
  }
  try {
    await markRequestRead(id, read);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[api/requests] patch failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body ?? {};
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Missing id" });
  }
  try {
    await deleteRequest(id);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[api/requests] delete failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
