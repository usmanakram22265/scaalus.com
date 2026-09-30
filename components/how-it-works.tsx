import { steps } from "@/lib/content";
import { SectionHeader } from "./ui/section";
import { StepsScroller } from "./steps-scroller";

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      data-loop=""
      className="py-section"
    >
      <div className="container-page">
        <SectionHeader
          id="how"
          eyebrow={steps.eyebrow}
          title={steps.title}
          highlight={steps.highlight}
        />
        <div className="mt-space-xl">
          <StepsScroller />
        </div>
      </div>
    </section>
  );
}
