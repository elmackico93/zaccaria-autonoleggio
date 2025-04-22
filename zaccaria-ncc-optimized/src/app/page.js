import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Fleet from '@/components/sections/Fleet'
import Tours from '@/components/sections/Tours'
import CarRental from '@/components/sections/CarRental'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import FixedCallButton from '@/components/ui/FixedCallButton'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ClientInitializer from '@/components/ClientInitializer'

// Export static metadata for this page
export const metadata = {
  title: 'Zaccaria NCC | Premium Chauffeur Service',
}

// Export static generation properties for maximum performance
export const revalidate = 86400; // Revalidate every 24 hours

// This is a Server Component (no 'use client' directive)
export default function Home() {
  return (
    <>
      {/* Client component that initializes animations and hydration */}
      <ClientInitializer />
      
      {/* Suspense boundaries for better loading experience */}
      <Suspense fallback={<LoadingScreen />}>
        <Header />
      </Suspense>

      <main>
        <Hero />
        
        {/* Each major section gets its own Suspense boundary */}
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
