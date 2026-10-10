import { booking } from "@/lib/content";

export type ResizedFrame = HTMLIFrameElement & {
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

let embedScript: Promise<void> | null = null;

/**
 * GHL's form_embed.js sizes an iframe to whatever the widget is showing. It
 * only scans the page once, when it runs, so it loads before any iframe has a
 * src and each iframe is registered with startAutoResize. If it's blocked,
 * the widget still works at its reserved height.
 */
export function loadGhlEmbedScript() {
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

/** Let GHL's resizer size this iframe; returns the cleanup. */
export function startAutoResize(frame: ResizedFrame) {
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
    frame,
  );
  return () => frame.iFrameResizer?.removeListeners?.();
}
