"use client";

import {
  Component,
  useActionState,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { startTrial } from "@/app/actions";
import { site, trial } from "@/lib/content";
import {
  HONEYPOT,
  initialTrialState,
  trialFields,
  type TrialField,
} from "@/lib/trial-schema";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-navy/15 bg-surface-base px-3.5 text-navy placeholder:text-ink-muted " +
  "focus-visible:border-brand focus-visible:bg-surface-elevated focus-visible:outline-offset-0 aria-[invalid=true]:border-danger";

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p
      id={id}
      className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] font-medium text-danger"
      style={{ animation: "rise 240ms var(--ease-out) both" }}
    >
      <Icon name="alert" size={16} strokeWidth={2} className="shrink-0" />
      {children}
    </p>
  );
}

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: string;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline justify-between gap-2 text-small font-semibold text-navy"
    >
      {children}
      {optional ? (
        <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-ink-muted">
          {trial.labels.optional}
        </span>
      ) : null}
    </label>
  );
}

type FieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "className"
> & {
  name: Exclude<TrialField, "notes">;
  label: string;
  error?: string;
  /** id of a shared helper text element. */
  hint?: string;
  className?: string;
};

function Field({ name, label, error, hint, className, ...input }: FieldProps) {
  const id = `trial-${name}`;
  const errorId = `${id}-error`;
  const describedBy = [error ? errorId : null, hint].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`${inputClass} h-[max(3rem,44px)]`}
        {...input}
      />
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

function TrialFormInner() {
  // Server action passed directly, so the form also submits before
  // JavaScript has loaded (slow phones). Failures are caught by FormGuard.
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
    <div
      data-tone="light"
      className="grid rounded-[1.75rem] bg-surface-elevated shadow-floating"
    >
      <form
        ref={form}
        action={formAction}
        noValidate
        inert={done}
        aria-labelledby="trial-form-title"
        className={`col-start-1 row-start-1 p-5 transition-[opacity,transform] duration-300 ease-out sm:p-8 ${
          done ? "pointer-events-none scale-[0.98] opacity-0" : "opacity-100"
        }`}
      >
        <p
          id="trial-form-title"
          className="font-display text-[1.375rem] font-semibold tracking-[-0.03em] text-navy"
        >
          {trial.formTitle}
        </p>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label>
            {trial.honeypot}
            <input
              type="text"
              name={HONEYPOT}
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </label>
        </div>

        <div className="mt-space-md grid gap-space-sm sm:grid-cols-2">
          <Field
            name="name"
            label={trial.labels.name}
            autoComplete="name"
            enterKeyHint="next"
            defaultValue={values.name}
            error={errors.name}
          />
          <Field
            name="business"
            label={trial.labels.business}
            autoComplete="off"
            placeholder={trial.placeholders.business}
            enterKeyHint="next"
            defaultValue={values.business}
            error={errors.business}
          />

          <p
            id="trial-contact-hint"
            className="-mb-1 flex items-center gap-2 text-[0.8125rem] text-ink-muted sm:col-span-2"
          >
            <Icon name="phone" size={14} className="text-brand" />
            {trial.contactHint}
          </p>
          <Field
            name="phone"
            label={trial.labels.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            placeholder={trial.placeholders.phone}
            hint="trial-contact-hint"
            defaultValue={values.phone}
            error={errors.phone}
          />
          <Field
            name="email"
            label={trial.labels.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            placeholder={trial.placeholders.email}
            hint="trial-contact-hint"
            defaultValue={values.email}
            error={errors.email}
          />

          <div className="sm:col-span-2">
            <Label htmlFor="trial-notes" optional>
              {trial.labels.notes}
            </Label>
            <textarea
              id="trial-notes"
              name="notes"
              rows={3}
              maxLength={1000}
              placeholder={trial.placeholders.notes}
              defaultValue={values.notes}
              aria-invalid={errors.notes ? true : undefined}
              aria-describedby={errors.notes ? "trial-notes-error" : undefined}
              className={`${inputClass} min-h-[4.5rem] resize-y py-3 sm:min-h-[6.5rem]`}
            />
            <ErrorText id="trial-notes-error">{errors.notes}</ErrorText>
          </div>
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
          {pending ? trial.pending : trial.submit}
        </Button>
        <p className="mt-space-sm text-[0.75rem] leading-relaxed text-ink-muted">
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
            <span
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-cta"
              style={{ animation: "pop-in 500ms var(--ease-out) both" }}
            >
              <Icon name="check" size={28} strokeWidth={2.5} />
            </span>
            <p className="mt-space-md font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-navy">
              {trial.success.title}
            </p>
            <p className="mt-space-xs text-ink-muted">{trial.success.body}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * If a submit fails outright (offline, or a tab opened before a new deploy),
 * show the fallback with our phone number and a fresh form, instead of
 * breaking the page.
 */
class FormGuard extends Component<
  { onReset: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div
        role="alert"
        data-tone="light"
        className="rounded-[1.75rem] bg-surface-elevated p-6 text-center shadow-floating sm:p-8"
      >
        <p className="font-medium text-danger">{trial.errorFallback}</p>
        <a
          href={site.phone.href}
          className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-semibold text-navy underline underline-offset-2"
        >
          <Icon name="phone" size={16} />
          {site.phone.display}
        </a>
        <Button
          size="md"
          arrow
          className="mt-4 w-full"
          onClick={() => {
            this.setState({ failed: false });
            this.props.onReset();
          }}
        >
          {trial.retry}
        </Button>
      </div>
    );
  }
}

export function TrialForm() {
  const [attempt, setAttempt] = useState(0);
  return (
    <FormGuard onReset={() => setAttempt((n) => n + 1)}>
      <TrialFormInner key={attempt} />
    </FormGuard>
  );
}
