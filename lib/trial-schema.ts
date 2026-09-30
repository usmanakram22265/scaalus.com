import { z } from "zod";
import { trades } from "./content";

export const trialFields = [
  "name",
  "business",
  "trade",
  "phone",
  "email",
] as const;
export type TrialField = (typeof trialFields)[number];

/** Hidden field real people never fill in. */
export const HONEYPOT = "company_website";

export const trialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name")
    .max(80, "Keep it under 80 characters"),
  business: z
    .string()
    .trim()
    .min(2, "Enter your business name")
    .max(120, "Keep it under 120 characters"),
  trade: z.enum(trades, "Choose your trade"),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(z.string().regex(/^1?\d{10}$/, "Enter a 10-digit US phone number"))
    .transform((digits) => digits.slice(-10)),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address")),
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
