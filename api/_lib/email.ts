// Fire-and-forget notification email sent whenever a new client request lands.
// Runs server-side only, inside /api functions. Uses Resend's REST API directly
// (no SDK) to keep the dependency surface small, matching the rest of api/.
//
// Required env:
//   RESEND_API_KEY      – added automatically by the Resend Vercel integration
// Optional env (sensible defaults below):
//   NOTIFICATION_EMAIL  – where alerts are delivered
//   NOTIFICATION_FROM   – verified Resend sender; falls back to Resend's shared
//                         onboarding address, which works with no domain setup

// While sending from Resend's shared onboarding@resend.dev address (i.e. before a
// domain is verified), this MUST be the email the Resend account is registered
// with — Resend rejects anything else with a 403. Override with NOTIFICATION_EMAIL
// once a domain is verified.
const DEFAULT_TO = "hilal.elayoubi@gmail.com";
const DEFAULT_FROM = "Summit Website <onboarding@resend.dev>";

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

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendRequestNotification(data: RequestNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping notification");
    return;
  }

  const to = process.env.NOTIFICATION_EMAIL || DEFAULT_TO;
  const from = process.env.NOTIFICATION_FROM || DEFAULT_FROM;

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

  const textBody = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
    "",
    "View all requests: https://summit-law.vercel.app/admin",
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
      <p style="margin:24px 0 0">
        <a href="https://summit-law.vercel.app/admin">View all requests →</a>
      </p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend responded", res.status, await res.text());
    }
  } catch (err) {
    console.error("[email] send failed", err);
  }
}
