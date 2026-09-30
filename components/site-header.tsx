"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { header as copy, nav, site } from "@/lib/content";
import { ButtonLink } from "./ui/button";
import { Icon } from "./ui/icons";
import { Logo } from "./ui/logo";

// Pill padding (px) on each side of the content row, per breakpoint.
const PILL_PAD = { sm: 10, lg: 14 };

/**
 * Always-dark header. At the top of the page it's a full-width midnight bar;
 * once you scroll it becomes a centred floating pill. The morph only uses
 * opacity and transform: the bar and pill backgrounds crossfade, and the logo
 * and actions slide inward by exactly the difference in width.
 * A Light Blue dot slides under the link for the section in view.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(-1);
  const [shift, setShift] = useState(0);
  const [dotX, setDotX] = useState(0);

  const header = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const navEl = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(true);

  // Scroll state + progress (rAF throttled).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
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
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // How far logo and actions slide in so they sit inside the pill.
  useLayoutEffect(() => {
    const measure = () => {
      const r = row.current;
      const p = pill.current;
      if (!r || !p) return;
      const cs = getComputedStyle(r);
      const content =
        r.clientWidth -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight);
      const pad = window.innerWidth >= 1024 ? PILL_PAD.lg : PILL_PAD.sm;
      const target = p.offsetWidth - pad * 2;
      setShift(Math.max(0, Math.round((content - target) / 2)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll-spy: which nav section is in the middle band of the screen.
  useEffect(() => {
    const targets = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          visible.set(entry.target, entry.isIntersecting);
        let index = -1;
        targets.forEach((el, i) => {
          if (visible.get(el)) index = i;
        });
        setActive(index);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Position the dot under the active link.
  useLayoutEffect(() => {
    const place = () => {
      const link = navEl.current?.querySelectorAll<HTMLElement>("a")[active];
      if (link) setDotX(link.offsetLeft + link.offsetWidth / 2 - 3);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // Mobile menu: scroll lock, focus trap, Escape, focus return.
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

  const closeForNavigation = () => {
    returnFocus.current = false;
    setOpen(false);
  };

  const pillMode = scrolled || open;
  const morph =
    "transition-[opacity,transform] duration-[450ms] ease-out motion-reduce:transition-none";

  return (
    <header
      ref={header}
      data-tone="dark"
      data-state={pillMode ? "pill" : "bar"}
      className="fixed inset-x-0 top-0 z-floating pt-[env(safe-area-inset-top)]"
    >
      {/* Full-width bar (top of page) */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 -z-10 h-[calc(env(safe-area-inset-top)+var(--header-h)+var(--header-gap)*2)] border-b border-white/[0.08] bg-midnight ${morph} ${
          pillMode ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Floating pill (after scroll) */}
      <div
        ref={pill}
        aria-hidden="true"
        className={`absolute inset-x-3 top-[calc(env(safe-area-inset-top)+var(--header-gap))] -z-10 mx-auto h-header max-w-[64rem] overflow-hidden rounded-full bg-midnight shadow-[0_18px_40px_-14px_rgb(3_8_20/0.7),inset_0_1px_0_rgb(255_255_255/0.08)] ring-1 ring-inset ring-white/10 sm:inset-x-5 lg:h-[3.75rem] ${morph} ${
          pillMode
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-1.5 scale-[0.97] opacity-0"
        }`}
      >
        <span className="absolute inset-x-8 bottom-0 h-[2px] overflow-hidden rounded-full">
          <span
            ref={progress}
            className="block h-full w-full origin-left rounded-full bg-[linear-gradient(90deg,#123499,#6E93F0)]"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      </div>

      {/* Content row: sits where the pill is; logo and actions slide in. */}
      <div
        ref={row}
        className="container-page relative mt-[var(--header-gap)] flex h-header items-center justify-between lg:h-[3.75rem]"
      >
        <div
          className={morph}
          style={{ transform: `translateX(${pillMode ? shift : 0}px)` }}
        >
          <Link
            href="#top"
            onClick={closeForNavigation}
            className="-m-2 block rounded-full p-2 transition-opacity duration-200 ease-out hover:opacity-80 active:opacity-60"
            aria-label={copy.home}
          >
            <Logo
              tone="white"
              height={24}
              priority
              className="h-6 w-auto lg:h-[26px]"
            />
          </Link>
        </div>

        <nav
          ref={navEl}
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active === i ? "location" : undefined}
              className={`rounded-full px-3.5 py-2 text-small font-medium text-white transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-60 ${
                active === i ? "opacity-100" : "opacity-70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-0.5 left-0 h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_10px_rgb(110_147_240/0.8)] transition-[opacity,transform] duration-300 ease-in-out motion-reduce:transition-opacity ${
              active >= 0 ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `translateX(${dotX}px)` }}
          />
        </nav>

        <div
          className={`flex items-center gap-2 ${morph}`}
          style={{ transform: `translateX(${pillMode ? -shift : 0}px)` }}
        >
          <a
            href={site.phone.href}
            aria-label={copy.call}
            className="hidden h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-white ring-1 ring-inset ring-white/10 transition-[opacity,transform] duration-150 ease-out hover:opacity-80 active:scale-[0.94] lg:grid"
          >
            <Icon name="phone" size={16} strokeWidth={2} />
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
            className="relative grid h-11 w-11 place-items-center rounded-full text-white transition-transform duration-150 ease-out hover:opacity-80 active:scale-[0.94] md:hidden"
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

      {/* Mobile menu: scrim + midnight sheet under the pill. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 -z-20 bg-midnight/50 transition-opacity ease-out md:hidden ${
          open
            ? "opacity-100 duration-200"
            : "pointer-events-none opacity-0 duration-150"
        }`}
      />
      <div
        id="mobile-menu"
        ref={panel}
        inert={!open}
        className={`mx-3 mt-3 origin-top overscroll-contain rounded-card bg-midnight p-5 shadow-floating ring-1 ring-inset ring-white/10 transition-[opacity,transform] sm:mx-5 md:hidden ${
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
                className={`border-b border-white/[0.08] transition-[opacity,transform] duration-300 ease-out ${
                  open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${40 + i * 40}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={closeForNavigation}
                  className="flex h-14 items-center justify-between font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-white transition-opacity duration-200 ease-out hover:opacity-80 active:opacity-60"
                >
                  {item.label}
                  <Icon name="arrowRight" size={18} className="text-sky" />
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
        <div className="mt-space-sm flex flex-wrap justify-center gap-x-space-md text-small text-white/70">
          <a
            href={site.phone.href}
            className="inline-flex min-h-11 items-center gap-2 transition-opacity duration-200 hover:opacity-80 active:opacity-60"
          >
            <Icon name="phone" size={15} className="text-sky" />
            {site.phone.display}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center gap-2 transition-opacity duration-200 hover:opacity-80 active:opacity-60"
          >
            <Icon name="mail" size={15} className="text-sky" />
            {site.email}
          </a>
        </div>
      </div>
    </header>
  );
}
