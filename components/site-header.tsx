"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { header as copy, nav, site } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { Logo } from "./ui/logo";

/**
 * Floating pill header. Always opaque: solid Navy while a navy panel sits
 * under it, solid white elsewhere, switched instantly so it never blends.
 * A 2px bar along its bottom edge shows scroll progress (transform only).
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const header = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(true);

  useEffect(() => {
    const darkPanels = [
      ...document.querySelectorAll<HTMLElement>("[data-header-dark]"),
    ];
    let frame = 0;
    const update = () => {
      frame = 0;
      const pill = header.current?.firstElementChild as HTMLElement | null;
      const line = (pill?.getBoundingClientRect().bottom ?? 0) - 1;
      setOverDark(
        darkPanels.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= line && r.bottom > line;
        }),
      );
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (progress.current)
        progress.current.style.transform = `scaleX(${p.toFixed(4)})`;
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
      // Keep Tab inside the header while the menu is open.
      if (e.key !== "Tab" || !header.current) return;
      const focusables = [
        ...header.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      ].filter((el) => el.offsetParent !== null && !el.closest("[inert]"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
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

  const dark = overDark && !open;

  return (
    <header
      ref={header}
      data-tone={dark ? "dark" : "light"}
      className="fixed inset-x-0 top-0 z-floating px-3 pt-[calc(env(safe-area-inset-top)+var(--header-gap))] sm:px-5"
    >
      <div
        className={`relative mx-auto flex h-header max-w-page items-center justify-between gap-3 overflow-hidden rounded-full pl-4 pr-2 lg:h-[3.75rem] lg:pl-6 ${
          dark ? "bg-navy shadow-on-navy" : "bg-surface-elevated shadow-header"
        }`}
      >
        <Link
          href="#top"
          onClick={closeForNavigation}
          className="-m-2 rounded-full p-2 transition-transform duration-150 ease-out active:scale-[0.97]"
          aria-label={copy.home}
        >
          <Logo
            height={24}
            priority
            className={`h-6 w-auto lg:h-[26px] ${dark ? "hidden" : ""}`}
          />
          <Logo
            tone="white"
            height={24}
            priority
            className={`h-6 w-auto lg:h-[26px] ${dark ? "" : "hidden"}`}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-small font-medium transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-60 ${
                dark ? "text-white opacity-75" : "text-navy opacity-70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.phone.href}
            className={`hidden h-10 items-center gap-2 rounded-full px-3 text-small font-medium transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-60 lg:inline-flex ${
              dark ? "text-white opacity-80" : "text-navy opacity-75"
            }`}
          >
            <Icon name="phone" size={15} strokeWidth={2} />
            {site.phone.display}
          </a>
          <ButtonLink href="#trial" size="sm" className="hidden md:inline-flex">
            {copy.cta}
          </ButtonLink>
          <ButtonLink
            href="#trial"
            size="sm"
            onClick={closeForNavigation}
            className="md:hidden"
          >
            {copy.ctaShort}
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.closeMenu : copy.openMenu}
            className={`relative grid h-11 w-11 place-items-center rounded-full transition-transform duration-150 ease-out active:scale-[0.94] md:hidden ${
              dark ? "text-white" : "text-navy"
            }`}
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

        {/* Scroll progress along the pill's bottom edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 bottom-0 h-[2px] overflow-hidden rounded-full"
        >
          <span
            ref={progress}
            className={`block h-full w-full origin-left rounded-full ${dark ? "bg-sky" : "bg-brand"}`}
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      </div>

      {/* Mobile menu: scrim + sheet dropping from under the pill. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 -z-10 bg-navy/30 transition-opacity ease-out md:hidden ${
          open
            ? "opacity-100 duration-200"
            : "pointer-events-none opacity-0 duration-150"
        }`}
      />
      <div
        id="mobile-menu"
        ref={panel}
        inert={!open}
        data-open={open ? "" : undefined}
        className={`mx-auto mt-2 max-w-page origin-top overscroll-contain rounded-card bg-surface-elevated p-5 shadow-floating transition-[opacity,transform] md:hidden ${
          open
            ? "translate-y-0 scale-100 opacity-100 duration-300 ease-drawer"
            : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0 duration-150 ease-out"
        }`}
      >
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-navy/[0.08] transition-[opacity,transform] duration-300 ease-out ${
                  open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${40 + i * 40}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={closeForNavigation}
                  className="flex h-14 items-center justify-between font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-navy transition-opacity duration-200 ease-out hover:opacity-70 active:opacity-60"
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
          {copy.menuCta}
        </ButtonLink>
        <div className="mt-space-sm flex flex-wrap justify-center gap-x-space-md text-small text-ink-muted">
          <a
            href={site.phone.href}
            className="inline-flex min-h-11 items-center gap-2 active:opacity-60"
          >
            <Icon name="phone" size={15} />
            {site.phone.display}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center gap-2 active:opacity-60"
          >
            <Icon name="mail" size={15} />
            {site.email}
          </a>
        </div>
      </div>
    </header>
  );
}
