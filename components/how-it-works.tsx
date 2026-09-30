import { steps } from "@/lib/content";
import { stagger } from "@/lib/style";
import { Icon } from "./ui/icons";
import { Section } from "./ui/section";

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow={steps.eyebrow}
      title={steps.title}
      className="bg-surface-card"
    >
      <div className="mx-auto max-w-[34rem] lg:max-w-none">
        <ol className="grid gap-space-lg lg:grid-cols-4 lg:gap-space-md">
          {steps.items.map((step, i) => (
            <li
              key={step.title}
              data-reveal=""
              style={stagger(i)}
              className="relative flex gap-space-md lg:block"
            >
              {/* Connector to the next step: vertical on phones, horizontal on desktop. Draws once in view. */}
              {i < steps.items.length - 1 ? (
                <>
                  <span
                    aria-hidden="true"
                    data-draw=""
                    className="absolute -bottom-8 left-[1.375rem] top-[3.25rem] w-px bg-gradient-to-b from-sky to-brand lg:hidden"
                  />
                  <span
                    aria-hidden="true"
                    data-draw=""
                    className="absolute -right-3 left-[3.5rem] top-[1.375rem] hidden h-px bg-gradient-to-r from-sky to-brand lg:block"
                  />
                </>
              ) : null}
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-elevated text-brand shadow-elevated">
                <Icon name={step.icon} size={20} />
              </span>
              <div className="pt-1 lg:pt-space-md">
                <p className="text-eyebrow text-ink-muted">Step {i + 1}</p>
                <h3 className="mt-1 text-title">{step.title}</h3>
                <p className="mt-space-xs text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
