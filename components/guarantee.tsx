import type { CSSProperties } from "react";
import { guarantee } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { Eyebrow } from "./ui/section";

/** A slowly turning seal: the three promises on a ring around a shield. */
function RotatingBadge() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mb-4 h-20 w-20 lg:mx-0 lg:mb-6 lg:h-28 lg:w-28"
    >
      <svg viewBox="0 0 200 200" className="spin-badge loop h-full w-full">
        <defs>
          <path
            id="badge-ring"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <circle cx="100" cy="100" r="98" fill="#0D2847" />
        <text
          fill="#FFFFFF"
          fontSize="13.5"
          letterSpacing="2.4"
          className="font-mono uppercase"
        >
          <textPath href="#badge-ring">{guarantee.badge}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="icon-chip h-9 w-9 rounded-full lg:h-12 lg:w-12">
          <Icon name="shield" size={24} strokeWidth={2} />
        </span>
      </span>
    </div>
  );
}

/** Risk reversal, right after the price. */
export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-title" className="py-section">
      <div className="container-page">
        <div
          data-reveal=""
          data-loop=""
          className="panel-stone relative overflow-hidden rounded-[2rem] px-5 py-space-lg sm:px-space-lg lg:rounded-panel lg:py-space-xl"
        >
          <div className="grid items-center gap-space-lg lg:grid-cols-[1.1fr_0.9fr]">
            <div className="text-center lg:text-left">
              <RotatingBadge />
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
                  className="card flex items-center gap-3 p-3 sm:gap-4 sm:p-4"
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
