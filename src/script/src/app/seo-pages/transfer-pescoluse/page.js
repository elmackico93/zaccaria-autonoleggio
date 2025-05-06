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
    title: "Transfer per Pescoluse - Servizio Premium",
    description: "Servizio di Transfer privato per Pescoluse con auto Mercedes e autisti esperti. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.",
    path: "/transfer-pescoluse",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
export default function LocationPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "Il transfer per Pescoluse include l'attesa in caso di ritardo del volo?",
    "answer": "Sì, monitoriamo costantemente lo stato dei voli e il servizio include fino a 60 minuti di attesa gratuita in caso di ritardi. Per ritardi superiori, ti terremo informato e adatteremo il servizio di conseguenza."
  },
  {
    "question": "Come riconosco l'autista all'arrivo a Pescoluse?",
    "answer": "Il nostro autista ti attenderà con un cartello personalizzato con il tuo nome. Riceverai anche il contatto diretto dell'autista per facilitare l'incontro a Pescoluse."
  },
  {
    "question": "È possibile fare fermate intermedie durante il transfer verso Pescoluse?",
    "answer": "Sì, è possibile richiedere fermate intermedie durante il transfer per Pescoluse. Le soste brevi sono incluse nel servizio, mentre per soste più lunghe potrebbe essere applicato un supplemento."
  },
  {
    "question": "Il prezzo del transfer è per persona o per veicolo?",
    "answer": "Il prezzo indicato è per veicolo, non per persona. Questo significa che il costo resta invariato indipendentemente dal numero di passeggeri, fino alla capacità massima del veicolo scelto."
  }
];
  
  return (
    <>
      <EnhancedHeader />
      <main className="py-32 bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Il transfer per Pescoluse include l'attesa in caso di ritardo del volo?","acceptedAnswer":{"@type":"Answer","text":"Sì, monitoriamo costantemente lo stato dei voli e il servizio include fino a 60 minuti di attesa gratuita in caso di ritardi. Per ritardi superiori, ti terremo informato e adatteremo il servizio di conseguenza."}},{"@type":"Question","name":"Come riconosco l'autista all'arrivo a Pescoluse?","acceptedAnswer":{"@type":"Answer","text":"Il nostro autista ti attenderà con un cartello personalizzato con il tuo nome. Riceverai anche il contatto diretto dell'autista per facilitare l'incontro a Pescoluse."}},{"@type":"Question","name":"È possibile fare fermate intermedie durante il transfer verso Pescoluse?","acceptedAnswer":{"@type":"Answer","text":"Sì, è possibile richiedere fermate intermedie durante il transfer per Pescoluse. Le soste brevi sono incluse nel servizio, mentre per soste più lunghe potrebbe essere applicato un supplemento."}},{"@type":"Question","name":"Il prezzo del transfer è per persona o per veicolo?","acceptedAnswer":{"@type":"Answer","text":"Il prezzo indicato è per veicolo, non per persona. Questo significa che il costo resta invariato indipendentemente dal numero di passeggeri, fino alla capacità massima del veicolo scelto."}}]}) }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Transfer per Pescoluse","description":"Servizio di Transfer privato per Pescoluse con auto Mercedes e autisti esperti. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.","provider":{"@type":"LocalBusiness","name":"Zaccaria NCC","telephone":"+39-331 346 7527","email":"info@zaccariaautonoleggio.it","address":{"@type":"PostalAddress","streetAddress":"Via Armando Diaz, 91","addressLocality":"Ostuni","addressRegion":"BR","postalCode":"72017","addressCountry":"IT"},"image":"https://www.zaccariaautonoleggio.it/images/logo.jpg"},"areaServed":{"@type":"City","name":"Pescoluse"},"serviceType":"transfer","offers":{"@type":"Offer","price":"0","priceCurrency":"EUR","availability":"https://schema.org/InStock"}}) }}
        />
        
        {/* Page content */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            Transfer per Pescoluse - Servizio Premium
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src="/images/service-cars.jpg"
              alt="Transfer per Pescoluse"
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  Servizio di Transfer privato per Pescoluse con auto Mercedes e autisti esperti. Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.
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
            <h2 className="text-3xl font-bold mb-6">Transfer per Pescoluse</h2>
            <p className="text-lg mb-4">
              Zaccaria NCC offre un servizio premium di transfer privato a Pescoluse. 
              Con i nostri autisti professionisti e la nostra flotta di veicoli Mercedes, garantiamo un'esperienza 
              di viaggio all'insegna del comfort e dell'eleganza.
            </p>
            <p className="text-lg mb-4">
              Il nostro servizio di transfer da e per Pescoluse è la soluzione ideale per chi desidera raggiungere la propria destinazione con il massimo comfort e senza stress, evitando le complicazioni dei mezzi pubblici o dei taxi standard.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio a Pescoluse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Conoscenza del Territorio</h3>
                <p className="text-silver">
                  I nostri autisti sono profondi conoscitori di Pescoluse e della Puglia, garantendo un'esperienza autentica.
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
            <h2 className="text-3xl font-bold mb-6">Servizi Disponibili a Pescoluse</h2>
            <ul className="space-y-4">
              
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Transfer Aeroporto di Bari - Pescoluse</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Transfer Aeroporto di Brindisi - Pescoluse</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Transfer Stazione FS - Pescoluse</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Transfer Porto - Pescoluse</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-silver">Transfer intercity Puglia - Pescoluse</p>
                </div>
              </li>
            </ul>
          </section>
          
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Cosa Visitare a Pescoluse</h2>
            <div className="metal-card">
              <p className="text-silver mb-4">
                Conosciute come le Maldive del Salento per le acque turchesi e la sabbia bianca.
              </p>
              <p className="text-silver">
                Con il nostro servizio di transfer privato, potrai scoprire tutte le meraviglie di Pescoluse 
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
              Prenota ora il nostro servizio premium transfer per Pescoluse
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