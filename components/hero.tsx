import { hero } from "@/lib/content";
import { stagger } from "@/lib/style";
import { HeroDemo } from "./hero-demo";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grain bg-atmosphere relative pt-[calc(var(--header-h)+env(safe-area-inset-top))]"
    >
      <div className="container-page pb-section pt-space-xl lg:pt-space-2xl">
        <div className="mx-auto max-w-[56rem] text-center">
          <p
            className="animate-rise mx-auto max-w-[22rem] text-small font-medium text-ink-muted sm:max-w-none"
            style={stagger(0)}
          >
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="animate-rise mt-space-sm text-display-xl"
            style={stagger(1)}
          >
            <span className="block">
              {hero.titleStart}
              <span className="text-gradient whitespace-nowrap">
                {hero.titleHighlight}
              </span>
            </span>
            <span className="block text-ink-muted">{hero.titleEnd.trim()}</span>
          </h1>
          <p
            className="animate-rise mx-auto mt-space-md max-w-[38rem] text-lead text-ink-muted"
            style={stagger(2)}
          >
            {hero.body}
          </p>

          <div
            id="hero-cta"
            className="animate-rise mx-auto mt-space-lg flex max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
            style={stagger(3)}
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

          <ul
            className="animate-rise mt-space-md flex flex-wrap items-center justify-center gap-x-space-md gap-y-space-xs text-small text-ink-muted"
            style={stagger(4)}
          >
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

        <div
          className="animate-rise mt-space-xl lg:mt-space-2xl"
          style={stagger(6)}
        >
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
