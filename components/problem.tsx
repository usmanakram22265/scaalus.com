import { problem } from "@/lib/content";
import { stagger } from "@/lib/style";
import { Glow } from "./ui/glow";
import { IconTile } from "./ui/icon-tile";
import { Section } from "./ui/section";

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow={problem.eyebrow}
      title={problem.title}
      highlight={problem.highlight}
      tone="dark"
      className="bg-navy"
      decor={
        <Glow size={720} color="rgb(43 89 216 / 0.35)" position="top-start" />
      }
    >
      <ul className="grid gap-space-sm lg:grid-cols-3 lg:gap-space-md">
        {problem.cards.map((card, i) => (
          <li
            key={card.title}
            data-reveal=""
            style={stagger(i)}
            className="rounded-card bg-white/[0.06] p-space-md ring-1 ring-inset ring-white/[0.12] lg:p-8"
          >
            <IconTile name={card.icon} />
            <h3 className="mt-space-md text-title text-white">{card.title}</h3>
            <p className="mt-space-xs text-white/75">{card.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
