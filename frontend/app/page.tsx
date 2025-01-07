import { LandingHero } from '@/components/landing/hero'
import { LandingNavbar } from '@/components/landing/navbar'
import { LandingFeatures } from '@/components/landing/features'
import { LandingTestimonials } from '@/components/landing/testimonials'
import { LandingPricing } from '@/components/landing/pricing'
import { LandingFooter } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingPricing />
      <LandingFooter />
    </div>
  )
}
