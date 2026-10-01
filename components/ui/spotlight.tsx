"use client";

import { useEffect } from "react";

/** Cards that react to a touch press: spotlight cards and lifting cards. */
const PRESSABLE = "[data-spotlight], .lift";

/**
 * One delegated pointer listener for every [data-spotlight] card.
 * It moves the card's .spotlight glow with transform only (no CSS variables
 * on the parent, so children never restyle).
 * Mouse: the glow follows the cursor and shows on hover.
 * Touch: pressing a card sets data-pressed, so it glows under the finger and
 * lifts like a hovered card. A scroll that starts on the card cancels it.
 */
export function Spotlight() {
  useEffect(() => {
    let frame = 0;
    let last: { card: HTMLElement; x: number; y: number } | null = null;
    let pending: HTMLElement | null = null;
    let pressed: HTMLElement | null = null;
    let holdTimer = 0;
    let releaseTimer = 0;

    const update = () => {
      frame = 0;
      if (!last) return;
      const glow = last.card.querySelector<HTMLElement>(":scope > .spotlight");
      if (!glow) return;
      const r = last.card.getBoundingClientRect();
      glow.style.transform = `translate3d(${last.x - r.left}px, ${last.y - r.top}px, 0)`;
    };
    const track = (card: HTMLElement, e: PointerEvent) => {
      last = { card, x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };

    const release = () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(releaseTimer);
      holdTimer = 0;
      pending = null;
      pressed?.removeAttribute("data-pressed");
      pressed = null;
    };
    const press = (card: HTMLElement) => {
      holdTimer = 0;
      pending = null;
      pressed = card;
      card.setAttribute("data-pressed", "");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        const card = (e.target as Element | null)?.closest<HTMLElement>(
          "[data-spotlight]",
        );
        if (card) track(card, e);
      } else if (pressed) {
        track(pressed, e);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const card = (e.target as Element | null)?.closest<HTMLElement>(
        PRESSABLE,
      );
      release();
      if (!card) return;
      track(card, e);
      pending = card;
      // A short hold first, so a scroll that starts on a card never flashes it.
      holdTimer = window.setTimeout(() => press(card), 140);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      // A quick tap still gets a brief glow and lift.
      if (pending) {
        window.clearTimeout(holdTimer);
        press(pending);
      }
      if (pressed) releaseTimer = window.setTimeout(release, 380);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointercancel", release, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      release();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", release);
    };
  }, []);

  return null;
}
