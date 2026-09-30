import type { ReactNode } from "react";
import { BarsGlyph } from "./bars";

type TitleProps = {
  title: string;
  /** Part of `title` to emphasise (from lib/content.ts). */
  highlight?: string;
  dark?: boolean;
};

/** Two-tone headline: the key phrase in full ink, the rest muted. */
export function TwoTone({ title, highlight, dark }: TitleProps) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at < 0) return <>{title}</>;
  const muted = dark ? "text-white/60" : "text-ink-muted";
  const strong = dark ? "text-white" : "text-navy";
  const before = title.slice(0, at);
  const after = title.slice(at + highlight.length);
  return (
    <>
      {before ? <span className={muted}>{before}</span> : null}
      <span className={strong}>{highlight}</span>
      {after ? <span className={muted}>{after}</span> : null}
    </>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="label">
      <BarsGlyph />
      {children}
    </p>
  );
}

type HeaderProps = TitleProps & {
  id?: string;
  eyebrow?: string;
  body?: string;
  align?: "center" | "left";
  className?: string;
  as?: "h2" | "h3";
};

/** Section heading block: mono eyebrow, two-tone title, optional lead. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  highlight,
  body,
  dark,
  align = "center",
  className,
}: HeaderProps) {
  const centered = align === "center";
  return (
    <header
      data-reveal=""
      className={`max-w-[44rem] ${centered ? "mx-auto text-center" : ""} ${className ?? ""}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id ? `${id}-title` : undefined} className="mt-4 text-display-xl">
        <TwoTone title={title} highlight={highlight} dark={dark} />
      </h2>
      {body ? (
        <p
          className={`mt-5 max-w-prose text-lead ${dark ? "text-white/70" : "text-ink-muted"} ${centered ? "mx-auto" : ""}`}
        >
          {body}
        </p>
      ) : null}
    </header>
  );
}
