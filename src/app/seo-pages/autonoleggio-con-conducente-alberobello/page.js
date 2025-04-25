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
    title: "Autonoleggio Con Conducente Alberobello - Servizio NCC",
    description: "Servizio di Autonoleggio Con Conducente ad Alberobello. Visita i Trulli con autista privato e auto di lusso.",
    path: "/autonoleggio-con-conducente-alberobello",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
function InnerSEOPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "Cosa significa NCC?",
    "answer": "NCC significa Noleggio Con Conducente, un servizio di trasporto privato con autista professionale che offre un'esperienza di viaggio personalizzata e di alta qualità, diversa dal comune servizio taxi."
  },
  {
    "question": "Come posso prenotare un servizio NCC?",
    "answer": "Puoi prenotare il nostro servizio NCC chiamando il numero +39-331 346 7527, inviando un'email a info@zaccariaautonoleggio.it, o compilando il modulo di richiesta preventivo sul nostro sito."
  },
  {
    "question": "Quali tipi di veicoli offrite per il servizio NCC?",
    "answer": "La nostra flotta comprende esclusivamente veicoli Mercedes-Benz di alta gamma: Mercedes Classe E, Mercedes Classe S per servizi executive, e Mercedes Classe V per gruppi fino a 7 passeggeri."
  },
  {
    "question": "È necessario prenotare con anticipo?",
    "answer": "Consigliamo di prenotare con almeno 24-48 ore di anticipo per garantire la disponibilità, soprattutto in alta stagione o per servizi speciali, ma siamo disponibili anche per richieste last-minute in base alla disponibilità."
  },
  {
    "question": "Quali sono i metodi di pagamento accettati?",
    "answer": "Accettiamo pagamenti in contanti, carte di credito/debito (Visa, Mastercard, American Express), bonifici bancari e pagamenti elettronici (PayPal)."
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
          "name": "Autonoleggio Con Conducente Alberobello - Servizio NCC",
          "description": "Servizio di Autonoleggio Con Conducente ad Alberobello. Visita i Trulli con autista privato e auto di lusso.",
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
            "name": "Alberobello"
          },
          "serviceType": "ncc",
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
          Autonoleggio Con Conducente Alberobello - Servizio NCC
        </h1>
        
        {/* Hero section with image */}
        <div className="relative h-80 w-full mb-12 border border-dark-silver">
          <Image 
            src="/images/service-cars.jpg"
            alt="Autonoleggio Con Conducente Alberobello - Servizio NCC"
            fill
            className="object-cover"
            priority={true}
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="max-w-lg p-6">
              <p className="text-xl text-silver mb-6">
                Servizio di Autonoleggio Con Conducente ad Alberobello. Visita i Trulli con autista privato e auto di lusso.
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
  <h2 className="text-3xl font-bold mb-6">Servizio NCC a Alberobello di Alta Qualità</h2>
  <p className="text-lg mb-4">
    Zaccaria NCC offre un esclusivo servizio di noleggio con conducente a Alberobello con autisti professionisti e una flotta di veicoli Mercedes-Benz.
    Il nostro servizio NCC garantisce puntualità, comfort e un'esperienza di viaggio all'insegna dell'eleganza.
  </p>
  <p className="text-lg mb-4">
    Che si tratti di transfer aeroportuali, spostamenti di lavoro o tour turistici a Alberobello e dintorni, il nostro servizio di noleggio con conducente
    rappresenta la soluzione ideale per chi cerca un trasporto privato di alta qualità.
  </p>
</section>

<section className="mb-12">
  <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio NCC a Alberobello</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Flotta Mercedes Premium</h3>
      <p className="text-silver">
        Viaggiate a bordo delle nostre Mercedes Classe E, Classe S o Classe V, 
        dotate di ogni comfort e sempre in perfette condizioni.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Autisti Professionisti</h3>
      <p className="text-silver">
        I nostri autisti conoscono perfettamente Alberobello e la Puglia, parlano italiano e inglese,
        e garantiscono un servizio cortese e professionale.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Servizio Personalizzato</h3>
      <p className="text-silver">
        Ogni servizio è su misura: orari flessibili, itinerari personalizzati
        e attenzione alle vostre esigenze specifiche.
      </p>
    </div>
    <div className="metal-card">
      <h3 className="text-xl font-semibold mb-4">Prezzo Trasparente</h3>
      <p className="text-silver">
        Tariffe chiare senza sorprese: il preventivo che riceverete includerà
        tutti i costi del servizio NCC a Alberobello.
      </p>
    </div>
  </div>
</section>

<section className="mb-12">
  <h2 className="text-3xl font-bold mb-6">Servizi NCC Disponibili a Alberobello</h2>
  <ul className="space-y-4">
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Transfer Aeroportuali</h3>
        <p className="text-silver">Transfer da e per gli aeroporti di Brindisi e Bari, con monitoraggio dei voli e assistenza bagagli.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Servizio Business</h3>
        <p className="text-silver">Trasporto executive per professionisti e aziende, con massima puntualità e riservatezza.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Tour Turistici Privati</h3>
        <p className="text-silver">Escursioni personalizzate a Alberobello e nei dintorni con autista a vostra disposizione.</p>
      </div>
    </li>
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">Servizio Cerimonie</h3>
        <p className="text-silver">Auto di lusso con conducente per matrimoni ed eventi speciali con decorazioni personalizzate.</p>
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
            Prenota ora il nostro servizio premium ncc per Alberobello
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
