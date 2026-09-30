import { steps } from "@/lib/content";
import { SectionHeader } from "./ui/section";
import { StepsScroller } from "./steps-scroller";

export function HowItWorks() {
  return (
    <div className="mt-section px-2 sm:px-3">
      <section
        id="how"
        aria-labelledby="how-title"
        data-tone="dark"
        data-header-dark=""
        data-loop=""
        className="panel-navy mx-auto max-w-[90rem] rounded-[2rem] py-section lg:rounded-panel"
      >
        <div className="container-page">
          <SectionHeader
            id="how"
            eyebrow={steps.eyebrow}
            title={steps.title}
            highlight={steps.highlight}
            dark
          />
          <div className="mt-space-xl">
            <StepsScroller />
          </div>
        </div>
      </section>
    </div>
  );
}
