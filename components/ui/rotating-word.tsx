"use client";

import { useEffect, useState } from "react";

type Props = {
  words: readonly string[];
  /** Milliseconds each word stays. */
  interval?: number;
  className?: string;
};

/**
 * Cycles through words with a short vertical slide. All words share one grid
 * cell, so the width is the widest word and nothing around it shifts.
 * Screen readers get the full list once; reduced motion shows the first word.
 */
export function RotatingWord({ words, interval = 2200, className }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    let id = 0;
    const start = () => {
      window.clearInterval(id);
      if (document.visibilityState !== "visible") return;
      id = window.setInterval(
        () => setIndex((i) => (i + 1) % words.length),
        interval,
      );
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", start);
    };
  }, [words.length, interval]);

  return (
    <span
      className={`relative inline-grid overflow-hidden align-top leading-[inherit] ${className ?? ""}`}
    >
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => {
        const state =
          i === index
            ? "translate-y-0 opacity-100"
            : i === (index - 1 + words.length) % words.length
              ? "-translate-y-full opacity-0"
              : "translate-y-full opacity-0";
        return (
          <span
            key={word}
            aria-hidden="true"
            className={`col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-500 ease-out ${state}`}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
