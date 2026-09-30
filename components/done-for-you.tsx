import type { CSSProperties } from "react";
import { included } from "@/lib/content";
import { Icon } from "./ui/icons";
import { SectionHeader } from "./ui/section";

/** What's included, kept compact: proof that it's effortless, not a feature list. */
export function DoneForYou() {
  return (
    <section
      id="included"
      aria-labelledby="included-title"
      className="cv-auto pb-section"
    >
      <div className="container-page">
        <SectionHeader
          id="included"
          eyebrow={included.eyebrow}
          title={included.title}
          highlight={included.highlight}
          body={included.body}
        />
        <ul className="mt-space-xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {included.groups.map((group, i) => (
            <li
              key={group.title}
              data-reveal=""
              style={{ "--i": i } as CSSProperties}
              className="card lift p-5"
            >
              <span className="icon-chip">
                <Icon name={group.icon} size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-title">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-surface-card px-3 py-1.5 text-[0.8125rem] font-medium text-navy"
                  >
                    <Icon
                      name="check"
                      size={12}
                      strokeWidth={2.75}
                      className="text-royal"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
