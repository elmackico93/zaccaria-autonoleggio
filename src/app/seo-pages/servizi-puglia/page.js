import EnhancedHeader from "@/components/layout/OptimizedHeader";
import Footer from "@/components/layout/Footer";
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/utils';
import Header from '@/components/layout/Header';
import FixedCallButton from '@/components/ui/FixedCallButton';

// Force static generation
export const dynamic = "force-static";

// Metadata function
export async function generateMetadata({ params }) {
  return createMetadata({
    title: "Servizi NCC in Puglia - Transfer, Tour, Business & Luxury",
    description: "Tutti i servizi di noleggio con conducente in Puglia: transfer aeroportuali, tour guidati, servizi business, cerimonie e trasporto di lusso.",
    path: "/servizi-puglia",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
function InnerSEOPage() {
  // Define services data
  const services = [
    {
      id: "transfer",
      title: "Transfer Aeroportuali",
      description: "Servizio di transfer da e per gli aeroporti di Bari e Brindisi, con monitoraggio voli in tempo reale e assistenza bagagli.",
      imageUrl: "/images/service-cars.jpg",
      linkTo: "/transfer-aeroporto-brindisi"
    },
    {
      id: "business",
      title: "Servizio Business",
      description: "Transfer executive per professionisti e aziende con vetture Mercedes di alta gamma, Wi-Fi a bordo e massima puntualità.",
      imageUrl: "/images/service-cars.jpg",
      linkTo: "/ncc-ostuni"
    },
    {
      id: "tour",
      title: "Tour Guidati",
      description: "Tour personalizzati della Puglia con autista privato: Valle d'Itria, Salento, costa adriatica e ionica, borghi storici.",
      imageUrl: "/images/tour-puglia.jpg",
      linkTo: "/tour-autista-privato-puglia"
    },
    {
      id: "luxury",
      title: "Trasporto di Lusso",
      description: "Servizio premium con Mercedes Classe S ed E per eventi speciali, cerimonie e occasioni che richiedono eleganza e stile.",
      imageUrl: "/images/service-cars.jpg",
      linkTo: "/ncc-ostuni"
    },
    {
      id: "wedding",
      title: "Servizio Cerimonie",
      description: "Auto di lusso per matrimoni ed eventi speciali, con decorazioni personalizzate e servizio impeccabile.",
      imageUrl: "/images/service-cars.jpg",
      linkTo: "/ncc-ostuni"
    },
    {
      id: "rental",
      title: "Autonoleggio",
      description: "Noleggio auto senza conducente con veicoli moderni e affidabili per esplorare la Puglia in autonomia.",
      imageUrl: "/images/rental-cars.jpg",
      linkTo: "/autonoleggio-con-conducente-alberobello"
    }
  ];
  
  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Zaccaria NCC",
          "telephone": "+39-331 346 7527",
          "email": "info@zaccariaautonoleggio.it",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Via Armando Diaz, 91",
            "addressLocality": "Ostuni",
            "addressRegion": "BR",
            "postalCode": "72017",
            "addressCountry": "IT"
          },
          "image": "https://www.zaccariaautonoleggio.it/images/logo.jpg"
        },
        "areaServed": {
          "@type": "State",
          "name": "Puglia"
        }
      }
    }))
  };
  
  return (
    <>
      <Header />
      <main className="py-32 bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        
        {/* Page content */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            Servizi di Noleggio Con Conducente in Puglia
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src="/images/service-cars.jpg"
              alt="Servizi NCC in Puglia"
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  Scopri tutti i servizi di noleggio con conducente di Zaccaria NCC: transfer aeroportuali, tour guidati, servizi business e molto altro.
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
          
          {/* Introduction */}
          <section className="mb-16">
            <p className="text-xl text-silver mb-8 max-w-4xl">
              Zaccaria NCC offre una gamma completa di servizi di trasporto con conducente in Puglia, garantendo sempre il massimo livello di comfort, professionalità e attenzione ai dettagli. Ogni nostro servizio è personalizzabile in base alle vostre esigenze specifiche.
            </p>
            <div className="metal-divider"></div>
          </section>
          
          {/* Services Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">I Nostri Servizi</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="metal-card">
                  <div className="relative h-48 w-full mb-6 overflow-hidden">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-silver mb-6">{service.description}</p>
                  <Link
                    href={service.linkTo}
                    className="text-silver-metallic hover:text-white transition-colors flex items-center group"
                  >
                    <span>Scopri di più</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          
          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Perché Scegliere Zaccaria NCC</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="metal-card">
                <div className="w-14 h-14 mb-6 text-silver-metallic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Professionalità</h3>
                <p className="text-silver">
                  Autisti professionisti, puntuali e sempre cortesi. Conoscenza approfondita del territorio e assistenza continua durante tutto il servizio.
                </p>
              </div>
              
              <div className="metal-card">
                <div className="w-14 h-14 mb-6 text-silver-metallic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Comfort</h3>
                <p className="text-silver">
                  Flotta di veicoli Mercedes-Benz di ultima generazione, dotati di ogni comfort: aria condizionata, Wi-Fi, acqua minerale e sedili in pelle.
                </p>
              </div>
              
              <div className="metal-card">
                <div className="w-14 h-14 mb-6 text-silver-metallic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Trasparenza</h3>
                <p className="text-silver">
                  Tariffe chiare e senza sorprese. Preventivi dettagliati che includono tutti i costi del servizio senza costi nascosti o sovrapprezzi.
                </p>
              </div>
              
              <div className="metal-card">
                <div className="w-14 h-14 mb-6 text-silver-metallic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 8v10H7m14-6l-7-7M3 8l4 4m0 0l-4 4m4-4H7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Flessibilità</h3>
                <p className="text-silver">
                  Servizi personalizzabili in base alle vostre esigenze specifiche. Orari, itinerari e fermate su richiesta per un'esperienza su misura.
                </p>
              </div>
              
              <div className="metal-card">
                <div className="w-14 h-14 mb-6 text-silver-metallic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Disponibilità</h3>
                <p className="text-silver">
                  Servizio disponibile 24 ore su 24, 7 giorni su 7, inclusi festivi. Prenotazioni immediate o programmate in anticipo.
                </p>
              </div>
              
              <div className="metal-card">
                <div className="w-14 h-14 mb-6 text-silver-metallic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sicurezza</h3>
                <p className="text-silver">
                  Veicoli regolarmente controllati e sanificati. Autisti esperti e qualificati, con una conoscenza perfetta delle strade pugliesi.
                </p>
              </div>
            </div>
          </section>
          
          {/* Service Area Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Zone Servite in Puglia</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Provincia di Bari</h3>
                <ul className="space-y-2 text-silver">
                  <li>Bari</li>
                  <li>Polignano a Mare</li>
                  <li>Monopoli</li>
                  <li>Alberobello</li>
                  <li>Locorotondo</li>
                  <li>Conversano</li>
                  <li>Putignano</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Provincia di Brindisi</h3>
                <ul className="space-y-2 text-silver">
                  <li>Brindisi</li>
                  <li>Ostuni</li>
                  <li>Cisternino</li>
                  <li>Ceglie Messapica</li>
                  <li>Fasano</li>
                  <li>Carovigno</li>
                  <li>San Vito dei Normanni</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Provincia di Lecce</h3>
                <ul className="space-y-2 text-silver">
                  <li>Lecce</li>
                  <li>Otranto</li>
                  <li>Gallipoli</li>
                  <li>Porto Cesareo</li>
                  <li>Santa Maria di Leuca</li>
                  <li>Castro</li>
                  <li>Santa Cesarea Terme</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-silver">
              <p>Il nostro servizio copre anche le province di Taranto, Foggia e la vicina Basilicata, inclusa Matera.</p>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="text-center mb-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Pronto a prenotare?</h2>
              <p className="text-silver mb-8">
                Contattaci per un preventivo personalizzato o per maggiori informazioni sui nostri servizi di noleggio con conducente in Puglia.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/#contact" 
                  className="metal-button inline-block"
                >
                  Richiedi Preventivo
                </Link>
                <a 
                  href="tel:+393313467527" 
                  className="call-button call-button-navbar"
                >
                  <i className="fas fa-phone mr-2"></i>
                  <span>Chiama Ora</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FixedCallButton />
    </>
  );
}

export default function PageWrapper() {
  return (
    <>
      <EnhancedHeader />
      <InnerSEOPage />
      <Footer />
    </>
  );
}

