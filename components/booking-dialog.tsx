"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, SyntheticEvent } from "react";
import { booking } from "@/lib/content";
import { BookingCalendar } from "./booking-calendar";
import { Icon } from "./ui/icons";

/** Every "Start free trial" link on the page points here. */
const TRIGGER = 'a[href="#trial"]';

/**
 * Clicking any trial link opens the booking calendar in a dialog. Without
 * JavaScript the same links scroll to the calendar in the closing section.
 * A sheet from the bottom on phones, a centered panel from md up; only
 * opacity and transform animate. Only the panel body scrolls: the dialog and
 * panel clip, so the calendar scrolling itself into view can't shift them.
 */
export function BookingDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  // The calendar stays mounted after the first open, so reopening is instant.
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  // From md up the calendar is fitted to the window instead of scrolling.
  const [fitHeight, setFitHeight] = useState<number>();

  const show = useCallback((from: HTMLElement) => {
    const el = dialog.current;
    if (!el || el.open) return;
    trigger.current = from;
    setMounted(true);
    document.documentElement.style.overflow = "hidden";
    el.showModal();
    closeButton.current?.focus({ preventScroll: true });
    // Flush the closed styles first so the open transition runs.
    void el.offsetHeight;
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const link = (e.target as Element | null)?.closest?.<HTMLElement>(
        TRIGGER,
      );
      if (!link) return;
      // Capture phase, so next/link sees defaultPrevented and doesn't scroll.
      e.preventDefault();
      show(link);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [show]);

  useEffect(() => {
    if (!mounted) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    // Window minus the dialog's 1rem margins and the body's 0.5rem padding.
    const measure = () =>
      setFitHeight(desktop.matches ? window.innerHeight - 48 : undefined);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mounted]);

  // Let the exit transition finish before closing the native dialog.
  useEffect(() => {
    const el = dialog.current;
    if (open || !el?.open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setTimeout(() => el.close(), reduce.matches ? 0 : 200);
    return () => window.clearTimeout(timer);
  }, [open]);

  const onClosed = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
    const from = trigger.current;
    // The mobile menu link is gone by now; only refocus what's still usable.
    if (from?.isConnected && from.offsetParent && !from.closest("[inert]"))
      from.focus({ preventScroll: true });
  };

  const onCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    hide();
  };

  // Keep Tab inside the dialog.
  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab" || !dialog.current) return;
    const focusables = [
      ...dialog.current.querySelectorAll<HTMLElement>(
        "button, a[href], iframe",
      ),
    ];
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

  return (
    <dialog
      ref={dialog}
      aria-labelledby="booking-title"
      aria-describedby="booking-body"
      onCancel={onCancel}
      onClose={onClosed}
      onKeyDown={onKeyDown}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-clip border-0 bg-transparent p-0 backdrop:bg-transparent"
    >
      <div className="flex h-full items-end justify-center md:items-center md:p-4">
        <div
          aria-hidden="true"
          onClick={hide}
          className={`absolute inset-0 bg-navy/60 transition-opacity ease-out ${
            open ? "opacity-100 duration-300" : "opacity-0 duration-200"
          }`}
        />
        <div
          data-tone="light"
          className={`relative flex max-h-[calc(100dvh-env(safe-area-inset-top)-0.75rem)] w-full flex-col overflow-clip rounded-t-[1.75rem] bg-surface-elevated shadow-floating transition-[opacity,transform] motion-reduce:transform-none md:max-h-[calc(100dvh-2rem)] md:max-w-[56rem] md:rounded-[1.75rem] ${
            open
              ? "translate-y-0 opacity-100 duration-500 ease-drawer md:scale-100"
              : "translate-y-full duration-200 ease-out md:translate-y-3 md:scale-[0.97] md:opacity-0"
          }`}
        >
          {/* No header bar, so the whole calendar fits; the title is for screen readers. */}
          <h2 id="booking-title" className="sr-only">
            {booking.dialogTitle}
          </h2>
          <p id="booking-body" className="sr-only">
            {booking.dialogBody}
          </p>
          <button
            ref={closeButton}
            type="button"
            onClick={hide}
            aria-label={booking.close}
            className="absolute right-2 top-2 z-elevated grid h-[max(2.75rem,44px)] w-[max(2.75rem,44px)] place-items-center rounded-full bg-surface-elevated text-navy shadow-elevated transition-transform duration-150 ease-out before:absolute before:inset-0 before:rounded-full before:bg-surface-card before:opacity-0 before:transition-opacity before:duration-200 before:ease-out before:content-[''] hover:before:opacity-100 active:scale-[0.94] active:before:opacity-100 md:right-3 md:top-3"
          >
            <Icon name="close" size={22} strokeWidth={2} className="relative" />
          </button>
          <div className="flex-1 overflow-y-auto overscroll-contain pb-[var(--safe-bottom)] md:p-2">
            {mounted ? (
              <BookingCalendar
                id="booking-dialog-calendar"
                eager
                fitHeight={fitHeight}
                fallbackUntilLoaded
              />
            ) : null}
          </div>
        </div>
      </div>
    </dialog>
  );
}
