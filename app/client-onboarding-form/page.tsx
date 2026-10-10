import type { Metadata } from "next";
import Link from "next/link";
import { GhlFormEmbed } from "@/components/ghl-form-embed";
import { Icon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { Eyebrow, TwoTone } from "@/components/ui/section";
import { onboarding, site } from "@/lib/content";

// Sent to new clients only: kept out of search results and the sitemap.
export const metadata: Metadata = {
  title: onboarding.metaTitle,
  description: onboarding.metaDescription,
  alternates: { canonical: "/client-onboarding-form" },
  robots: { index: false, follow: false },
};

const link =
  "inline-flex min-h-[44px] items-center gap-2 font-medium transition-opacity duration-200 ease-out hover:opacity-80 active:opacity-60";

/** Navy panel on top, the white form card overlapping it, light page below. */
export default function ClientOnboardingForm() {
  return (
    <>
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        <section
          aria-labelledby="onboarding-title"
          data-tone="dark"
          className="panel-navy mx-auto max-w-[90rem] rounded-[2rem] pb-[calc(var(--space-xl)+7rem)] lg:rounded-panel"
        >
          <header className="container-page flex h-[4.5rem] items-center justify-center lg:h-20">
            <Link
              href="/"
              aria-label={onboarding.home}
              className="-m-2 inline-flex min-h-[44px] items-center rounded-full p-2 transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              <Logo tone="white" height={28} priority className="h-7 w-auto" />
            </Link>
          </header>

          <div className="container-page pt-space-md text-center lg:pt-space-lg">
            <Eyebrow>{onboarding.eyebrow}</Eyebrow>
            <h1 id="onboarding-title" className="mt-4 text-display-xl">
              <TwoTone
                title={onboarding.title}
                highlight={onboarding.highlight}
                dark
              />
            </h1>
            <p className="mx-auto mt-5 max-w-prose text-lead text-white/70">
              {onboarding.body}
            </p>
          </div>
        </section>
      </div>

      <main id="main" className="container-page px-2 pb-space-2xl sm:px-5">
        <div
          data-tone="light"
          className="relative mx-auto -mt-28 max-w-[52rem] rounded-card bg-surface-elevated px-4 py-6 shadow-floating sm:p-8"
        >
          <GhlFormEmbed
            id="onboarding-form"
            src={onboarding.formUrl}
            title={onboarding.frameTitle}
            loading={onboarding.loading}
            fallback={onboarding.fallback}
            fallbackLink={onboarding.fallbackLink}
          />
        </div>

        <p className="mt-space-md flex flex-wrap items-center justify-center gap-x-4 text-small text-ink-muted">
          {onboarding.help}
          <a href={site.phone.href} className={`${link} text-navy`}>
            <Icon name="phone" size={15} className="text-brand" />
            {site.phone.display}
          </a>
          <a href={`mailto:${site.email}`} className={`${link} text-navy`}>
            <Icon name="mail" size={15} className="text-brand" />
            {site.email}
          </a>
        </p>
      </main>
    </>
  );
}
