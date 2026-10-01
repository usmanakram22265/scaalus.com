"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { demo } from "@/lib/content";
import { Icon } from "./ui/icons";

/*
 * Illustrative story (generic labels, no real customers or stats):
 * missed call → automatic text back → typing → reply → offer → yes → booked.
 * Starts mid-thread so the phone is never empty, plays from load at any viewport,
 * pauses in hidden tabs, has a visible pause control, and shows the final frame
 * under reduced motion.
 *
 * Steps: 1 missed · 2 text back · 3 customer typing · 4 ask · 5 typing ·
 *        6 offer · 7 customer typing · 8 yes · 9 booked
 */
const START = 2;
const FINAL = 9;
// How long each step holds before the next one (ms). Index = current step.
const HOLD = [300, 900, 1500, 1100, 1300, 1000, 1500, 900, 1000, 3800];

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

/**
 * Gentle 3D tilt toward the pointer, eased every frame so it feels springy.
 * Fine pointers only; transform only.
 */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!el || !fine.matches || reduced.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      el.style.transform = `perspective(1400px) rotateX(${current.y.toFixed(2)}deg) rotateY(${current.x.toFixed(2)}deg)`;
      const settled =
        Math.abs(target.x - current.x) < 0.01 &&
        Math.abs(target.y - current.y) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 8;
      target.y = (e.clientY / window.innerHeight - 0.5) * -6;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return ref;
}

type BeatState = "hidden" | "typing" | "shown";

function stateFor(step: number, at: number, typingAt?: number): BeatState {
  if (step >= at) return "shown";
  if (typingAt !== undefined && step === typingAt) return "typing";
  return "hidden";
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 px-1 py-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot loop block h-1.5 w-1.5 rounded-full bg-current"
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </span>
  );
}

/**
 * One message slot. The message reserves its height even while hidden, and the
 * typing bubble sits in the same grid cell, so the thread never shifts.
 */
function Beat({
  state,
  side = "center",
  children,
}: {
  state: BeatState;
  side?: "left" | "right" | "center";
  children: ReactNode;
}) {
  const origin =
    side === "right"
      ? "origin-bottom-right"
      : side === "left"
        ? "origin-bottom-left"
        : "origin-bottom";
  const shown = state === "shown";
  const typing = state === "typing";
  const bubble =
    side === "right"
      ? "ml-auto rounded-br-md bg-brand/15 text-brand"
      : "rounded-bl-md bg-surface-card text-ink-muted";
  return (
    <div className="grid">
      <div
        className={`col-start-1 row-start-1 transition-[opacity,transform] ease-out ${origin} ${
          shown
            ? "translate-y-0 scale-100 opacity-100 duration-500"
            : "translate-y-2 scale-[0.96] opacity-0 duration-200"
        }`}
      >
        {children}
      </div>
      {side !== "center" ? (
        <div
          className={`col-start-1 row-start-1 flex self-end ${side === "right" ? "justify-end" : "justify-start"} transition-[opacity,transform] ease-out ${origin} ${
            typing
              ? "scale-100 opacity-100 duration-300"
              : "scale-90 opacity-0 duration-150"
          }`}
        >
          <span className={`rounded-[1.1rem] px-3 py-1.5 ${bubble}`}>
            <TypingDots />
          </span>
        </div>
      ) : null}
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
        className={`max-w-[84%] rounded-[1.15rem] px-3.5 py-2 text-[0.875rem] leading-snug ${
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
  const tilt = useTilt();
  const booked = step >= FINAL;
  const replied = step >= 2;

  return (
    <div className="relative">
      <p className="sr-only">{demo.srSummary}</p>

      <div
        aria-hidden="true"
        ref={tilt}
        className="relative mx-auto w-full max-w-[22rem] [transform-style:preserve-3d] sm:max-w-[25rem]"
      >
        {/* Phone */}
        <div
          className="scene-in relative mx-auto w-[88%] rounded-[2.6rem] bg-deep p-2 shadow-on-navy sm:w-[80%]"
          style={{ "--i": 0 } as CSSProperties}
        >
          <div className="overflow-hidden rounded-[2.1rem] bg-surface-elevated">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pb-1 pt-3 font-mono text-[0.6875rem] text-navy">
              <span>9:42</span>
              <span className="h-[1.1rem] w-[4.5rem] rounded-full bg-navy" />
              <span className="flex items-end gap-[2px]">
                <span className="block h-1.5 w-[3px] rounded-full bg-navy" />
                <span className="block h-2 w-[3px] rounded-full bg-navy" />
                <span className="block h-2.5 w-[3px] rounded-full bg-navy" />
              </span>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-3 border-b border-navy/[0.07] px-4 pb-3 pt-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-surface-card text-navy">
                <Icon name="phone" size={15} />
              </div>
              <div className="text-left">
                <p className="text-[0.875rem] font-semibold leading-tight text-navy">
                  {demo.contact}
                </p>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink-muted">
                  {demo.when}
                </p>
              </div>
            </div>

            {/* Thread */}
            <div className="flex min-h-[19.5rem] flex-col gap-2.5 px-3.5 pb-5 pt-4">
              <Beat state={stateFor(step, 1)}>
                <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-surface-card px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-ink-muted">
                  <Icon name="phoneMissed" size={13} strokeWidth={2} />
                  {demo.missed}
                </p>
              </Beat>
              <Beat state={stateFor(step, 2)} side="right">
                <Bubble from="business">{demo.textBack}</Bubble>
                <p className="mt-1 text-right font-mono text-[0.625rem] uppercase tracking-[0.06em] text-ink-muted">
                  {demo.auto}
                </p>
              </Beat>
              <Beat state={stateFor(step, 4, 3)} side="left">
                <Bubble from="customer">{demo.ask}</Bubble>
              </Beat>
              <Beat state={stateFor(step, 6, 5)} side="right">
                <Bubble from="business">{demo.offer}</Bubble>
              </Beat>
              <Beat state={stateFor(step, 8, 7)} side="left">
                <Bubble from="customer">{demo.yes}</Bubble>
              </Beat>
            </div>
          </div>
        </div>

        {/* "Replied instantly" chip */}
        <div
          className="scene-in absolute -left-2 top-[46%] sm:-left-10"
          style={{ "--i": 2 } as CSSProperties}
        >
          <div className="float loop" style={{ "--i": 1 } as CSSProperties}>
            <p
              className={`flex items-center gap-2 rounded-full bg-surface-elevated py-2 pl-2 pr-3.5 text-[0.8125rem] font-semibold text-navy shadow-floating transition-[opacity,transform] duration-500 ease-out ${
                replied ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white">
                <Icon name="zap" size={13} strokeWidth={2.25} />
              </span>
              {demo.chip}
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div
          className="scene-in absolute -right-1 top-[calc(100%-2.75rem)] w-[62%] sm:-right-10 sm:w-[58%]"
          style={{ "--i": 1 } as CSSProperties}
        >
          <div className="rounded-[1.25rem] bg-surface-elevated p-3.5 shadow-floating">
            <div className="flex items-center justify-between">
              <p className="font-display text-[0.9375rem] font-semibold tracking-[-0.02em] text-navy">
                {demo.day}
              </p>
              <span className="text-brand">
                <Icon name="calendarCheck" size={16} />
              </span>
            </div>
            <ul className="mt-2.5 space-y-1.5 text-left">
              <li className="grid grid-cols-[3.4rem_1fr] items-center gap-1.5">
                <span className="font-mono text-[0.6875rem] text-ink-muted">
                  {demo.bookedTime}
                </span>
                <span className="grid">
                  <span
                    className={`col-start-1 row-start-1 rounded-lg border border-dashed border-navy/15 px-2.5 py-1.5 text-[0.75rem] text-ink-muted transition-opacity duration-300 ease-out ${
                      booked ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {demo.open}
                  </span>
                  <span
                    className={`col-start-1 row-start-1 flex items-center justify-between gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[0.75rem] font-semibold text-white shadow-cta transition-[opacity,transform] ease-out ${
                      booked
                        ? "scale-100 opacity-100 duration-500"
                        : "scale-[0.94] opacity-0 duration-200"
                    }`}
                  >
                    {demo.bookedJob}
                    <Icon name="check" size={13} strokeWidth={2.5} />
                  </span>
                </span>
              </li>
              {demo.otherJobs.map((item) => (
                <li
                  key={item.time}
                  className="grid grid-cols-[3.4rem_1fr] items-center gap-1.5"
                >
                  <span className="font-mono text-[0.6875rem] text-ink-muted">
                    {item.time}
                  </span>
                  <span className="rounded-lg bg-surface-card px-2.5 py-1.5 text-[0.75rem] font-medium text-navy">
                    {item.job}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* "Job booked" toast */}
        <div className="absolute -right-1 top-[4%] sm:-right-12">
          <div
            className={`flex items-center gap-2.5 rounded-2xl bg-surface-elevated py-2.5 pl-2.5 pr-4 shadow-floating transition-[opacity,transform] ease-out ${
              booked
                ? "translate-y-0 scale-100 opacity-100 duration-500"
                : "-translate-y-3 scale-95 opacity-0 duration-200"
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white shadow-cta">
              <Icon name="calendarCheck" size={16} strokeWidth={2} />
            </span>
            <span className="text-left">
              <span className="block text-[0.8125rem] font-semibold leading-tight text-navy">
                {demo.toastLabel}
              </span>
              <span className="block font-mono text-[0.6875rem] text-ink-muted">
                {demo.toastBody}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-[9.5rem] flex items-center justify-center gap-3 sm:mt-[10rem]">
        <span className="font-mono text-label uppercase text-white/50">
          {demo.label}
        </span>
        {!reduced ? (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? demo.pauseLabel : demo.playLabel}
            className="inline-flex h-[44px] items-center gap-2 rounded-full px-3 font-mono text-label uppercase text-white/70 transition-[opacity,transform] duration-150 ease-out hover:text-white active:scale-[0.97]"
          >
            <Icon
              name={playing ? "pause" : "play"}
              size={13}
              strokeWidth={2.25}
            />
            {playing ? demo.pause : demo.play}
          </button>
        ) : null}
      </div>
    </div>
  );
}
