import Link from "next/link";
import { footer, header, nav, site } from "@/lib/content";
import { Icon } from "./ui/icons";
import { Logo } from "./ui/logo";

const link =
  "inline-flex min-h-[44px] items-center gap-1.5 text-navy opacity-70 max-md:text-[0.875rem] md:gap-2 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-50";

export function SiteFooter() {
  return (
    <footer className="pb-safe relative overflow-hidden pt-space-lg md:pt-space-xl">
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 gap-y-space-md max-[359px]:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] md:gap-space-lg">
        <div className="max-[359px]:col-span-2">
          <Logo height={28} className="h-6 w-auto md:h-7" />
          <p className="mt-space-xs max-w-[20rem] text-[0.8125rem] leading-snug text-ink-muted md:mt-space-sm md:text-body md:leading-body">
            {site.promise}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-label uppercase text-ink-muted">
            {footer.navTitle}
          </p>
          <ul className="mt-space-2xs md:mt-space-xs">
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
          <address className="mt-space-2xs not-italic max-md:flex max-md:flex-col max-md:items-start md:mt-space-xs">
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

      <div className="container-page mt-space-md md:mt-space-lg">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-navy/10 pt-space-sm md:pt-space-md">
          <p className="text-[0.8125rem] text-ink-muted">
            © {new Date().getFullYear()} {site.name}. {footer.legal}
          </p>
          <Link
            href="#top"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[0.8125rem] font-medium text-navy opacity-70 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-50"
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

      {/* Oversized wordmark, cropped at the baseline and fading out. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-space-md h-[clamp(3.25rem,15vw,12.5rem)] select-none overflow-hidden [mask-image:linear-gradient(180deg,#000_45%,transparent)] md:mt-space-lg"
      >
        <p className="text-center font-display text-[clamp(5rem,22vw,19rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-[#0D2947]/[0.22]">
          {site.name.toLowerCase()}
        </p>
      </div>
    </footer>
  );
}
