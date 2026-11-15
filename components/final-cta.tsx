import type { CSSProperties } from "react";
import { site, trial } from "@/lib/content";
import { BookingCalendar } from "./booking-calendar";
import { Icon } from "./ui/icons";
import { Eyebrow, TwoTone } from "./ui/section";

/**
 * Navy moment #3: the close, with the booking calendar right there.
 * From lg up the copy sits in one row above a full-width calendar, which is
 * fitted so the whole section fits in one screen. The phone number lives in
 * the header and footer there; phones keep it under the copy.
 */
export function FinalCta() {
  return (
    <div className="px-2 sm:px-3">
      <section
        id="trial"
        aria-labelledby="trial-title"
        data-tone="dark"
        data-header-dark=""
        className="panel-navy mx-auto max-w-[90rem] rounded-[2rem] py-section lg:rounded-panel lg:py-space-lg"
      >
        <div className="container-page">
          <div
            data-reveal=""
            className="relative text-center lg:grid lg:grid-cols-2 lg:items-end lg:gap-space-lg lg:text-left"
          >
            <div>
              <Eyebrow>{trial.eyebrow}</Eyebrow>
              <h2
                id="trial-title"
                className="mt-4 text-display-xl lg:text-display-lg"
              >
                <TwoTone title={trial.title} highlight={trial.highlight} dark />
              </h2>
            </div>
            <div>
              <p className="mx-auto mt-5 max-w-prose text-lead text-white/70 lg:mx-0 lg:mt-0">
                {trial.body}
              </p>
              <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:mt-4 lg:justify-start lg:gap-1.5 xl:flex-nowrap">
                {trial.points.map((point) => (
                  <li
                    key={point}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/[0.07] px-3.5 py-2 text-small font-medium text-white ring-1 ring-inset ring-white/10 lg:px-3"
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
                className="group mt-8 inline-flex min-h-[44px] items-center gap-3 text-white/80 transition-opacity duration-200 ease-out hover:text-white active:opacity-60 lg:hidden"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-sky ring-1 ring-inset ring-white/10">
                  <Icon name="phone" size={17} />
                </span>
                <span className="font-medium">{site.phone.display}</span>
              </a>
            </div>
          </div>

          <div
            data-reveal="scale"
            style={{ "--i": 1 } as CSSProperties}
            className="mt-space-xl lg:mt-space-md"
          >
            <div
              data-tone="light"
              className="overflow-hidden rounded-[1.75rem] bg-surface-elevated p-2 shadow-floating sm:p-3 lg:p-2"
            >
              <BookingCalendar
                id="booking-calendar"
                fitSection
                fallbackUntilLoaded
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
