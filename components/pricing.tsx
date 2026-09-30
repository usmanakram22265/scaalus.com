import { pricing } from "@/lib/content";
import { stagger } from "@/lib/style";
import { ButtonLink } from "./ui/button";
import { Glow } from "./ui/glow";
import { Icon } from "./ui/icons";
import { Section } from "./ui/section";

export function Pricing() {
  const { plan, compare } = pricing;
  return (
    <Section
      id="pricing"
      eyebrow={pricing.eyebrow}
      title={pricing.title}
      highlight={pricing.highlight}
      body={pricing.body}
      className="overflow-hidden"
    >
      <div data-reveal="" className="relative isolate">
        <Glow size={520} color="rgb(43 89 216 / 0.25)" position="center" />
        <div
          data-tone="dark"
          className="relative mx-auto max-w-[28rem] overflow-hidden rounded-[2rem] bg-navy p-space-md shadow-card ring-1 ring-inset ring-sky/30 sm:p-space-lg"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky to-brand"
          />
          <p className="text-small font-semibold text-sky">{plan.name}</p>
          <p className="mt-space-sm flex items-baseline gap-1">
            <span className="font-display text-[3.5rem] font-bold leading-none tracking-tightest text-white">
              {plan.price}
            </span>
            <span className="text-lead text-white">{plan.period}</span>
          </p>
          <ul className="mt-space-md space-y-3 border-t border-white/[0.12] pt-space-md">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-white/80"
              >
                <Icon
                  name="check"
                  size={18}
                  strokeWidth={2.25}
                  className="mt-[0.3rem] shrink-0 text-sky"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <ButtonLink
            href="#trial"
            size="lg"
            arrow
            className="mt-space-lg w-full"
          >
            {plan.cta}
          </ButtonLink>
        </div>
      </div>

      <div className="mx-auto mt-space-2xl max-w-[48rem]">
        <h3 data-reveal="" className="text-center text-title">
          {compare.title}
        </h3>
        <div className="mt-space-md grid gap-space-sm md:grid-cols-2">
          <div
            data-reveal=""
            style={stagger(1)}
            className="rounded-card bg-surface-elevated p-space-md shadow-card ring-1 ring-inset ring-navy/[0.08] lg:p-7"
          >
            <p className="text-small font-semibold text-ink-muted">
              {compare.agency.label}
            </p>
            <ul className="mt-space-sm space-y-3">
              {compare.agency.rows.map((row) => (
                <li
                  key={row}
                  className="flex items-start gap-2.5 text-ink-muted"
                >
                  <Icon
                    name="close"
                    size={18}
                    strokeWidth={2}
                    className="mt-[0.3rem] shrink-0"
                  />
                  <span>{row}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            data-reveal=""
            style={stagger(2)}
            data-tone="dark"
            className="rounded-card bg-navy p-space-md shadow-elevated lg:p-7"
          >
            <p className="text-small font-semibold text-sky">
              {compare.scaalus.label}
            </p>
            <ul className="mt-space-sm space-y-3">
              {compare.scaalus.rows.map((row) => (
                <li
                  key={row}
                  className="flex items-start gap-2.5 font-medium text-white/75"
                >
                  <Icon
                    name="check"
                    size={18}
                    strokeWidth={2.25}
                    className="mt-[0.3rem] shrink-0 text-sky"
                  />
                  <span>{row}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
