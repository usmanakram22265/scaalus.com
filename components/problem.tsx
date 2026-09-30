import { problem } from "@/lib/content";
import { stagger } from "@/lib/style";
import { Icon } from "./ui/icons";
import { Section } from "./ui/section";

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow={problem.eyebrow}
      title={problem.title}
      tone="dark"
      className="bg-navy"
    >
      <ul className="grid gap-space-sm lg:grid-cols-3 lg:gap-space-md">
        {problem.cards.map((card, i) => (
          <li
            key={card.title}
            data-reveal=""
            style={stagger(i)}
            className="rounded-card bg-white/[0.06] p-space-md ring-1 ring-inset ring-white/[0.12] lg:p-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.06] text-sky ring-1 ring-inset ring-white/[0.12]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-space-md text-title text-white">{card.title}</h3>
            <p className="mt-space-xs text-white/75">{card.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
