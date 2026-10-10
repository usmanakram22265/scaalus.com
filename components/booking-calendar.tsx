"use client";

import { useEffect, useRef, useState } from "react";
import { booking } from "@/lib/content";

type ResizedFrame = HTMLIFrameElement & {
  iFrameResizer?: { removeListeners?: () => void };
};

declare global {
  interface Window {
    /** Exposed by GHL's form_embed.js (iframe-resizer). */
    iFrameResize?: (
      options: Record<string, unknown>,
      target: HTMLIFrameElement,
    ) => unknown;
  }
}

/**
 * GHL shows the calendar in one compact row from 1000px wide; the extra
 * leaves room for the iframe's own scrollbar while it loads.
 */
const COMPACT_WIDTH = 1040;
/** Never shrink the calendar further than this to make it fit. */
const MIN_SCALE = 0.8;

let embedScript: Promise<void> | null = null;

/**
 * GHL's form_embed.js sizes the iframe to whichever step is showing (calendar,
 * time slots, details form). It only scans the page once, when it runs, so it
 * loads before any iframe has a src and each iframe is registered by hand.
 * If it's blocked, the calendar still works at its reserved height.
 */
function loadEmbedScript() {
  embedScript ??= new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = booking.embedScript;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
  return embedScript;
}

type Props = {
  /** Unique on the page: the resizer keys iframes by id. */
  id: string;
  /** Load straight away (the dialog) instead of when scrolled near. */
  eager?: boolean;
  /**
   * Fit the calendar into this many pixels of height without scrolling:
   * it uses GHL's compact layout and scales down a little if needed.
   */
  fitHeight?: number;
  /** Show the "open in a new tab" link only until the calendar loads. */
  fallbackUntilLoaded?: boolean;
  className?: string;
};

/** The GHL booking calendar: pick a date and time, then the details form. */
export function BookingCalendar({
  id,
  eager = false,
  fitHeight,
  fallbackUntilLoaded = false,
  className,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<ResizedFrame>(null);
  const [src, setSrc] = useState<string>();
  const [loaded, setLoaded] = useState(false);
  const [size, setSize] = useState({ width: 0, frameHeight: 0 });
  const frameSrc = fitHeight && !size.width ? undefined : src;

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    let cancelled = false;
    const start = () =>
      loadEmbedScript().then(() => {
        if (!cancelled) setSrc(booking.url);
      });

    if (eager) {
      start();
      return () => {
        cancelled = true;
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        start();
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [eager]);

  useEffect(() => {
    const el = frame.current;
    if (!frameSrc || !el) return;
    window.iFrameResize?.(
      {
        log: false,
        checkOrigin: false,
        heightCalculationMethod: "offset",
        autoResize: true,
        sizeWidth: false,
        sizeHeight: true,
        scrolling: true,
      },
      el,
    );
    return () => el.iFrameResizer?.removeListeners?.();
  }, [frameSrc]);

  // Only needed when fitting: track the space we have and the calendar's height.
  useEffect(() => {
    const outer = box.current;
    const el = frame.current;
    if (!fitHeight || !outer || !el) return;
    const observer = new ResizeObserver(() =>
      setSize({ width: outer.clientWidth, frameHeight: el.offsetHeight }),
    );
    observer.observe(outer);
    observer.observe(el);
    return () => observer.disconnect();
  }, [fitHeight]);

  // Width first: GHL picks its layout once, on load, so the iframe gets its
  // final width before it gets a src. Then shrink a little more if too tall.
  const scale =
    fitHeight && size.width
      ? Math.max(
          MIN_SCALE,
          Math.min(
            1,
            size.width / COMPACT_WIDTH,
            size.frameHeight ? fitHeight / size.frameHeight : 1,
          ),
        )
      : 1;
  const scaled = scale < 1;

  return (
    <div className={className}>
      <div
        ref={box}
        className="relative overflow-hidden"
        style={scaled ? { height: size.frameHeight * scale } : undefined}
      >
        <iframe
          ref={frame}
          id={id}
          src={frameSrc}
          title={booking.frameTitle}
          allow="payment"
          onLoad={() => {
            if (frameSrc) setLoaded(true);
          }}
          style={
            scaled
              ? {
                  width: `${100 / scale}%`,
                  transform: `scale(${scale})`,
                  transformOrigin: "0 0",
                }
              : undefined
          }
          className={`block h-[54rem] w-full border-0 transition-opacity duration-300 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Reserved space shows a loader until the calendar has arrived. */}
        <div
          aria-hidden={loaded}
          className={`pointer-events-none absolute inset-x-0 top-0 grid h-[22rem] place-items-center transition-opacity duration-300 ease-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <p
            role="status"
            className="flex items-center gap-3 text-small font-medium text-ink-muted"
          >
            <span className="spin-fast h-5 w-5 rounded-full border-2 border-brand/20 border-t-brand" />
            {booking.loading}
          </p>
        </div>
      </div>
      {fallbackUntilLoaded && loaded ? null : (
        <p className="mt-1 flex flex-wrap items-center justify-center gap-x-1.5 text-[0.8125rem] text-ink-muted">
          {booking.fallback}
          <a
            href={booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-semibold text-brand underline underline-offset-2 transition-opacity duration-200 ease-out hover:opacity-80 active:opacity-60"
          >
            {booking.fallbackLink}
          </a>
        </p>
      )}
    </div>
  );
}
