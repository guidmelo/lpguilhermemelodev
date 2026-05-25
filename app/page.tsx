import dynamic from 'next/dynamic'

/* ── Above-fold sections — loaded eagerly (critical path) ─────────────────── */
import { PageWrapper }    from '@/components/layout/page-wrapper'
import { Navbar }         from '@/components/layout/navbar'
import { HeroSection }    from '@/components/sections/hero-section'
import { AboutSection }   from '@/components/sections/about-section'
import { ServicesSection } from '@/components/sections/services-section'

/* ── Below-fold sections — lazy loaded (code splitting) ────────────────────
   SSR is preserved (HTML is in the initial response), only the client-side
   JS bundle is deferred — smaller initial JS, faster FCP/TTI.             */
const PortfolioSection  = dynamic(() =>
  import('@/components/sections/portfolio/portfolio-section').then(m => ({ default: m.PortfolioSection }))
)
const TechMarqueeSection = dynamic(() =>
  import('@/components/sections/tech-marquee-section').then(m => ({ default: m.TechMarqueeSection }))
)
const AISection         = dynamic(() =>
  import('@/components/sections/ai/ai-section').then(m => ({ default: m.AISection }))
)
const ResultsSection    = dynamic(() =>
  import('@/components/sections/results/results-section').then(m => ({ default: m.ResultsSection }))
)
const ContactSection    = dynamic(() =>
  import('@/components/sections/contact/contact-section').then(m => ({ default: m.ContactSection }))
)
const Footer            = dynamic(() =>
  import('@/components/layout/footer').then(m => ({ default: m.Footer }))
)

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TechMarqueeSection />
        <AISection />
        <ResultsSection />
        <ContactSection />
      </main>
      <Footer />
    </PageWrapper>
  )
}
