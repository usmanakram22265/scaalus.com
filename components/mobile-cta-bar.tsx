"use client";

import { useEffect, useState } from "react";
import { mobileBar } from "@/lib/content";
import { ButtonLink } from "./ui/button";

/**
 * Phones only: a floating trial bar once the hero CTAs scroll away,
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
      data-tone="dark"
      className={`fixed inset-x-0 bottom-0 z-floating px-3 pb-[calc(0.75rem+var(--safe-bottom))] transition-[opacity,transform] ease-out motion-reduce:translate-y-0 md:hidden ${
        visible
          ? "translate-y-0 opacity-100 duration-300 ease-drawer"
          : "pointer-events-none translate-y-[110%] opacity-0 duration-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3 rounded-full bg-navy p-1.5 pl-5 shadow-floating ring-1 ring-inset ring-white/10">
        <p className="text-[0.8125rem] leading-tight text-white/70">
          <span className="block font-semibold text-white">
            {mobileBar.price}
          </span>
          {mobileBar.note}
        </p>
        <ButtonLink href="#trial" arrow className="!h-12">
          {mobileBar.cta}
        </ButtonLink>
      </div>
    </div>
  );
}
