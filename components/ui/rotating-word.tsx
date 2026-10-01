"use client";

import { useEffect, useState } from "react";

type Props = {
  words: readonly string[];
  /** Milliseconds each word stays. */
  interval?: number;
  className?: string;
};

/**
 * Cycles through words. All words share one grid cell, so the width is the
 * widest word and nothing around it shifts. Normally the word slides up;
 * with reduced motion it still changes, but with a gentle crossfade only.
 * Screen readers get the full list once.
 */
export function RotatingWord({ words, interval = 2200, className }: Props) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    let id = 0;
    const start = () => {
      window.clearInterval(id);
      if (document.visibilityState !== "visible") return;
      id = window.setInterval(
        () => setIndex((i) => (i + 1) % words.length),
        reduced ? interval + 800 : interval,
      );
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", start);
    };
  }, [words.length, interval, reduced]);

  return (
    <span className={`relative inline-grid overflow-hidden ${className ?? ""}`}>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => {
        const current = i === index;
        const previous = i === (index - 1 + words.length) % words.length;
        const motion = reduced
          ? "transition-opacity duration-700"
          : `transition-[opacity,transform] duration-500 ${
              current
                ? "translate-y-0"
                : previous
                  ? "-translate-y-full"
                  : "translate-y-full"
            }`;
        return (
          <span
            key={word}
            aria-hidden="true"
            className={`col-start-1 row-start-1 whitespace-nowrap ease-out ${motion} ${
              current ? "opacity-100" : "opacity-0"
            }`}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
