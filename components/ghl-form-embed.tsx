"use client";

import { useEffect, useRef, useState } from "react";
import {
  loadGhlEmbedScript,
  startAutoResize,
  type ResizedFrame,
} from "@/lib/ghl-embed";

type Props = {
  /** Unique on the page: the resizer keys iframes by id. */
  id: string;
  src: string;
  title: string;
  loading: string;
  fallback: string;
  fallbackLink: string;
  className?: string;
};

/** A GHL form in an iframe that grows to fit the form. */
export function GhlFormEmbed({
  id,
  src,
  title,
  loading,
  fallback,
  fallbackLink,
  className,
}: Props) {
  const frame = useRef<ResizedFrame>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // The src is set only after GHL's script has run (see loadGhlEmbedScript).
  useEffect(() => {
    let cancelled = false;
    loadGhlEmbedScript().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = frame.current;
    if (!ready || !el) return;
    return startAutoResize(el);
  }, [ready]);

  return (
    <div className={className}>
      <div className="relative">
        <iframe
          ref={frame}
          id={id}
          src={ready ? src : undefined}
          title={title}
          // Tells GHL's script it's handled, so it never hides the iframe while
          // waiting on its own tracking calls (which ad blockers can stop).
          data-initial-iframe-hidden="true"
          onLoad={() => {
            if (ready) setLoaded(true);
          }}
          className={`block h-[60rem] w-full border-0 transition-opacity duration-300 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
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
            {loading}
          </p>
        </div>
      </div>
      {loaded ? null : (
        <p className="mt-1 flex flex-wrap items-center justify-center gap-x-1.5 text-[0.8125rem] text-ink-muted">
          {fallback}
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-semibold text-brand underline underline-offset-2 transition-opacity duration-200 ease-out hover:opacity-80 active:opacity-60"
          >
            {fallbackLink}
          </a>
        </p>
      )}
    </div>
  );
}
