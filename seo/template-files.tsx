/**
 * Template Files for SEO Generator
 * 
 * This file contains templates that will be used by the generator script.
 * The setup script will automatically extract these templates to their proper locations.
 */

// templates/JsonLd.template.tsx
/**
 * JsonLd Component for structured data
 * 
 * This component renders JSON-LD structured data in the page
 * for improved SEO and rich search results.
 */
interface JsonLdProps {
    data: Record<string, any>;
  }
  
  export function JsonLd({ data }: JsonLdProps) {
    if (!data) return null;
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }
  
  // templates/LocationFAQs.template.tsx
  /**
   * LocationFAQs Component
   * 
   * Renders a list of FAQs for a location page with consistent styling.
   */
  interface FAQ {
    question: string;
    answer: string;
  }
  
  interface LocationFAQsProps {
    faqs: FAQ[];
  }
  
  export default function LocationFAQs({ faqs }: LocationFAQsProps) {
    return (
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="metal-card">
            <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
            <p className="text-silver">{faq.answer}</p>
          </div>
        ))}
      </div>
    );
  }
  
  // templates/ServiceFeatures.template.tsx
  /**
   * ServiceFeatures Component
   * 
   * Renders a list of service features with icon bullets.
   */
  interface ServiceFeaturesProps {
    features: string[];
  }
  
  export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
    return (
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="text-silver-metallic mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p className="text-silver">{feature}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  
  // templates/ServiceAdvantages.template.tsx
  /**
   * ServiceAdvantages Component
   * 
   * Renders a grid of service advantages with cards.
   */
  interface Advantage {
    title: string;
    description: string;
  }
  
  interface ServiceAdvantagesProps {
    advantages: Advantage[];
  }
  
  export default function ServiceAdvantages({ advantages }: ServiceAdvantagesProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advantages.map((advantage, index) => (
          <div key={index} className="metal-card">
            <h3 className="text-xl font-semibold mb-4">{advantage.title}</h3>
            <p className="text-silver">{advantage.description}</p>
          </div>
        ))}
      </div>
    );
  }
  
  // templates/seo.template.ts
  /**
   * SEO utilities for Next.js App Router
   * 
   * These utilities help create consistent metadata for all pages
   * including proper Open Graph and Twitter card data.
   */
  import { Metadata } from 'next';
  
  // Base metadata configuration
  const BASE_CONFIG = {
    siteName: "Zaccaria NCC",
    siteUrl: "https://www.zaccariaautonoleggio.it",
    defaultTitle: "Zaccaria NCC - Autonoleggio con Conducente a Ostuni e in Puglia",
    defaultDescription: "Servizio NCC di alta qualità in Puglia con autisti professionisti. Transfer aeroporti, tour su misura e noleggio con conducente con Mercedes.",
    locale: "it_IT"
  };
  
  /**
   * Create standardized metadata for a page
   * Following Next.js App Router metadata conventions
   */
  export function createMetadata({
    title,
    description,
    path = "",
    businessName = BASE_CONFIG.siteName,
    legalName = businessName,
    noIndex = false
  }: {
    title: string;
    description: string;
    path?: string;
    businessName?: string;
    legalName?: string;
    noIndex?: boolean;
  }): Metadata {
    // Ensure path has no leading slash for URL construction
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const fullUrl = `${BASE_CONFIG.siteUrl}/${cleanPath}`;
    
    return {
      title: title || BASE_CONFIG.defaultTitle,
      description: description || BASE_CONFIG.defaultDescription,
      alternates: {
        canonical: cleanPath ? `/${cleanPath}` : "/",
      },
      openGraph: {
        type: "website",
        locale: BASE_CONFIG.locale,
        url: fullUrl,
        title: title || BASE_CONFIG.defaultTitle,
        description: description || BASE_CONFIG.defaultDescription,
        siteName: BASE_CONFIG.siteName,
        images: [
          {
            url: "/images/og-image.jpg",
            width: 1200,
            height: 630,
            alt: businessName,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title || BASE_CONFIG.defaultTitle,
        description: description || BASE_CONFIG.defaultDescription,
        images: ["/images/og-image.jpg"],
      },
      robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
      other: {
        "geo.region": "IT-IT",
        "geo.placename": "Ostuni",
        "business:contact_data:locality": "Ostuni",
        "business:contact_data:region": "Puglia",
        "business:contact_data:postal_code": "72017",
        "business:contact_data:country_name": "Italy",
      },
    };
  }
  
  /**
   * Generate a sitemap entry for a location page
   */
  export function createSitemapEntry(slug: string, priority = 0.7) {
    return {
      url: `${BASE_CONFIG.siteUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority,
    };
  }
  
  // templates/FooterLinksSEO.template.tsx
  /**
   * FooterLinksSEO Component
   * 
   * Displays SEO-optimized links in the footer, organized by province and service type.
   */
  import Link from 'next/link';
  import { generateSlug } from '@/data/puglia-locations';
  
  // This template will be filled with dynamic data by the generator script
  
  export default function FooterLinksSEO() {
    return (
      <div className="mt-8 pt-6 border-t border-dark-silver">
        <h4 className="text-sm font-bold tracking-widest mb-4 uppercase text-center">Servizi in Puglia</h4>
        
        {/* Main service types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Servizi NCC</h5>
            <ul className="space-y-1">
              <li>
                <Link href="/servizi-puglia" className="text-xs text-silver hover:text-white transition-colors">
                  Tutti i Servizi
                </Link>
              </li>
              <li>
                <Link href="/ncc-ostuni" className="text-xs text-silver hover:text-white transition-colors">
                  NCC Ostuni
                </Link>
              </li>
              <li>
                <Link href="/ncc-bari" className="text-xs text-silver hover:text-white transition-colors">
                  NCC Bari
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Transfer</h5>
            <ul className="space-y-1">
              <li>
                <Link href="/transfer-aeroporto-brindisi" className="text-xs text-silver hover:text-white transition-colors">
                  Transfer Aeroporto Brindisi
                </Link>
              </li>
              <li>
                <Link href="/transfer-aeroporto-bari" className="text-xs text-silver hover:text-white transition-colors">
                  Transfer Aeroporto Bari
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Tour</h5>
            <ul className="space-y-1">
              <li>
                <Link href="/tour-puglia" className="text-xs text-silver hover:text-white transition-colors">
                  Tour Privati in Puglia
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Location links by province - populated dynamically by the generator */}
        <div className="mt-6">
          <h5 className="text-sm font-semibold mb-4 text-silver-metallic text-center">Servizi per Località</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* This section will be populated by the generator script */}
          </div>
        </div>
      </div>
    );
  }
  
  // templates/LocationPageTemplate.template.tsx
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
  
  // templates/ProvinceTabs.template.tsx
  /**
   * ProvinceTabs Component
   * 
   * A component for filtering locations by province with tabs.
   */
  interface Province {
    code: string;
    name: string;
  }
  
  interface ProvinceTabsProps {
    provinces: Province[];
    activeProvince: string;
    onProvinceChange: (code: string) => void;
  }
  
  export default function ProvinceTabs({ 
    provinces, 
    activeProvince, 
    onProvinceChange 
  }: ProvinceTabsProps) {
    return (
      <div className="mb-8">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button
            onClick={() => onProvinceChange('')}
            className={`px-4 py-2 whitespace-nowrap rounded ${
              activeProvince === '' 
                ? 'bg-silver-metallic text-black' 
                : 'bg-dark-silver text-silver hover:bg-silver/20'
            }`}
          >
            Tutte
          </button>
          
          {provinces.map(province => (
            <button
              key={province.code}
              onClick={() => onProvinceChange(province.code)}
              className={`px-4 py-2 whitespace-nowrap rounded ${
                activeProvince === province.code 
                  ? 'bg-silver-metallic text-black' 
                  : 'bg-dark-silver text-silver hover:bg-silver/20'
              }`}
            >
              {province.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  // templates/LocationsGrid.template.tsx
  /**
   * LocationsGrid Component
   * 
   * Displays a responsive grid of location cards.
   */
  import Link from 'next/link';
  import Image from 'next/image';
  import { generateSlug } from '@/data/puglia-locations';
  
  interface LocationData {
    name: string;
    description: string;
    province: string;
    category?: string;
  }
  
  interface LocationCardProps {
    location: LocationData;
    serviceType?: 'ncc' | 'transfer' | 'tour';
  }
  
  // Location Card component
  function LocationCard({ location, serviceType = 'ncc' }: LocationCardProps) {
    const slug = generateSlug(location.name, serviceType);
    
    return (
      <div className="bg-dark-silver rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-102">
        <div className="relative h-48">
          <Image 
            src={`/images/locations/${location.province.toLowerCase()}/${generateSlug(location.name)}.jpg`}
            alt={location.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback to a default image if the specific one doesn't exist
              const target = e.target as HTMLImageElement;
              target.src = "/images/locations/default.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">{location.name}</h3>
              <p className="text-sm text-silver">Provincia di {location.province}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-silver mb-4 line-clamp-3">{location.description}</p>
          <div className="flex space-x-2">
            <Link href={`/ncc-${generateSlug(location.name)}`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
              NCC
            </Link>
            <Link href={`/transfer-${generateSlug(location.name)}`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
              Transfer
            </Link>
            <Link href={`/tour-${generateSlug(location.name)}`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
              Tour
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Main LocationsGrid component
  interface LocationsGridProps {
    locations: LocationData[];
    category?: string | null;
    province?: string | null;
    limit?: number | null;
  }
  
  export default function LocationsGrid({ 
    locations, 
    category = null, 
    province = null, 
    limit = null 
  }: LocationsGridProps) {
    // Filter locations if category or province is specified
    let filteredLocations = [...locations];
    
    if (category) {
      filteredLocations = filteredLocations.filter(loc => loc.category === category);
    }
    
    if (province) {
      filteredLocations = filteredLocations.filter(loc => loc.province === province);
    }
    
    // Apply limit if specified
    if (limit && filteredLocations.length > limit) {
      filteredLocations = filteredLocations.slice(0, limit);
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map(location => (
          <LocationCard key={location.name} location={location} />
        ))}
        
        {filteredLocations.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-silver">Nessuna località trovata con i criteri specificati.</p>
          </div>
        )}
      </div>
    );
  }