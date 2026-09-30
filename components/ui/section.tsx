import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  /** Dark sections: white headings, 75% white body, Light Blue eyebrow. */
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

/** Shared section rhythm: container, eyebrow, heading and spacing tokens. */
export function Section({
  id,
  eyebrow,
  title,
  body,
  align = "center",
  tone = "light",
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
      className={`py-section ${className ?? ""}`}
    >
      <div className="container-page">
        <header
          className={`max-w-[40rem] ${centered ? "mx-auto text-center" : ""}`}
          data-reveal=""
        >
          {eyebrow ? (
            <p className={`eyebrow ${dark ? "text-sky" : ""}`}>{eyebrow}</p>
          ) : null}
          <h2
            id={id ? `${id}-title` : undefined}
            className={`mt-3 text-display-lg ${dark ? "text-white" : ""}`}
          >
            {title}
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
