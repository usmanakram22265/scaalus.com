"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { Logo } from "./ui/logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // True while a dark section sits under the header's bottom edge.
  const [overDark, setOverDark] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(true);

  useEffect(() => {
    const darkSections = [
      ...document.querySelectorAll<HTMLElement>(
        'section[data-tone="dark"], footer[data-tone="dark"]',
      ),
    ];
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 4);
      const line = (header.current?.getBoundingClientRect().bottom ?? 0) - 1;
      setOverDark(
        darkSections.some((section) => {
          const r = section.getBoundingClientRect();
          return r.top <= line && r.bottom > line;
        }),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    returnFocus.current = true;
    document.body.style.overflow = "hidden";
    panel.current
      ?.querySelector<HTMLElement>("a")
      ?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
      if (returnFocus.current) button?.focus({ preventScroll: true });
    };
  }, [open]);

  // Following a link sends focus to its target, not back to the menu button.
  const closeForNavigation = () => {
    returnFocus.current = false;
    setOpen(false);
  };

  const raised = scrolled || open;
  // Opaque and switched instantly: the header is always exactly #FAF9F6 or #0D2847.
  const dark = overDark && !open;

  return (
    <header
      ref={header}
      data-tone={dark ? "dark" : "light"}
      className="fixed inset-x-0 top-0 z-floating pt-[env(safe-area-inset-top)]"
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${dark ? "bg-navy" : "bg-surface-base"}`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-px ${dark ? "bg-white/[0.12]" : "bg-navy/10"} transition-opacity duration-300 ease-out ${raised ? "opacity-100" : "opacity-0"}`}
      />

      <div className="container-page flex h-header items-center justify-between gap-4 lg:h-header-lg">
        <Link
          href="#top"
          onClick={closeForNavigation}
          className="-m-2 rounded-xl p-2 transition-transform duration-150 ease-out active:scale-[0.97]"
          aria-label="Scaalus, back to top"
        >
          <Logo
            height={26}
            priority
            className={`h-[26px] w-auto lg:h-7 ${dark ? "hidden" : ""}`}
          />
          <Logo
            tone="white"
            height={26}
            eager
            className={`h-[26px] w-auto lg:h-7 ${dark ? "" : "hidden"}`}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-small font-medium ${dark ? "text-white" : "text-navy"} opacity-70 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-100`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="#trial" className="hidden md:inline-flex">
            Start free trial
          </ButtonLink>
          <ButtonLink
            href="#trial"
            onClick={closeForNavigation}
            className="!h-11 !px-4 !text-[0.875rem] md:hidden"
          >
            Free trial
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative -mr-2 grid h-11 w-11 place-items-center rounded-full ${dark ? "text-white" : "text-navy"} transition-transform duration-150 ease-out active:scale-[0.94] md:hidden`}
          >
            <Icon
              name="menu"
              size={22}
              strokeWidth={2}
              className={`absolute transition-[opacity,transform] duration-200 ease-out ${open ? "rotate-45 scale-75 opacity-0" : "opacity-100"}`}
            />
            <Icon
              name="close"
              size={22}
              strokeWidth={2}
              className={`absolute transition-[opacity,transform] duration-200 ease-out ${open ? "opacity-100" : "-rotate-45 scale-75 opacity-0"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu: scrim + sheet dropping from under the header. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-x-0 bottom-0 top-[calc(var(--header-h)+env(safe-area-inset-top))] -z-20 bg-navy/20 transition-opacity md:hidden ${
          open
            ? "opacity-100 duration-200"
            : "pointer-events-none opacity-0 duration-150"
        } ease-out`}
      />
      <div
        id="mobile-menu"
        ref={panel}
        inert={!open}
        className={`absolute inset-x-0 top-full origin-top overscroll-contain rounded-b-card bg-surface-base shadow-floating transition-[opacity,transform] ease-out md:hidden ${
          open
            ? "translate-y-0 opacity-100 duration-[220ms]"
            : "pointer-events-none -translate-y-2 opacity-0 duration-150"
        }`}
      >
        <div className="container-page pb-space-md pt-space-xs">
          <nav aria-label="Mobile">
            <ul>
              {nav.map((item) => (
                <li key={item.href} className="border-b border-navy/[0.08]">
                  <Link
                    href={item.href}
                    onClick={closeForNavigation}
                    className="flex h-[3.25rem] items-center justify-between font-display text-[1.125rem] font-semibold tracking-[-0.01em] text-navy active:opacity-60"
                  >
                    {item.label}
                    <Icon
                      name="arrowRight"
                      size={18}
                      className="text-ink-muted"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink
            href="#trial"
            size="lg"
            arrow
            onClick={closeForNavigation}
            className="mt-space-md w-full"
          >
            Start your 7-day free trial
          </ButtonLink>
          <div className="mt-space-sm flex flex-wrap justify-center gap-x-space-md text-small text-ink-muted">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center active:opacity-60"
            >
              {site.email}
            </a>
            <a
              href={site.phone.href}
              className="inline-flex min-h-11 items-center active:opacity-60"
            >
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
