import type { CSSProperties } from "react";

/** Stagger index consumed by `.animate-rise` and `[data-reveal]` (see globals.css). */
export function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}
