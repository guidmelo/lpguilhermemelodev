import { PageWrapper }      from '@/components/layout/page-wrapper'
import { Navbar }           from '@/components/layout/navbar'
import { HeroSection }      from '@/components/sections/hero-section'
import { AboutSection }     from '@/components/sections/about-section'
import { ServicesSection }  from '@/components/sections/services-section'
import { PortfolioSection }  from '@/components/sections/portfolio/portfolio-section'
import { TechStackSection }  from '@/components/sections/tech/tech-stack-section'
import { AISection }         from '@/components/sections/ai/ai-section'
import { ResultsSection }    from '@/components/sections/results/results-section'
import { Footer }            from '@/components/layout/footer'

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TechStackSection />
      <AISection />
      <ResultsSection />
      <Footer />
    </PageWrapper>
  )
}
