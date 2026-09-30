import type { CSSProperties } from "react";
import { pricing } from "@/lib/content";
import { GrowthBars } from "./ui/bars";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { SectionHeader } from "./ui/section";

const { plan, compare } = pricing;

/** Navy moment #2: the price, lit by a rotating border beam. */
export function Pricing() {
  return (
    <div className="px-2 sm:px-3">
      <section
        id="pricing"
        aria-labelledby="pricing-title"
        data-tone="dark"
        data-header-dark=""
        data-loop=""
        className="panel-navy mx-auto max-w-[90rem] rounded-[2rem] py-section lg:rounded-panel lg:py-[4.5rem]"
      >
        {/*
          Phones: heading, price card, comparison (stacked).
          Desktop: heading + comparison on the left, price card on the right,
          so the whole section fits in one screen.
        */}
        <div className="container-page grid gap-space-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-x-space-2xl lg:gap-y-space-lg">
          <SectionHeader
            id="pricing"
            eyebrow={pricing.eyebrow}
            title={pricing.title}
            highlight={pricing.highlight}
            body={pricing.body}
            dark
            align="left"
            className="max-lg:mx-auto max-lg:text-center lg:col-start-1 lg:row-start-1 lg:self-end"
          />

          {/* Plan */}
          <div
            data-reveal="scale"
            className="beam mx-auto w-full max-w-[28rem] self-center rounded-[1.75rem] shadow-on-navy lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0"
          >
            <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-navy p-6 sm:p-7">
              <GrowthBars
                className="absolute bottom-0 right-6 h-40 w-32 opacity-60"
                fill="linear-gradient(180deg, rgb(110 147 240 / 0.18), rgb(110 147 240 / 0))"
              />
              <p className="flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 font-mono text-label uppercase text-sky ring-1 ring-inset ring-white/10">
                {plan.badge}
              </p>
              <h3 className="mt-4 text-title text-white">{plan.name}</h3>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-[clamp(3.5rem,2.8rem+3vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                  {plan.price}
                </span>
                <span className="font-mono text-small uppercase text-white/60">
                  {plan.period}
                </span>
              </p>
              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feature, i) => (
                  <li
                    key={feature}
                    className="pop flex items-start gap-3 text-white/85"
                    style={{ "--d": `${250 + i * 90}ms` } as CSSProperties}
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky text-navy">
                      <Icon name="check" size={12} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink href="#trial" size="lg" arrow className="mt-7 w-full">
                {plan.cta}
              </ButtonLink>
            </div>
          </div>

          {/* Agency vs Scaalus */}
          <div
            data-reveal=""
            style={{ "--i": 1 } as CSSProperties}
            className="lg:col-start-1 lg:row-start-2 lg:self-start"
          >
            <h3 className="text-center text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em] text-white lg:text-left">
              {compare.title}
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-card p-4 ring-1 ring-inset ring-white/10 sm:p-5">
                <p className="font-mono text-label uppercase text-white/60">
                  {compare.agency.label}
                </p>
                <ul className="mt-4 space-y-3">
                  {compare.agency.rows.map((row) => (
                    <li
                      key={row}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-white/65"
                    >
                      <Icon
                        name="close"
                        size={16}
                        strokeWidth={2}
                        className="mt-0.5 shrink-0 text-white/40"
                      />
                      {row}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-on-navy relative p-4 sm:p-5">
                <p className="font-mono text-label uppercase text-sky">
                  {compare.scaalus.label}
                </p>
                <ul className="mt-4 space-y-3">
                  {compare.scaalus.rows.map((row) => (
                    <li
                      key={row}
                      className="flex items-start gap-2.5 text-[0.9375rem] font-medium leading-snug text-white"
                    >
                      <Icon
                        name="check"
                        size={16}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0 text-sky"
                      />
                      {row}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
