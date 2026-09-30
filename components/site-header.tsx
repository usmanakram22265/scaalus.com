"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { header as copy, nav, site } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { Logo } from "./ui/logo";

/**
 * At the top the header has no surface: it sits on the hero's Navy band as
 * part of the hero. Once you scroll, a frosted semi-translucent pill fades and
 * settles in behind it (opacity/transform only), tinted Navy over dark panels
 * and white over light ones. A dot slides under the section you're reading,
 * and a hairline along the bottom edge shows scroll progress.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const [active, setActive] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const navEl = useRef<HTMLElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const header = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(true);

  useEffect(() => {
    const darkPanels = [
      ...document.querySelectorAll<HTMLElement>("[data-header-dark]"),
    ];
    const sections = nav.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
      const pill = header.current?.firstElementChild as HTMLElement | null;
      const line = (pill?.getBoundingClientRect().bottom ?? 0) - 1;
      setOverDark(
        darkPanels.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= line && r.bottom > line;
        }),
      );
      // Scroll-spy: the section crossing a line just under the header.
      const spy = line + 80;
      setActive(
        sections.findIndex((el) => {
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top <= spy && r.bottom > spy;
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

  // Slide the dot under the active link (transform only).
  useEffect(() => {
    const place = () => {
      const link =
        active >= 0 ? navEl.current?.querySelectorAll("a")[active] : null;
      if (!dot.current || !link) return;
      const x = link.offsetLeft + link.offsetWidth / 2 - 2;
      dot.current.style.transform = `translateX(${x}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

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
  const raised = scrolled || open;

  return (
    <header
      ref={header}
      data-tone={dark ? "dark" : "light"}
      className="fixed inset-x-0 top-0 z-floating px-3 pt-[calc(env(safe-area-inset-top)+var(--header-gap))] sm:px-5"
    >
      <div className="relative isolate mx-auto flex h-header max-w-page items-center justify-between gap-3 rounded-full pl-4 pr-1.5 lg:h-[3.75rem] lg:pl-6 lg:pr-2">
        {/* The pill surface: invisible at the top, frosted once scrolled. */}
        <span
          aria-hidden="true"
          className={`nav-glass pointer-events-none absolute inset-0 -z-10 rounded-full transition-[opacity,transform] ease-out ${
            raised
              ? "scale-100 opacity-100 duration-500"
              : "scale-x-[1.035] scale-y-[1.12] opacity-0 duration-300"
          }`}
        >
          <span
            className={`nav-glass-dark absolute inset-0 rounded-full transition-opacity duration-300 ease-out ${dark ? "opacity-100" : "opacity-0"}`}
          />
          <span
            className={`nav-glass-light absolute inset-0 rounded-full transition-opacity duration-300 ease-out ${dark ? "opacity-0" : "opacity-100"}`}
          />
        </span>
        <Link
          href="#top"
          onClick={closeForNavigation}
          className="-m-2 shrink-0 rounded-full p-2 transition-transform duration-150 ease-out active:scale-[0.97]"
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

        <nav
          ref={navEl}
          aria-label="Main"
          className="relative hidden items-center md:flex"
        >
          {nav.map((item, i) => {
            const current = i === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "location" : undefined}
                className={`relative isolate rounded-full px-3.5 py-2 text-small font-medium tracking-[-0.005em] transition-opacity duration-200 ease-out before:absolute before:inset-0 before:-z-10 before:rounded-full before:opacity-0 before:transition-opacity before:duration-200 before:ease-out before:content-[''] hover:opacity-100 hover:before:opacity-100 active:opacity-70 ${
                  dark
                    ? "text-white before:bg-white/[0.08]"
                    : "text-navy before:bg-surface-card"
                } ${current ? "opacity-100" : dark ? "opacity-75" : "opacity-70"}`}
              >
                {item.label}
              </Link>
            );
          })}
          {/* Active-section dot. */}
          <span
            ref={dot}
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-1 left-0 h-1 w-1 rounded-full transition-[opacity,transform] duration-500 ease-out ${
              dark ? "bg-sky" : "bg-brand"
            } ${active >= 0 ? "opacity-100" : "opacity-0"}`}
          />
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={site.phone.href}
            aria-label={site.phone.display}
            className={`group hidden h-10 items-center gap-2.5 rounded-full pl-1 pr-3 text-small font-medium transition-[opacity,transform] duration-200 ease-out hover:opacity-100 active:scale-[0.97] lg:inline-flex ${
              dark ? "text-white opacity-85" : "text-navy opacity-80"
            }`}
          >
            <span
              className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-200 ease-out group-hover:-rotate-12 ${
                dark
                  ? "bg-white/[0.08] text-sky ring-1 ring-inset ring-white/10"
                  : "bg-surface-card text-brand"
              }`}
            >
              <Icon name="phone" size={14} strokeWidth={2} />
            </span>
            <span className="hidden xl:inline">{site.phone.display}</span>
          </a>
          <span
            aria-hidden="true"
            className={`mx-1 hidden h-5 w-px lg:block ${dark ? "bg-white/15" : "bg-navy/10"}`}
          />
          <ButtonLink
            href="#trial"
            size="sm"
            arrow
            className="hidden md:inline-flex lg:h-11 lg:px-5"
          >
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
            className={`relative grid h-11 w-11 place-items-center rounded-full transition-transform duration-150 ease-out hover:opacity-80 active:scale-[0.94] md:hidden ${
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
          className={`pointer-events-none absolute inset-x-8 bottom-0 h-px overflow-hidden rounded-full transition-opacity duration-300 ease-out ${raised ? "opacity-100" : "opacity-0"}`}
        >
          <span
            ref={progress}
            className={`block h-full w-full origin-left rounded-full ${
              dark
                ? "bg-gradient-to-r from-sky/0 via-sky to-sky"
                : "bg-gradient-to-r from-brand/0 via-brand to-brand"
            }`}
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
