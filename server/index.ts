import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";

// .env.local wins for local dev; .env is the production file on the server.
dotenv.config({ path: [".env.local", ".env"] });

import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";
import contactRouter from "./routes/contact.js";
import requestsRouter from "./routes/requests.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// server-dist/index.js -> ../dist   (production build output of `vite build`)
const clientDir = path.resolve(__dirname, "../dist");
const indexHtml = path.join(clientDir, "index.html");

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1); // behind nginx / Cloudflare / Passenger

// Let the web server (Apache/cPanel AutoSSL, certbot, …) own ACME HTTP-01
// validation. Without this, the SPA fallback below answers the challenge URL
// with index.html and certificate issuance fails.
app.use("/.well-known", (_req, res) => res.status(404).end());

app.use(express.json({ limit: "100kb" }));

// --- API ---------------------------------------------------------------------
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/contact", contactRouter);
app.use("/api/requests", requestsRouter);
app.use("/api", (_req, res) => res.status(404).json({ message: "Not Found" }));

// --- Static client + SPA fallback ------------------------------------------
// In dev the client is served by Vite (which proxies /api here), so this block
// only does anything once `dist/` exists (production).
if (existsSync(clientDir)) {
  app.use(express.static(clientDir, { index: false, maxAge: "1h" }));
  app.get("*", (_req, res) => res.sendFile(indexHtml));
}

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});
