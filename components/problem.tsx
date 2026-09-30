import type { CSSProperties } from "react";
import { problem } from "@/lib/content";
import { Icon } from "./ui/icons";
import { SectionHeader } from "./ui/section";

/** Small looping illustration per pain point. Decorative. */
function Visual({ index }: { index: number }) {
  if (index === 0) {
    // A phone that rings and nobody picks up.
    return (
      <span className="relative grid h-full w-full place-items-center">
        <span className="ripple loop absolute h-14 w-14 rounded-full bg-brand/20" />
        <span
          className="ripple loop absolute h-14 w-14 rounded-full bg-brand/15"
          style={{ animationDelay: "1.4s" }}
        />
        <span className="loop relative grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-cta ring">
          <Icon name="phoneMissed" size={24} strokeWidth={2} />
        </span>
      </span>
    );
  }
  if (index === 1) {
    // Time running on while the lead waits.
    return (
      <span className="relative grid h-full w-full place-items-center">
        <span className="relative h-16 w-16 rounded-full bg-surface-elevated shadow-elevated ring-4 ring-brand/10">
          {[0, 90, 180, 270].map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 h-1.5 w-[2px] rounded-full bg-navy/25"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-1.5rem)`,
              }}
            />
          ))}
          <span className="spin-slow loop absolute left-1/2 top-1/2 h-0 w-0">
            <span className="absolute -left-[1px] bottom-0 block h-5 w-[2px] rounded-full bg-navy" />
          </span>
          <span className="spin-fast loop absolute left-1/2 top-1/2 h-0 w-0">
            <span className="absolute -left-[1px] bottom-0 block h-6 w-[2px] rounded-full bg-brand" />
          </span>
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy" />
        </span>
      </span>
    );
  }
  // A stack of agency invoices.
  return (
    <span className="relative grid h-full w-full place-items-center">
      {[2, 1, 0].map((i) => (
        <span
          key={i}
          className="absolute"
          style={{
            transform: `rotate(${(i - 1) * 9}deg) translateX(${(i - 1) * 12}px)`,
          }}
        >
          <span
            className="float loop relative block h-16 w-12 rounded-lg bg-surface-elevated shadow-elevated"
            style={{ "--i": i } as CSSProperties}
          >
            <span className="absolute inset-x-2 top-3 block h-1 rounded-full bg-navy/15" />
            <span className="absolute left-2 top-5 block h-1 w-5 rounded-full bg-navy/10" />
            {i === 0 ? (
              <span className="absolute bottom-2 left-2 grid h-5 w-5 place-items-center rounded-full bg-brand text-white">
                <Icon name="dollar" size={11} strokeWidth={2.5} />
              </span>
            ) : null}
          </span>
        </span>
      ))}
    </span>
  );
}

const lock = problem.lockScreen;

/** A phone lock screen stacking up missed calls. Illustrative. */
function LockScreen() {
  return (
    <div data-reveal="" style={{ "--i": 1 } as CSSProperties}>
      <div
        aria-hidden="true"
        className="panel-navy relative mt-space-lg hidden max-w-[23rem] rounded-[1.75rem] p-5 shadow-floating lg:block"
      >
        <p className="flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-[0.08em] text-white/55">
          <span>{lock.date}</span>
          <span>{lock.label}</span>
        </p>
        <p className="mt-1 font-display text-[3.25rem] font-semibold leading-none tracking-[-0.05em] text-white">
          {lock.time}
        </p>
        <ul className="mt-5 grid gap-2">
          {lock.calls.map((call, i) => (
            <li
              key={call.when}
              className="pop flex items-center gap-3 rounded-2xl bg-white/[0.08] px-3 py-2.5 ring-1 ring-inset ring-white/10"
              style={{ "--d": `${300 + i * 180}ms` } as CSSProperties}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-sky">
                <Icon name="phoneMissed" size={15} strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.8125rem] font-semibold text-white">
                  {lock.missed}
                </span>
                <span className="block truncate text-[0.75rem] text-white/60">
                  {call.who}
                </span>
              </span>
              <span className="font-mono text-[0.6875rem] text-white/55">
                {call.when}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href="#week"
        className="group mt-space-md inline-flex min-h-11 items-center gap-2 font-semibold text-brand transition-opacity duration-200 ease-out hover:opacity-80 active:opacity-60"
      >
        {lock.fix}
        <Icon
          name="arrowRight"
          size={16}
          strokeWidth={2.25}
          className="transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      data-loop=""
      className="pb-space-2xl pt-section"
    >
      <div className="container-page grid gap-space-xl lg:grid-cols-[0.9fr_1.1fr] lg:gap-space-2xl">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+var(--header-gap)+3rem)] lg:self-start">
          <SectionHeader
            id="problem"
            eyebrow={problem.eyebrow}
            title={problem.title}
            highlight={problem.highlight}
            body={problem.body}
            align="left"
          />
          <LockScreen />
        </div>

        <ul className="grid content-start gap-4">
          {problem.cards.map((card, i) => (
            <li
              key={card.title}
              data-reveal=""
              style={{ "--i": i } as CSSProperties}
              className="card lift flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6"
            >
              <div
                aria-hidden="true"
                className="panel-stone h-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-36"
              >
                <Visual index={i} />
              </div>
              <div>
                <h3 className="text-title">{card.title}</h3>
                <p className="mt-2 text-ink-muted">{card.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
