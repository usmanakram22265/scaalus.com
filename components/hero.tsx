import { hero } from "@/lib/content";
import { HeroDemo } from "./hero-demo";
import { ButtonLink } from "./ui/button";
import { Glow } from "./ui/glow";
import { Icon } from "./ui/icons";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-surface-base pt-[calc(var(--header-h)+env(safe-area-inset-top))]"
    >
      <div aria-hidden="true" className="decor-layer">
        <div className="dot-grid" />
        <Glow size={640} color="rgb(110 147 240 / 0.35)" position="top-end" />
      </div>
      <div className="container-page pb-section pt-space-xl lg:pt-space-2xl">
        <div className="mx-auto max-w-[56rem] text-center">
          <p className="mx-auto max-w-[22rem] text-small font-medium text-ink-muted sm:max-w-none">
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-space-sm text-display-xl">
            <span className="block">
              {hero.titleStart}
              <span className="text-gradient whitespace-nowrap">
                {hero.titleHighlight}
              </span>
            </span>
            <span className="block text-ink-muted">{hero.titleEnd.trim()}</span>
          </h1>
          <p className="mx-auto mt-space-md max-w-[38rem] text-lead text-ink-muted">
            {hero.body}
          </p>

          <div
            id="hero-cta"
            className="mx-auto mt-space-lg flex max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <ButtonLink
              href="#trial"
              size="lg"
              arrow
              className="w-full sm:w-auto"
            >
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink
              href="#how"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {hero.secondaryCta}
            </ButtonLink>
          </div>

          <ul className="mt-space-md flex flex-wrap items-center justify-center gap-x-space-md gap-y-space-xs text-small text-ink-muted">
            {hero.reassurance.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Icon
                  name="check"
                  size={16}
                  strokeWidth={2.25}
                  className="text-brand"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate mt-space-xl lg:mt-space-2xl">
          <Glow size={480} color="rgb(43 89 216 / 0.18)" position="center" />
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
