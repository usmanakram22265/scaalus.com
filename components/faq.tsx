import type { CSSProperties } from "react";
import { faq, site } from "@/lib/content";
import { Icon } from "./ui/icons";
import { SectionHeader } from "./ui/section";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="cv-auto pb-section"
    >
      <div className="container-page grid gap-space-xl lg:grid-cols-[0.8fr_1.2fr] lg:gap-space-2xl">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+var(--header-gap)+3rem)] lg:self-start">
          <SectionHeader
            id="faq"
            eyebrow={faq.eyebrow}
            title={faq.title}
            highlight={faq.highlight}
            align="left"
          />
          <div
            data-reveal=""
            style={{ "--i": 1 } as CSSProperties}
            className="card mt-space-lg p-5"
          >
            <p className="font-semibold tracking-[-0.01em] text-navy">
              {faq.contactTitle}
            </p>
            <p className="mt-1 text-small text-ink-muted">{faq.contactBody}</p>
            <div className="mt-4 grid gap-2">
              <a
                href={site.phone.href}
                className="group flex min-h-12 items-center gap-3 rounded-xl bg-surface-card px-3 font-medium text-navy transition-transform duration-150 ease-out hover:bg-surface-base active:scale-[0.98]"
              >
                <Icon name="phone" size={17} className="text-royal" />
                {site.phone.display}
                <Icon
                  name="arrowRight"
                  size={16}
                  className="ml-auto text-ink-muted transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="group flex min-h-12 items-center gap-3 rounded-xl bg-surface-card px-3 font-medium text-navy transition-transform duration-150 ease-out hover:bg-surface-base active:scale-[0.98]"
              >
                <Icon name="mail" size={17} className="text-royal" />
                {site.email}
                <Icon
                  name="arrowRight"
                  size={16}
                  className="ml-auto text-ink-muted transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        <div data-reveal="" className="card px-5 sm:px-7">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group border-b border-navy/[0.08] last:border-b-0"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-space-sm py-space-sm text-left font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-navy transition-opacity duration-200 ease-out hover:opacity-75 active:opacity-60">
                {item.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-card text-navy">
                  <Icon
                    name="plus"
                    size={16}
                    strokeWidth={2.25}
                    className="faq-chevron transition-transform duration-200 ease-out"
                  />
                </span>
              </summary>
              <div className="faq-body pb-space-md pr-space-lg text-ink-muted">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
