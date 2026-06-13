import { MarketingNav } from "@/components/marketing/marketing-nav"
import { Hero } from "@/components/marketing/hero"
import { RotatingTeam } from "@/components/marketing/rotating-team"
import { LogoStrip } from "@/components/marketing/logo-strip"
import { ProcurementNetwork } from "@/components/marketing/procurement-network"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { Features } from "@/components/marketing/features"
import { Metrics } from "@/components/marketing/metrics"
import { CtaSection } from "@/components/marketing/cta-section"
import { MarketingFooter } from "@/components/marketing/marketing-footer"

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <Hero />
        <RotatingTeam />
        <LogoStrip />
        <ProcurementNetwork />
        <HowItWorks />
        <Features />
        <Metrics />
        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  )
}
