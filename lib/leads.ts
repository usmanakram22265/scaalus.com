import nodemailer from "nodemailer";
import type { TrialRequest } from "./trial-schema";

/**
 * Where trial requests go: an email from your own mailbox to your own inbox.
 * Set these in .env.local (and in Vercel → Settings → Environment Variables):
 *   LEADS_EMAIL_USER      the mailbox that sends, e.g. you@gmail.com
 *   LEADS_EMAIL_PASSWORD  its app password (Gmail: myaccount.google.com/apppasswords)
 *   LEADS_EMAIL_TO        optional, where it lands; defaults to LEADS_EMAIL_USER
 *   LEADS_SMTP_HOST       optional, defaults to smtp.gmail.com
 *   LEADS_SMTP_PORT       optional, defaults to 465 (SSL)
 */
export async function saveTrialRequest(request: TrialRequest): Promise<void> {
  const receivedAt = new Date();
  // Always keep a copy in the server logs, so no request is ever lost.
  console.info(
    "[trial-request]",
    JSON.stringify({ ...request, receivedAt: receivedAt.toISOString() }),
  );

  const user = process.env.LEADS_EMAIL_USER;
  const pass = process.env.LEADS_EMAIL_PASSWORD;
  if (!user || !pass) {
    throw new Error("LEADS_EMAIL_USER / LEADS_EMAIL_PASSWORD are not set");
  }

  const port = Number(process.env.LEADS_SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: process.env.LEADS_SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const rows: [string, string | undefined][] = [
    ["Name", request.name],
    ["Business type", request.business],
    ["Phone", request.phone && formatPhone(request.phone)],
    ["Email", request.email],
    ["Anything we should know?", request.notes],
    [
      "Received",
      receivedAt.toLocaleString("en-US", { timeZone: "America/New_York" }) +
        " ET",
    ],
  ];

  await transport.sendMail({
    from: { name: "Scaalus website", address: user },
    to: process.env.LEADS_EMAIL_TO || user,
    // Hitting Reply goes straight to the lead.
    replyTo: request.email,
    subject: `New free trial request: ${request.name} (${request.business})`,
    text: rows.map(([k, v]) => `${k}: ${v || "-"}`).join("\n"),
    html: `<h2 style="font-family:sans-serif;color:#0D2847">New free trial request</h2>
<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#5B6573;vertical-align:top">${escape(k)}</td><td style="padding:6px 0;color:#0D2847;white-space:pre-wrap">${escape(v || "-")}</td></tr>`,
      )
      .join("")}</table>`,
  });
}

function formatPhone(digits: string) {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
