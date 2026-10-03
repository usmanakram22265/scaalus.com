import type { TrialRequest } from "./trial-schema";

/**
 * Where trial requests go: your Google Apps Script web app, which emails them
 * from your Gmail to your Gmail (see google-apps-script/trial-form.gs).
 * The defaults below are the live script; LEADS_SCRIPT_URL and
 * LEADS_SCRIPT_SECRET env vars override them. Keep this repo private: the
 * secret must match SECRET in the script.
 */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzKfZtKy5bN6Ytt4t_NVr6d_XRRqANarQ-nCZRE6TpLKAWuhmZ3jbl8a1WSUTRR3W2ekQ/exec";
const SCRIPT_SECRET = "nQAwuaH89Tp8eJEmj9hpwXLH";

export async function saveTrialRequest(request: TrialRequest): Promise<void> {
  const receivedAt = new Date();
  // Always keep a copy in the server logs, so no request is ever lost.
  console.info(
    "[trial-request]",
    JSON.stringify({ ...request, receivedAt: receivedAt.toISOString() }),
  );

  const url = process.env.LEADS_SCRIPT_URL || SCRIPT_URL;
  const secret = process.env.LEADS_SCRIPT_SECRET || SCRIPT_SECRET;

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

  const res = await fetch(url, {
    method: "POST",
    // text/plain keeps Apps Script from rejecting the request.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      secret,
      subject: `New free trial request: ${request.name} (${request.business})`,
      // Hitting Reply goes straight to the lead.
      replyTo: request.email ?? "",
      text: rows.map(([k, v]) => `${k}: ${v || "-"}`).join("\n"),
      html: `<h2 style="font-family:sans-serif;color:#0D2847">New free trial request</h2>
<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#5B6573;vertical-align:top">${escape(k)}</td><td style="padding:6px 0;color:#0D2847;white-space:pre-wrap">${escape(v || "-")}</td></tr>`,
        )
        .join("")}</table>`,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });

  const result = (await res.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;
  if (!res.ok || !result?.ok) {
    throw new Error(
      `Apps Script rejected the request: ${res.status} ${result?.error ?? "no JSON reply (check the deployment access is 'Anyone')"}`,
    );
  }
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
