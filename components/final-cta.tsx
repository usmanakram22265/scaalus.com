import type { CSSProperties } from "react";
import { site, trial } from "@/lib/content";
import { Icon } from "./ui/icons";
import { Eyebrow, TwoTone } from "./ui/section";
import { TrialForm } from "./trial-form";

/** Navy moment #3: the close, with the form right there. */
export function FinalCta() {
  return (
    <div className="px-2 sm:px-3">
      <section
        id="trial"
        aria-labelledby="trial-title"
        data-tone="dark"
        data-header-dark=""
        className="panel-navy mx-auto max-w-[90rem] rounded-[2rem] py-section lg:rounded-panel"
      >
        <div className="container-page grid items-center gap-space-xl lg:grid-cols-[1fr_1.05fr] lg:gap-space-2xl">
          <div data-reveal="" className="relative text-center lg:text-left">
            <Eyebrow>{trial.eyebrow}</Eyebrow>
            <h2 id="trial-title" className="mt-4 text-display-xl">
              <TwoTone title={trial.title} highlight={trial.highlight} dark />
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-lead text-white/70 lg:mx-0">
              {trial.body}
            </p>
            <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
              {trial.points.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-2 text-small font-medium text-white ring-1 ring-inset ring-white/10"
                >
                  <Icon
                    name="check"
                    size={14}
                    strokeWidth={2.75}
                    className="text-sky"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <a
              href={site.phone.href}
              className="group mt-8 inline-flex min-h-[44px] items-center gap-3 text-white/80 transition-opacity duration-200 ease-out hover:text-white active:opacity-60"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-sky ring-1 ring-inset ring-white/10">
                <Icon name="phone" size={17} />
              </span>
              <span className="font-medium">{site.phone.display}</span>
            </a>
          </div>

          <div data-reveal="scale" style={{ "--i": 1 } as CSSProperties}>
            <TrialForm />
          </div>
        </div>
      </section>
    </div>
  );
}
