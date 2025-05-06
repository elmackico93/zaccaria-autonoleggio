import EnhancedHeader from "@/components/layout/OptimizedHeader";
import Footer from "@/components/layout/Footer";
import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/utils';
import FixedCallButton from '@/components/ui/FixedCallButton';

// Force static generation
export const dynamic = "force-static";

// Metadata function
export async function generateMetadata({ params }) {
  return createMetadata({
    title: "Tour di Baia dei Turchi - Servizio Premium",
    description: "Tour esclusivo di Baia dei Turchi con autista privato e Mercedes di alta gamma. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.",
    path: "/tour-baia-dei-turchi",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
export default function LocationPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "Quanto dura un tour tipico di Baia dei Turchi?",
    "answer": "La durata standard dei nostri tour di Baia dei Turchi è di 4-8 ore, a seconda dell'itinerario scelto. Offriamo anche tour di mezza giornata o tour estesi su misura."
  },
  {
    "question": "I tour di Baia dei Turchi sono personalizzabili?",
    "answer": "Assolutamente sì! Ogni tour di Baia dei Turchi può essere completamente personalizzato in base ai vostri interessi: arte, storia, enogastronomia, natura o shopping."
  },
  {
    "question": "È inclusa una guida turistica nei tour di Baia dei Turchi?",
    "answer": "I nostri autisti sono profondi conoscitori di Baia dei Turchi e forniranno informazioni durante il viaggio. Per una spiegazione più approfondita, possiamo organizzare una guida turistica certificata con un supplemento."
  },
  {
    "question": "I tour di Baia dei Turchi includono biglietti d'ingresso o pasti?",
    "answer": "I tour includono trasporto e servizio autista. Biglietti d'ingresso, pasti e guide turistiche possono essere aggiunti su richiesta. Offriamo anche pacchetti all-inclusive per Baia dei Turchi."
  }
];
  
  return (
    <>
      <EnhancedHeader />
      <main className="py-32 bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Quanto dura un tour tipico di Baia dei Turchi?","acceptedAnswer":{"@type":"Answer","text":"La durata standard dei nostri tour di Baia dei Turchi è di 4-8 ore, a seconda dell'itinerario scelto. Offriamo anche tour di mezza giornata o tour estesi su misura."}},{"@type":"Question","name":"I tour di Baia dei Turchi sono personalizzabili?","acceptedAnswer":{"@type":"Answer","text":"Assolutamente sì! Ogni tour di Baia dei Turchi può essere completamente personalizzato in base ai vostri interessi: arte, storia, enogastronomia, natura o shopping."}},{"@type":"Question","name":"È inclusa una guida turistica nei tour di Baia dei Turchi?","acceptedAnswer":{"@type":"Answer","text":"I nostri autisti sono profondi conoscitori di Baia dei Turchi e forniranno informazioni durante il viaggio. Per una spiegazione più approfondita, possiamo organizzare una guida turistica certificata con un supplemento."}},{"@type":"Question","name":"I tour di Baia dei Turchi includono biglietti d'ingresso o pasti?","acceptedAnswer":{"@type":"Answer","text":"I tour includono trasporto e servizio autista. Biglietti d'ingresso, pasti e guide turistiche possono essere aggiunti su richiesta. Offriamo anche pacchetti all-inclusive per Baia dei Turchi."}}]}) }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Tour di Baia dei Turchi","description":"Tour esclusivo di Baia dei Turchi con autista privato e Mercedes di alta gamma. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.","provider":{"@type":"LocalBusiness","name":"Zaccaria NCC","telephone":"+39-331 346 7527","email":"info@zaccariaautonoleggio.it","address":{"@type":"PostalAddress","streetAddress":"Via Armando Diaz, 91","addressLocality":"Ostuni","addressRegion":"BR","postalCode":"72017","addressCountry":"IT"},"image":"https://www.zaccariaautonoleggio.it/images/logo.jpg"},"areaServed":{"@type":"City","name":"Baia dei Turchi"},"serviceType":"tour","offers":{"@type":"Offer","price":"0","priceCurrency":"EUR","availability":"https://schema.org/InStock"}}) }}
        />
        
        {/* Page content */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            Tour di Baia dei Turchi - Servizio Premium
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src="/images/tour-puglia.jpg"
              alt="Tour di Baia dei Turchi"
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  Tour esclusivo di Baia dei Turchi con autista privato e Mercedes di alta gamma. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.
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
            <h2 className="text-3xl font-bold mb-6">Tour di Baia dei Turchi</h2>
            <p className="text-lg mb-4">
              Zaccaria NCC offre un servizio premium di tour esclusivi a Baia dei Turchi. 
              Con i nostri autisti professionisti e la nostra flotta di veicoli Mercedes, garantiamo un'esperienza 
              di viaggio all'insegna del comfort e dell'eleganza.
            </p>
            <p className="text-lg mb-4">
              I nostri tour di Baia dei Turchi sono progettati per offrirti un'esperienza autentica e indimenticabile, con itinerari personalizzati e un autista privato a tua completa disposizione.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio a Baia dei Turchi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Conoscenza del Territorio</h3>
                <p className="text-silver">
                  I nostri autisti sono profondi conoscitori di Baia dei Turchi e della Puglia, garantendo un'esperienza autentica.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Comfort e Stile</h3>
                <p className="text-silver">
                  Viaggiate a bordo delle nostre Mercedes di alta gamma, con interni lussuosi e tutti i comfort.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Servizio Personalizzato</h3>
                <p className="text-silver">
                  Itinerari flessibili e adattabili alle vostre esigenze, con soste fotografiche e consigli locali.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Puntualità Garantita</h3>
                <p className="text-silver">
                  Rispettiamo rigorosamente gli orari concordati, monitorando costantemente voli e treni in caso di trasferimenti.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Servizi Disponibili a Baia dei Turchi</h2>
            <ul className="space-y-4">
              
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Tour del centro storico di Baia dei Turchi</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Tour enogastronomico a Baia dei Turchi</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Escursioni naturalistiche nei dintorni di Baia dei Turchi</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Tour fotografico di Baia dei Turchi</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Tour personalizzati di Baia dei Turchi su richiesta</p>
                </div>
              </li>
            </ul>
          </section>
          
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Cosa Visitare a Baia dei Turchi</h2>
            <div className="metal-card">
              <p className="text-silver mb-4">
                Spiaggia incontaminata con acque cristalline e pineta mediterranea.
              </p>
              <p className="text-silver">
                Con il nostro servizio di tour guidato, potrai scoprire tutte le meraviglie di Baia dei Turchi 
                nel massimo comfort e con la flessibilità di un autista privato a tua disposizione.
              </p>
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
              Prenota ora il nostro servizio premium tour per Baia dei Turchi
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