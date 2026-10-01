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
      className="py-section"
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
          <ol className="grid grid-cols-2 lg:grid-cols-4">
            {included.groups.map((group, i) => (
              <li
                key={group.title}
                className="relative border-navy/[0.07] p-3.5 sm:p-6 lg:border-r lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:border-r"
              >
                <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3 lg:flex-col lg:items-center lg:gap-0">
                  <span
                    className="pop icon-chip relative"
                    style={{ "--d": `${200 + i * 160}ms` } as CSSProperties}
                  >
                    <Icon name={group.icon} size={20} strokeWidth={2} />
                  </span>
                  <h3 className="text-title lg:mt-5 lg:text-center">
                    {group.title}
                  </h3>
                  <span className="font-mono text-label text-ink-muted max-sm:absolute max-sm:right-3.5 max-sm:top-3.5 sm:ml-auto lg:absolute lg:right-6 lg:top-6 lg:ml-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-2.5 grid gap-1.5 sm:mt-3.5 sm:gap-2.5 lg:mt-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-[0.8125rem] leading-snug text-navy sm:gap-2.5 sm:text-[0.9375rem]"
                    >
                      <span className="mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand/10 text-brand sm:mt-0.5 sm:h-5 sm:w-5">
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
