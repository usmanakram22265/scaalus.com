import Link from "next/link";
import { footer, header, nav, site } from "@/lib/content";
import { Icon } from "./ui/icons";
import { Logo } from "./ui/logo";

const link =
  "inline-flex min-h-11 items-center gap-2 text-navy opacity-70 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-50";

export function SiteFooter() {
  return (
    <footer className="cv-auto relative overflow-hidden pb-[calc(6.5rem+var(--safe-bottom))] pt-space-xl md:pb-space-lg">
      <div className="container-page grid gap-space-lg md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo height={28} className="h-7 w-auto" />
          <p className="mt-space-sm max-w-[20rem] text-ink-muted">
            {site.promise}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-label uppercase text-ink-muted">
            {footer.navTitle}
          </p>
          <ul className="mt-space-xs">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="#trial" className={link}>
                {header.ctaShort}
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="font-mono text-label uppercase text-ink-muted">
            {footer.contactTitle}
          </p>
          <address className="mt-space-xs not-italic">
            <a href={site.phone.href} className={link}>
              <Icon name="phone" size={15} />
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className={`${link} flex`}>
              <Icon name="mail" size={15} />
              {site.email}
            </a>
          </address>
        </div>
      </div>

      <div className="container-page mt-space-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-space-md">
          <p className="text-[0.8125rem] text-ink-muted">
            © {new Date().getFullYear()} {site.name}. {footer.legal}
          </p>
          <Link
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 text-[0.8125rem] font-medium text-navy opacity-70 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-50"
          >
            {footer.toTop}
            <Icon
              name="arrowUp"
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Oversized wordmark watermark. */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-space-lg select-none text-center font-display text-[clamp(5rem,22vw,19rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-navy/[0.045]"
      >
        {site.name.toLowerCase()}
      </p>
    </footer>
  );
}
