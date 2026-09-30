import { results } from "@/lib/content";
import { stagger } from "@/lib/style";
import { IconTile } from "./ui/icon-tile";
import { Section } from "./ui/section";

export function Results() {
  return (
    <Section
      id="results"
      eyebrow={results.eyebrow}
      title={results.title}
      highlight={results.highlight}
      className="bg-surface-base bg-[linear-gradient(180deg,rgb(110_147_240/0),rgb(110_147_240/0.08))]"
    >
      <ul className="grid gap-space-sm sm:grid-cols-2 lg:grid-cols-3 lg:gap-space-md">
        {results.items.map((item, i) => (
          <li
            key={item.title}
            data-reveal=""
            style={stagger(i % 3)}
            className="rounded-card bg-surface-elevated p-space-md shadow-card ring-1 ring-inset ring-navy/[0.08] lg:p-8"
          >
            <IconTile name={item.icon} />
            <h3 className="mt-space-md text-title">{item.title}</h3>
            <p className="mt-space-xs text-ink-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
