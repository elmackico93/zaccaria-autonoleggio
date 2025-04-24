import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/utils';

// Force static generation
export const dynamic = "force-static";

// Metadata function
export async function generateMetadata({ params }) {
  return createMetadata({
    title: "Transfer Aeroporto Brindisi - Servizio Navetta Premium",
    description: "Servizio di Transfer da/per l'Aeroporto di Brindisi. Auto Mercedes di lusso con autista privato. Prenota ora!",
    path: "/transfer-aeroporto-brindisi",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
export default function SEOPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "Il servizio di transfer include attesa in caso di ritardo del volo?",
    "answer": "Sì, monitoriamo costantemente lo stato dei voli e il servizio include fino a 60 minuti di attesa gratuita in caso di ritardi. Per ritardi superiori, ti terremo informato e adatteremo il servizio di conseguenza."
  },
  {
    "question": "Come riconosco l'autista all'arrivo in aeroporto?",
    "answer": "Il nostro autista ti attenderà nell'area arrivi con un cartello personalizzato con il tuo nome. Riceverai anche il contatto diretto dell'autista per facilitare l'incontro."
  },
  {
    "question": "È possibile fare fermate intermedie durante un transfer?",
    "answer": "Sì, è possibile richiedere fermate intermedie durante il transfer. Le soste brevi sono incluse nel servizio, mentre per soste più lunghe o deviazioni significative potrebbe essere applicato un supplemento."
  },
  {
    "question": "Qual è la differenza tra il vostro servizio di transfer e un normale taxi?",
    "answer": "Il nostro servizio di transfer è prenotabile in anticipo, utilizza esclusivamente vetture Mercedes-Benz di alta gamma, offre prezzi fissi (senza tassametro) e include servizi premium come Wi-Fi a bordo, acqua minerale e massima flessibilità."
  },
  {
    "question": "Il prezzo del transfer è per persona o per veicolo?",
    "answer": "Il prezzo indicato è per veicolo, non per persona. Questo significa che il costo resta invariato indipendentemente dal numero di passeggeri, fino alla capacità massima del veicolo scelto."
  }
];
  
  return (
    <main className="py-32 bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Transfer Aeroporto Brindisi - Servizio Navetta Premium",
          "description": "Servizio di Transfer da/per l'Aeroporto di Brindisi. Auto Mercedes di lusso con autista privato. Prenota ora!",
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
            "@type": "City",
            "name": "Brindisi"
          },
          "serviceType": "transfer",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        }) }}
      />
      
      {/* Page content */}
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
          Transfer Aeroporto Brindisi - Servizio Navetta Premium
        </h1>
        
        {/* Hero section with image */}
        <div className="relative h-80 w-full mb-12 border border-dark-silver">
          <Image 
            src="/images/service-cars.jpg"
            alt="Transfer Aeroporto Brindisi - Servizio Navetta Premium"
            fill
            className="object-cover"
            priority={true}
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="max-w-lg p-6">
              <p className="text-xl text-silver mb-6">
                Servizio di Transfer da/per l'Aeroporto di Brindisi. Auto Mercedes di lusso con autista privato. Prenota ora!
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
  <h2 className="text-3xl font-bold mb-6">Transfer Premium per Brindisi</h2>
  <p className="text-lg mb-4">
    Zaccaria NCC offre un servizio di transfer esclusivo da e per Brindisi con vetture Mercedes di ultima generazione e autisti professionisti.
    Il nostro servizio transfer garantisce puntualità, comfort e un'esperienza di viaggio senza stress.
  </p>
  <p className="text-lg mb-4">
    Che siate in viaggio per affari o per piacere, il nostro servizio transfer rappresenta la soluzione ideale per raggiungere Brindisi
    con il massimo comfort e stile, evitando le complicazioni dei mezzi pubblici o dei taxi standard.
  </p>
</section>

<section className="mb-12">
  <h2 className="text-3xl font-bold mb-6">Vantaggi del Nostro Servizio Transfer</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Puntualità Garantita</h3>
      <p className="text-silver">
        Monitoraggio costante dei voli e dei treni per garantire che l'autista sia sempre presente al vostro arrivo,
        anche in caso di ritardi.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Prezzo Fisso</h3>
      <p className="text-silver">
        Nessuna sorpresa o costo nascosto: il prezzo concordato al momento della prenotazione rimane invariato,
        indipendentemente da traffico o deviazioni.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Comfort Superiore</h3>
      <p className="text-silver">
        Viaggiate a bordo di Mercedes-Benz di ultima generazione, con aria condizionata, Wi-Fi gratuito
        e acqua minerale sempre disponibile.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Sicurezza</h3>
      <p className="text-silver">
        Autisti esperti e veicoli regolarmente controllati e sanificati. Ogni aspetto del viaggio
        è curato per garantire la massima sicurezza.
      </p>
    </div>
  </div>
</section>

<section className="mb-12">
  <h2 className="text-3xl font-bold mb-6">Tipologie di Transfer per Brindisi</h2>
  <ul className="space-y-4">
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Transfer Aeroportuali</h3>
        <p className="text-silver">Servizio da e per gli aeroporti di Brindisi e Bari, con assistenza bagagli e monitoraggio dei voli.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Transfer Stazione</h3>
        <p className="text-silver">Servizio da e per le principali stazioni ferroviarie di Puglia, con monitoraggio degli orari dei treni.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Transfer Intercity</h3>
        <p className="text-silver">Collegamenti diretti tra le principali città della Puglia, con possibilità di fermate intermedie.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Transfer per Eventi</h3>
        <p className="text-silver">Servizio dedicato per matrimoni, concerti, meeting aziendali e altri eventi speciali a Brindisi.</p>
      </div>
    </li>
  </ul>
</section>
        
        {/* FAQ Section with structured data */}
        <section className="mt-16">
  <h2 className="text-3xl font-bold mb-8">Domande Frequenti</h2>
  
  <div className="space-y-6">
    {faqs.map((faq, index) => (
      <div key={index} className="metal-card">
        <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
        <p className="text-silver">{faq.answer}</p>
      </div>
    ))}
  </div>
</section>
        
        {/* CTA Section */}
        <section className="mt-16 text-center">
          <p className="text-silver-metallic mb-6">
            Prenota ora il nostro servizio premium transfer per Brindisi
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
  );
}
