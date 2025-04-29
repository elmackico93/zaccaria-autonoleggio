/**
 * Puglia Locations Data Module
 * 
 * This module provides structured, type-safe data about Puglia locations
 * for use in SEO page generation and throughout the application.
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
  export const PUGLIA_LOCATIONS: Record<string, LocationData[]> = {
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
  export const SEO_CONFIG = {
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
   * Extract all locations as a flat array
   */
  export function getAllLocations(): (LocationData & { category: string })[] {
    const allLocations: (LocationData & { category: string })[] = [];
    const locationNames = new Set<string>();
    
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
  export function generateSlug(locationName: string, serviceType?: string): string {
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
  
  /**
   * Process template strings with location data
   */
  export function processTemplate(template: string, data: Record<string, string>): string {
    return template.replace(/{(\w+)}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });
  }
  
  /**
   * Get locations grouped by province
   */
  export function getLocationsByProvince() {
    const provinces: Record<string, { name: string; locations: LocationData[] }> = {
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
  };