import type { CSSProperties, ReactNode } from "react";
import { results } from "@/lib/content";
import { Icon } from "./ui/icons";
import { SectionHeader } from "./ui/section";

const v = results.visual;

/** A piece that pops in once its tile is revealed (delay via --d). */
function Pop({
  d = 0,
  className,
  children,
}: {
  d?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={`pop ${className ?? ""}`}
      style={{ "--d": `${d}ms` } as CSSProperties}
    >
      {children}
    </span>
  );
}

function CalendarVisual() {
  // A week filling up: day headers, morning/midday/afternoon rows.
  const filled = [1, 3, 5, 6, 8, 10, 11, 13];
  return (
    <div className="w-full max-w-[20rem]">
      <div className="grid grid-cols-5 gap-1.5 pb-2">
        {v.days.map((d) => (
          <span
            key={d}
            className="text-center font-mono text-[0.625rem] uppercase tracking-[0.08em] text-white/55"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 15 }, (_, i) => (
          <span key={i} className="relative h-8 rounded-lg bg-white/[0.06]">
            {filled.includes(i) ? (
              <Pop
                d={250 + filled.indexOf(i) * 90}
                className="absolute inset-0 grid place-items-center rounded-lg bg-sky text-navy shadow-[0_6px_16px_-6px_rgb(110_147_240/0.7)]"
              >
                <Icon name="check" size={12} strokeWidth={3} />
              </Pop>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function PhoneVisual() {
  return (
    <span className="relative grid place-items-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy text-white shadow-floating">
        <Icon name="phone" size={26} strokeWidth={1.75} />
      </span>
      <Pop
        d={400}
        className="absolute -right-3 -top-3 grid h-8 w-8 place-items-center rounded-full bg-brand text-white shadow-cta ring-4 ring-surface-card"
      >
        <Icon name="check" size={15} strokeWidth={2.75} />
      </Pop>
      <Pop
        d={600}
        className="absolute -bottom-10 whitespace-nowrap rounded-full bg-surface-elevated px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-navy shadow-elevated"
      >
        {v.answered}
      </Pop>
    </span>
  );
}

function ReplyVisual() {
  return (
    <div className="flex w-full max-w-[15rem] flex-col gap-2">
      <Pop
        d={200}
        className="flex w-fit gap-1 rounded-[1rem] rounded-bl-md bg-surface-elevated px-3 py-2.5 shadow-elevated"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-ink-muted/60"
          />
        ))}
      </Pop>
      <Pop
        d={550}
        className="ml-auto flex items-center gap-1.5 rounded-[1rem] rounded-br-md bg-brand px-3 py-2 text-[0.8125rem] font-medium text-white shadow-cta"
      >
        <Icon name="zap" size={12} strokeWidth={2.5} />
        {v.reply}
      </Pop>
    </div>
  );
}

function ReturnVisual() {
  // Last season's customer → a check-in → booked again.
  const steps = [
    { icon: "home" as const, text: v.lastJob },
    { icon: "message" as const, text: v.checkIn },
    { icon: "calendarCheck" as const, text: v.bookedAgain },
  ];
  return (
    <div className="relative flex w-full max-w-[26rem] items-center justify-between gap-2">
      <span className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-white/10 via-sky/50 to-sky" />
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <Pop
            key={step.text}
            d={200 + i * 220}
            className={`relative flex flex-col items-center gap-1.5 rounded-2xl px-2.5 py-2.5 text-center sm:gap-2 sm:px-3 ${
              last
                ? "bg-sky text-navy shadow-[0_10px_24px_-10px_rgb(110_147_240/0.8)]"
                : "bg-white/[0.07] text-white ring-1 ring-inset ring-white/10"
            }`}
          >
            <Icon name={step.icon} size={16} strokeWidth={2} />
            <span className="whitespace-nowrap text-[0.6875rem] font-semibold sm:text-[0.75rem]">
              {step.text}
            </span>
          </Pop>
        );
      })}
    </div>
  );
}

function StarsVisual() {
  return (
    <span className="flex gap-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="relative grid h-9 w-9 place-items-center">
          <Icon
            name="star"
            size={30}
            strokeWidth={1.5}
            className="text-navy/15"
          />
          <Pop
            d={250 + i * 110}
            className="absolute inset-0 grid place-items-center text-brand"
          >
            <Icon name="star" size={30} strokeWidth={1.5} fill="currentColor" />
          </Pop>
        </span>
      ))}
    </span>
  );
}

function MapVisual() {
  return (
    <div className="relative h-full w-full max-w-[20rem] overflow-hidden rounded-2xl bg-surface-elevated shadow-elevated">
      {/* Streets */}
      <span className="absolute inset-x-0 top-[38%] h-3 bg-surface-card" />
      <span className="absolute inset-y-0 left-[30%] w-3 bg-surface-card" />
      <span className="absolute inset-y-0 left-[70%] w-2 bg-surface-card" />
      <span className="absolute inset-x-0 top-[72%] h-2 bg-surface-card" />
      <Pop
        d={150}
        className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-surface-base px-3 py-1.5 text-[0.75rem] font-medium text-navy shadow-elevated"
      >
        <Icon name="search" size={12} strokeWidth={2.25} />
        {v.rank}
      </Pop>
      <span className="absolute left-[18%] top-[58%] h-2.5 w-2.5 rounded-full bg-navy/20" />
      <span className="absolute left-[82%] top-[24%] h-2.5 w-2.5 rounded-full bg-navy/20" />
      <Pop
        d={450}
        className="pin absolute left-[calc(52%-17px)] top-[22%] text-brand"
      >
        <Icon
          name="mapPin"
          size={34}
          strokeWidth={1.75}
          fill="rgb(43 89 216 / 0.15)"
        />
      </Pop>
    </div>
  );
}

const visuals = [
  CalendarVisual,
  PhoneVisual,
  ReplyVisual,
  ReturnVisual,
  StarsVisual,
  MapVisual,
];

// Zig-zag bento: wide, narrow / narrow, wide / narrow, wide.
const spans = ["lg:col-span-2", "", "", "lg:col-span-2", "", "lg:col-span-2"];
// Two navy tiles break up the light grid.
const darkTiles = new Set([0, 3]);

export function Outcomes() {
  return (
    <section
      id="results"
      aria-labelledby="results-title"
      className="px-2 pt-section sm:px-3"
    >
      <div className="panel-mist mx-auto max-w-[90rem] rounded-[2rem] py-section lg:rounded-panel">
        <div className="container-page">
          <SectionHeader
            id="results"
            eyebrow={results.eyebrow}
            title={results.title}
            highlight={results.highlight}
          />
          <ul className="mt-space-xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.items.map((item, i) => {
              const Visual = visuals[i] ?? PhoneVisual;
              return (
                <li
                  key={item.title}
                  data-reveal=""
                  data-spotlight=""
                  style={{ "--i": i % 3 } as CSSProperties}
                  className={`card lift overflow-hidden p-2 ${spans[i]}`}
                >
                  <span aria-hidden="true" className="spotlight" />
                  <div
                    aria-hidden="true"
                    className={`relative grid h-44 place-items-center overflow-hidden rounded-[1.1rem] p-5 ${
                      darkTiles.has(i) ? "panel-navy" : "panel-stone"
                    }`}
                  >
                    <Visual />
                  </div>
                  <div className="relative px-4 pb-4 pt-5">
                    <h3 className="text-title">{item.title}</h3>
                    <p className="mt-1.5 text-ink-muted">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
