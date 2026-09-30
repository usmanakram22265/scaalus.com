import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Included } from "@/components/included";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { Pricing } from "@/components/pricing";
import { Problem } from "@/components/problem";
import { Results } from "@/components/results";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Trial } from "@/components/trial";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { jsonLd, structuredData } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData()) }}
      />
      <a
        href="#main"
        className="sr-only z-floating rounded-full bg-surface-elevated px-5 py-3 font-semibold text-navy shadow-floating focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Results />
        <Included />
        <Pricing />
        <Faq />
        <Trial />
      </main>
      <SiteFooter />
      <MobileCtaBar />
      <RevealObserver />
    </>
  );
}
