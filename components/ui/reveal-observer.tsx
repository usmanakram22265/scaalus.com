"use client";

import { useEffect } from "react";

/**
 * Shared IntersectionObservers:
 * - [data-reveal] gets data-shown once, the first time it scrolls into view.
 * - [data-loop] roots get data-inview while on screen, so looping decoration
 *   (marquee, rings, typing dots) only runs when someone can see it.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const loops = document.querySelectorAll<HTMLElement>("[data-loop]");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.setAttribute("data-shown", ""));
      loops.forEach((el) => el.setAttribute("data-inview", ""));
      return;
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.01 },
    );

    const loop = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-inview", entry.isIntersecting);
        }
      },
      { rootMargin: "80px 0px" },
    );

    reveals.forEach((el) => reveal.observe(el));
    loops.forEach((el) => loop.observe(el));
    return () => {
      reveal.disconnect();
      loop.disconnect();
    };
  }, []);

  return null;
}
