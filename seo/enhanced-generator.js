/**
 * Puglia Locations SEO Generator
 * 
 * This script generates SEO-optimized location pages following Next.js best practices
 * for the Zaccaria NCC website. It creates pages for each location and service type
 * with structured data for better search engine visibility.
 * 
 * Usage: npm run generate:locations
 */

const fs = require('fs/promises');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// ANSI color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

// Path constants - using App Router structure
const PATHS = {
  app: path.join(process.cwd(), 'src/app'),
  components: path.join(process.cwd(), 'src/components'),
  lib: path.join(process.cwd(), 'src/lib'),
  middleware: path.join(process.cwd(), 'src/middleware.ts'),
  sitemap: path.join(process.cwd(), 'src/app/sitemap.ts'),
  data: path.join(process.cwd(), 'src/data')
};

// Puglia locations data - organized by category
const PUGLIA_LOCATIONS = {
  majorCities: [
    { name: 'Bari', description: 'Capoluogo regionale della Puglia con un affascinante centro storico e moderno lungomare.', province: 'BA', isProvince: true },
    { name: 'Lecce', description: 'Capitale del Salento, famosa per il suo straordinario barocco e la ricca storia.', province: 'LE', isProvince: true },
    { name: 'Brindisi', description: 'Importante centro portuale e punto di partenza per le rotte verso la Grecia.', province: 'BR', isProvince: true },
    { name: 'Taranto', description: 'Città dei due mari, con un importante centro storico su un\'isola tra due bacini.', province: 'TA', isProvince: true },
    { name: 'Foggia', description: 'Principale centro urbano del Tavoliere delle Puglie e porta d\'accesso al Gargano.', province: 'FG', isProvince: true },
    { name: 'Andria', description: 'Città ricca di storia con il famoso Castel del Monte, patrimonio UNESCO.', province: 'BT', isProvince: true },
    { name: 'Barletta', description: 'Città della Disfida, con un importante patrimonio storico e culturale.', province: 'BT', isProvince: true },
    { name: 'Trani', description: 'Elegante città costiera con la celebre Cattedrale romanica sul mare.', province: 'BT', isProvince: true }
  ],
  
  whiteTowns: [
    { name: 'Ostuni', description: 'La Città Bianca, con il centro storico interamente dipinto di bianco e panorami mozzafiato.', province: 'BR' },
    { name: 'Locorotondo', description: 'Uno dei borghi più belli d\'Italia, caratterizzato da case bianche e tetto a cono.', province: 'BA' },
    { name: 'Cisternino', description: 'Borgo storico della Valle d\'Itria, famoso per le sue stradine pittoresche e la cucina locale.', province: 'BR' },
    { name: 'Martina Franca', description: 'Elegante città barocca della Valle d\'Itria, sede del prestigioso Festival della Valle d\'Itria.', province: 'TA' }
  ],
  
  trulli: [
    { name: 'Alberobello', description: 'Capitale dei Trulli, patrimonio mondiale UNESCO, con i suoi caratteristici edifici conici.', province: 'BA' }
  ],
  
  coastalTowns: [
    { name: 'Polignano a Mare', description: 'Pittoresca località costiera, patria di Domenico Modugno, con le sue scogliere a picco sul mare.', province: 'BA' },
    { name: 'Monopoli', description: 'Affascinante centro costiero con il suo caratteristico porto e centro storico sul mare.', province: 'BA' },
    { name: 'Gallipoli', description: 'Perla dello Ionio, con il suo borgo antico sull\'isola e le spiagge di sabbia fine.', province: 'LE' },
    { name: 'Otranto', description: 'Città più orientale d\'Italia, con il castello aragonese e la cattedrale con il famoso mosaico.', province: 'LE' },
    { name: 'Vieste', description: 'Principale centro turistico del Gargano, con spettacolari formazioni rocciose e spiagge bianche.', province: 'FG' },
    { name: 'Peschici', description: 'Affascinante borgo del Gargano, incastonato su uno sperone roccioso a picco sul mare.', province: 'FG' }
  ],
  
  culturalSites: [
    { name: 'San Giovanni Rotondo', description: 'Importante meta religiosa, legata alla figura di Padre Pio.', province: 'FG' },
    { name: 'Monte Sant\'Angelo', description: 'Santuario UNESCO dedicato a San Michele Arcangelo, meta di pellegrinaggi.', province: 'FG' },
    { name: 'Castel del Monte', description: 'Misterioso castello ottagonale, patrimonio UNESCO, simbolo della Puglia.', province: 'BT', location: 'Andria' }
  ],
  
  beaches: [
    { name: 'Torre dell\'Orso', description: 'Splendida spiaggia con la famosa formazione rocciosa delle Due Sorelle.', province: 'LE', location: 'Melendugno' },
    { name: 'Baia dei Turchi', description: 'Spiaggia incontaminata con acque cristalline e pineta mediterranea.', province: 'LE', location: 'Otranto' },
    { name: 'Pescoluse', description: 'Conosciute come le Maldive del Salento per le acque turchesi e la sabbia bianca.', province: 'LE', location: 'Salve' },
    { name: 'Torre Guaceto', description: 'Riserva naturale protetta con spiagge incontaminate e ricca biodiversità.', province: 'BR' }
  ],
  
  gastronomy: [
    { name: 'Ceglie Messapica', description: 'Città gastronomica con importante tradizione culinaria e numerosi ristoranti stellati.', province: 'BR' },
    { name: 'Manduria', description: 'Terra del Primitivo, con vigneti, cantine storiche e museo del vino.', province: 'TA' }
  ],
  
  natureAndParks: [
    { name: 'Porto Selvaggio', description: 'Parco naturale con scogliere, pinete e acque cristalline, ideale per snorkeling.', province: 'LE', location: 'Nardò' },
    { name: 'Foresta Umbra', description: 'Antica foresta nel cuore del Gargano, con faggi secolari e ricca biodiversità.', province: 'FG' }
  ],
  
  transportHubs: [
    { name: 'Aeroporto di Bari', description: 'Principale scalo aeroportuale della Puglia, con voli nazionali e internazionali.', province: 'BA', location: 'Bari-Palese' },
    { name: 'Aeroporto di Brindisi', description: 'Importante aeroporto del Salento, porta d\'accesso per il sud della Puglia.', province: 'BR' }
  ]
};

// Service configuration
const SEO_CONFIG = {
  businessInfo: {
    name: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto",
    phone: "+39-331 346 7527",
    phoneFormatted: "+39 331 346 7527",
    email: "info@zaccariaautonoleggio.it",
    address: {
      street: "Via Armando Diaz, 91",
      city: "Ostuni",
      province: "BR",
      postalCode: "72017",
      country: "IT"
    },
    website: "https://www.zaccariaautonoleggio.it"
  },
  
  // Services offered for each location
  services: {
    ncc: {
      title: "Servizio NCC a",
      description: "Servizio di Noleggio Con Conducente a {location} con auto Mercedes e autisti professionisti.",
      features: [
        "Transfer aeroportuali da/per {location}",
        "Tour privati di {location} e dintorni",
        "Servizio business per aziende e professionisti",
        "Trasferimenti intercity in Puglia",
        "Servizio disponibile 24/7"
      ]
    },
    transfer: {
      title: "Transfer per",
      description: "Servizio di Transfer privato per {location} con auto Mercedes e autisti esperti.",
      features: [
        "Transfer Aeroporto di Bari - {location}",
        "Transfer Aeroporto di Brindisi - {location}",
        "Transfer Stazione FS - {location}",
        "Transfer Porto - {location}",
        "Transfer intercity Puglia - {location}"
      ]
    },
    tour: {
      title: "Tour di",
      description: "Tour esclusivo di {location} con autista privato e Mercedes di alta gamma.",
      features: [
        "Tour del centro storico di {location}",
        "Tour enogastronomico a {location}",
        "Escursioni naturalistiche nei dintorni di {location}",
        "Tour fotografico di {location}",
        "Tour personalizzati di {location} su richiesta"
      ]
    }
  },
  
  // Advantages of the service
  advantages: [
    {
      title: "Conoscenza del Territorio",
      description: "I nostri autisti sono profondi conoscitori di {location} e della Puglia, garantendo un'esperienza autentica."
    },
    {
      title: "Comfort e Stile",
      description: "Viaggiate a bordo delle nostre Mercedes di alta gamma, con interni lussuosi e tutti i comfort."
    },
    {
      title: "Servizio Personalizzato",
      description: "Itinerari flessibili e adattabili alle vostre esigenze, con soste fotografiche e consigli locali."
    },
    {
      title: "Puntualità Garantita",
      description: "Rispettiamo rigorosamente gli orari concordati, monitorando costantemente voli e treni in caso di trasferimenti."
    },
    {
      title: "Prezzo Trasparente",
      description: "Tariffe chiare e senza sorprese, stabilite al momento della prenotazione."
    }
  ],
  
  // Common FAQs about services
  faqs: {
    ncc: [
      {
        question: "Come posso prenotare un servizio NCC a {location}?",
        answer: "Puoi prenotare il nostro servizio NCC a {location} chiamando il numero +39-331 346 7527, inviando un'email a info@zaccariaautonoleggio.it, o compilando il modulo di richiesta preventivo sul nostro sito."
      },
      {
        question: "Quanto costa mediamente un servizio NCC a {location}?",
        answer: "Il costo del servizio NCC a {location} varia in base alla durata, al tipo di veicolo e ai servizi richiesti. Contattaci per un preventivo personalizzato senza impegno."
      },
      {
        question: "Le vostre auto hanno l'aria condizionata per il caldo pugliese?",
        answer: "Assolutamente sì! Tutte le nostre Mercedes sono dotate di climatizzazione di ultima generazione, garantendo il massimo comfort anche nelle giornate più calde a {location}."
      },
      {
        question: "Posso prenotare un'auto con conducente per più giorni a {location}?",
        answer: "Certamente! Offriamo pacchetti personalizzati per più giorni a {location} e dintorni, con tariffe agevolate per soggiorni prolungati."
      }
    ],
    transfer: [
      {
        question: "Il transfer per {location} include l'attesa in caso di ritardo del volo?",
        answer: "Sì, monitoriamo costantemente lo stato dei voli e il servizio include fino a 60 minuti di attesa gratuita in caso di ritardi. Per ritardi superiori, ti terremo informato e adatteremo il servizio di conseguenza."
      },
      {
        question: "Come riconosco l'autista all'arrivo a {location}?",
        answer: "Il nostro autista ti attenderà con un cartello personalizzato con il tuo nome. Riceverai anche il contatto diretto dell'autista per facilitare l'incontro a {location}."
      },
      {
        question: "È possibile fare fermate intermedie durante il transfer verso {location}?",
        answer: "Sì, è possibile richiedere fermate intermedie durante il transfer per {location}. Le soste brevi sono incluse nel servizio, mentre per soste più lunghe potrebbe essere applicato un supplemento."
      },
      {
        question: "Il prezzo del transfer è per persona o per veicolo?",
        answer: "Il prezzo indicato è per veicolo, non per persona. Questo significa che il costo resta invariato indipendentemente dal numero di passeggeri, fino alla capacità massima del veicolo scelto."
      }
    ],
    tour: [
      {
        question: "Quanto dura un tour tipico di {location}?",
        answer: "La durata standard dei nostri tour di {location} è di 4-8 ore, a seconda dell'itinerario scelto. Offriamo anche tour di mezza giornata o tour estesi su misura."
      },
      {
        question: "I tour di {location} sono personalizzabili?",
        answer: "Assolutamente sì! Ogni tour di {location} può essere completamente personalizzato in base ai vostri interessi: arte, storia, enogastronomia, natura o shopping."
      },
      {
        question: "È inclusa una guida turistica nei tour di {location}?",
        answer: "I nostri autisti sono profondi conoscitori di {location} e forniranno informazioni durante il viaggio. Per una spiegazione più approfondita, possiamo organizzare una guida turistica certificata con un supplemento."
      },
      {
        question: "I tour di {location} includono biglietti d'ingresso o pasti?",
        answer: "I tour includono trasporto e servizio autista. Biglietti d'ingresso, pasti e guide turistiche possono essere aggiunti su richiesta. Offriamo anche pacchetti all-inclusive per {location}."
      }
    ]
  }
};

/**
 * Helper Functions
 */

// Generate slug from location name
function generateSlug(locationName, serviceType = null) {
  // Convert to lowercase, replace spaces with hyphens and remove special characters
  let slug = locationName.toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
  
  // Add service type prefix if provided
  if (serviceType) {
    return `${serviceType}-${slug}`;
  }
  
  return slug;
}

// Replace placeholders in a template string
function processTemplate(template, data) {
  return template.replace(/{(\w+)}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

// Create directory if it doesn't exist
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Save file, ensuring directory exists
async function saveFile(filePath, content) {
  try {
    await ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(`${colors.red}Error saving file:${colors.reset} ${filePath}`, error);
    return false;
  }
}

// Check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Extract all locations as a flat array
function getAllLocations() {
  const allLocations = [];
  const locationNames = new Set();
  
  Object.entries(PUGLIA_LOCATIONS).forEach(([category, locations]) => {
    locations.forEach(loc => {
      if (!locationNames.has(loc.name)) {
        locationNames.add(loc.name);
        allLocations.push({
          ...loc,
          category
        });
      }
    });
  });
  
  return allLocations;
}

// Create location-service mapping
function createLocationServiceMapping() {
  const mapping = {};
  const allLocations = getAllLocations();
  
  // Create service-specific entries for each location
  allLocations.forEach(location => {
    ['ncc', 'transfer', 'tour'].forEach(serviceType => {
      const slug = generateSlug(location.name, serviceType);
      mapping[slug] = {
        name: location.name,
        data: location,
        serviceType,
        category: location.category
      };
    });
  });
  
  return mapping;
}

// Group locations by province
function groupLocationsByProvince() {
  const provinces = {
    'BA': { name: 'Bari', locations: [] },
    'BR': { name: 'Brindisi', locations: [] },
    'LE': { name: 'Lecce', locations: [] },
    'FG': { name: 'Foggia', locations: [] },
    'TA': { name: 'Taranto', locations: [] },
    'BT': { name: 'BAT', locations: [] }
  };
  
  getAllLocations().forEach(location => {
    if (location.province && provinces[location.province]) {
      provinces[location.province].locations.push(location);
    }
  });
  
  return provinces;
}

/**
 * Page Generation Functions
 */

// Generate location page content
function generateLocationPage(location, serviceType) {
  const { name, description, province } = location;
  const slug = generateSlug(name, serviceType);
  
  // Generate title and descriptions
  const title = `${SEO_CONFIG.services[serviceType].title} ${name}`;
  const metaDescription = processTemplate(
    SEO_CONFIG.services[serviceType].description, 
    { location: name }
  ) + ' Servizio premium con autisti professionisti, prenotazione facile e tariffe trasparenti.';
  
  // Process features with location name
  const features = SEO_CONFIG.services[serviceType].features.map(
    feature => processTemplate(feature, { location: name })
  );
  
  // Process advantages with location name
  const advantages = SEO_CONFIG.advantages.map(adv => ({
    title: adv.title,
    description: processTemplate(adv.description, { location: name })
  }));
  
  // Process FAQs with location name
  const faqs = SEO_CONFIG.faqs[serviceType].map(faq => ({
    question: processTemplate(faq.question, { location: name }),
    answer: processTemplate(faq.answer, { location: name })
  }));
  
  // Generate Schema.org structured data
  const schemaData = {
    faqSchema: {
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
    },
    serviceSchema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": title,
      "description": metaDescription,
      "provider": {
        "@type": "LocalBusiness",
        "name": SEO_CONFIG.businessInfo.name,
        "telephone": SEO_CONFIG.businessInfo.phone,
        "email": SEO_CONFIG.businessInfo.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": SEO_CONFIG.businessInfo.address.street,
          "addressLocality": SEO_CONFIG.businessInfo.address.city,
          "addressRegion": SEO_CONFIG.businessInfo.address.province,
          "postalCode": SEO_CONFIG.businessInfo.address.postalCode,
          "addressCountry": SEO_CONFIG.businessInfo.address.country
        },
        "image": "https://www.zaccariaautonoleggio.it/images/logo.jpg"
      },
      "areaServed": {
        "@type": "City",
        "name": name
      },
      "serviceType": serviceType,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    }
  };

  // Generate the page content
  return `import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import LocationPageTemplate from '@/components/templates/LocationPageTemplate';
import { JsonLd } from '@/components/seo/JsonLd';

// Force static generation for better performance
export const dynamic = "force-static";

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "${title} - Servizio Premium",
    description: "${metaDescription}",
    path: "/${slug}",
    businessName: "${SEO_CONFIG.businessInfo.name}",
    legalName: "${SEO_CONFIG.businessInfo.legalName}"
  });
}

// Main page component
export default function Page() {
  // Location data
  const location = ${JSON.stringify(location, null, 2)};
  
  // Service-specific content
  const serviceType = "${serviceType}";
  const title = "${title}";
  const metaDescription = "${metaDescription}";
  
  // Features with location name
  const features = ${JSON.stringify(features, null, 2)};
  
  // Advantages with location name
  const advantages = ${JSON.stringify(advantages, null, 2)};
  
  // FAQs with location name
  const faqs = ${JSON.stringify(faqs, null, 2)};
  
  // Schema.org structured data
  const schemaData = {
    faqSchema: ${JSON.stringify(schemaData.faqSchema, null, 2)},
    serviceSchema: ${JSON.stringify(schemaData.serviceSchema, null, 2)}
  };

  return (
    <LocationPageTemplate
      location={location}
      serviceType={serviceType}
      title={title}
      metaDescription={metaDescription}
      slug="${slug}"
      features={features}
      advantages={advantages}
      faqs={faqs}
      schemaData={schemaData}
    />
  );
}`;
}

// Generate Locations Page
function generateLocationsPage() {
  return `import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import EnhancedHeader from "@/components/layout/OptimizedHeader";
import Footer from "@/components/layout/Footer";
import FixedCallButton from '@/components/ui/FixedCallButton';
import { LocationsGrid } from '@/components/locations/LocationsGrid';
import { ProvinceTabs } from '@/components/locations/ProvinceTabs';
import { useState } from 'react';
import { getAllLocations } from '@/data/puglia-locations';

// Force static generation
export const dynamic = "force-static";

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Servizi in Puglia - Zaccaria NCC",
    description: "Scopri tutti i servizi di Noleggio Con Conducente disponibili in Puglia. Transfer aeroportuali, servizi NCC e tour privati con auto Mercedes e autisti esperti.",
    path: "/servizi-puglia",
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"
  });
}

// Available provinces in Puglia
const provinces = [
  { code: 'BA', name: 'Bari' },
  { code: 'BR', name: 'Brindisi' },
  { code: 'LE', name: 'Lecce' },
  { code: 'FG', name: 'Foggia' },
  { code: 'TA', name: 'Taranto' },
  { code: 'BT', name: 'BAT' }
];

export default function LocationsPage() {
  // Get all locations
  const locations = getAllLocations();
  
  // State for active province filter
  const [activeProvince, setActiveProvince] = useState('');
  
  return (
    <>
      <EnhancedHeader />
      <main className="py-32 bg-black">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            Servizi NCC in Puglia
          </h1>
          
          <p className="text-xl text-silver mb-12 max-w-3xl">
            Zaccaria NCC offre servizi di noleggio con conducente, transfer e tour privati 
            in tutta la Puglia. Scopri tutte le località che serviamo con i nostri autisti 
            professionisti e le nostre auto Mercedes di alta gamma.
          </p>
          
          {/* Province tabs */}
          <ProvinceTabs 
            provinces={provinces} 
            activeProvince={activeProvince} 
            onProvinceChange={setActiveProvince} 
          />
          
          {/* Locations grid */}
          <LocationsGrid 
            locations={locations} 
            province={activeProvince} 
          />
        </div>
      </main>
      <Footer />
      <FixedCallButton />
    </>
  );
}`;
}

// Generate Footer Links component
function generateFooterLinks(locationsByProvince) {
  return `import Link from 'next/link';
import { generateSlug } from '@/data/puglia-locations';

/**
 * Enhanced FooterLinksSEO Component
 * 
 * Displays SEO-optimized links in the footer, organized by province and service type
 * Auto-generated by the Puglia Locations SEO Generator
 */
export default function FooterLinksSEO() {
  return (
    <div className="mt-8 pt-6 border-t border-dark-silver">
      <h4 className="text-sm font-bold tracking-widest mb-4 uppercase text-center">Servizi in Puglia</h4>
      
      {/* Main service types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Servizi NCC</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/servizi-puglia" className="text-xs text-silver hover:text-white transition-colors">
                Tutti i Servizi
              </Link>
            </li>
            <li>
              <Link href="/ncc-ostuni" className="text-xs text-silver hover:text-white transition-colors">
                NCC Ostuni
              </Link>
            </li>
            <li>
              <Link href="/ncc-bari" className="text-xs text-silver hover:text-white transition-colors">
                NCC Bari
              </Link>
            </li>
            <li>
              <Link href="/ncc-salento" className="text-xs text-silver hover:text-white transition-colors">
                NCC Salento
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Transfer</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/transfer-aeroporto-brindisi" className="text-xs text-silver hover:text-white transition-colors">
                Transfer Aeroporto Brindisi
              </Link>
            </li>
            <li>
              <Link href="/transfer-aeroporto-bari" className="text-xs text-silver hover:text-white transition-colors">
                Transfer Aeroporto Bari
              </Link>
            </li>
            <li>
              <Link href="/transfer-bari-ostuni" className="text-xs text-silver hover:text-white transition-colors">
                Transfer Bari-Ostuni
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Tour</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/tour-autista-privato-puglia" className="text-xs text-silver hover:text-white transition-colors">
                Tour Privati in Puglia
              </Link>
            </li>
            <li>
              <Link href="/tour-valle-ditria" className="text-xs text-silver hover:text-white transition-colors">
                Tour Valle d'Itria
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Location links by province */}
      <div className="mt-6">
        <h5 className="text-sm font-semibold mb-4 text-silver-metallic text-center">Servizi per Località</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          ${Object.entries(locationsByProvince)
            .filter(([_, data]) => data.locations.length > 0)
            .map(([provinceCode, data]) => `
            <div>
              <h6 className="text-xs font-semibold mb-2 text-silver-metallic">Provincia di ${data.name}</h6>
              <ul className="space-y-1">
                ${data.locations.slice(0, 5).map(location => `
                <li>
                  <Link href="/ncc-${generateSlug(location.name)}" className="text-xs text-silver hover:text-white transition-colors">
                    NCC ${location.name}
                  </Link>
                </li>`).join('')}
                ${data.locations.length > 5 ? `
                <li>
                  <span className="text-xs text-silver-metallic">
                    +${data.locations.length - 5} altre località
                  </span>
                </li>` : ''}
              </ul>
            </div>`).join('')}
        </div>
      </div>
    </div>
  );
}`;
}

// Update the middleware.js file
async function updateMiddleware(locationMapping) {
  try {
    // Check if middleware exists
    if (!await fileExists(PATHS.middleware)) {
      console.log(`${colors.yellow}Creating new middleware file...${colors.reset}`);
      
      // Create a new middleware file
      const newMiddleware = `/**
 * Middleware for handling SEO routes and redirects
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// SEO slugs - automatically managed by the SEO generator
const SEO_SLUGS = [
${Object.keys(locationMapping).map(slug => `  '${slug}'`).join(',\n')}
];

/**
 * Middleware function that handles route matching and redirects
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle SEO routes
  if (SEO_SLUGS.some(slug => pathname === \`/\${slug}\`)) {
    // These routes are already handled by the app router
    return NextResponse.next();
  }
  
  // Add any redirect logic here
  
  return NextResponse.next();
}

/**
 * Configure middleware to run only on specific paths
 */
export const config = {
  matcher: [
    // Match all routes except static files, api routes, and _next
    '/((?!_next/static|_next/image|images|api|favicon.ico|robots.txt).*)',
  ],
};`;
      
      await saveFile(PATHS.middleware, newMiddleware);
      console.log(`${colors.green}Created new middleware file${colors.reset}`);
      return true;
    }
    
    // If middleware exists, update it
    console.log(`${colors.yellow}Updating middleware with new routes...${colors.reset}`);
    
    const middlewareContent = await fs.readFile(PATHS.middleware, 'utf8');
    
    // Extract SEO_SLUGS array
    const seoSlugsRegex = /const\s+SEO_SLUGS\s*=\s*\[([\s\S]*?)\];/;
    const seoSlugsMatch = middlewareContent.match(seoSlugsRegex);
    
    if (!seoSlugsMatch) {
      console.error(`${colors.red}Could not find SEO_SLUGS array in middleware.ts${colors.reset}`);
      return false;
    }
    
    // Get existing slugs and new slugs
    const existingSlugs = seoSlugsMatch[1]
      .split(',')
      .map(s => s.trim())
      .filter(s => s.startsWith("'") || s.startsWith('"'))
      .map(s => s.replace(/['"]/g, ''));
    
    const newSlugs = Object.keys(locationMapping);
    
    // Combine without duplicates
    const allSlugs = [...new Set([...existingSlugs, ...newSlugs])];
    
    // Generate the new SEO_SLUGS content
    const newSeoSlugsContent = allSlugs
      .map(slug => `  '${slug}'`)
      .join(',\n');
    
    // Update the middleware content
    const newMiddlewareContent = middlewareContent.replace(
      seoSlugsRegex,
      `const SEO_SLUGS = [\n${newSeoSlugsContent}\n];`
    );
    
    // Write the updated middleware
    await saveFile(PATHS.middleware, newMiddlewareContent);
    console.log(`${colors.green}Updated middleware with ${newSlugs.length} location routes${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error updating middleware:${colors.reset}`, error);
    return false;
  }
}

// Update sitemap.js
async function updateSitemap(locationMapping) {
  try {
    // Check if sitemap exists
    if (!await fileExists(PATHS.sitemap)) {
      console.log(`${colors.yellow}Creating new sitemap file...${colors.reset}`);
      
      // Create a new sitemap file
      const newSitemap = `/**
 * Sitemap configuration for Next.js App Router
 */
import { MetadataRoute } from 'next';

// Base URL for the sitemap
const baseUrl = 'https://www.zaccariaautonoleggio.it';

// Generate sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Main pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: \`\${baseUrl}/servizi\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/chi-siamo\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/contatti\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Location SEO pages
${Object.keys(locationMapping).map(slug => `    {
      url: \`\${baseUrl}/${slug}\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }`).join(',\n')}
  ];
}`;
      
      await saveFile(PATHS.sitemap, newSitemap);
      console.log(`${colors.green}Created new sitemap file${colors.reset}`);
      return true;
    }
    
    // If sitemap exists, update it
    console.log(`${colors.yellow}Updating sitemap with new routes...${colors.reset}`);
    
    const sitemapContent = await fs.readFile(PATHS.sitemap, 'utf8');
    
    // Find where to insert the new routes
    const insertPoint = 'return [';
    const insertIndex = sitemapContent.indexOf(insertPoint);
    
    if (insertIndex === -1) {
      console.error(`${colors.red}Could not find appropriate insertion point in sitemap.ts${colors.reset}`);
      return false;
    }
    
    // Generate sitemap entries for new routes
    const newRoutes = Object.keys(locationMapping)
      .map(slug => `
    // Location SEO Page - ${slug}
    {
      url: \`\${baseUrl}/${slug}\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },`)
      .join('');
    
    // Insert the new routes
    const newSitemapContent = 
      sitemapContent.slice(0, insertIndex + insertPoint.length) + 
      newRoutes + 
      sitemapContent.slice(insertIndex + insertPoint.length);
    
    // Write the updated sitemap
    await saveFile(PATHS.sitemap, newSitemapContent);
    console.log(`${colors.green}Updated sitemap with ${Object.keys(locationMapping).length} location routes${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error updating sitemap:${colors.reset}`, error);
    return false;
  }
}

// Create SEO utilities file
async function createSeoUtils() {
  const seoUtils = `/**
 * SEO utilities for Next.js App Router
 * 
 * These utilities help create consistent metadata for all pages
 * including proper Open Graph and Twitter card data.
 */
import { Metadata } from 'next';

// Base metadata configuration
const BASE_CONFIG = {
  siteName: "Zaccaria NCC",
  siteUrl: "https://www.zaccariaautonoleggio.it",
  defaultTitle: "Zaccaria NCC - Autonoleggio con Conducente a Ostuni e in Puglia",
  defaultDescription: "Servizio NCC di alta qualità in Puglia con autisti professionisti. Transfer aeroporti, tour su misura e noleggio con conducente con Mercedes.",
  locale: "it_IT"
};

/**
 * Create standardized metadata for a page
 * Following Next.js App Router metadata conventions
 */
export function createMetadata({
  title,
  description,
  path = "",
  businessName = BASE_CONFIG.siteName,
  legalName = businessName,
  noIndex = false
}: {
  title: string;
  description: string;
  path?: string;
  businessName?: string;
  legalName?: string;
  noIndex?: boolean;
}): Metadata {
  // Ensure path has no leading slash for URL construction
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const fullUrl = \`\${BASE_CONFIG.siteUrl}/\${cleanPath}\`;
  
  return {
    title: title || BASE_CONFIG.defaultTitle,
    description: description || BASE_CONFIG.defaultDescription,
    alternates: {
      canonical: cleanPath ? \`/\${cleanPath}\` : "/",
    },
    openGraph: {
      type: "website",
      locale: BASE_CONFIG.locale,
      url: fullUrl,
      title: title || BASE_CONFIG.defaultTitle,
      description: description || BASE_CONFIG.defaultDescription,
      siteName: BASE_CONFIG.siteName,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: businessName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || BASE_CONFIG.defaultTitle,
      description: description || BASE_CONFIG.defaultDescription,
      images: ["/images/og-image.jpg"],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    other: {
      "geo.region": "IT-IT",
      "geo.placename": "Ostuni",
      "business:contact_data:locality": "Ostuni",
      "business:contact_data:region": "Puglia",
      "business:contact_data:postal_code": "72017",
      "business:contact_data:country_name": "Italy",
    },
  };
}

/**
 * Generate a sitemap entry for a location page
 */
export function createSitemapEntry(slug: string, priority = 0.7) {
  return {
    url: \`\${BASE_CONFIG.siteUrl}/\${slug}\`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  };
}`;

  await saveFile(path.join(PATHS.lib, 'seo.ts'), seoUtils);
  console.log(`${colors.green}Created SEO utilities file${colors.reset}`);
}

// Create JsonLd component
async function createJsonLdComponent() {
  const jsonLd = `/**
 * JsonLd Component for structured data
 * 
 * This component renders JSON-LD structured data in the page
 * for improved SEO and rich search results.
 */
interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}`;

  await saveFile(path.join(PATHS.components, 'seo/JsonLd.tsx'), jsonLd);
  console.log(`${colors.green}Created JsonLd component${colors.reset}`);
}

// Create LocationPageTemplate component
async function createLocationPageTemplate() {
  const locationPageTemplate = `/**
 * Location Page Template
 * 
 * A reusable template component for rendering location-specific service pages
 * with consistent structure and optimized for SEO.
 */
import Image from 'next/image';
import Link from 'next/link';
import EnhancedHeader from "@/components/layout/OptimizedHeader";
import Footer from "@/components/layout/Footer";
import FixedCallButton from '@/components/ui/FixedCallButton';
import { JsonLd } from '@/components/seo/JsonLd';
import LocationFAQs from '@/components/locations/LocationFAQs';
import ServiceFeatures from '@/components/locations/ServiceFeatures';
import ServiceAdvantages from '@/components/locations/ServiceAdvantages';

// Type definitions for page props
export interface LocationData {
  name: string;
  description: string;
  province: string;
  isProvince?: boolean;
  location?: string;
  category?: string;
}

export interface LocationPageProps {
  location: LocationData;
  serviceType: 'ncc' | 'transfer' | 'tour';
  title: string;
  metaDescription: string;
  slug: string;
  features: string[];
  advantages: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  schemaData: {
    faqSchema: any;
    serviceSchema: any;
  };
}

/**
 * The location page template component
 */
export default function LocationPageTemplate({
  location,
  serviceType,
  title,
  metaDescription,
  slug,
  features,
  advantages,
  faqs,
  schemaData,
}: LocationPageProps) {
  // Choose image based on service type
  const imageUrl = serviceType === 'tour' 
    ? "/images/tour-puglia.jpg" 
    : "/images/service-cars.jpg";
  
  // Service description based on type
  const serviceDescription = 
    serviceType === 'ncc' 
      ? 'noleggio con conducente'
      : serviceType === 'transfer' 
        ? 'transfer privato' 
        : 'tour esclusivi';
  
  // Service explanation based on type
  const serviceExplanation = 
    serviceType === 'ncc' 
      ? \`Che si tratti di transfer aeroportuali, spostamenti di lavoro o tour turistici di \${location.name} e dintorni, il nostro servizio di noleggio con conducente rappresenta la soluzione ideale per chi cerca un trasporto privato di alta qualità.\`
      : serviceType === 'transfer' 
        ? \`Il nostro servizio di transfer da e per \${location.name} è la soluzione ideale per chi desidera raggiungere la propria destinazione con il massimo comfort e senza stress, evitando le complicazioni dei mezzi pubblici o dei taxi standard.\`
        : \`I nostri tour di \${location.name} sono progettati per offrirti un'esperienza autentica e indimenticabile, con itinerari personalizzati e un autista privato a tua completa disposizione.\`;

  return (
    <>
      <EnhancedHeader />
      <main className="py-32 bg-black">
        {/* Structured data */}
        <JsonLd data={schemaData.faqSchema} />
        <JsonLd data={schemaData.serviceSchema} />
        
        {/* Page content */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            {title} - Servizio Premium
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-lg p-6">
                <p className="text-xl text-silver mb-6">
                  {metaDescription}
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
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            <p className="text-lg mb-4">
              Zaccaria NCC offre un servizio premium di {serviceDescription} a {location.name}. 
              Con i nostri autisti professionisti e la nostra flotta di veicoli Mercedes, garantiamo un'esperienza 
              di viaggio all'insegna del comfort e dell'eleganza.
            </p>
            <p className="text-lg mb-4">
              {serviceExplanation}
            </p>
          </section>

          {/* Advantages section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio a {location.name}</h2>
            <ServiceAdvantages advantages={advantages.slice(0, 4)} />
          </section>

          {/* Features section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Servizi Disponibili a {location.name}</h2>
            <ServiceFeatures features={features} />
          </section>
          
          {/* Location description if available */}
          {location.description && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Cosa Visitare a {location.name}</h2>
              <div className="metal-card">
                <p className="text-silver mb-4">
                  {location.description}
                </p>
                <p className="text-silver">
                  Con il nostro servizio di {
                    serviceType === 'ncc' 
                      ? 'noleggio con conducente' 
                      : serviceType === 'transfer' 
                        ? 'transfer privato' 
                        : 'tour guidato'
                  }, potrai scoprire tutte le meraviglie di {location.name} 
                  nel massimo comfort e con la flessibilità di un autista privato a tua disposizione.
                </p>
              </div>
            </section>
          )}
          
          {/* FAQ Section with structured data */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Domande Frequenti</h2>
            <LocationFAQs faqs={faqs} />
          </section>
          
          {/* CTA Section */}
          <section className="mt-16 text-center">
            <p className="text-silver-metallic mb-6">
              Prenota ora il nostro servizio premium {serviceType} per {location.name}
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

  await saveFile(path.join(PATHS.components, 'templates/LocationPageTemplate.tsx'), locationPageTemplate);
  console.log(`${colors.green}Created LocationPageTemplate component${colors.reset}`);
}

// Create supporting components
async function createSupportingComponents() {
  // LocationFAQs component
  const locationFAQs = `/**
 * LocationFAQs Component
 * 
 * Renders a list of FAQs for location pages with consistent styling.
 */
interface FAQ {
  question: string;
  answer: string;
}

interface LocationFAQsProps {
  faqs: FAQ[];
}

export default function LocationFAQs({ faqs }: LocationFAQsProps) {
  return (
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div key={index} className="metal-card">
          <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
          <p className="text-silver">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}`;

  // ServiceFeatures component
  const serviceFeatures = `/**
 * ServiceFeatures Component
 * 
 * Renders a list of service features with icon bullets.
 */
interface ServiceFeaturesProps {
  features: string[];
}

export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="text-silver-metallic mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <p className="text-silver">{feature}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}`;

  // ServiceAdvantages component
  const serviceAdvantages = `/**
 * ServiceAdvantages Component
 * 
 * Renders a grid of service advantages with cards.
 */
interface Advantage {
  title: string;
  description: string;
}

interface ServiceAdvantagesProps {
  advantages: Advantage[];
}

export default function ServiceAdvantages({ advantages }: ServiceAdvantagesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {advantages.map((advantage, index) => (
        <div key={index} className="metal-card">
          <h3 className="text-xl font-semibold mb-4">{advantage.title}</h3>
          <p className="text-silver">{advantage.description}</p>
        </div>
      ))}
    </div>
  );
}`;

  // LocationsGrid component
  const locationsGrid = `/**
 * LocationsGrid Component
 * 
 * Displays a responsive grid of location cards.
 */
import Link from 'next/link';
import Image from 'next/image';
import { generateSlug } from '@/data/puglia-locations';

interface LocationData {
  name: string;
  description: string;
  province: string;
  category?: string;
}

interface LocationCardProps {
  location: LocationData;
  serviceType?: 'ncc' | 'transfer' | 'tour';
}

// Location Card component
function LocationCard({ location, serviceType = 'ncc' }: LocationCardProps) {
  const slug = generateSlug(location.name, serviceType);
  
  return (
    <div className="bg-dark-silver rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-102">
      <div className="relative h-48">
        <Image 
          src={\`/images/locations/\${location.province.toLowerCase()}/\${generateSlug(location.name)}.jpg\`}
          alt={location.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Fallback to a default image if the specific one doesn't exist
            const target = e.target as HTMLImageElement;
            target.src = "/images/locations/default.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4">
            <h3 className="text-xl font-bold text-white">{location.name}</h3>
            <p className="text-sm text-silver">Provincia di {location.province}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-silver mb-4 line-clamp-3">{location.description}</p>
        <div className="flex space-x-2">
          <Link href={\`/ncc-\${generateSlug(location.name)}\`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
            NCC
          </Link>
          <Link href={\`/transfer-\${generateSlug(location.name)}\`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
            Transfer
          </Link>
          <Link href={\`/tour-\${generateSlug(location.name)}\`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
            Tour
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main LocationsGrid component
interface LocationsGridProps {
  locations: LocationData[];
  category?: string | null;
  province?: string | null;
  limit?: number | null;
}

export function LocationsGrid({ 
  locations, 
  category = null, 
  province = null, 
  limit = null 
}: LocationsGridProps) {
  // Filter locations if category or province is specified
  let filteredLocations = [...locations];
  
  if (category) {
    filteredLocations = filteredLocations.filter(loc => loc.category === category);
  }
  
  if (province) {
    filteredLocations = filteredLocations.filter(loc => loc.province === province);
  }
  
  // Apply limit if specified
  if (limit && filteredLocations.length > limit) {
    filteredLocations = filteredLocations.slice(0, limit);
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredLocations.map(location => (
        <LocationCard key={location.name} location={location} />
      ))}
      
      {filteredLocations.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-silver">Nessuna località trovata con i criteri specificati.</p>
        </div>
      )}
    </div>
  );
}`;

  // ProvinceTabs component
  const provinceTabs = `/**
 * ProvinceTabs Component
 * 
 * A component for filtering locations by province with tabs.
 */
interface Province {
  code: string;
  name: string;
}

interface ProvinceTabsProps {
  provinces: Province[];
  activeProvince: string;
  onProvinceChange: (code: string) => void;
}

export function ProvinceTabs({ 
  provinces, 
  activeProvince, 
  onProvinceChange 
}: ProvinceTabsProps) {
  return (
    <div className="mb-8">
      <div className="flex overflow-x-auto space-x-2 pb-2">
        <button
          onClick={() => onProvinceChange('')}
          className={\`px-4 py-2 whitespace-nowrap rounded \${
            activeProvince === '' 
              ? 'bg-silver-metallic text-black' 
              : 'bg-dark-silver text-silver hover:bg-silver/20'
          }\`}
        >
          Tutte
        </button>
        
        {provinces.map(province => (
          <button
            key={province.code}
            onClick={() => onProvinceChange(province.code)}
            className={\`px-4 py-2 whitespace-nowrap rounded \${
              activeProvince === province.code 
                ? 'bg-silver-metallic text-black' 
                : 'bg-dark-silver text-silver hover:bg-silver/20'
            }\`}
          >
            {province.name}
          </button>
        ))}
      </div>
    </div>
  );
}`;

  // Create all components
  await saveFile(path.join(PATHS.components, 'locations/LocationFAQs.tsx'), locationFAQs);
  await saveFile(path.join(PATHS.components, 'locations/ServiceFeatures.tsx'), serviceFeatures);
  await saveFile(path.join(PATHS.components, 'locations/ServiceAdvantages.tsx'), serviceAdvantages);
  await saveFile(path.join(PATHS.components, 'locations/LocationsGrid.tsx'), locationsGrid);
  await saveFile(path.join(PATHS.components, 'locations/ProvinceTabs.tsx'), provinceTabs);
  
  console.log(`${colors.green}Created supporting components${colors.reset}`);
}

// Create puglia-locations.ts data module
async function createLocationDataModule() {
  const locationData = `/**
 * Puglia Locations Data
 * 
 * This file exports structured data about Puglia locations
 * for use in SEO pages and other components.
 */

// Type definitions
export interface LocationData {
  name: string;
  description: string;
  province: string;
  isProvince?: boolean;
  location?: string;
  category?: string;
}

// Puglia locations data - organized by category
export const PUGLIA_LOCATIONS = ${JSON.stringify(PUGLIA_LOCATIONS, null, 2)};

// Service configuration
export const SEO_CONFIG = ${JSON.stringify(SEO_CONFIG, null, 2)};

/**
 * Extract all locations as a flat array
 */
export function getAllLocations() {
  const allLocations = [];
  const locationNames = new Set();
  
  Object.entries(PUGLIA_LOCATIONS).forEach(([category, locations]) => {
    locations.forEach(loc => {
      if (!locationNames.has(loc.name)) {
        locationNames.add(loc.name);
        allLocations.push({
          ...loc,
          category
        });
      }
    });
  });
  
  return allLocations;
}

/**
 * Generate slug from location name
 */
export function generateSlug(locationName, serviceType = null) {
  // Convert to lowercase, replace spaces with hyphens and remove special characters
  let slug = locationName.toLowerCase()
    .replace(/'/g, '')
    .replace(/\\s+/g, '-')
    .replace(/[^\\w\\-]+/g, '');
  
  // Add service type prefix if provided
  if (serviceType) {
    return \`\${serviceType}-\${slug}\`;
  }
  
  return slug;
}

/**
 * Replace placeholders in template string
 */
export function processTemplate(template, data) {
  return template.replace(/{(\\w+)}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

/**
 * Get locations grouped by province
 */
export function getLocationsByProvince() {
  const provinces = {
    'BA': { name: 'Bari', locations: [] },
    'BR': { name: 'Brindisi', locations: [] },
    'LE': { name: 'Lecce', locations: [] },
    'FG': { name: 'Foggia', locations: [] },
    'TA': { name: 'Taranto', locations: [] },
    'BT': { name: 'BAT', locations: [] }
  };
  
  getAllLocations().forEach(location => {
    if (location.province && provinces[location.province]) {
      provinces[location.province].locations.push(location);
    }
  });
  
  return provinces;
}

export default {
  locations: PUGLIA_LOCATIONS,
  config: SEO_CONFIG,
  getAllLocations,
  generateSlug,
  processTemplate,
  getLocationsByProvince
};`;

  await saveFile(path.join(PATHS.data, 'puglia-locations.ts'), locationData);
  console.log(`${colors.green}Created puglia-locations.ts data module${colors.reset}`);
}

/**
 * Main function to generate all location pages and supporting files
 */
async function generateLocationPages() {
  console.log(`${colors.cyan}=== Puglia Locations SEO Generator ===${colors.reset}`);
  console.log('Starting generation of SEO location pages...');
  
  try {
    // Create necessary directories
    await ensureDir(PATHS.app);
    await ensureDir(PATHS.components);
    await ensureDir(path.join(PATHS.components, 'locations'));
    await ensureDir(path.join(PATHS.components, 'seo'));
    await ensureDir(path.join(PATHS.components, 'templates'));
    await ensureDir(PATHS.lib);
    await ensureDir(path.join(PATHS.lib, 'types'));
    await ensureDir(PATHS.data);
    
    // Create data module
    await createLocationDataModule();
    
    // Create supporting components and utilities
    await createJsonLdComponent();
    await createLocationPageTemplate();
    await createSupportingComponents();
    await createSeoUtils();
    
    // Create location mapping
    const locationMapping = createLocationServiceMapping();
    console.log(`${colors.blue}Generated mapping for ${Object.keys(locationMapping).length} location-service combinations${colors.reset}`);
    
    // Create locations page
    await saveFile(
      path.join(PATHS.app, 'servizi-puglia/page.tsx'),
      generateLocationsPage()
    );
    console.log(`${colors.green}Generated main locations page at /servizi-puglia${colors.reset}`);
    
    // Create individual location pages
    let completedPages = 0;
    const totalPages = Object.keys(locationMapping).length;
    
    for (const [slug, info] of Object.entries(locationMapping)) {
      const { name, data, serviceType } = info;
      const pageDir = path.join(PATHS.app, slug);
      
      // Generate and save page
      const pageContent = generateLocationPage(data, serviceType);
      await saveFile(path.join(pageDir, 'page.tsx'), pageContent);
      
      completedPages++;
      if (completedPages % 10 === 0 || completedPages === totalPages) {
        console.log(`${colors.blue}Generated ${completedPages}/${totalPages} location pages${colors.reset}`);
      }
    }
    
    // Generate footer with location links
    const locationsByProvince = groupLocationsByProvince();
    const footerContent = generateFooterLinks(locationsByProvince);
    await saveFile(path.join(PATHS.components, 'ui/FooterLinksSEO.tsx'), footerContent);
    console.log(`${colors.green}Generated enhanced FooterLinksSEO component${colors.reset}`);
    
    // Update middleware and sitemap
    await updateMiddleware(locationMapping);
    await updateSitemap(locationMapping);
    
    console.log(`${colors.cyan}=== Location Pages Generation Complete ===${colors.reset}`);
    console.log(`${colors.yellow}Generated ${Object.keys(locationMapping).length} location pages${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}Error generating location pages:${colors.reset}`, error);
  }
}

// Execute the script if called directly
if (require.main === module) {
  generateLocationPages();
}

// Export for testing or programmatic use
module.exports = {
  generateLocationPages,
  generateSlug,
  processTemplate,
  getAllLocations,
  groupLocationsByProvince,
  createLocationServiceMapping
};