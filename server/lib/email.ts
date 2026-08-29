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
//   NOTIFICATION_FROM    From header (defaults to "Summit Website <SMTP_USER>")
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
  const from = process.env.NOTIFICATION_FROM || `Summit Website <${user}>`;

  const subject =
    data.type === "consultation"
      ? `New appointment request — ${data.name}`
      : `New question — ${data.name}`;

  const allRows: [string, string][] = [
    ["Type", data.type === "consultation" ? "Appointment request" : "Question asked by user"],
    ["Name", data.name],
    ["Organization", data.organization],
    ["Title", data.title],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Area of interest", data.interest],
    ["Submitted", new Date(data.created_at).toLocaleString("en-GB", { timeZone: "Asia/Qatar" })],
  ];
  const rows = allRows.filter(([, v]) => v !== "");

  const adminUrl = `${(process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "")}/admin`;

  const textBody = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
    ...(process.env.PUBLIC_BASE_URL ? ["", `View all requests: ${adminUrl}`] : []),
  ].join("\n");

  const htmlBody = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;color:#111;line-height:1.6">
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:2px 16px 2px 0;color:#666;vertical-align:top">${escapeHtml(
                k,
              )}</td><td style="padding:2px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:16px 0 4px;color:#666">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
      ${
        process.env.PUBLIC_BASE_URL
          ? `<p style="margin:24px 0 0"><a href="${escapeHtml(adminUrl)}">View all requests →</a></p>`
          : ""
      }
    </div>`;

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
