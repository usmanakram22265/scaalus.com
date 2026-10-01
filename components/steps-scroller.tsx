"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { steps } from "@/lib/content";
import { Icon } from "./ui/icons";
import { SwipeDots } from "./ui/swipe-dots";

const v = steps.visual;

/** Staggered in/out for the pieces of a step visual. */
function piece(active: boolean, i: number) {
  return {
    className: `transition-[opacity,transform] ease-out motion-reduce:transform-none ${
      active
        ? "translate-y-0 scale-100 opacity-100 duration-500"
        : "translate-y-3 scale-[0.97] opacity-0 duration-200"
    }`,
    style: { transitionDelay: active ? `${100 + i * 90}ms` : "0ms" },
  };
}

function CaptureVisual({ active }: { active: boolean }) {
  const icons = ["phone", "message", "inbox", "mail"] as const;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="grid grid-cols-2 gap-2.5">
        {v.sources.map((source, i) => (
          <span
            key={source}
            {...piece(active, i)}
            className={`${piece(active, i).className} flex items-center gap-2 rounded-full bg-surface-elevated py-2 pl-2 pr-4 text-[0.875rem] font-semibold text-navy shadow-elevated`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-card text-brand">
              <Icon name={icons[i] ?? "inbox"} size={14} strokeWidth={2} />
            </span>
            {source}
          </span>
        ))}
      </div>
      <span
        {...piece(active, 4)}
        className={`${piece(active, 4).className} text-brand`}
      >
        <Icon name="chevronDown" size={22} strokeWidth={2} />
      </span>
      <span
        {...piece(active, 5)}
        className={`${piece(active, 5).className} flex items-center gap-3 rounded-2xl bg-navy px-5 py-3.5 text-white shadow-floating`}
      >
        <Icon name="inbox" size={18} strokeWidth={2} className="text-sky" />
        <span className="font-semibold">{v.inbox}</span>
      </span>
    </div>
  );
}

function ReplyVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-2">
      <p
        {...piece(active, 0)}
        className={`${piece(active, 0).className} ml-auto max-w-[85%] rounded-[1.25rem] rounded-br-md bg-brand px-4 py-2.5 text-[0.9375rem] leading-snug text-white shadow-cta`}
      >
        {v.reply}
      </p>
      <p
        {...piece(active, 1)}
        className={`${piece(active, 1).className} ml-auto flex w-fit items-center gap-2 rounded-full bg-surface-elevated py-1.5 pl-1.5 pr-3.5 text-[0.8125rem] font-semibold text-navy shadow-elevated`}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-sky text-navy">
          <Icon name="zap" size={12} strokeWidth={2.5} />
        </span>
        {v.replied}
      </p>
    </div>
  );
}

function FollowUpVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-2">
      {v.followups.map((text, i) => (
        <p
          key={text}
          {...piece(active, i * 2)}
          className={`${piece(active, i * 2).className} ml-auto flex max-w-[85%] items-center gap-2.5 rounded-[1.25rem] rounded-br-md bg-surface-elevated px-4 py-2.5 text-[0.9375rem] font-medium text-navy shadow-elevated`}
        >
          <Icon
            name="repeat"
            size={15}
            strokeWidth={2}
            className="shrink-0 text-brand"
          />
          {text}
        </p>
      ))}
      <span
        {...piece(active, 4)}
        className={`${piece(active, 4).className} flex w-fit items-center gap-1 rounded-[1.1rem] rounded-bl-md bg-surface-card px-4 py-3`}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot loop block h-1.5 w-1.5 rounded-full bg-ink-muted"
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </span>
    </div>
  );
}

function BookedVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div
        {...piece(active, 0)}
        className={`${piece(active, 0).className} w-full max-w-[17rem] rounded-2xl bg-surface-elevated p-4 shadow-floating`}
      >
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 15 }, (_, i) => {
            const hit = i === 6;
            return (
              <span
                key={i}
                className={`grid h-9 place-items-center rounded-lg ${
                  hit ? "relative bg-surface-card" : "bg-surface-card/70"
                }`}
              >
                {hit ? (
                  <span
                    className={`absolute inset-0 grid place-items-center rounded-lg bg-brand text-white shadow-cta transition-[opacity,transform] ease-out ${
                      active
                        ? "scale-100 opacity-100 delay-500 duration-500"
                        : "scale-75 opacity-0 duration-200"
                    }`}
                  >
                    <Icon name="check" size={16} strokeWidth={2.75} />
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>
        <p className="mt-3 flex items-center justify-between text-[0.875rem]">
          <span className="font-semibold text-navy">{v.booked}</span>
          <span className="font-mono text-[0.75rem] text-ink-muted">
            {v.slot}
          </span>
        </p>
      </div>
    </div>
  );
}

const visuals = [CaptureVisual, ReplyVisual, FollowUpVisual, BookedVisual];

/**
 * Desktop: sticky visual on the left swaps as each step crosses the middle
 * of the screen; a rail fills with scroll. Mobile: each card carries its own
 * visual, revealed as it scrolls in.
 */
export function StepsScroller() {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() =>
    steps.items.map(() => false),
  );
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-step]")];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.step);
          if (entry.isIntersecting) {
            setActive(index);
            setSeen((prev) =>
              prev[index] ? prev : prev.map((s, i) => (i === index ? true : s)),
            );
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = root.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      if (fill.current)
        fill.current.style.transform = `scaleY(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="grid gap-space-xl lg:grid-cols-2 lg:gap-space-2xl">
      {/* Sticky stage (desktop) */}
      <div className="hidden lg:block">
        <div
          aria-hidden="true"
          className="panel-stone sticky top-[calc(50vh-13rem)] grid h-[26rem] overflow-hidden rounded-panel p-8"
        >
          <span className="absolute left-7 top-6 font-mono text-label uppercase text-ink-muted">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(steps.items.length).padStart(2, "0")}
          </span>
          {visuals.map((Visual, i) => (
            <div
              key={i}
              className={`col-start-1 row-start-1 transition-opacity duration-300 ease-out ${
                active === i ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Visual active={active === i} />
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="min-w-0">
        {/* Phones: the steps are one swipeable row. */}
        <ol
          ref={list}
          id="steps-row"
          className="swipe-row relative grid gap-3 max-sm:-mx-5 max-sm:-my-3 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:scroll-px-5 max-sm:overflow-x-auto max-sm:px-5 max-sm:py-3 sm:gap-5 lg:gap-0"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[1.375rem] top-0 hidden w-[2px] overflow-hidden rounded-full bg-navy/10 lg:block"
          >
            <span
              ref={fill}
              className="block h-full w-full origin-top rounded-full bg-brand"
              style={{ transform: "scaleY(0)" }}
            />
          </span>
          {steps.items.map((item, i) => {
            const Visual = visuals[i] ?? CaptureVisual;
            const on = active === i;
            return (
              <li
                key={item.title}
                data-step={i}
                className="card relative p-4 max-sm:w-[84%] max-sm:shrink-0 max-sm:snap-center sm:p-6 lg:flex lg:min-h-[34vh] lg:items-center lg:bg-transparent lg:p-0 lg:pl-20 lg:shadow-none"
              >
                <span
                  className={`absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full font-mono text-[0.8125rem] font-medium transition-transform duration-300 ease-out lg:grid ${
                    on
                      ? "scale-100 bg-brand text-white shadow-cta"
                      : "scale-90 bg-surface-elevated text-ink-muted shadow-elevated"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div
                    className={`flex items-center gap-3 transition-[opacity,transform] duration-300 ease-out lg:origin-left ${on ? "" : "lg:scale-90 lg:opacity-40"}`}
                  >
                    <span className="icon-chip">
                      <Icon name={item.icon} size={20} strokeWidth={2} />
                    </span>
                    <span className="font-mono text-label uppercase text-ink-muted lg:hidden">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[28rem] text-ink-muted">
                    {item.body}
                  </p>
                </div>
                {/* Inline visual (mobile/tablet) */}
                <div
                  aria-hidden="true"
                  className="panel-stone mt-3 grid min-h-40 overflow-hidden rounded-2xl px-3 py-4 sm:mt-4 sm:h-60 sm:p-4 sm:py-3 lg:hidden"
                >
                  <Visual active={seen[i] ?? false} />
                </div>
              </li>
            );
          })}
        </ol>
        <SwipeDots targetId="steps-row" count={steps.items.length} />
      </div>
    </div>
  );
}
