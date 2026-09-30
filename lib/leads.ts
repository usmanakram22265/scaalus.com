import type { TrialRequest } from "./trial-schema";

/**
 * Where trial requests go. For now they are logged on the server.
 * TODO: send to email (e.g. Resend) or the CRM once an API key is added to .env.local.
 */
export async function saveTrialRequest(request: TrialRequest): Promise<void> {
  console.info(
    "[trial-request]",
    JSON.stringify({ ...request, receivedAt: new Date().toISOString() }),
  );
}
