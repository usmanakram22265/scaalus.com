import type { CSSProperties } from "react";

type Props = {
  /** Diameter in px. */
  size: number;
  /** Any brand colour with alpha, e.g. "rgb(110 147 240 / 0.35)". */
  color: string;
  position: keyof typeof positions;
};

// Full class names so Tailwind keeps them in the build.
const positions = {
  center: "glow-center",
  "top-start": "glow-top-start",
  "top-end": "glow-top-end",
} as const;

/** Decorative radial glow (no filter: cheap to paint on phones). */
export function Glow({ size, color, position }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`glow ${positions[position]}`}
      style={
        { "--glow-size": `${size}px`, "--glow-color": color } as CSSProperties
      }
    />
  );
}
