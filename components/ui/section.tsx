import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  /** Part of `title` to colour (from lib/content.ts). */
  highlight?: string;
  body?: string;
  align?: "center" | "left";
  /** Dark sections: white headings, 75% white body, Light Blue eyebrow. */
  tone?: "light" | "dark";
  /** Decorative background (glows), clipped to the section. */
  decor?: ReactNode;
  className?: string;
  children?: ReactNode;
};

function Title({
  title,
  highlight,
  dark,
}: {
  title: string;
  highlight?: string;
  dark: boolean;
}) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className={dark ? "text-sky" : "text-brand"}>{highlight}</span>
      {title.slice(at + highlight.length)}
    </>
  );
}

/** Shared section rhythm: container, eyebrow, heading and spacing tokens. */
export function Section({
  id,
  eyebrow,
  title,
  highlight,
  body,
  align = "center",
  tone = "light",
  decor,
  className,
  children,
}: Props) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      data-tone={tone}
      className={`py-section ${decor ? "relative isolate" : ""} ${className ?? ""}`}
    >
      {decor ? (
        <div aria-hidden="true" className="decor-layer">
          {decor}
        </div>
      ) : null}
      <div className="container-page">
        <header
          className={`max-w-[40rem] ${centered ? "mx-auto text-center" : ""}`}
          data-reveal=""
        >
          {eyebrow ? (
            <p
              className={`eyebrow eyebrow-pill ${dark ? "text-sky" : ""}`}
              style={centered ? undefined : { marginInline: 0 }}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={id ? `${id}-title` : undefined}
            className={`mt-3 text-display-lg ${dark ? "text-white" : ""}`}
          >
            <Title title={title} highlight={highlight} dark={dark} />
          </h2>
          {body ? (
            <p
              className={`mt-4 text-lead ${dark ? "text-white/75" : "text-ink-muted"} ${centered ? "mx-auto" : ""} max-w-prose`}
            >
              {body}
            </p>
          ) : null}
        </header>
        {children ? <div className="mt-space-xl">{children}</div> : null}
      </div>
    </section>
  );
}
