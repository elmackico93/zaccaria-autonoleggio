/**
 * SEO Page Generator for Zaccaria NCC
 * 
 * This script creates a new SEO landing page based on provided parameters
 * 
 * Usage: node src/app/seo-pages/generator/create-page.js "ncc-polignano-mare" "NCC Polignano a Mare" "Polignano a Mare" "ncc"
 * 
 * Arguments:
 * 1. slug - URL path (e.g., "ncc-polignano-mare")
 * 2. title - Page title (e.g., "NCC Polignano a Mare")
 * 3. location - Location name (e.g., "Polignano a Mare")
 * 4. type - Service type: "ncc", "transfer", "tour", or "rental"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('Error: Insufficient arguments');
  console.log('Usage: node src/app/seo-pages/generator/create-page.js "slug" "Title" "Location" "type"');
  console.log('Type must be one of: ncc, transfer, tour, rental');
  process.exit(1);
}

const slug = args[0];
const title = args[1];
const location = args[2];
const type = args[3].toLowerCase();

// Validate service type
const validTypes = ['ncc', 'transfer', 'tour', 'rental'];
if (!validTypes.includes(type)) {
  console.error(`Error: Invalid type "${type}". Must be one of: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Create directory for the new page
const pageDir = path.join(__dirname, '..', slug);
if (!fs.existsSync(pageDir)) {
  fs.mkdirSync(pageDir, { recursive: true });
}

// Set description based on type and location
let description = '';
let imageUrl = '/images/service-cars.jpg';

switch (type) {
  case 'ncc':
    description = `Servizio Premium di Noleggio Con Conducente a ${location}. Transfer, tour personalizzati e servizio business con autisti professionisti.`;
    break;
  case 'transfer':
    description = `Servizio di Transfer da/per ${location}. Auto Mercedes di lusso con autista privato per un viaggio confortevole e puntuale.`;
    break;
  case 'tour':
    description = `Tour esclusivi di ${location} con autista privato. Visita le attrazioni principali e i luoghi nascosti con comfort e stile.`;
    imageUrl = '/images/tour-puglia.jpg';
    break;
  case 'rental':
    description = `Servizio di Autonoleggio a ${location}. Veicoli moderni e affidabili per esplorare la zona in autonomia.`;
    imageUrl = '/images/rental-cars.jpg';
    break;
}

// Template for the page.js file
const pageTemplate = `import { Suspense } from 'react';
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
    title: "${title} - Servizio Professionale",
    description: "${description}",
    path: "/${slug}",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Main page component
export default function SEOPage() {
  // Define FAQs data
  const faqs = [
  {
    "question": "Come posso prenotare un servizio ${type.toUpperCase()} a ${location}?",
    "answer": "Puoi prenotare il nostro servizio ${type.toUpperCase()} chiamando il numero +39-331 346 7527, inviando un'email a info@zaccariaautonoleggio.it, o compilando il modulo di richiesta preventivo sul nostro sito."
  },
  {
    "question": "Quali tipi di veicoli utilizzate per il servizio a ${location}?",
    "answer": "La nostra flotta comprende esclusivamente veicoli Mercedes-Benz di alta gamma: Mercedes Classe E, Mercedes Classe S per servizi executive, e Mercedes Classe V per gruppi fino a 7 passeggeri. Tutti i veicoli sono dotati di aria condizionata, Wi-Fi e comfort premium."
  },
  {
    "question": "Quanto tempo prima devo prenotare il servizio?",
    "answer": "Consigliamo di prenotare con almeno 24-48 ore di anticipo per garantire la disponibilità, soprattutto in alta stagione o per servizi speciali, ma siamo disponibili anche per richieste last-minute in base alla disponibilità."
  },
  {
    "question": "Offrite servizi personalizzati a ${location}?",
    "answer": "Assolutamente sì! Tutti i nostri servizi sono personalizzabili in base alle tue esigenze specifiche. Orari, itinerari, fermate: ogni aspetto viene adattato alle tue preferenze per garantirti un'esperienza su misura."
  },
  {
    "question": "Quali sono i metodi di pagamento accettati?",
    "answer": "Accettiamo pagamenti in contanti, carte di credito/debito (Visa, Mastercard, American Express), bonifici bancari e pagamenti elettronici (PayPal)."
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
            "name": "${title} - Servizio Professionale",
            "description": "${description}",
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
              "name": "${location}"
            },
            "serviceType": "${type}",
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
            ${title} - Servizio Professionale
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src="${imageUrl}"
              alt="${title}"
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  ${description}
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
            <h2 className="text-3xl font-bold mb-6">Servizio ${type.toUpperCase()} a ${location} di Alta Qualità</h2>
            <p className="text-lg mb-4">
              Zaccaria NCC offre un esclusivo servizio di ${type === 'ncc' ? 'noleggio con conducente' : 
                                                             type === 'transfer' ? 'transfer privato' : 
                                                             type === 'tour' ? 'tour guidato' : 
                                                             'autonoleggio'} a ${location} con ${type !== 'rental' ? 'autisti professionisti e una flotta di veicoli Mercedes-Benz' : 'veicoli moderni e affidabili'}.
              Il nostro servizio garantisce ${type !== 'rental' ? 'puntualità, comfort e un\'esperienza di viaggio all\'insegna dell\'eleganza' : 'flessibilità, convenienza e un\'esperienza di viaggio in totale autonomia'}.
            </p>
            <p className="text-lg mb-4">
              ${type === 'ncc' ? 
                `Che si tratti di transfer, spostamenti di lavoro o tour turistici a ${location} e dintorni, il nostro servizio di noleggio con conducente rappresenta la soluzione ideale per chi cerca un trasporto privato di alta qualità.` : 
                type === 'transfer' ? 
                `Il nostro servizio di transfer da e per ${location} è la soluzione ideale per chi desidera raggiungere la propria destinazione con il massimo comfort e senza stress, evitando le complicazioni dei mezzi pubblici o dei taxi standard.` :
                type === 'tour' ? 
                `Il nostro servizio di tour guidato a ${location} ti permetterà di scoprire le bellezze di questa località con un autista privato a tua disposizione, per un'esperienza personalizzata e indimenticabile.` :
                `Il nostro servizio di autonoleggio a ${location} ti offre la libertà di esplorare la zona a tuo piacimento, con veicoli moderni e affidabili a tariffe competitive.`}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio ${type.toUpperCase()} a ${location}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">${type === 'ncc' || type === 'transfer' || type === 'tour' ? 'Autisti Professionisti' : 'Veicoli Moderni'}</h3>
                <p className="text-silver">
                  ${type === 'ncc' || type === 'transfer' || type === 'tour' ? 
                    `I nostri autisti sono profondi conoscitori di ${location} e della Puglia, parlano italiano e inglese, e garantiscono un servizio cortese e professionale.` : 
                    `La nostra flotta di veicoli moderni e ben mantenuti garantisce affidabilità e comfort durante il tuo soggiorno a ${location}.`}
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">${type === 'ncc' || type === 'transfer' || type === 'tour' ? 'Flotta Mercedes Premium' : 'Prenotazione Facile'}</h3>
                <p className="text-silver">
                  ${type === 'ncc' || type === 'transfer' || type === 'tour' ? 
                    `Viaggiate a bordo delle nostre Mercedes Classe E, Classe S o Classe V, dotate di ogni comfort e sempre in perfette condizioni.` : 
                    `Il nostro processo di prenotazione è semplice e veloce. Puoi prenotare online, per telefono o via email, e riceverai conferma immediata.`}
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">${type === 'ncc' ? 'Servizio Personalizzato' : 
                                                             type === 'transfer' ? 'Puntualità Garantita' : 
                                                             type === 'tour' ? 'Itinerari Personalizzati' : 
                                                             'Assistenza 24/7'}</h3>
                <p className="text-silver">
                  ${type === 'ncc' ? 
                    `Ogni servizio è su misura: orari flessibili, itinerari personalizzati e attenzione alle vostre esigenze specifiche.` : 
                    type === 'transfer' ? 
                    `Monitoriamo costantemente voli e treni per garantire che l'autista sia sempre presente al tuo arrivo, anche in caso di ritardi.` :
                    type === 'tour' ? 
                    `Creiamo itinerari su misura in base ai tuoi interessi, permettendoti di scoprire ${location} secondo i tuoi ritmi e preferenze.` :
                    `Offriamo assistenza clienti 24 ore su 24, 7 giorni su 7, per qualsiasi necessità durante il tuo noleggio a ${location}.`}
                </p>
              </div>
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">Prezzo Trasparente</h3>
                <p className="text-silver">
                  Tariffe chiare senza sorprese: il preventivo che riceverai includerà
                  tutti i costi del servizio ${type.toUpperCase()} a ${location}.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">${type === 'ncc' ? 'Servizi NCC' : 
                                                      type === 'transfer' ? 'Tipologie di Transfer' : 
                                                      type === 'tour' ? 'Tour Disponibili' : 
                                                      'Servizi di Autonoleggio'} Disponibili a ${location}</h2>
            <ul className="space-y-4">
              ${type === 'ncc' ? `
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
                  <p className="text-silver">Escursioni personalizzate a ${location} e nei dintorni con autista a vostra disposizione.</p>
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
              </li>` : 
              
              type === 'transfer' ? `
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Transfer Aeroportuali</h3>
                  <p className="text-silver">Servizio da e per gli aeroporti di Brindisi e Bari, con monitoraggio dei voli e assistenza bagagli.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Transfer Hotel</h3>
                  <p className="text-silver">Servizio di trasferimento da e per hotel, B&B e altre strutture ricettive a ${location} e dintorni.</p>
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
                  <p className="text-silver">Collegamenti diretti tra ${location} e altre città della Puglia, con possibilità di fermate intermedie.</p>
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
                  <p className="text-silver">Servizio dedicato per matrimoni, concerti, meeting aziendali e altri eventi speciali a ${location}.</p>
                </div>
              </li>` : 
              
              type === 'tour' ? `
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tour del Centro Storico</h3>
                  <p className="text-silver">Visita guidata del centro storico di ${location}, con tutte le principali attrazioni e monumenti.</p>
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
                  <p className="text-silver">Percorso alla scoperta dei sapori autentici di ${location}, con visite a produttori locali e degustazioni.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tour della Zona Costiera</h3>
                  <p className="text-silver">Esplorazione delle spiagge e delle calette più belle nei dintorni di ${location}.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Tour Personalizzati</h3>
                  <p className="text-silver">Itinerari su misura creati in base ai tuoi interessi specifici e al tempo a disposizione.</p>
                </div>
              </li>` : 
              
              `<li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Noleggio Giornaliero</h3>
                  <p className="text-silver">Noleggio auto per una giornata, ideale per escursioni o brevi soggiorni a ${location}.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Noleggio Settimanale</h3>
                  <p className="text-silver">Noleggio auto per una settimana, con tariffe vantaggiose per esplorare ${location} e dintorni.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Noleggio Minivan</h3>
                  <p className="text-silver">Veicoli spaziosi per gruppi e famiglie, ideali per viaggiare comodi a ${location}.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-silver-metallic mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Consegna e Ritiro</h3>
                  <p className="text-silver">Servizio di consegna e ritiro dell'auto presso il tuo hotel o altra location a ${location}.</p>
                </div>
              </li>`}
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
              Prenota ora il nostro servizio premium ${type} per ${location}
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
}`;

// Write the page template to file
fs.writeFileSync(path.join(pageDir, 'page.js'), pageTemplate);

// Update middleware.js
console.log('Updating middleware.js...');
const middlewarePath = path.join(__dirname, '..', '..', '..', '..', 'middleware.js');
let middlewareContent = fs.readFileSync(middlewarePath, 'utf8');

// Find the SEO_SLUGS array
const seoSlugsMatch = middlewareContent.match(/const SEO_SLUGS = \[([\s\S]*?)\];/);
if (!seoSlugsMatch) {
  console.error('Could not find SEO_SLUGS array in middleware.js');
  process.exit(1);
}

// Add the new slug to the array if it doesn't exist
if (!middlewareContent.includes(`'${slug}'`)) {
  const newMiddlewareContent = middlewareContent.replace(
    /const SEO_SLUGS = \[([\s\S]*?)\];/,
    `const SEO_SLUGS = [$1,\n  '${slug}'\n];`
  );
  fs.writeFileSync(middlewarePath, newMiddlewareContent);
}

// Update sitemap.js
console.log('Updating sitemap.js...');
const sitemapPath = path.join(__dirname, '..', '..', '..', 'sitemap.js');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Find where to insert the new route
const insertPosition = sitemapContent.indexOf('return routes;');
if (insertPosition === -1) {
  console.error('Could not find insertion point in sitemap.js');
  process.exit(1);
}

// Add the new page to the sitemap
const newRoute = `    // SEO Landing Page - ${slug}
    {
      url: \`\${baseUrl}/${slug}\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    `;

const newSitemapContent = sitemapContent.slice(0, insertPosition) + newRoute + sitemapContent.slice(insertPosition);
fs.writeFileSync(sitemapPath, newSitemapContent);

console.log(`\n${GREEN}Successfully created SEO page: ${slug}${NC}`);
console.log(`\n${YELLOW}Next steps:${NC}`);
console.log(`1. Add any specific content about ${location} to the page`);
console.log(`2. Run \`npm run build\` to verify everything works`);
console.log(`3. Don't forget to push to your repository`);
