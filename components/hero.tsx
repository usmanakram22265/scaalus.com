import { hero } from "@/lib/content";
import { HeroDemo } from "./hero-demo";
import { GrowthBars } from "./ui/bars";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { RotatingWord } from "./ui/rotating-word";

/** Night: the missed call comes in after hours. Headline and CTAs are never hidden. */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-tone="dark"

      data-loop=""
      className="panel-navy rounded-b-[2rem] pb-space-xl pt-[calc(env(safe-area-inset-top)+var(--header-h)+var(--header-gap)+2.5rem)] lg:rounded-b-panel lg:pb-space-2xl lg:pt-[calc(var(--header-h)+var(--header-gap)+4.5rem)]"
    >
      {/* Growth chart rising from the panel floor: the logo's bars, huge and faint. */}
      <GrowthBars
        className="absolute bottom-0 right-[-2%] -z-[1] h-[34%] w-[92%] lg:right-[3%] lg:h-[70%] lg:w-[44%]"
        fill="linear-gradient(180deg, rgb(110 147 240 / 0.16), rgb(110 147 240 / 0.015) 85%)"
      />
      <div className="container-page grid items-center gap-x-space-xl gap-y-space-xl lg:grid-cols-[1.08fr_0.92fr]">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] py-1.5 pl-2 pr-3.5 font-mono text-label uppercase text-sky ring-1 ring-inset ring-white/10">
            <span className="relative grid h-5 w-5 place-items-center">
              <span className="ripple loop absolute h-2 w-2 rounded-full bg-sky/50" />
              <span className="h-2 w-2 rounded-full bg-sky" />
            </span>
            {hero.eyebrowLead}
            <RotatingWord words={hero.eyebrowWords} className="text-white" />
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-display-2xl text-white lg:mt-7"
          >
            <span className="block">
              {hero.titleStart}
              <span className="whitespace-nowrap text-sky">
                {hero.titleHighlight}
              </span>
            </span>
            <span className="mt-1 block text-white/55">
              {hero.titleEnd.trim()}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[34rem] text-lead text-white/70 lg:mx-0">
            {hero.body}
          </p>

          <div
            id="hero-cta"
            className="mx-auto mt-8 flex max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start"
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
              variant="ghost-dark"
              className="w-full sm:w-auto"
            >
              {hero.secondaryCta}
            </ButtonLink>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-small text-white/70 lg:justify-start">
            {hero.reassurance.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Icon
                  name="check"
                  size={15}
                  strokeWidth={2.5}
                  className="text-sky"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate lg:pl-space-sm">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(closest-side, rgb(43 89 216 / 0.45), transparent)",
            }}
          />
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
