import type { CSSProperties } from "react";
/** The rising bars from the Scaalus logo mark, used as the site's graphic motif. */

/** Small three-bar glyph for eyebrows. Inherits currentColor. */
export function BarsGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <rect x="0" y="6" width="3" height="6" rx="1.5" />
      <rect x="4.5" y="3" width="3" height="9" rx="1.5" />
      <rect x="9" y="0" width="3" height="12" rx="1.5" />
    </svg>
  );
}

const HEIGHTS = ["38%", "58%", "78%", "100%"];

type Props = {
  className?: string;
  /** Bar fill (CSS background-image). */
  fill?: string;
};

/** Large growth bars. Grow on load, or on reveal inside [data-reveal]. */
export function GrowthBars({
  className,
  fill = "linear-gradient(180deg, rgb(110 147 240 / 0.22), rgb(110 147 240 / 0))",
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex items-end gap-[6%] ${className ?? ""}`}
    >
      {HEIGHTS.map((height, i) => (
        <span
          key={height}
          className="bar block flex-1 rounded-t-full"
          style={
            {
              blockSize: height,
              backgroundImage: fill,
              "--i": i,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
