import { z } from "zod";

export const trialFields = [
  "name",
  "business",
  "phone",
  "email",
  "notes",
] as const;
export type TrialField = (typeof trialFields)[number];

/** Hidden field real people never fill in. */
export const HONEYPOT = "company_website";

// Empty strings mean "not given" for the optional fields.
const optional = (value: string) => value.trim() === "";

export const trialSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your name")
      .max(80, "Keep it under 80 characters"),
    business: z
      .string()
      .trim()
      .min(2, "Enter your business type")
      .max(120, "Keep it under 120 characters"),
    phone: z
      .string()
      .transform((value) => value.replace(/\D/g, ""))
      .refine(
        (digits) => digits === "" || /^1?\d{10}$/.test(digits),
        "Enter a 10-digit US phone number",
      )
      .transform((digits) => (digits === "" ? undefined : digits.slice(-10))),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .refine(
        (value) => optional(value) || z.email().safeParse(value).success,
        "Enter a valid email address",
      )
      .transform((value) => (value === "" ? undefined : value)),
    notes: z
      .string()
      .trim()
      .max(1000, "Keep it under 1,000 characters")
      .transform((value) => (value === "" ? undefined : value)),
  })
  .superRefine((data, ctx) => {
    if (!data.phone && !data.email) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Add a phone number or an email so we can reach you",
      });
    }
  });

export type TrialRequest = z.infer<typeof trialSchema>;

export type TrialState = {
  status: "idle" | "error" | "success";
  errors: Partial<Record<TrialField, string>>;
  values: Partial<Record<TrialField, string>>;
  formError?: string;
};

export const initialTrialState: TrialState = {
  status: "idle",
  errors: {},
  values: {},
};
