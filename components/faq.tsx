import { faq } from "@/lib/content";
import { Icon } from "./ui/icons";
import { Section } from "./ui/section";

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow={faq.eyebrow}
      title={faq.title}
      className="bg-surface-card"
    >
      <div
        data-reveal=""
        className="mx-auto max-w-[46rem] rounded-card bg-surface-elevated px-space-md shadow-elevated sm:px-8"
      >
        {faq.items.map((item) => (
          <details
            key={item.q}
            className="group border-b border-navy/[0.08] last:border-b-0"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-space-sm py-space-sm text-left font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-navy transition-opacity duration-200 ease-out hover:opacity-75 active:opacity-60">
              {item.q}
              <Icon
                name="chevronDown"
                size={20}
                strokeWidth={2}
                className="faq-chevron shrink-0 text-ink-muted transition-transform duration-200 ease-out"
              />
            </summary>
            <div className="faq-body pb-space-md pr-space-lg text-ink-muted">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
