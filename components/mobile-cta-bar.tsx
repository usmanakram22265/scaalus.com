"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { ButtonLink } from "./ui/button";

/**
 * Phones only: a floating trial button once the hero CTAs scroll away,
 * hidden again while (or after) the trial form is on screen.
 */
export function MobileCtaBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atTrial, setAtTrial] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    const trial = document.getElementById("trial");
    if (!heroCta || !trial) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const above = entry.boundingClientRect.top < 0;
        if (entry.target === heroCta)
          setPastHero(!entry.isIntersecting && above);
        if (entry.target === trial) setAtTrial(entry.isIntersecting || above);
      }
    });
    observer.observe(heroCta);
    observer.observe(trial);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !atTrial;

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-floating px-3 pb-[calc(0.75rem+var(--safe-bottom))] transition-[opacity,transform] ease-out motion-reduce:translate-y-0 md:hidden ${
        visible
          ? "translate-y-0 opacity-100 duration-[260ms]"
          : "pointer-events-none translate-y-[110%] opacity-0 duration-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3 rounded-full bg-surface-elevated/85 p-1.5 pl-5 shadow-floating backdrop-blur-xl backdrop-saturate-150">
        <p className="text-[0.8125rem] leading-tight text-ink-muted">
          <span className="block font-semibold text-navy">
            {site.price}/month
          </span>
          7-day free trial
        </p>
        <ButtonLink href="#trial" arrow className="!h-12">
          Start free trial
        </ButtonLink>
      </div>
    </div>
  );
}
