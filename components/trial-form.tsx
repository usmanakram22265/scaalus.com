"use client";

import {
  useActionState,
  useEffect,
  useRef,
  type InputHTMLAttributes,
} from "react";
import { startTrial } from "@/app/actions";
import { site, trades, trial } from "@/lib/content";
import {
  HONEYPOT,
  initialTrialState,
  trialFields,
  type TrialField,
} from "@/lib/trial-schema";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";

const inputClass =
  "mt-1.5 block h-12 w-full rounded-xl border border-navy/15 bg-surface-base px-3.5 text-navy placeholder:text-ink-muted/70 " +
  "focus-visible:border-brand focus-visible:outline-offset-0 aria-[invalid=true]:border-danger";

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p
      id={id}
      className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] font-medium text-danger"
    >
      <Icon name="alert" size={16} strokeWidth={2} className="shrink-0" />
      {children}
    </p>
  );
}

type FieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "className"
> & {
  name: TrialField;
  label: string;
  error?: string;
  className?: string;
};

function Field({ name, label, error, className, ...input }: FieldProps) {
  const id = `trial-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-small font-semibold text-navy">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClass}
        {...input}
      />
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

export function TrialForm() {
  const [state, formAction, pending] = useActionState(
    startTrial,
    initialTrialState,
  );
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const done = state.status === "success";
  const { errors, values } = state;

  // Move focus to the first problem, or to the confirmation once it succeeds.
  useEffect(() => {
    if (state.status === "success") {
      success.current?.focus({ preventScroll: true });
      return;
    }
    if (state.status !== "error") return;
    const first = trialFields.find((field) => state.errors[field]);
    if (first)
      (form.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
  }, [state]);

  return (
    <div className="grid rounded-card bg-surface-elevated shadow-floating">
      <form
        ref={form}
        action={formAction}
        noValidate
        inert={done}
        className={`col-start-1 row-start-1 p-5 transition-[opacity,transform] duration-300 ease-out sm:p-8 ${
          done ? "pointer-events-none scale-[0.98] opacity-0" : "opacity-100"
        }`}
      >
        {/* Honeypot: hidden from people and assistive tech. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label>
            Company website
            <input
              type="text"
              name={HONEYPOT}
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </label>
        </div>

        <div className="grid gap-space-sm sm:grid-cols-2">
          <Field
            name="name"
            label="Your name"
            autoComplete="name"
            enterKeyHint="next"
            defaultValue={values.name}
            error={errors.name}
          />
          <Field
            name="business"
            label="Business name"
            autoComplete="organization"
            enterKeyHint="next"
            defaultValue={values.business}
            error={errors.business}
          />

          <div className="sm:col-span-2">
            <label
              htmlFor="trial-trade"
              className="block text-small font-semibold text-navy"
            >
              Your trade
            </label>
            <div className="relative">
              <select
                id="trial-trade"
                name="trade"
                defaultValue={values.trade ?? ""}
                aria-invalid={errors.trade ? true : undefined}
                aria-describedby={
                  errors.trade ? "trial-trade-error" : undefined
                }
                required
                className={`${inputClass} appearance-none pr-10 invalid:text-ink-muted [&>option]:text-navy`}
              >
                <option value="" disabled>
                  Choose your trade
                </option>
                {trades.map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
              <Icon
                name="chevronDown"
                size={18}
                strokeWidth={2}
                className="pointer-events-none absolute right-3.5 top-1/2 mt-[0.1875rem] -translate-y-1/2 text-ink-muted"
              />
            </div>
            <ErrorText id="trial-trade-error">{errors.trade}</ErrorText>
          </div>

          <Field
            name="phone"
            label="Mobile phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            placeholder="(555) 123-4567"
            defaultValue={values.phone}
            error={errors.phone}
          />
          <Field
            name="email"
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            placeholder="you@company.com"
            defaultValue={values.email}
            error={errors.email}
          />
        </div>

        {state.formError ? (
          <p
            role="alert"
            className="mt-space-sm text-[0.875rem] font-medium text-danger"
          >
            {state.formError}{" "}
            <a href={site.phone.href} className="underline underline-offset-2">
              {site.phone.display}
            </a>
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          arrow={!pending}
          disabled={pending}
          className="mt-space-md w-full"
        >
          {pending ? "Starting your trial…" : trial.submit}
        </Button>
        <p className="mt-space-sm text-[0.8125rem] leading-relaxed text-ink-muted">
          {trial.consent}
        </p>
      </form>

      <div
        ref={success}
        tabIndex={-1}
        role="status"
        className={`col-start-1 row-start-1 grid place-items-center p-8 text-center outline-none transition-[opacity,transform] duration-500 ease-out ${
          done
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-[0.98] opacity-0"
        }`}
      >
        {done ? (
          <div className="max-w-[22rem]">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-button">
              <Icon name="check" size={26} strokeWidth={2.5} />
            </span>
            <p className="mt-space-md font-display text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-navy">
              {trial.success.title}
            </p>
            <p className="mt-space-xs text-ink-muted">{trial.success.body}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
