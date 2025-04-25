import EnhancedHeader from "@/components/layout/OptimizedHeader";
import Footer from "@/components/layout/Footer";
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FixedCallButton from '@/components/ui/FixedCallButton';

// Force static generation
export const dynamic = "force-static";

// Metadata function
export async function generateMetadata({ params }) {
  return createMetadata({
    title: "NCC Salento - Servizio con Autista Privato",
    description: "Servizio Premium di Noleggio Con Conducente nel Salento. Transfer, tour personalizzati e servizio business con autisti professionisti.",
    path: "/ncc-salento",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
function InnerSEOPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "Quali zone del Salento copre il vostro servizio NCC?",
    "answer": "Il nostro servizio NCC copre l'intera area del Salento, incluse tutte le località della provincia di Lecce come Otranto, Gallipoli, Porto Cesareo, Santa Maria di Leuca, e naturalmente il capoluogo Lecce. Serviamo anche le località costiere e dell'entroterra, raggiungendo qualsiasi destinazione richiesta."
  },
  {
    "question": "Come posso prenotare un servizio NCC nel Salento?",
    "answer": "Puoi prenotare il nostro servizio NCC chiamando il numero +39-331 346 7527, inviando un'email a info@zaccariaautonoleggio.it, o compilando il modulo di richiesta preventivo sul nostro sito. Ti risponderemo in brevissimo tempo con tutte le informazioni necessarie."
  },
  {
    "question": "Quali tipi di veicoli utilizzate per il servizio nel Salento?",
    "answer": "La nostra flotta comprende esclusivamente veicoli Mercedes-Benz di alta gamma: Mercedes Classe E, Mercedes Classe S per servizi executive, e Mercedes Classe V per gruppi fino a 7 passeggeri. Tutti i veicoli sono dotati di aria condizionata, Wi-Fi e comfort premium."
  },
  {
    "question": "Offrite tour personalizzati nel Salento?",
    "answer": "Sì, offriamo tour completamente personalizzati nel Salento, sia per le località costiere che per l'entroterra. Possiamo creare itinerari su misura basati sui tuoi interessi: spiagge, centri storici, tour enogastronomici, visite a masserie, e molto altro."
  },
  {
    "question": "Quanto costa mediamente un transfer dall'aeroporto di Brindisi alle località del Salento?",
    "answer": "Il costo del transfer dall'aeroporto di Brindisi alle località del Salento varia in base alla destinazione specifica. Per esempio, un transfer verso Lecce parte da €80, mentre per località più lontane come Gallipoli o Santa Maria di Leuca il prezzo parte da €120. Ti invitiamo a contattarci per un preventivo personalizzato."
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
            "name": "NCC Salento - Servizio con Autista Privato",
            "description": "Servizio Premium di Noleggio Con Conducente nel Salento. Transfer, tour personalizzati e servizio business con autisti professionisti.",
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
              "name": "Salento"
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
            NCC Salento - Servizio con Autista Privato
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src="/images/service-cars.jpg"
              alt="NCC Salento - Servizio con Autista Privato"
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  Servizio Premium di Noleggio Con Conducente nel Salento. Transfer, tour personalizzati e servizio business con autisti professionisti.
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
            <h2 className="text-3xl font-bold mb-6">Servizio NCC nel Salento di Alta Qualità</h2>
            <p className="text-lg mb-4">
              Zaccaria NCC offre un esclusivo servizio di noleggio con conducente nel Salento con autisti professionisti e una flotta di veicoli Mercedes-Benz.
              Il nostro servizio NCC garantisce puntualità, comfort e un'esperienza di viaggio all'insegna dell'eleganza.
            </p>
            <p className="text-lg mb-4">
              Che si tratti di transfer aeroportuali verso Lecce, Gallipoli, Otranto o altre località del Salento, tour enogastronomici o visite ai borghi storici,
              il nostro servizio di noleggio con conducente rappresenta la soluzione ideale per scoprire le meraviglie di questa terra.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio NCC nel Salento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Conoscenza del Territorio</h3>
                <p className="text-silver">
                  I nostri autisti sono profondi conoscitori del Salento, 
                  capaci di guidarti alle destinazioni più affascinanti e anche ai luoghi meno conosciuti ma di grande bellezza.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Flotta Mercedes Premium</h3>
                <p className="text-silver">
                  Viaggiate a bordo delle nostre Mercedes Classe E, Classe S o Classe V, 
                  dotate di ogni comfort e sempre in perfette condizioni.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Tour Personalizzati</h3>
                <p className="text-silver">
                  Creiamo itinerari su misura per farti scoprire le spiagge più belle,
                  i centri storici più affascinanti e le eccellenze enogastronomiche del Salento.
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Servizio 24/7</h3>
                <p className="text-silver">
                  Siamo disponibili 24 ore su 24, 7 giorni su 7, per garantirti il massimo
                  della flessibilità durante il tuo soggiorno nel Salento.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Servizi NCC Disponibili nel Salento</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Transfer Aeroportuali</h3>
                  <p className="text-silver">Transfer da e per gli aeroporti di Brindisi e Bari verso Lecce, Gallipoli, Otranto e tutte le località del Salento.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tour del Barocco Leccese</h3>
                  <p className="text-silver">Visita guidata di Lecce e del suo straordinario patrimonio barocco, con soste nei principali monumenti e piazze.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tour della Costa Salentina</h3>
                  <p className="text-silver">Escursione lungo le coste del Salento, con soste nelle spiagge e nei borghi marinari più caratteristici.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tour Enogastronomico Salentino</h3>
                  <p className="text-silver">Percorso alla scoperta dei sapori autentici del Salento, con visite a cantine, frantoi e aziende agricole locali.</p>
                </div>
              </li>
            </ul>
          </section>
          
          {/* The main destinations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Le Principali Destinazioni nel Salento</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Lecce</h3>
                <p className="text-silver">Il capoluogo salentino, conosciuto come la "Firenze del Sud" per il suo straordinario patrimonio barocco. Il centro storico ospita numerosi monumenti, tra cui la Basilica di Santa Croce e Piazza del Duomo.</p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Gallipoli</h3>
                <p className="text-silver">La "Città Bella" con il suo borgo antico situato su un'isola e collegato alla terraferma da un ponte. Famosa per le sue spiagge di sabbia fine, le sue acque cristalline e la vivace vita notturna.</p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Otranto</h3>
                <p className="text-silver">Il punto più orientale d'Italia, con il suo castello aragonese e la cattedrale con il famoso mosaico. Da non perdere la baia dei Turchi e le spiagge delle vicine laghi Alimini.</p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Santa Maria di Leuca</h3>
                <p className="text-silver">Il "tacco d'Italia" dove si incontrano il mar Adriatico e il mar Ionio. Famosa per il santuario De Finibus Terrae, le ville ottocentesche e le grotte marine lungo la costa.</p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Porto Cesareo</h3>
                <p className="text-silver">Località balneare sulla costa ionica con 17 km di spiagge di sabbia bianca e fondali bassi. L'area marina protetta offre un ecosistema unico con diverse specie marine.</p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-3">Castro</h3>
                <p className="text-silver">Divisa in Marina di Castro sul mare e Castro superiore in collina. Famosa per la Grotta della Zinzulusa, una delle più importanti grotte carsiche marine d'Italia.</p>
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
              Prenota ora il nostro servizio premium NCC per il Salento
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
