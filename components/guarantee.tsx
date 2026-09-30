import type { CSSProperties } from "react";
import { guarantee } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { Eyebrow } from "./ui/section";

/** Risk reversal, right after the price. */
export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-title" className="cv-auto py-section">
      <div className="container-page">
        <div
          data-reveal=""
          className="panel-stone overflow-hidden rounded-[2rem] px-5 py-space-lg sm:px-space-lg lg:rounded-panel lg:py-space-xl"
        >
          <div className="grid items-center gap-space-lg lg:grid-cols-[1.1fr_0.9fr]">
            <div className="text-center lg:text-left">
              <Eyebrow>{guarantee.eyebrow}</Eyebrow>
              <h2
                id="guarantee-title"
                className="mt-4 text-display-lg text-navy"
              >
                {guarantee.title}
              </h2>
              <p className="mx-auto mt-4 max-w-prose text-lead text-ink-muted lg:mx-0">
                {guarantee.body}
              </p>
              <ButtonLink
                href="#trial"
                size="lg"
                arrow
                className="mt-7 w-full sm:w-auto"
              >
                {guarantee.cta}
              </ButtonLink>
            </div>
            <ul className="grid gap-3">
              {guarantee.points.map((point, i) => (
                <li
                  key={point.title}
                  data-reveal=""
                  style={{ "--i": i + 1 } as CSSProperties}
                  className="card flex items-center gap-4 p-4"
                >
                  <span className="icon-chip">
                    <Icon name={point.icon} size={20} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block font-semibold tracking-[-0.01em] text-navy">
                      {point.title}
                    </span>
                    <span className="block text-small text-ink-muted">
                      {point.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
