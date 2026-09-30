"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { Icon } from "./ui/icons";

/*
 * Illustrative story (generic labels, no real customers or stats):
 * missed call → automatic text back → reply → offer → yes → job lands on the calendar.
 * Starts mid-thread so the phone is never empty, plays from load at any viewport,
 * pauses in hidden tabs, has a visible pause control, and shows the final frame
 * under reduced motion.
 */
const START = 2;
const FINAL = 6;
// How long each step holds before the next one (ms). Index = current step.
const HOLD = [400, 1300, 1600, 1500, 1300, 1100, 3600];

function useStory() {
  const [step, setStep] = useState(START);
  const [playing, setPlaying] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  // Reduced motion: show the finished story, no loop.
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(query.matches);
      setStep(query.matches ? FINAL : START);
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const running = playing && pageVisible && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => setStep((s) => (s >= FINAL ? START : s + 1)),
      HOLD[step],
    );
    return () => window.clearTimeout(id);
  }, [running, step]);

  return { step, playing, setPlaying, reduced };
}

function Beat({
  on,
  side = "center",
  children,
}: {
  on: boolean;
  side?: "left" | "right" | "center";
  children: ReactNode;
}) {
  const origin =
    side === "right"
      ? "origin-bottom-right"
      : side === "left"
        ? "origin-bottom-left"
        : "origin-bottom";
  return (
    <div
      className={`transition-[opacity,transform] ease-out ${origin} ${
        on
          ? "translate-y-0 scale-100 opacity-100 duration-500"
          : "translate-y-2 scale-[0.97] opacity-0 duration-300"
      }`}
    >
      {children}
    </div>
  );
}

function Bubble({
  from,
  children,
}: {
  from: "business" | "customer";
  children: ReactNode;
}) {
  const business = from === "business";
  return (
    <div className={`flex ${business ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[80%] rounded-[1.25rem] px-3.5 py-2 text-[0.9375rem] leading-snug ${
          business
            ? "rounded-br-md bg-brand text-white"
            : "rounded-bl-md bg-surface-card text-navy"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export function HeroDemo() {
  const { step, playing, setPlaying, reduced } = useStory();
  const booked = step >= 6;

  return (
    <div className="relative">
      <p className="sr-only">
        Example: a missed call at 9:42 PM gets an automatic text back. The
        customer replies, and a roof leak repair is booked on the calendar for
        Tuesday at 8:00 AM.
      </p>

      <div
        aria-hidden="true"
        className="relative mx-auto max-w-[21.25rem] lg:flex lg:max-w-none lg:items-end lg:justify-center lg:gap-space-lg"
      >
        {/* Conversation */}
        <div className="relative z-base rounded-[2rem] bg-surface-elevated p-4 pb-16 shadow-floating lg:w-[22rem] lg:pb-5">
          <div className="flex items-center gap-3 border-b border-navy/[0.07] pb-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-surface-card text-navy">
              <Icon name="phone" size={16} />
            </div>
            <div className="text-left">
              <p className="text-[0.9375rem] font-semibold leading-tight text-navy">
                New customer
              </p>
              <p className="text-[0.8125rem] leading-tight text-ink-muted">
                Tonight
              </p>
            </div>
          </div>

          <div className="flex min-h-[17.5rem] flex-col gap-2.5 pt-4">
            <Beat on={step >= 1}>
              <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-surface-card px-3 py-1 text-[0.8125rem] font-medium text-ink-muted">
                <Icon name="phoneMissed" size={14} strokeWidth={2} />
                Missed call · 9:42 PM
              </p>
            </Beat>
            <Beat on={step >= 2} side="right">
              <Bubble from="business">
                Sorry we missed your call! How can we help?
              </Bubble>
              <p className="mt-1 text-right text-[0.75rem] text-ink-muted">
                Sent automatically
              </p>
            </Beat>
            <Beat on={step >= 3} side="left">
              <Bubble from="customer">
                Need someone to look at a roof leak.
              </Bubble>
            </Beat>
            <Beat on={step >= 4} side="right">
              <Bubble from="business">
                We can come Tuesday at 8:00 AM. Want me to book it?
              </Bubble>
            </Beat>
            <Beat on={step >= 5} side="left">
              <Bubble from="customer">Yes please!</Bubble>
            </Beat>
          </div>
        </div>

        {/* Calendar */}
        <div className="relative z-elevated -mt-12 ml-auto mr-[-0.5rem] w-[82%] rounded-card bg-surface-elevated p-4 shadow-floating lg:m-0 lg:mb-10 lg:w-[17rem]">
          <div className="flex items-center justify-between">
            <p className="font-display text-[1rem] font-semibold tracking-[-0.01em] text-navy">
              Tuesday
            </p>
            <span className="text-brand">
              <Icon name="calendarCheck" size={18} />
            </span>
          </div>
          <ul className="mt-3 space-y-2 text-left">
            <li className="grid grid-cols-[4.25rem_1fr] items-center gap-2">
              <span className="text-[0.8125rem] text-ink-muted">8:00 AM</span>
              <span className="grid">
                <span
                  className={`col-start-1 row-start-1 rounded-xl border border-dashed border-navy/15 px-3 py-2 text-[0.8125rem] text-ink-muted transition-opacity duration-300 ease-out ${
                    booked ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Open
                </span>
                <span
                  className={`col-start-1 row-start-1 flex items-center justify-between gap-2 rounded-xl bg-brand px-3 py-2 text-[0.8125rem] font-semibold text-white shadow-button transition-[opacity,transform] ease-out ${
                    booked
                      ? "scale-100 opacity-100 duration-500"
                      : "scale-[0.96] opacity-0 duration-300"
                  }`}
                >
                  Roof leak repair
                  <Icon name="check" size={14} strokeWidth={2.5} />
                </span>
              </span>
            </li>
            <li className="grid grid-cols-[4.25rem_1fr] items-center gap-2">
              <span className="text-[0.8125rem] text-ink-muted">10:30 AM</span>
              <span className="rounded-xl bg-surface-card px-3 py-2 text-[0.8125rem] font-medium text-navy">
                Gutter repair
              </span>
            </li>
            <li className="grid grid-cols-[4.25rem_1fr] items-center gap-2">
              <span className="text-[0.8125rem] text-ink-muted">1:00 PM</span>
              <span className="rounded-xl bg-surface-card px-3 py-2 text-[0.8125rem] font-medium text-navy">
                Roof inspection
              </span>
            </li>
          </ul>
        </div>
      </div>

      {!reduced ? (
        <div className="mt-space-md flex justify-center">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause animation" : "Play animation"}
            className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium text-navy opacity-70 transition-[opacity,transform] duration-150 ease-out hover:opacity-100 active:scale-[0.97]"
          >
            <Icon
              name={playing ? "pause" : "play"}
              size={14}
              strokeWidth={2.25}
            />
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
