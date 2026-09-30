"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for every [data-spotlight] card.
 * It moves the card's .spotlight glow with transform only (no CSS variables
 * on the parent, so children never restyle). Fine pointers only.
 */
export function Spotlight() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const card = (last.target as Element | null)?.closest<HTMLElement>(
        "[data-spotlight]",
      );
      const glow = card?.querySelector<HTMLElement>(":scope > .spotlight");
      if (!card || !glow) return;
      const r = card.getBoundingClientRect();
      glow.style.transform = `translate3d(${last.clientX - r.left}px, ${last.clientY - r.top}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
