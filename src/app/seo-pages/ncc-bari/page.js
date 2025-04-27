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
    title: "NCC Bari - Servizio con Autista Privato e Transfer Aeroporto",
    description: "Servizio Premium di Noleggio Con Conducente a Bari e provincia. Transfer aeroporto Bari Palese, tour della città e servizio business con autisti professionisti.",
    path: "/ncc-bari",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
function InnerSEOPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "Quanto tempo prima devo prenotare un transfer dall'aeroporto di Bari?",
    "answer": "Per garantire la disponibilità, consigliamo di prenotare il transfer dall'aeroporto di Bari con almeno 24-48 ore di anticipo. Tuttavia, possiamo gestire anche richieste last-minute in base alla disponibilità dei nostri veicoli. In alta stagione è consigliabile prenotare con maggiore anticipo."
  },
  {
    "question": "Offrite monitor del volo in caso di ritardi all'aeroporto di Bari?",
    "answer": "Sì, monitoriamo costantemente lo stato di tutti i voli in arrivo all'aeroporto di Bari Palese. In caso di ritardi, il nostro autista adatterà l'orario di prelievo senza costi aggiuntivi e sarà presente al tuo arrivo, indipendentemente dall'ora."
  },
  {
    "question": "Quali zone di Bari e provincia copre il vostro servizio NCC?",
    "answer": "Il nostro servizio NCC copre l'intera città di Bari, l'aeroporto di Bari Palese, il porto e tutte le località della provincia, incluse Polignano a Mare, Monopoli, Alberobello, Locorotondo, Conversano e Putignano. Serviamo anche connessioni con altre province pugliesi."
  },
  {
    "question": "Quanto costa un transfer dall'aeroporto di Bari al centro città?",
    "answer": "Il costo di un transfer dall'aeroporto di Bari al centro città parte da €50. Per preventivi precisi verso altre destinazioni, ti invitiamo a contattarci direttamente specificando punto di partenza, destinazione, numero di passeggeri e bagagli."
  },
  {
    "question": "Posso prenotare un servizio NCC a Bari per un'intera giornata?",
    "answer": "Certamente! Offriamo il servizio di noleggio con conducente a Bari a ore o a giornata intera. Un autista e un veicolo Mercedes saranno a tua disposizione per l'intera giornata, permettendoti di visitare più località senza preoccuparti di spostamenti e parcheggi."
  }
];
  
  return (
    <>
      <Header />
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
            "name": "NCC Bari - Servizio con Autista Privato e Transfer Aeroporto",
            "description": "Servizio Premium di Noleggio Con Conducente a Bari e provincia. Transfer aeroporto Bari Palese, tour della città e servizio business con autisti professionisti.",
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
              "name": "Bari"
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
            NCC Bari - Servizio con Autista Privato
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src="/images/service-cars.jpg"
              alt="NCC Bari - Servizio con Autista Privato"
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  Servizio Premium di Noleggio Con Conducente a Bari. Transfer aeroportuali, tour della città e servizio business con autisti professionisti.
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
            <h2 className="text-3xl font-bold mb-6">Servizio NCC a Bari di Alta Qualità</h2>
            <p className="text-lg mb-4">
              Zaccaria NCC offre un esclusivo servizio di noleggio con conducente a Bari con autisti professionisti e una flotta di veicoli Mercedes-Benz.
              Il nostro servizio NCC garantisce puntualità, comfort e un'esperienza di viaggio all'insegna dell'eleganza.
            </p>
            <p className="text-lg mb-4">
              Che si tratti di transfer dall'aeroporto di Bari Palese, spostamenti di lavoro in città o tour turistici a Bari e provincia,
              il nostro servizio di noleggio con conducente rappresenta la soluzione ideale per chi cerca un trasporto privato di alta qualità.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio NCC a Bari</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Transfer Aeroportuali Puntuali</h3>
                <p className="text-silver">
                  Monitoraggio costante dei voli in arrivo all'aeroporto di Bari Palese, 
                  per garantire che l'autista sia sempre presente al tuo arrivo, anche in caso di ritardi.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Flotta Mercedes Premium</h3>
                <p className="text-silver">
                  Viaggia a bordo delle nostre Mercedes Classe E, Classe S o Classe V, 
                  dotate di ogni comfort e sempre in perfette condizioni.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Autisti Professionisti</h3>
                <p className="text-silver">
                  I nostri autisti sono profondi conoscitori di Bari e della Puglia, 
                  parlano italiano e inglese, e garantiscono un servizio cortese e professionale.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Prezzo Trasparente</h3>
                <p className="text-silver">
                  Tariffe chiare senza sorprese: il preventivo che riceverai includerà
                  tutti i costi del servizio NCC a Bari.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Servizi NCC Disponibili a Bari</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Transfer Aeroporto Bari Palese</h3>
                  <p className="text-silver">Servizio di transfer dall'aeroporto di Bari verso qualsiasi destinazione in città o in Puglia, con monitoraggio voli e assistenza bagagli.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tour di Bari Vecchia</h3>
                  <p className="text-silver">Visita guidata del centro storico di Bari, con le sue strade tortuose, le chiese storiche e l'affascinante lungomare.</p>
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
                  <p className="text-silver">Trasporto executive per professionisti e aziende, con massima puntualità e riservatezza per i tuoi impegni di lavoro a Bari.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tour della Provincia di Bari</h3>
                  <p className="text-silver">Escursioni alle principali attrazioni della provincia, come Polignano a Mare, Monopoli, Alberobello e Locorotondo.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Main attractions section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Le Principali Attrazioni di Bari</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Basilica di San Nicola</h3>
                <p className="text-silver">Importante luogo di pellegrinaggio, questa basilica romanica custodisce le reliquie di San Nicola ed è un simbolo di Bari. La sua architettura e i preziosi interni la rendono una tappa imperdibile.</p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Bari Vecchia</h3>
                <p className="text-silver">Il centro storico di Bari, un intricato labirinto di stradine dove potrete osservare le signore preparare le orecchiette fatte a mano, visitare la Cattedrale di San Sabino e immergervi nella vita autentica barese.</p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Lungomare Nazario Sauro</h3>
                <p className="text-silver">Uno dei lungomare più belli d'Italia, perfetto per passeggiate panoramiche con vista sul mare Adriatico. Al tramonto offre uno spettacolo particolarmente suggestivo.</p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Castello Svevo</h3>
                <p className="text-silver">Imponente fortezza normanno-sveva costruita nel XII secolo e successivamente modificata da Federico II. Oggi ospita mostre temporanee ed eventi culturali.</p>
              </div>
            </div>
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
              Prenota ora il nostro servizio premium NCC per Bari
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

export default function PageWrapper() {
  return (
    <>
      <EnhancedHeader />
      <InnerSEOPage />
      <Footer />
    </>
  );
}
