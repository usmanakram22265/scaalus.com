"use server";

import { saveTrialRequest } from "@/lib/leads";
import {
  HONEYPOT,
  trialFields,
  trialSchema,
  type TrialField,
  type TrialState,
} from "@/lib/trial-schema";

export async function startTrial(
  _prev: TrialState,
  formData: FormData,
): Promise<TrialState> {
  const values = Object.fromEntries(
    trialFields.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as Record<TrialField, string>;

  // Bots fill the hidden field. Pretend it worked and drop it.
  if (String(formData.get(HONEYPOT) ?? "") !== "") {
    return { status: "success", errors: {}, values: {} };
  }

  const parsed = trialSchema.safeParse(values);
  if (!parsed.success) {
    const errors: TrialState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as TrialField;
      errors[field] ??= issue.message;
    }
    return { status: "error", errors, values };
  }

  try {
    await saveTrialRequest(parsed.data);
  } catch (error) {
    console.error("[trial-request] failed", error);
    return {
      status: "error",
      errors: {},
      values,
      formError: "Something went wrong. Please try again, or call us.",
    };
  }

  return { status: "success", errors: {}, values: {} };
}
