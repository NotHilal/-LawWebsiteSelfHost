// Fire-and-forget notification email sent whenever a new client request lands.
// Sends through a plain SMTP mailbox (o2switch, or any provider) via nodemailer.
//
// Required env:
//   SMTP_HOST            e.g. "xxx.o2switch.net" (from cPanel → Email Accounts →
//                        Connect Devices → "Mail Client Manual Settings")
//   SMTP_PORT            465 (SSL) or 587 (STARTTLS)
//   SMTP_USER            a full mailbox address, e.g. "contact@your-domain.fr"
//   SMTP_PASS            that mailbox's password
// Optional env:
//   NOTIFICATION_EMAIL   where alerts are delivered (defaults to SMTP_USER)
//   NOTIFICATION_FROM    From header (defaults to "Summit Management Consultancy <SMTP_USER>")
//   PUBLIC_BASE_URL      site origin, for the "view in admin" link in the email

import nodemailer, { type Transporter } from "nodemailer";

type RequestNotification = {
  type: "consultation" | "question";
  name: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  created_at: string;
};

let transporter: Transporter | null = null;

function mailer(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 465;
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
      auth: { user, pass },
    });
  }
  return transporter;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendRequestNotification(data: RequestNotification): Promise<void> {
  const tx = mailer();
  if (!tx) {
    console.warn("[email] SMTP_HOST/SMTP_USER/SMTP_PASS not set — skipping notification");
    return;
  }

  const user = process.env.SMTP_USER as string;
  const to = process.env.NOTIFICATION_EMAIL || user;
  const from = process.env.NOTIFICATION_FROM || `Summit Management Consultancy <${user}>`;

  const isConsultation = data.type === "consultation";
  const kind = isConsultation ? "Appointment request" : "Question";
  const subject = `${isConsultation ? "New appointment request" : "New question"} — ${data.name}`;
  const submitted = new Date(data.created_at).toLocaleString("en-GB", {
    timeZone: "Asia/Qatar",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const baseUrl = (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "");
  const adminUrl = baseUrl ? `${baseUrl}/admin` : "";

  // Detail rows (name is shown as the heading, so it's not repeated here).
  const detailRows: [string, string][] = [
    ["Email", data.email],
    ["Phone", data.phone],
    ["Organization", data.organization],
    ["Title", data.title],
    ["Area of interest", data.interest],
  ].filter(([, v]) => v !== "") as [string, string][];

  // --- Plain-text fallback --------------------------------------------------
  const textBody = [
    kind.toUpperCase(),
    "",
    data.name,
    ...detailRows.map(([k, v]) => `${k}: ${v}`),
    `Submitted: ${submitted} (Doha time)`,
    "",
    "MESSAGE",
    data.message,
    "",
    `Reply to this email to respond directly to ${data.name} (${data.email}).`,
    ...(adminUrl ? ["", `Open in admin: ${adminUrl}`] : []),
  ].join("\n");

  // --- HTML ---------------------------------------------------------------
  const FONT =
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const SERIF = "Georgia,'Times New Roman',serif";
  const GOLD = "#c99a59";
  const INK = "#0b0b0c";

  const detailTable = detailRows
    .map(
      ([k, v], i) => `
      <tr>
        <td style="padding:11px 16px 11px 0;${i ? "border-top:1px solid #ededed;" : ""}font:600 11px/1.4 ${FONT};letter-spacing:.07em;text-transform:uppercase;color:#9a9a9a;white-space:nowrap;vertical-align:top;">${escapeHtml(k)}</td>
        <td style="padding:11px 0;${i ? "border-top:1px solid #ededed;" : ""}font:14px/1.5 ${FONT};color:#2a2a2a;">${escapeHtml(v)}</td>
      </tr>`,
    )
    .join("");

  const button = adminUrl
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px;">
        <tr><td style="background:${GOLD};border-radius:2px;">
          <a href="${escapeHtml(adminUrl)}" style="display:inline-block;padding:13px 30px;font:600 12px/1 ${FONT};letter-spacing:.09em;text-transform:uppercase;color:${INK};text-decoration:none;">Open in admin</a>
        </td></tr>
      </table>`
    : "";

  const htmlBody = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#ece9e3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ece9e3;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid #e2ddd4;">

        <tr><td style="background:${INK};padding:22px 36px;">
          <span style="font:600 12px/1 ${FONT};letter-spacing:.24em;text-transform:uppercase;color:${GOLD};">Summit Management Consultancy</span>
        </td></tr>

        <tr><td style="padding:34px 36px 36px;">
          <p style="margin:0 0 6px;font:600 11px/1.4 ${FONT};letter-spacing:.12em;text-transform:uppercase;color:#9a9a9a;">${escapeHtml(kind)}</p>
          <h1 style="margin:0 0 6px;font:400 24px/1.3 ${SERIF};color:${INK};">${escapeHtml(data.name)}</h1>
          <p style="margin:0;font:13px/1.5 ${FONT};color:#9a9a9a;">${escapeHtml(submitted)} · Doha time</p>

          <div style="width:44px;height:2px;background:${GOLD};margin:22px 0;"></div>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailTable}</table>

          <p style="margin:30px 0 10px;font:600 11px/1.4 ${FONT};letter-spacing:.07em;text-transform:uppercase;color:#9a9a9a;">Message</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#f6f4ef;border-left:3px solid ${GOLD};padding:16px 20px;font:15px/1.65 ${SERIF};color:#2a2a2a;white-space:pre-wrap;">${escapeHtml(data.message)}</td></tr>
          </table>

          ${button}

          <p style="margin:26px 0 0;font:13px/1.6 ${FONT};color:#6b6b6b;">
            Reply to this email to respond directly to ${escapeHtml(data.name)}
            (<a href="mailto:${escapeHtml(data.email)}" style="color:#6b6b6b;">${escapeHtml(data.email)}</a>).
          </p>
        </td></tr>

        <tr><td style="background:#faf9f6;border-top:1px solid #ededed;padding:16px 36px;font:11px/1.5 ${FONT};color:#a6a6a6;">
          Sent automatically by the Summit Management Consultancy website.
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;

  try {
    await tx.sendMail({
      from,
      to,
      replyTo: data.email,
      subject,
      text: textBody,
      html: htmlBody,
    });
  } catch (err) {
    console.error("[email] send failed", err);
  }
}
