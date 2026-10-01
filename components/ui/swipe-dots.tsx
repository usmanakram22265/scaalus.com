"use client";

import { useEffect, useState } from "react";

type Props = {
  /** id of the horizontally scrolling row. */
  targetId: string;
  count: number;
  dark?: boolean;
};

/**
 * Position dots for a phone swipe row. Decorative: the row itself is the
 * control (swipe or scroll), so the dots are hidden from assistive tech.
 */
export function SwipeDots({ targetId, count, dark }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = document.getElementById(targetId);
    if (!row) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = row.scrollWidth - row.clientWidth;
      const p = max > 0 ? row.scrollLeft / max : 0;
      setActive(Math.round(p * (count - 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      row.removeEventListener("scroll", onScroll);
    };
  }, [targetId, count]);

  return (
    <div
      aria-hidden="true"
      className="mt-3 flex justify-center gap-1.5 sm:hidden"
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-[opacity,transform] duration-300 ease-out ${
            dark ? "bg-white" : "bg-navy"
          } ${i === active ? "scale-125 opacity-90" : "opacity-20"}`}
        />
      ))}
    </div>
  );
}
