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
    title: "Servizio NCC a Torre dell'Orso - Servizio Premium",
    description: "Servizio di Noleggio Con Conducente a Torre dell'Orso con auto Mercedes e autisti professionisti. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.",
    path: "/ncc-torre-dellorso",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
export default function LocationPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "Come posso prenotare un servizio NCC a Torre dell'Orso?",
    "answer": "Puoi prenotare il nostro servizio NCC a Torre dell'Orso chiamando il numero +39-331 346 7527, inviando un'email a info@zaccariaautonoleggio.it, o compilando il modulo di richiesta preventivo sul nostro sito."
  },
  {
    "question": "Quanto costa mediamente un servizio NCC a Torre dell'Orso?",
    "answer": "Il costo del servizio NCC a Torre dell'Orso varia in base alla durata, al tipo di veicolo e ai servizi richiesti. Contattaci per un preventivo personalizzato senza impegno."
  },
  {
    "question": "Le vostre auto hanno l'aria condizionata per il caldo pugliese?",
    "answer": "Assolutamente sì! Tutte le nostre Mercedes sono dotate di climatizzazione di ultima generazione, garantendo il massimo comfort anche nelle giornate più calde a Torre dell'Orso."
  },
  {
    "question": "Posso prenotare un'auto con conducente per più giorni a Torre dell'Orso?",
    "answer": "Certamente! Offriamo pacchetti personalizzati per più giorni a Torre dell'Orso e dintorni, con tariffe agevolate per soggiorni prolungati."
  }
];
  
  return (
    <>
      <EnhancedHeader />
      <main className="py-32 bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Come posso prenotare un servizio NCC a Torre dell'Orso?","acceptedAnswer":{"@type":"Answer","text":"Puoi prenotare il nostro servizio NCC a Torre dell'Orso chiamando il numero +39-331 346 7527, inviando un'email a info@zaccariaautonoleggio.it, o compilando il modulo di richiesta preventivo sul nostro sito."}},{"@type":"Question","name":"Quanto costa mediamente un servizio NCC a Torre dell'Orso?","acceptedAnswer":{"@type":"Answer","text":"Il costo del servizio NCC a Torre dell'Orso varia in base alla durata, al tipo di veicolo e ai servizi richiesti. Contattaci per un preventivo personalizzato senza impegno."}},{"@type":"Question","name":"Le vostre auto hanno l'aria condizionata per il caldo pugliese?","acceptedAnswer":{"@type":"Answer","text":"Assolutamente sì! Tutte le nostre Mercedes sono dotate di climatizzazione di ultima generazione, garantendo il massimo comfort anche nelle giornate più calde a Torre dell'Orso."}},{"@type":"Question","name":"Posso prenotare un'auto con conducente per più giorni a Torre dell'Orso?","acceptedAnswer":{"@type":"Answer","text":"Certamente! Offriamo pacchetti personalizzati per più giorni a Torre dell'Orso e dintorni, con tariffe agevolate per soggiorni prolungati."}}]}) }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Servizio NCC a Torre dell'Orso","description":"Servizio di Noleggio Con Conducente a Torre dell'Orso con auto Mercedes e autisti professionisti. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.","provider":{"@type":"LocalBusiness","name":"Zaccaria NCC","telephone":"+39-331 346 7527","email":"info@zaccariaautonoleggio.it","address":{"@type":"PostalAddress","streetAddress":"Via Armando Diaz, 91","addressLocality":"Ostuni","addressRegion":"BR","postalCode":"72017","addressCountry":"IT"},"image":"https://www.zaccariaautonoleggio.it/images/logo.jpg"},"areaServed":{"@type":"City","name":"Torre dell'Orso"},"serviceType":"ncc","offers":{"@type":"Offer","price":"0","priceCurrency":"EUR","availability":"https://schema.org/InStock"}}) }}
        />
        
        {/* Page content */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            Servizio NCC a Torre dell'Orso - Servizio Premium
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src="/images/service-cars.jpg"
              alt="Servizio NCC a Torre dell'Orso"
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  Servizio di Noleggio Con Conducente a Torre dell'Orso con auto Mercedes e autisti professionisti. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.
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
            <h2 className="text-3xl font-bold mb-6">Servizio NCC a Torre dell'Orso</h2>
            <p className="text-lg mb-4">
              Zaccaria NCC offre un servizio premium di noleggio con conducente a Torre dell'Orso. 
              Con i nostri autisti professionisti e la nostra flotta di veicoli Mercedes, garantiamo un'esperienza 
              di viaggio all'insegna del comfort e dell'eleganza.
            </p>
            <p className="text-lg mb-4">
              Che si tratti di transfer aeroportuali, spostamenti di lavoro o tour turistici di Torre dell'Orso e dintorni, il nostro servizio di noleggio con conducente rappresenta la soluzione ideale per chi cerca un trasporto privato di alta qualità.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio a Torre dell'Orso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Conoscenza del Territorio</h3>
                <p className="text-silver">
                  I nostri autisti sono profondi conoscitori di Torre dell'Orso e della Puglia, garantendo un'esperienza autentica.
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
            <h2 className="text-3xl font-bold mb-6">Servizi Disponibili a Torre dell'Orso</h2>
            <ul className="space-y-4">
              
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Transfer aeroportuali da/per Torre dell'Orso</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Tour privati di Torre dell'Orso e dintorni</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Servizio business per aziende e professionisti</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Trasferimenti intercity in Puglia</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Servizio disponibile 24/7</p>
                </div>
              </li>
            </ul>
          </section>
          
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Cosa Visitare a Torre dell'Orso</h2>
            <div className="metal-card">
              <p className="text-silver mb-4">
                Splendida spiaggia con la famosa formazione rocciosa delle Due Sorelle.
              </p>
              <p className="text-silver">
                Con il nostro servizio di noleggio con conducente, potrai scoprire tutte le meraviglie di Torre dell'Orso 
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
              Prenota ora il nostro servizio premium ncc per Torre dell'Orso
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