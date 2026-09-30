"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { week } from "@/lib/content";
import { Icon, type IconName } from "./ui/icons";

type Kind =
  (typeof week.leads)[number][keyof (typeof week.leads)[number]]["kind"];

const look: Record<Kind, { icon: IconName; card: string; chip: string }> = {
  missed: {
    icon: "phoneMissed",
    card: "border border-dashed border-navy/20 bg-surface-base text-ink-muted",
    chip: "bg-navy/[0.06] text-ink-muted",
  },
  cold: {
    icon: "clock",
    card: "border border-dashed border-navy/20 bg-surface-base text-ink-muted",
    chip: "bg-navy/[0.06] text-ink-muted",
  },
  empty: {
    icon: "calendarCheck",
    card: "border border-dashed border-navy/15 bg-transparent text-ink-muted",
    chip: "bg-navy/[0.04] text-ink-muted",
  },
  booked: {
    icon: "calendarCheck",
    card: "bg-deep-grad text-white shadow-cta",
    chip: "bg-white/20 text-white",
  },
  reply: {
    icon: "zap",
    card: "bg-surface-elevated text-navy shadow-elevated",
    chip: "bg-deep-grad text-white",
  },
  followup: {
    icon: "repeat",
    card: "bg-surface-elevated text-navy shadow-elevated",
    chip: "bg-deep-grad text-white",
  },
  review: {
    icon: "star",
    card: "bg-navy text-white shadow-elevated",
    chip: "bg-sky text-navy",
  },
};

function Lead({
  kind,
  text,
  on,
  i,
}: {
  kind: Kind;
  text: string;
  on: boolean;
  i: number;
}) {
  const l = look[kind];
  return (
    <div
      className={`col-start-1 row-start-1 flex min-h-[4.25rem] items-center gap-3 rounded-2xl px-3.5 py-3 transition-[opacity,transform] ease-out motion-reduce:transform-none lg:min-h-[8.5rem] lg:flex-col lg:items-start lg:justify-between lg:p-4 ${l.card} ${
        on
          ? "translate-y-0 scale-100 opacity-100 duration-500"
          : "pointer-events-none translate-y-2 scale-[0.97] opacity-0 duration-200"
      }`}
      style={{ transitionDelay: on ? `${120 + i * 70}ms` : "0ms" }}
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${l.chip}`}
      >
        <Icon name={l.icon} size={15} strokeWidth={2} />
      </span>
      <span className="text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em]">
        {text}
      </span>
    </div>
  );
}

/**
 * Before/after week board. Starts on "without", flips to "with" once the
 * first time it's properly in view, then the visitor is in control.
 * Native radio inputs give arrow-key support for free.
 */
export function WeekCompare() {
  const [withScaalus, setWithScaalus] = useState(false);
  const touched = useRef(false);
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = board.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setWithScaalus(true);
        }, 1400);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const choose = (value: boolean) => {
    touched.current = true;
    setWithScaalus(value);
  };

  return (
    <div ref={board}>
      <fieldset className="mx-auto w-fit">
        <legend className="sr-only">{week.toggleLabel}</legend>
        <div className="relative grid grid-cols-2 rounded-full bg-surface-elevated p-1 shadow-elevated">
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 grid w-[calc(50%-0.25rem)] transition-transform duration-500 ease-in-out ${
              withScaalus ? "translate-x-full" : ""
            }`}
          >
            <span className="col-start-1 row-start-1 rounded-full bg-navy" />
            <span
              className={`bg-deep-grad col-start-1 row-start-1 rounded-full shadow-cta transition-opacity duration-500 ease-in-out ${
                withScaalus ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
          {[
            { value: false, label: week.without },
            { value: true, label: week.with },
          ].map((option) => {
            const checked = withScaalus === option.value;
            return (
              <label
                key={option.label}
                className={`relative z-10 flex h-11 w-[9.5rem] cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-3 text-[0.875rem] font-semibold transition-transform duration-150 ease-out active:scale-[0.97] sm:w-[10.5rem] sm:px-6 [&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-offset-2 [&:has(:focus-visible)]:outline-brand ${
                  checked ? "text-white" : "text-navy/70 hover:text-navy"
                }`}
              >
                <input
                  type="radio"
                  name="week"
                  className="sr-only"
                  checked={checked}
                  onChange={() => choose(option.value)}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="card relative mt-space-lg overflow-hidden p-3 sm:p-5">
        <p className="absolute right-4 top-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-muted sm:right-5 sm:top-4">
          {week.label}
        </p>
        <ol className="mt-6 grid gap-2.5 sm:mt-7 lg:grid-cols-5 lg:gap-3">
          {week.leads.map((lead, i) => (
            <li
              key={week.days[i]}
              className="grid grid-cols-[3rem_1fr] items-center gap-2 lg:grid-cols-1 lg:items-stretch"
            >
              <span className="font-mono text-label uppercase text-ink-muted lg:px-1">
                {week.days[i]}
              </span>
              <div className="grid">
                <Lead
                  kind={lead.without.kind}
                  text={lead.without.text}
                  on={!withScaalus}
                  i={i}
                />
                <Lead
                  kind={lead.with.kind}
                  text={lead.with.text}
                  on={withScaalus}
                  i={i}
                />
              </div>
            </li>
          ))}
        </ol>
        <p
          aria-live="polite"
          className="mt-4 flex items-center justify-center gap-2 text-center text-small font-medium text-navy lg:mt-5"
        >
          <span
            className={`grid h-5 w-5 place-items-center rounded-full transition-transform duration-300 ease-out ${
              withScaalus
                ? "bg-deep-grad scale-100 text-white"
                : "scale-90 bg-navy/10 text-ink-muted"
            }`}
            style={{ "--i": 0 } as CSSProperties}
          >
            <Icon
              name={withScaalus ? "check" : "alert"}
              size={12}
              strokeWidth={2.5}
            />
          </span>
          {withScaalus ? week.summaryWith : week.summaryWithout}
        </p>
      </div>
    </div>
  );
}
