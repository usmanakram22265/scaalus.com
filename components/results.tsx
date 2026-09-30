import { results } from "@/lib/content";
import { stagger } from "@/lib/style";
import { Icon } from "./ui/icons";
import { Section } from "./ui/section";

export function Results() {
  return (
    <Section id="results" eyebrow={results.eyebrow} title={results.title}>
      <ul className="grid gap-space-sm sm:grid-cols-2 lg:grid-cols-3 lg:gap-space-md">
        {results.items.map((item, i) => (
          <li
            key={item.title}
            data-reveal=""
            style={stagger(i % 3)}
            className="rounded-card bg-surface-elevated p-space-md shadow-elevated lg:p-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand/10 text-brand">
              <Icon name={item.icon} size={20} />
            </span>
            <h3 className="mt-space-md text-title">{item.title}</h3>
            <p className="mt-space-xs text-ink-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
