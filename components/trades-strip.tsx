import { tradeIcons, trades, tradesStrip } from "@/lib/content";
import { Icon } from "./ui/icons";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden ? true : undefined}
      className="flex shrink-0 items-center gap-3 pr-3"
    >
      {trades.map((trade) => (
        <li
          key={trade}
          className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-surface-elevated py-2.5 pl-3 pr-5 font-display text-[1.0625rem] font-medium tracking-[-0.02em] text-navy shadow-elevated"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-card text-brand">
            <Icon name={tradeIcons[trade]} size={15} strokeWidth={2} />
          </span>
          {trade}
        </li>
      ))}
    </ul>
  );
}

/** Who it's for, as a slow marquee. Pauses on hover/focus and offscreen. */
export function TradesStrip() {
  return (
    <section
      aria-label={tradesStrip.label}
      data-loop=""
      className="pb-space-md pt-space-lg lg:pt-space-xl"
    >
      <p className="text-center font-mono text-label uppercase text-ink-muted">
        {tradesStrip.label}
      </p>
      <div className="marquee mt-space-md overflow-hidden py-3">
        <div className="marquee-track loop flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
