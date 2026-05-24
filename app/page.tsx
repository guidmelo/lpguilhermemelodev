import { PageWrapper }  from '@/components/layout/page-wrapper'
import { Navbar }       from '@/components/layout/navbar'
import { HeroSection }  from '@/components/sections/hero-section'
import { Footer }       from '@/components/layout/footer'

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <HeroSection />
      <Footer />
    </PageWrapper>
  )
}
