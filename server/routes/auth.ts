import { Router } from "express";
import { createToken } from "../lib/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("[api/auth/login] ADMIN_EMAIL / ADMIN_PASSWORD are not configured");
      return res.status(500).json({ message: "Admin login is not configured" });
    }

    if (email === adminEmail && password === adminPassword) {
      return res.status(200).json({ token: createToken(email) });
    }

    return res.status(401).json({ message: "Incorrect email or password." });
  } catch (error) {
    console.error("[api/auth/login] failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
