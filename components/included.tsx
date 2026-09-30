import { included } from "@/lib/content";
import { stagger } from "@/lib/style";
import { IconTile } from "./ui/icon-tile";
import { Icon } from "./ui/icons";
import { Section } from "./ui/section";

export function Included() {
  return (
    <Section
      id="included"
      eyebrow={included.eyebrow}
      title={included.title}
      highlight={included.highlight}
      body={included.body}
      tone="dark"
      className="bg-[linear-gradient(135deg,#0D2847,#123499,#0033FF)]"
    >
      <ul className="grid gap-space-sm md:grid-cols-2 lg:grid-cols-4 lg:gap-space-md">
        {included.groups.map((group, i) => (
          <li
            key={group.title}
            data-reveal=""
            style={stagger(i)}
            className="rounded-card bg-white/[0.06] p-space-md ring-1 ring-inset ring-white/[0.12] lg:p-7"
          >
            <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-space-sm">
              <IconTile name={group.icon} />
              <h3 className="text-title text-white">{group.title}</h3>
            </div>
            <ul className="mt-space-md space-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-white/75"
                >
                  <Icon
                    name="check"
                    size={18}
                    strokeWidth={2.25}
                    className="mt-[0.3rem] shrink-0 text-sky"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
