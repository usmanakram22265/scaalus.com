import type { CSSProperties } from "react";
import { included } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { SectionHeader } from "./ui/section";

/**
 * What's included, as one connected system rather than four loose cards:
 * numbered columns joined by a line that draws in, and a price strip.
 */
export function DoneForYou() {
  return (
    <section
      id="included"
      aria-labelledby="included-title"
      className="pb-section"
    >
      <div className="container-page">
        <SectionHeader
          id="included"
          eyebrow={included.eyebrow}
          title={included.title}
          highlight={included.highlight}
          body={included.body}
        />

        <div
          data-reveal=""
          className="card relative mt-space-xl overflow-hidden"
        >
          {/* Connector through the icons (desktop). */}
          <span
            aria-hidden="true"
            className="draw-x pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.875rem] hidden h-px bg-gradient-to-r from-brand/40 via-brand to-brand/40 lg:block"
          />
          <ol className="grid divide-y divide-navy/[0.07] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {included.groups.map((group, i) => (
              <li
                key={group.title}
                className="relative p-6 sm:border-navy/[0.07] lg:border-r lg:last:border-r-0 sm:[&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-r"
              >
                <div className="flex items-center justify-between lg:justify-center">
                  <span
                    className="pop icon-chip relative"
                    style={{ "--d": `${200 + i * 160}ms` } as CSSProperties}
                  >
                    <Icon name={group.icon} size={20} strokeWidth={2} />
                  </span>
                  <span className="font-mono text-label text-ink-muted lg:absolute lg:right-6 lg:top-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-title lg:text-center">
                  {group.title}
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-navy"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                        <Icon name="check" size={11} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {/* Price strip. */}
          <div
            data-tone="dark"
            className="panel-navy flex flex-col items-center gap-4 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
          >
            <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 sm:justify-start">
              <span className="font-medium text-white">{included.strip}</span>
              <span className="font-mono text-small uppercase text-sky">
                {included.stripPrice}
              </span>
            </p>
            <ButtonLink
              href="#trial"
              size="md"
              arrow
              className="w-full sm:w-auto"
            >
              {included.stripCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
