/**
 * Location Page Template
 * 
 * A reusable template component for rendering location-specific service pages
 * with consistent structure and optimized for SEO.
 */
import Image from 'next/image';
import Link from 'next/link';
import EnhancedHeader from "@/components/layout/OptimizedHeader";
import Footer from "@/components/layout/Footer";
import FixedCallButton from '@/components/ui/FixedCallButton';
import { JsonLd } from '@/components/seo/JsonLd';
import LocationFAQs from '@/components/locations/LocationFAQs';
import ServiceFeatures from '@/components/locations/ServiceFeatures';
import ServiceAdvantages from '@/components/locations/ServiceAdvantages';

// Type definitions for page props
export interface LocationData {
  name: string;
  description: string;
  province: string;
  isProvince?: boolean;
  location?: string;
  category?: string;
}

export interface LocationPageProps {
  location: LocationData;
  serviceType: 'ncc' | 'transfer' | 'tour';
  title: string;
  metaDescription: string;
  slug: string;
  features: string[];
  advantages: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  schemaData: {
    faqSchema: any;
    serviceSchema: any;
  };
}

/**
 * The location page template component
 */
export default function LocationPageTemplate({
  location,
  serviceType,
  title,
  metaDescription,
  slug,
  features,
  advantages,
  faqs,
  schemaData,
}: LocationPageProps) {
  // Choose image based on service type
  const imageUrl = serviceType === 'tour' 
    ? "/images/tour-puglia.jpg" 
    : "/images/service-cars.jpg";
  
  // Service description based on type
  const serviceDescription = 
    serviceType === 'ncc' 
      ? 'noleggio con conducente'
      : serviceType === 'transfer' 
        ? 'transfer privato' 
        : 'tour esclusivi';
  
  // Service explanation based on type
  const serviceExplanation = 
    serviceType === 'ncc' 
      ? `Che si tratti di transfer aeroportuali, spostamenti di lavoro o tour turistici di ${location.name} e dintorni, il nostro servizio di noleggio con conducente rappresenta la soluzione ideale per chi cerca un trasporto privato di alta qualità.`
      : serviceType === 'transfer' 
        ? `Il nostro servizio di transfer da e per ${location.name} è la soluzione ideale per chi desidera raggiungere la propria destinazione con il massimo comfort e senza stress, evitando le complicazioni dei mezzi pubblici o dei taxi standard.`
        : `I nostri tour di ${location.name} sono progettati per offrirti un'esperienza autentica e indimenticabile, con itinerari personalizzati e un autista privato a tua completa disposizione.`;

  return (
    <>
      <EnhancedHeader />
      <main className="py-32 bg-black">
        {/* Structured data */}
        <JsonLd data={schemaData.faqSchema} />
        <JsonLd data={schemaData.serviceSchema} />
        
        {/* Page content */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            {title} - Servizio Premium
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  {metaDescription}
                </p>
                <Link 
                  href="/#contact" 
                  className="metal-button inline-block"
                >
                  Richiedi Preventivo
                </Link>
              </div>
            </div>
          </div>
          
          {/* Content sections */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            <p className="text-lg mb-4">
              Zaccaria NCC offre un servizio premium di {serviceDescription} a {location.name}. 
              Con i nostri autisti professionisti e la nostra flotta di veicoli Mercedes, garantiamo un'esperienza 
              di viaggio all'insegna del comfort e dell'eleganza.
            </p>
            <p className="text-lg mb-4">
              {serviceExplanation}
            </p>
          </section>

          {/* Advantages section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio a {location.name}</h2>
            <ServiceAdvantages advantages={advantages.slice(0, 4)} />
          </section>

          {/* Features section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Servizi Disponibili a {location.name}</h2>
            <ServiceFeatures features={features} />
          </section>
          
          {/* Location description if available */}
          {location.description && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Cosa Visitare a {location.name}</h2>
              <div className="metal-card">
                <p className="text-silver mb-4">
                  {location.description}
                </p>
                <p className="text-silver">
                  Con il nostro servizio di {
                    serviceType === 'ncc' 
                      ? 'noleggio con conducente' 
                      : serviceType === 'transfer' 
                        ? 'transfer privato' 
                        : 'tour guidato'
                  }, potrai scoprire tutte le meraviglie di {location.name} 
                  nel massimo comfort e con la flessibilità di un autista privato a tua disposizione.
                </p>
              </div>
            </section>
          )}
          
          {/* FAQ Section with structured data */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Domande Frequenti</h2>
            <LocationFAQs faqs={faqs} />
          </section>
          
          {/* CTA Section */}
          <section className="mt-16 text-center">
            <p className="text-silver-metallic mb-6">
              Prenota ora il nostro servizio premium {serviceType} per {location.name}
            </p>
            <Link 
              href="/#contact" 
              className="metal-button inline-block"
            >
              Richiedi Preventivo
            </Link>
          </section>
        </div>
      </main>
      <Footer />
      <FixedCallButton />
    </>
  );
}