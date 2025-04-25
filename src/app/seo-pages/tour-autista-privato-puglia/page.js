import EnhancedHeader from "@/components/layout/OptimizedHeader";
import Footer from "@/components/layout/Footer";
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/utils';

// Force static generation
export const dynamic = "force-static";

// Metadata function
export async function generateMetadata({ params }) {
  return createMetadata({
    title: "Tour Con Autista Privato in Puglia - Escursioni Personalizzate",
    description: "Tour esclusivi in Puglia con autista privato. Visita Valle d'Itria, Salento e costa pugliese con comfort e stile.",
    path: "/tour-autista-privato-puglia",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
function InnerSEOPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "I tour sono personalizzabili in base ai nostri interessi?",
    "answer": "Assolutamente sì! Ogni tour può essere completamente personalizzato in base ai vostri interessi: enogastronomia, storia, arte, natura o shopping. Contattateci per creare insieme l'itinerario perfetto."
  },
  {
    "question": "Quanto dura un tour tipico in Puglia?",
    "answer": "La durata standard dei nostri tour è di 8 ore, permettendo di esplorare diverse località in una giornata. Offriamo anche tour di mezza giornata (4 ore) o tour estesi di più giorni con itinerari completi in tutta la Puglia."
  },
  {
    "question": "È inclusa una guida turistica nei vostri tour?",
    "answer": "I nostri autisti sono profondi conoscitori del territorio e forniranno informazioni durante il viaggio. Per una spiegazione più approfondita, possiamo organizzare una guida turistica certificata in diverse lingue con un supplemento."
  },
  {
    "question": "I tour includono biglietti d'ingresso o pasti?",
    "answer": "I tour includono trasporto e servizio autista. Biglietti d'ingresso, pasti e guide turistiche possono essere aggiunti su richiesta. Offriamo anche pacchetti all-inclusive con degustazioni in cantine e frantoi selezionati."
  },
  {
    "question": "Possiamo essere prelevati direttamente dal nostro hotel?",
    "answer": "Sì, tutti i nostri tour includono il prelievo e il rientro presso il vostro hotel o alloggio in Puglia, senza costi aggiuntivi se situato nelle aree principali della regione."
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
          "name": "Tour Con Autista Privato in Puglia - Escursioni Personalizzate",
          "description": "Tour esclusivi in Puglia con autista privato. Visita Valle d'Itria, Salento e costa pugliese con comfort e stile.",
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
            "name": "Puglia"
          },
          "serviceType": "tour",
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
          Tour Con Autista Privato in Puglia - Escursioni Personalizzate
        </h1>
        
        {/* Hero section with image */}
        <div className="relative h-80 w-full mb-12 border border-dark-silver">
          <Image 
            src="/images/service-cars.jpg"
            alt="Tour Con Autista Privato in Puglia - Escursioni Personalizzate"
            fill
            className="object-cover"
            priority={true}
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="max-w-lg p-6">
              <p className="text-xl text-silver mb-6">
                Tour esclusivi in Puglia con autista privato. Visita Valle d'Itria, Salento e costa pugliese con comfort e stile.
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
  <h2 className="text-3xl font-bold mb-6">Tour con Autista Privato in Puglia</h2>
  <p className="text-lg mb-4">
    Zaccaria NCC offre tour esclusivi con autista privato alla scoperta di Puglia e delle meraviglie della Puglia.
    I nostri tour personalizzati permettono di esplorare in totale comfort e libertà i luoghi più affascinanti della regione.
  </p>
  <p className="text-lg mb-4">
    Con un autista privato a vostra disposizione, potrete godere di un'esperienza di viaggio su misura, con soste a richiesta,
    itinerari flessibili e consigli locali che solo un professionista del territorio può offrire.
  </p>
</section>

<section className="mb-12">
  <h2 className="text-3xl font-bold mb-6">I Vantaggi di un Tour con Autista Privato</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Itinerari Personalizzati</h3>
      <p className="text-silver">
        Creiamo tour su misura in base ai vostri interessi: dalle località storiche e culturali alla scoperta 
        enogastronomica, dalle spiagge alle esperienze uniche.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Nessun Problema di Parcheggio</h3>
      <p className="text-silver">
        Dimenticatevi dello stress di trovare parcheggio nei centri storici o di orientarvi su strade sconosciute: 
        il vostro autista vi accompagnerà ovunque.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Conoscenza Locale</h3>
      <p className="text-silver">
        I nostri autisti sono profondi conoscitori del territorio e vi suggeriranno i migliori ristoranti,
        le botteghe artigiane e i luoghi meno turistici ma di grande fascino.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Comfort e Relax</h3>
      <p className="text-silver">
        Viaggiate su Mercedes di ultima generazione con aria condizionata, Wi-Fi a bordo e acqua minerale inclusa,
        godendovi il paesaggio senza stress.
      </p>
    </div>
  </div>
</section>

<section className="mb-12">
  <h2 className="text-3xl font-bold mb-6">I Nostri Tour Più Richiesti</h2>
  <ul className="space-y-4">
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Tour dei Borghi Bianchi</h3>
        <p className="text-silver">Visita di Ostuni, Cisternino, Locorotondo e Alberobello con i suoi famosi trulli UNESCO.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Tour Enogastronomico</h3>
        <p className="text-silver">Visita a frantoi, cantine e masserie con degustazione di prodotti tipici pugliesi.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Tour delle Città d'Arte</h3>
        <p className="text-silver">Lecce con il suo barocco, Bari vecchia, Monopoli e Polignano a Mare con le loro viste mozzafiato.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Tour delle Spiagge</h3>
        <p className="text-silver">Esplorazione delle calette più belle e caratteristiche della costa pugliese, da Torre Guaceto al Salento.</p>
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
            Prenota ora il nostro servizio premium tour per Puglia
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

export default function PageWrapper() {
  return (
    <>
      <EnhancedHeader />
      <InnerSEOPage />
      <Footer />
    </>
  );
}
