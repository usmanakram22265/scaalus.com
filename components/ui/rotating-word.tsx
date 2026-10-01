"use client";

import { useEffect, useState } from "react";

type Props = {
  words: readonly string[];
  /** Milliseconds each word stays. */
  interval?: number;
  className?: string;
};

/**
 * Cycles through words, each sliding up into place. All words share one grid
 * cell, so the width is the widest word and nothing around it shifts.
 * Screen readers get the full list once.
 */
export function RotatingWord({ words, interval = 2200, className }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
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
    <span className={`relative inline-grid overflow-hidden ${className ?? ""}`}>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => {
        const current = i === index;
        const previous = i === (index - 1 + words.length) % words.length;
        return (
          <span
            key={word}
            aria-hidden="true"
            className={`col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-500 ease-out ${
              current
                ? "translate-y-0 opacity-100"
                : previous
                  ? "-translate-y-full opacity-0"
                  : "translate-y-full opacity-0"
            }`}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
