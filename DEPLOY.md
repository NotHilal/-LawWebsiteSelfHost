# Deployment — self-hosted (o2switch or any VPS)

This is the self-hosted variant of the site. The React front-end is built to
static files and served by a small Express server that also handles `/api/*`.

```
browser ──▶ Express (server-dist/index.js)
              ├─ /api/auth/login      admin login
              ├─ /api/chat            Gemini chatbot
              ├─ /api/contact         contact + ask-a-question forms
              ├─ /api/requests        admin inbox (token-gated)
              └─ everything else      static dist/ + SPA fallback
```

External services (unchanged): **Supabase** (database), **Gemini** (chatbot),
**SMTP mailbox** (new-request notification emails).

---

## 1. Environment

Copy `.env.example` to `.env` and fill every value. On o2switch you can also set
these in cPanel → *Setup Node.js App* → *Environment variables* instead of a file.

| Var | Where it comes from |
|---|---|
| `PORT` | set by o2switch/Passenger automatically; `3001` locally |
| `PUBLIC_BASE_URL` | your final URL, e.g. `https://www.summitconsultancy.com` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | you choose — the `/admin` login |
| `JWT_SECRET` | any long random string (`openssl rand -base64 48`) |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Settings → API |
| `GOOGLE_API_KEY` | Google AI Studio |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | a mailbox you create in cPanel → Email Accounts (→ *Connect Devices* shows host/ports) |
| `NOTIFICATION_EMAIL` | inbox that should receive alerts (any address) |
| `NOTIFICATION_FROM` | usually the same as `SMTP_USER` |

## 2. Build

```bash
npm ci
npm run build      # -> dist/ (client) and server-dist/ (server)
```

## 3. Run

```bash
npm start          # node server-dist/index.js
```

### o2switch (cPanel, Passenger)

1. cPanel → **Setup Node.js App** → Create Application
   - Application root: the folder you uploaded the repo to
   - Application startup file: `server-dist/index.js`
   - Node version: 20+
2. Add the environment variables (table above).
3. "Run NPM Install", then in the app's virtualenv shell run `npm run build`.
4. Restart the app. Passenger serves it on your domain.

### Generic VPS (systemd + nginx)

`/etc/systemd/system/summit.service`:

```ini
[Service]
WorkingDirectory=/var/www/summit
ExecStart=/usr/bin/node server-dist/index.js
Environment=NODE_ENV=production
EnvironmentFile=/var/www/summit/.env
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

nginx: `proxy_pass http://127.0.0.1:3001;` for `/`, then `certbot --nginx` for TLS.
Put Cloudflare (free) in front for CDN + DDoS protection.

## 4. Updating later

```bash
git pull && npm ci && npm run build && npm start   # or: systemctl restart summit
```

---

## Local development

```bash
cp .env.example .env.local   # fill in real values
npm install
npm run dev                  # Vite on :5173 + Express on :3001 (Vite proxies /api)
```
