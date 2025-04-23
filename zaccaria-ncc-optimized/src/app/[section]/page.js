import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Fleet from '@/components/sections/Fleet';
import Tours from '@/components/sections/Tours';
import CarRental from '@/components/sections/CarRental';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import FixedCallButton from '@/components/ui/FixedCallButton';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ClientInitializer from '@/components/ClientInitializer';
import { createMetadata } from '@/lib/utils';

// List of valid sections for routing
const VALID_SECTIONS = [
  'services',
  'fleet',
  'tour',
  'rental',
  'about',
  'testimonials',
  'contact'
];

// Define metadata for each section
const SECTION_METADATA = {
  services: {
    title: 'I Nostri Servizi | Zaccaria NCC',
    description: 'Servizi di noleggio con conducente, transfer aeroportuali, servizio Business e VIP a Ostuni, Brindisi e tutta la Puglia.'
  },
  fleet: {
    title: 'La Nostra Flotta | Zaccaria NCC',
    description: 'Scopri la nostra flotta di veicoli Mercedes: comfort, eleganza e servizio impeccabile per ogni tuo spostamento in Puglia.'
  },
  tour: {
    title: 'Tour Guidati in Puglia | Zaccaria NCC',
    description: 'Esplora la Puglia con i nostri tour guidati: borghi bianchi, tour enogastronomici e visite alle città d\'arte.'
  },
  rental: {
    title: 'Autonoleggio | Zaccaria NCC',
    description: 'Noleggia un\'auto senza conducente per esplorare la Puglia in libertà. Veicoli moderni e affidabili per brevi periodi.'
  },
  about: {
    title: 'Chi Siamo | Zaccaria NCC',
    description: 'Scopri Zaccaria NCC: da oltre un decennio, rappresentiamo l\'eccellenza nel settore del noleggio con conducente in Puglia.'
  },
  testimonials: {
    title: 'Testimonial | Zaccaria NCC',
    description: 'Scopri cosa dicono i nostri clienti sul servizio Zaccaria NCC: qualità, professionalità e attenzione ai dettagli.'
  },
  contact: {
    title: 'Contatti | Zaccaria NCC',
    description: 'Contattaci per prenotazioni, preventivi o informazioni sui nostri servizi di noleggio con conducente e tour in Puglia.'
  }
};

// Generate metadata dynamically based on the section parameter
export async function generateMetadata({ params }) {
  const { section } = params;
  
  // Check if this is a valid section
  if (!VALID_SECTIONS.includes(section)) {
    return {};
  }
  
  // Get metadata for this section
  const metadata = SECTION_METADATA[section] || {
    title: 'Zaccaria NCC | Premium Chauffeur Service',
    description: 'Servizio di noleggio con conducente a Ostuni. Transfer con Mercedes, tour guidati in Puglia e autonoleggio senza conducente.'
  };
  
  // Use the utility to create full metadata
  return createMetadata({
    title: metadata.title,
    description: metadata.description,
    path: `/${section}`,
    image: `/images/sections/${section}.jpg`
  });
}

// Generate static parameters for all valid sections
export function generateStaticParams() {
  return VALID_SECTIONS.map(section => ({ section }));
}

// This is a Server Component
export default function SectionPage({ params }) {
  const { section } = params;
  
  // Verify this is a valid section
  if (!VALID_SECTIONS.includes(section)) {
    return notFound();
  }
  
  // This is actually the same content as the home page
  // but with different initial scroll position handled by ClientInitializer
  return (
    <>
      {/* Client component that initializes animations and scrolls to the section */}
      <ClientInitializer targetSection={section} />
      
      {/* Suspense boundaries for better loading experience */}
      <Suspense fallback={<LoadingScreen />}>
        <Header initialSection={section} />
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
  );
}