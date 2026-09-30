import Link from "next/link";
import { nav, site } from "@/lib/content";
import { Logo } from "./ui/logo";

export function SiteFooter() {
  return (
    <footer
      data-tone="dark"
      className="border-t border-white/[0.12] bg-navy pb-[calc(6.5rem+var(--safe-bottom))] pt-space-xl md:pb-space-xl"
    >
      <div className="container-page grid gap-space-lg md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="white" height={28} className="h-7 w-auto" />
          <p className="mt-space-sm max-w-[20rem] text-white/75">
            {site.promise}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-small font-semibold text-white">Explore</p>
          <ul className="mt-space-xs">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-white opacity-70 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#trial"
                className="inline-flex min-h-11 items-center text-white opacity-70 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-60"
              >
                Free trial
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-small font-semibold text-white">Contact</p>
          <address className="mt-space-xs not-italic">
            <a
              href={`mailto:${site.email}`}
              className="flex min-h-11 items-center text-white opacity-70 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-60"
            >
              {site.email}
            </a>
            <a
              href={site.phone.href}
              className="flex min-h-11 items-center text-white opacity-70 transition-opacity duration-200 ease-out hover:opacity-100 active:opacity-60"
            >
              {site.phone.display}
            </a>
          </address>
        </div>
      </div>
      <div className="container-page mt-space-lg">
        <p className="border-t border-white/[0.12] pt-space-md text-[0.8125rem] text-white/75">
          © {new Date().getFullYear()} Scaalus. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
