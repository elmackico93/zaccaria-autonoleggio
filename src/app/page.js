import { Suspense } from 'react'
import Header from '@/components/layout/OptimizedHeader'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Fleet from '@/components/sections/Fleet'
import Tours from '@/components/sections/Tours'
import CarRental from '@/components/sections/CarRental'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import Offers from '@/components/sections/Offers'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import FixedCallButton from '@/components/ui/FixedCallButton'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ClientInitializer from '@/components/ClientInitializer'
import { WebVitals } from '@/components/analytics/WebVitals'

// This page uses the optimized header with section-based URL routing
export default function Home() {
  return (
    <>
      {/* Initialize client-side features */}
      <ClientInitializer />
      
      {/* Track web vitals for performance monitoring */}
      <WebVitals />
      
      {/* Suspense boundaries for better loading experience */}
      <Suspense fallback={<LoadingScreen />}>
        <Header />
      </Suspense>

      <main>
        <Hero />
        
        {/* Each major section gets its own Suspense boundary for partial hydration */}
        <Suspense>
          <Services />
        </Suspense>
        
        <Suspense>
          <Fleet />
        </Suspense>
        
        <Suspense>
          <Tours />
        </Suspense>
        
        <Suspense>
          <CarRental />
        </Suspense>
        
        <Suspense>
          <About />
        </Suspense>
        
        <Suspense>
          <Testimonials />
        </Suspense>

        <Suspense>
          <Offers />
        </Suspense>
        
        <Suspense>
          <Contact />
        </Suspense>
      </main>
      
      <Suspense>
        <Footer />
      </Suspense>
      
      <FixedCallButton />
    </>
  )
}