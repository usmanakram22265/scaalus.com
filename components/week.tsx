import { week } from "@/lib/content";
import { SectionHeader } from "./ui/section";
import { WeekCompare } from "./week-compare";

/** Results-first story: the same five leads, without and with Scaalus. */
export function Week() {
  return (
    <section id="week" aria-labelledby="week-title" className="px-2 sm:px-3">
      <div className="panel-stone mx-auto max-w-[90rem] rounded-[2rem] py-section lg:rounded-panel">
        <div className="container-page">
          <SectionHeader
            id="week"
            eyebrow={week.eyebrow}
            title={week.title}
            highlight={week.highlight}
            body={week.body}
          />
          <div data-reveal="" className="mt-space-lg">
            <WeekCompare />
          </div>
        </div>
      </div>
    </section>
  );
}
