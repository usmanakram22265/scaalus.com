import { DoneForYou } from "@/components/done-for-you";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Guarantee } from "@/components/guarantee";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { Outcomes } from "@/components/outcomes";
import { Pricing } from "@/components/pricing";
import { Problem } from "@/components/problem";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TradesStrip } from "@/components/trades-strip";
import { Week } from "@/components/week";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { Spotlight } from "@/components/ui/spotlight";
import { header } from "@/lib/content";
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
        {header.skip}
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TradesStrip />
        <Problem />
        <Week />
        <HowItWorks />
        <Outcomes />
        <DoneForYou />
        <Pricing />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
      <RevealObserver />
      <Spotlight />
    </>
  );
}
