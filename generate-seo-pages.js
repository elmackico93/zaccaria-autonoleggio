/**
 * Zaccaria NCC SEO Page Generator
 * 
 * This script generates SEO-optimized pages for various keywords related to chauffeur
 * and transportation services in Puglia, Italy. It creates Next.js pages for each keyword
 * following the same structure as the existing SEO pages, with unique content for
 * each service and location.
 * 
 * Usage: node generate-seo-pages.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const readFileAsync = promisify(fs.readFile);

// Constants
const OUTPUT_DIR = path.join(__dirname, 'src/app/seo-pages');
const IMAGES_DIR = path.join(__dirname, 'public/images');
const MIDDLEWARE_PATH = path.join(__dirname, 'src/middleware.js');

// Configuration
const config = {
  // Base information for all pages
  baseInfo: {
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto",
    phone: "+39-331 346 7527",
    email: "info@zaccariaautonoleggio.it",
    address: {
      street: "Via Armando Diaz, 91",
      city: "Ostuni",
      region: "BR",
      postalCode: "72017",
      country: "IT"
    },
    website: "https://www.zaccariaautonoleggio.it",
    logo: "https://www.zaccariaautonoleggio.it/images/logo.jpg"
  },
  
  // Services common to most pages
  services: [
    "Transfer aeroportuali",
    "Servizio Business",
    "Tour turistici privati",
    "Servizio cerimonie",
    "Transfer intercity",
    "Tour enogastronomici",
    "Visitare i borghi bianchi",
    "Noleggio con conducente"
  ],
  
  // Common advantages across services
  advantages: [
    {
      title: "Flotta Mercedes Premium",
      description: "Viaggiate a bordo delle nostre Mercedes Classe E, Classe S o Classe V, dotate di ogni comfort e sempre in perfette condizioni."
    },
    {
      title: "Autisti Professionisti",
      description: "I nostri autisti conoscono perfettamente la Puglia, parlano italiano e inglese, e garantiscono un servizio cortese e professionale."
    },
    {
      title: "Servizio Personalizzato",
      description: "Ogni servizio è su misura: orari flessibili, itinerari personalizzati e attenzione alle vostre esigenze specifiche."
    },
    {
      title: "Prezzo Trasparente",
      description: "Tariffe chiare senza sorprese: il preventivo che riceverete includerà tutti i costi del servizio."
    },
    {
      title: "Puntualità Garantita",
      description: "Monitoraggio costante dei voli e dei treni per garantire che l'autista sia sempre presente al vostro arrivo, anche in caso di ritardi."
    },
    {
      title: "Comfort Superiore",
      description: "Viaggiate a bordo di Mercedes-Benz di ultima generazione, con aria condizionata, Wi-Fi gratuito e acqua minerale sempre disponibile."
    },
    {
      title: "Sicurezza",
      description: "Autisti esperti e veicoli regolarmente controllati e sanificati. Ogni aspetto del viaggio è curato per garantire la massima sicurezza."
    }
  ],
  
  // Image paths for different service types
  images: {
    ncc: "/images/service-cars.jpg",
    transfer: "/images/service-cars.jpg",
    tour: "/images/tour-puglia.jpg",
    rental: "/images/rental-cars.jpg"
  },
  
  // FAQs database
  faqs: {
    ncc: [
      {
        question: "Cosa significa NCC?",
        answer: "NCC significa Noleggio Con Conducente, un servizio di trasporto privato con autista professionale che offre un'esperienza di viaggio personalizzata e di alta qualità, diversa dal comune servizio taxi."
      },
      {
        question: "Come posso prenotare un servizio NCC?",
        answer: "Puoi prenotare il nostro servizio NCC chiamando il numero +39-331 346 7527, inviando un'email a info@zaccariaautonoleggio.it, o compilando il modulo di richiesta preventivo sul nostro sito."
      },
      {
        question: "Quali tipi di veicoli offrite per il servizio NCC?",
        answer: "La nostra flotta comprende esclusivamente veicoli Mercedes-Benz di alta gamma: Mercedes Classe E, Mercedes Classe S per servizi executive, e Mercedes Classe V per gruppi fino a 7 passeggeri."
      },
      {
        question: "È necessario prenotare con anticipo?",
        answer: "Consigliamo di prenotare con almeno 24-48 ore di anticipo per garantire la disponibilità, soprattutto in alta stagione o per servizi speciali, ma siamo disponibili anche per richieste last-minute in base alla disponibilità."
      },
      {
        question: "Quali sono i metodi di pagamento accettati?",
        answer: "Accettiamo pagamenti in contanti, carte di credito/debito (Visa, Mastercard, American Express), bonifici bancari e pagamenti elettronici (PayPal)."
      }
    ],
    transfer: [
      {
        question: "Il servizio di transfer include attesa in caso di ritardo del volo?",
        answer: "Sì, monitoriamo costantemente lo stato dei voli e il servizio include fino a 60 minuti di attesa gratuita in caso di ritardi. Per ritardi superiori, ti terremo informato e adatteremo il servizio di conseguenza."
      },
      {
        question: "Come riconosco l'autista all'arrivo in aeroporto?",
        answer: "Il nostro autista ti attenderà nell'area arrivi con un cartello personalizzato con il tuo nome. Riceverai anche il contatto diretto dell'autista per facilitare l'incontro."
      },
      {
        question: "È possibile fare fermate intermedie durante un transfer?",
        answer: "Sì, è possibile richiedere fermate intermedie durante il transfer. Le soste brevi sono incluse nel servizio, mentre per soste più lunghe o deviazioni significative potrebbe essere applicato un supplemento."
      },
      {
        question: "Qual è la differenza tra il vostro servizio di transfer e un normale taxi?",
        answer: "Il nostro servizio di transfer è prenotabile in anticipo, utilizza esclusivamente vetture Mercedes-Benz di alta gamma, offre prezzi fissi (senza tassametro) e include servizi premium come Wi-Fi a bordo, acqua minerale e massima flessibilità."
      },
      {
        question: "Il prezzo del transfer è per persona o per veicolo?",
        answer: "Il prezzo indicato è per veicolo, non per persona. Questo significa che il costo resta invariato indipendentemente dal numero di passeggeri, fino alla capacità massima del veicolo scelto."
      }
    ],
    tour: [
      {
        question: "I tour sono personalizzabili in base ai nostri interessi?",
        answer: "Assolutamente sì! Ogni tour può essere completamente personalizzato in base ai vostri interessi: enogastronomia, storia, arte, natura o shopping. Contattateci per creare insieme l'itinerario perfetto."
      },
      {
        question: "Quanto dura un tour tipico in Puglia?",
        answer: "La durata standard dei nostri tour è di 8 ore, permettendo di esplorare diverse località in una giornata. Offriamo anche tour di mezza giornata (4 ore) o tour estesi di più giorni con itinerari completi in tutta la Puglia."
      },
      {
        question: "È inclusa una guida turistica nei vostri tour?",
        answer: "I nostri autisti sono profondi conoscitori del territorio e forniranno informazioni durante il viaggio. Per una spiegazione più approfondita, possiamo organizzare una guida turistica certificata in diverse lingue con un supplemento."
      },
      {
        question: "I tour includono biglietti d'ingresso o pasti?",
        answer: "I tour includono trasporto e servizio autista. Biglietti d'ingresso, pasti e guide turistiche possono essere aggiunti su richiesta. Offriamo anche pacchetti all-inclusive con degustazioni in cantine e frantoi selezionati."
      },
      {
        question: "Possiamo essere prelevati direttamente dal nostro hotel?",
        answer: "Sì, tutti i nostri tour includono il prelievo e il rientro presso il vostro hotel o alloggio in Puglia, senza costi aggiuntivi se situato nelle aree principali della regione."
      }
    ],
    rental: [
      {
        question: "Che tipo di veicoli offrite per l'autonoleggio senza conducente?",
        answer: "Offriamo una gamma di veicoli moderni e ben mantenuti, inclusi Fiat 500X, Citroen C3, Fiat Panda e altri modelli adatti a diverse esigenze, tutti dotati di aria condizionata e sistemi di navigazione."
      },
      {
        question: "Quali documenti sono necessari per noleggiare un'auto?",
        answer: "Per noleggiare un'auto sono necessari: patente di guida valida (da almeno 1 anno), documento d'identità o passaporto e carta di credito intestata al conducente per il deposito cauzionale."
      },
      {
        question: "È possibile noleggiare un'auto per un solo giorno?",
        answer: "Sì, offriamo noleggi anche per una sola giornata, con tariffe competitive e senza vincoli di durata minima. Per soggiorni più lunghi sono disponibili tariffe settimanali più convenienti."
      },
      {
        question: "L'assicurazione è inclusa nel prezzo?",
        answer: "Sì, tutte le nostre tariffe includono l'assicurazione RC Auto obbligatoria. Offriamo anche opzioni per ridurre o eliminare la franchigia danni e furto con un supplemento."
      },
      {
        question: "Posso consegnare l'auto in una località diversa da quella di ritiro?",
        answer: "Sì, offriamo il servizio di consegna e ritiro in diverse località della Puglia, inclusi aeroporti, stazioni e hotel, con un supplemento che varia in base alla distanza."
      }
    ]
  },
  
  // Keywords categorized
  categories: {
    generic: [
      { keyword: "ncc-puglia", title: "NCC Puglia", description: "Servizio di Noleggio Con Conducente in tutta la Puglia. Autisti professionisti, auto di lusso e servizio personalizzato." },
      { keyword: "noleggio-con-conducente-puglia", title: "Noleggio con Conducente Puglia", description: "Servizio premium di Noleggio con Conducente in Puglia. Auto Mercedes con autista per transfer, tour e servizi business." },
      { keyword: "autonoleggio-puglia", title: "Autonoleggio Puglia", description: "Servizio di Autonoleggio in Puglia con o senza conducente. Mercedes di lusso per ogni esigenza di trasporto." },
      { keyword: "ncc-economico-puglia", title: "NCC Economico Puglia", description: "Servizio NCC in Puglia a tariffe competitive. Qualità e professionalità a prezzi accessibili." },
      { keyword: "ncc-lusso-puglia", title: "NCC Lusso Puglia", description: "Servizio NCC di Lusso in Puglia. Mercedes Classe S e Classe V per un'esperienza di viaggio esclusiva." },
      { keyword: "ncc-24-ore-puglia", title: "NCC 24 Ore Puglia", description: "Servizio NCC 24 ore su 24 in Puglia. Disponibilità continua per ogni esigenza di trasporto." },
      { keyword: "ncc-per-turisti-puglia", title: "NCC per Turisti Puglia", description: "Servizio NCC dedicato ai turisti in Puglia. Scoprite le bellezze pugliesi con i nostri autisti esperti." },
      { keyword: "ncc-con-autista-puglia", title: "NCC con Autista Puglia", description: "Servizio NCC con autista professionista in Puglia. Comfort, sicurezza e professionalità garantiti." },
      { keyword: "servizio-ncc-puglia", title: "Servizio NCC Puglia", description: "Servizio completo di NCC in Puglia. Transfer, tour e servizi business con auto Mercedes." },
      { keyword: "ncc-prenotazione-online-puglia", title: "NCC Prenotazione Online Puglia", description: "Prenota online il tuo servizio NCC in Puglia. Semplice, veloce e conveniente." }
    ],
    local: [
      { keyword: "ncc-bari", title: "NCC Bari", description: "Servizio di Noleggio Con Conducente a Bari. Transfer aeroportuali, tour della città e servizi business con auto Mercedes." },
      { keyword: "ncc-brindisi", title: "NCC Brindisi", description: "Servizio di Noleggio Con Conducente a Brindisi. Transfer aeroportuali, tour della città e servizi business con auto Mercedes." },
      { keyword: "ncc-lecce", title: "NCC Lecce", description: "Servizio di Noleggio Con Conducente a Lecce. Scopri il barocco leccese con i nostri autisti esperti e auto Mercedes." },
      { keyword: "ncc-taranto", title: "NCC Taranto", description: "Servizio di Noleggio Con Conducente a Taranto. Transfer, tour e servizi business con auto Mercedes e autisti professionisti." },
      { keyword: "ncc-foggia", title: "NCC Foggia", description: "Servizio di Noleggio Con Conducente a Foggia. Transfer, tour del Gargano e servizi business con auto Mercedes." },
      { keyword: "ncc-ostuni", title: "NCC Ostuni", description: "Servizio di Noleggio Con Conducente a Ostuni. Visita la Città Bianca con i nostri autisti esperti e auto Mercedes." },
      { keyword: "ncc-alberobello", title: "NCC Alberobello", description: "Servizio di Noleggio Con Conducente ad Alberobello. Visita i famosi Trulli con i nostri autisti esperti e auto Mercedes." },
      { keyword: "ncc-polignano-a-mare", title: "NCC Polignano a Mare", description: "Servizio di Noleggio Con Conducente a Polignano a Mare. Visita una delle perle dell'Adriatico con i nostri autisti esperti." },
      { keyword: "ncc-monopoli", title: "NCC Monopoli", description: "Servizio di Noleggio Con Conducente a Monopoli. Scopri questa meravigliosa città costiera con i nostri autisti esperti." },
      { keyword: "ncc-gallipoli", title: "NCC Gallipoli", description: "Servizio di Noleggio Con Conducente a Gallipoli. Tour della città vecchia e delle spiagge con i nostri autisti esperti." },
      { keyword: "ncc-otranto", title: "NCC Otranto", description: "Servizio di Noleggio Con Conducente a Otranto. Visita la città più orientale d'Italia con i nostri autisti esperti." },
      { keyword: "ncc-trani", title: "NCC Trani", description: "Servizio di Noleggio Con Conducente a Trani. Scopri la Cattedrale sul mare e il centro storico con i nostri autisti esperti." },
      { keyword: "ncc-matera", title: "NCC Matera", description: "Servizio di Noleggio Con Conducente a Matera. Visita i famosi Sassi con i nostri autisti esperti e auto Mercedes." },
      { keyword: "ncc-aeroporto-bari", title: "NCC Aeroporto Bari", description: "Servizio di Noleggio Con Conducente dall'Aeroporto di Bari. Transfer diretti verso tutte le destinazioni in Puglia." },
      { keyword: "ncc-aeroporto-brindisi", title: "NCC Aeroporto Brindisi", description: "Servizio di Noleggio Con Conducente dall'Aeroporto di Brindisi. Transfer diretti verso tutte le destinazioni in Puglia." }
    ],
    airports: [
      { keyword: "transfer-aeroporto-bari", title: "Transfer Aeroporto Bari", description: "Servizio di Transfer da/per l'Aeroporto di Bari. Auto Mercedes di lusso con autista privato per un viaggio confortevole.", type: "transfer" },
      { keyword: "transfer-aeroporto-brindisi", title: "Transfer Aeroporto Brindisi", description: "Servizio di Transfer da/per l'Aeroporto di Brindisi. Auto Mercedes di lusso con autista privato per un viaggio confortevole.", type: "transfer" },
      { keyword: "ncc-transfer-aeroporto-puglia", title: "NCC Transfer Aeroporto Puglia", description: "Servizio NCC per Transfer Aeroportuali in Puglia. Puntualità, comfort e professionalità garantiti.", type: "transfer" },
      { keyword: "servizio-navetta-aeroporto-bari", title: "Servizio Navetta Aeroporto Bari", description: "Servizio Navetta Premium da/per l'Aeroporto di Bari. Transfer diretti per gruppi e individuali.", type: "transfer" },
      { keyword: "servizio-navetta-aeroporto-brindisi", title: "Servizio Navetta Aeroporto Brindisi", description: "Servizio Navetta Premium da/per l'Aeroporto di Brindisi. Transfer diretti per gruppi e individuali.", type: "transfer" },
      { keyword: "autonoleggio-aeroporto-bari", title: "Autonoleggio Aeroporto Bari", description: "Servizio di Autonoleggio con o senza conducente dall'Aeroporto di Bari. Veicoli moderni per ogni esigenza.", type: "rental" },
      { keyword: "autonoleggio-aeroporto-brindisi", title: "Autonoleggio Aeroporto Brindisi", description: "Servizio di Autonoleggio con o senza conducente dall'Aeroporto di Brindisi. Veicoli moderni per ogni esigenza.", type: "rental" },
      { keyword: "ncc-aeroporto-bari-low-cost", title: "NCC Aeroporto Bari Low Cost", description: "Servizio NCC Economico dall'Aeroporto di Bari. Qualità e professionalità a prezzi accessibili.", type: "transfer" },
      { keyword: "ncc-aeroporto-brindisi-economico", title: "NCC Aeroporto Brindisi Economico", description: "Servizio NCC Economico dall'Aeroporto di Brindisi. Qualità e professionalità a prezzi accessibili.", type: "transfer" },
      { keyword: "transfer-privato-aeroporto-puglia", title: "Transfer Privato Aeroporto Puglia", description: "Servizio di Transfer Privato dagli Aeroporti della Puglia. Auto Mercedes di lusso per un viaggio confortevole.", type: "transfer" }
    ],
    tourism: [
      { keyword: "tour-puglia-con-autista", title: "Tour Puglia con Autista", description: "Tour esclusivi in Puglia con autista privato. Scopri le meraviglie della regione con i nostri autisti esperti.", type: "tour" },
      { keyword: "tour-enogastronomici-puglia", title: "Tour Enogastronomici Puglia", description: "Tour Enogastronomici in Puglia con autista privato. Degustazioni di vini, oli e prodotti tipici pugliesi.", type: "tour" },
      { keyword: "tour-culturali-puglia", title: "Tour Culturali Puglia", description: "Tour Culturali in Puglia con autista privato. Scopri la storia e l'arte di questa meravigliosa regione.", type: "tour" },
      { keyword: "tour-citta-bianche-puglia", title: "Tour Città Bianche Puglia", description: "Tour delle Città Bianche della Puglia con autista privato. Ostuni, Cisternino, Locorotondo e Alberobello.", type: "tour" },
      { keyword: "tour-valle-itria", title: "Tour Valle d'Itria", description: "Tour della Valle d'Itria con autista privato. Scopri i trulli, le masserie e i borghi bianchi.", type: "tour" },
      { keyword: "tour-salento-con-autista", title: "Tour Salento con Autista", description: "Tour del Salento con autista privato. Lecce, Otranto, Gallipoli e le spiagge più belle.", type: "tour" },
      { keyword: "visite-guidate-puglia", title: "Visite Guidate Puglia", description: "Visite Guidate in Puglia con autista privato e guida turistica. Un'esperienza completa e professionale.", type: "tour" },
      { keyword: "escursioni-puglia-con-autista", title: "Escursioni Puglia con Autista", description: "Escursioni giornaliere in Puglia con autista privato. Natura, cultura e gastronomia.", type: "tour" },
      { keyword: "tour-personalizzati-puglia", title: "Tour Personalizzati Puglia", description: "Tour Personalizzati in Puglia con autista privato. Creiamo insieme l'itinerario perfetto per te.", type: "tour" },
      { keyword: "ncc-per-tour-turistici-puglia", title: "NCC per Tour Turistici Puglia", description: "Servizio NCC dedicato ai Tour Turistici in Puglia. Auto Mercedes con autista esperto del territorio.", type: "tour" }
    ],
    specific: [
      { keyword: "ncc-per-hotel-puglia", title: "NCC per Hotel Puglia", description: "Servizio NCC dedicato agli ospiti degli Hotel in Puglia. Transfer, tour e servizi su misura.", type: "ncc" },
      { keyword: "ncc-per-b-e-b-puglia", title: "NCC per B&B Puglia", description: "Servizio NCC dedicato agli ospiti dei B&B in Puglia. Transfer, tour e servizi su misura.", type: "ncc" },
      { keyword: "ncc-per-agriturismi-puglia", title: "NCC per Agriturismi Puglia", description: "Servizio NCC dedicato agli ospiti degli Agriturismi in Puglia. Transfer, tour e servizi su misura.", type: "ncc" },
      { keyword: "ncc-per-ristoranti-puglia", title: "NCC per Ristoranti Puglia", description: "Servizio NCC dedicato ai clienti dei Ristoranti in Puglia. Trasferimenti sicuri per serate gastronomiche.", type: "ncc" },
      { keyword: "ncc-per-discoteche-puglia", title: "NCC per Discoteche Puglia", description: "Servizio NCC dedicato ai locali notturni in Puglia. Trasferimenti sicuri per il divertimento notturno.", type: "ncc" },
      { keyword: "ncc-per-centri-benessere-puglia", title: "NCC per Centri Benessere Puglia", description: "Servizio NCC dedicato agli ospiti dei Centri Benessere in Puglia. Trasferimenti rilassanti e confortevoli.", type: "ncc" },
      { keyword: "ncc-per-spa-puglia", title: "NCC per SPA Puglia", description: "Servizio NCC dedicato agli ospiti delle SPA in Puglia. Trasferimenti rilassanti e confortevoli.", type: "ncc" },
      { keyword: "ncc-per-centri-commerciali-puglia", title: "NCC per Centri Commerciali Puglia", description: "Servizio NCC dedicato agli amanti dello shopping in Puglia. Trasferimenti comodi per lo shopping.", type: "ncc" },
      { keyword: "ncc-per-outlet-puglia", title: "NCC per Outlet Puglia", description: "Servizio NCC dedicato agli amanti dello shopping in Puglia. Trasferimenti comodi per gli Outlet.", type: "ncc" },
      { keyword: "ncc-per-masserie-puglia", title: "NCC per Masserie Puglia", description: "Servizio NCC dedicato agli ospiti delle Masserie in Puglia. Transfer, tour e servizi su misura.", type: "ncc" }
    ],
    vehicles: [
      { keyword: "ncc-minivan-puglia", title: "NCC Minivan Puglia", description: "Servizio NCC con Minivan Mercedes in Puglia. Perfetto per gruppi fino a 7 persone e famiglie.", type: "ncc" },
      { keyword: "ncc-minibus-puglia", title: "NCC Minibus Puglia", description: "Servizio NCC con Minibus in Puglia. Ideale per gruppi numerosi fino a 16 persone.", type: "ncc" },
      { keyword: "ncc-auto-di-lusso-puglia", title: "NCC Auto di Lusso Puglia", description: "Servizio NCC con Auto di Lusso in Puglia. Mercedes Classe S e Classe E per un viaggio esclusivo.", type: "ncc" },
      { keyword: "ncc-suv-puglia", title: "NCC SUV Puglia", description: "Servizio NCC con SUV in Puglia. Comfort e spazio per viaggiare in totale relax.", type: "ncc" },
      { keyword: "ncc-berlina-puglia", title: "NCC Berlina Puglia", description: "Servizio NCC con Berlina in Puglia. Mercedes Classe E per viaggi business e di piacere.", type: "ncc" },
      { keyword: "ncc-station-wagon-puglia", title: "NCC Station Wagon Puglia", description: "Servizio NCC con Station Wagon in Puglia. Spazio e comfort per viaggi con bagagli.", type: "ncc" },
      { keyword: "ncc-auto-elettriche-puglia", title: "NCC Auto Elettriche Puglia", description: "Servizio NCC con Auto Elettriche in Puglia. Trasporto ecologico e confortevole.", type: "ncc" },
      { keyword: "ncc-auto-ibride-puglia", title: "NCC Auto Ibride Puglia", description: "Servizio NCC con Auto Ibride in Puglia. Trasporto ecologico e confortevole.", type: "ncc" },
      { keyword: "ncc-auto-sportive-puglia", title: "NCC Auto Sportive Puglia", description: "Servizio NCC con Auto Sportive in Puglia. Un tocco di adrenalina per occasioni speciali.", type: "ncc" },
      { keyword: "ncc-limousine-puglia", title: "NCC Limousine Puglia", description: "Servizio NCC con Limousine in Puglia. Il massimo del lusso per eventi speciali.", type: "ncc" }
    ],
    duration: [
      { keyword: "ncc-orario-puglia", title: "NCC Orario Puglia", description: "Servizio NCC a Ore in Puglia. Flessibilità e convenienza per le tue esigenze di mobilità.", type: "ncc" },
      { keyword: "ncc-mezza-giornata-puglia", title: "NCC Mezza Giornata Puglia", description: "Servizio NCC per Mezza Giornata in Puglia. Perfetto per brevi escursioni o appuntamenti.", type: "ncc" },
      { keyword: "ncc-giornata-intera-puglia", title: "NCC Giornata Intera Puglia", description: "Servizio NCC per Giornata Intera in Puglia. Ideale per tour completi o giornate di lavoro.", type: "ncc" },
      { keyword: "ncc-settimanale-puglia", title: "NCC Settimanale Puglia", description: "Servizio NCC Settimanale in Puglia. La soluzione perfetta per la tua vacanza in Puglia.", type: "ncc" },
      { keyword: "ncc-mensile-puglia", title: "NCC Mensile Puglia", description: "Servizio NCC Mensile in Puglia. Per chi necessita di un trasporto continuativo e affidabile.", type: "ncc" },
      { keyword: "ncc-lungo-termine-puglia", title: "NCC Lungo Termine Puglia", description: "Servizio NCC a Lungo Termine in Puglia. Soluzioni su misura per periodi prolungati.", type: "ncc" },
      { keyword: "ncc-breve-termine-puglia", title: "NCC Breve Termine Puglia", description: "Servizio NCC a Breve Termine in Puglia. Flessibilità e convenienza per brevi periodi.", type: "ncc" },
      { keyword: "ncc-noleggio-giornaliero-puglia", title: "NCC Noleggio Giornaliero Puglia", description: "Servizio NCC con Noleggio Giornaliero in Puglia. Tariffa fissa per l'intera giornata.", type: "ncc" },
      { keyword: "ncc-noleggio-orario-puglia", title: "NCC Noleggio Orario Puglia", description: "Servizio NCC con Noleggio Orario in Puglia. Paghi solo per il tempo effettivo di utilizzo.", type: "ncc" },
      { keyword: "ncc-noleggio-settimanale-puglia", title: "NCC Noleggio Settimanale Puglia", description: "Servizio NCC con Noleggio Settimanale in Puglia. Tariffa conveniente per l'intera settimana.", type: "ncc" }
    ],
    additional: [
      { keyword: "ncc-con-seggiolino-bambini-puglia", title: "NCC con Seggiolino Bambini Puglia", description: "Servizio NCC con Seggiolino per Bambini in Puglia. Sicurezza e comfort per i più piccoli.", type: "ncc" },
      { keyword: "ncc-con-wi-fi-puglia", title: "NCC con Wi-Fi Puglia", description: "Servizio NCC con Wi-Fi gratuito in Puglia. Resta connesso durante il tuo viaggio.", type: "ncc" },
      { keyword: "ncc-con-autista-multilingue-puglia", title: "NCC con Autista Multilingue Puglia", description: "Servizio NCC con Autista Multilingue in Puglia. Comunicazione facile per turisti internazionali.", type: "ncc" },
      { keyword: "ncc-con-aria-condizionata-puglia", title: "NCC con Aria Condizionata Puglia", description: "Servizio NCC con Aria Condizionata in Puglia. Comfort garantito anche nelle giornate più calde.", type: "ncc" },
      { keyword: "ncc-con-bagagliaio-capiente-puglia", title: "NCC con Bagagliaio Capiente Puglia", description: "Servizio NCC con Bagagliaio Capiente in Puglia. Spazio per tutti i tuoi bagagli e attrezzature.", type: "ncc" },
      { keyword: "ncc-con-pagamento-carta-puglia", title: "NCC con Pagamento Carta Puglia", description: "Servizio NCC con Pagamento con Carta in Puglia. Comodità e sicurezza per i tuoi pagamenti.", type: "ncc" },
      { keyword: "ncc-con-prenotazione-online-puglia", title: "NCC con Prenotazione Online Puglia", description: "Servizio NCC con Prenotazione Online in Puglia. Prenota il tuo viaggio in pochi clic.", type: "ncc" },
      { keyword: "ncc-con-servizio-notturno-puglia", title: "NCC con Servizio Notturno Puglia", description: "Servizio NCC Notturno in Puglia. Disponibile 24 ore su 24 per ogni esigenza.", type: "ncc" },
      { keyword: "ncc-con-servizio-festivo-puglia", title: "NCC con Servizio Festivo Puglia", description: "Servizio NCC Festivo in Puglia. Disponibile anche durante le festività e i weekend.", type: "ncc" },
      { keyword: "ncc-con-servizio-express-puglia", title: "NCC con Servizio Express Puglia", description: "Servizio NCC Express in Puglia. Trasferimenti rapidi per chi ha fretta.", type: "ncc" }
    ],
    itineraries: [
      { keyword: "ncc-per-tour-valle-itria", title: "NCC per Tour Valle d'Itria", description: "Servizio NCC per Tour della Valle d'Itria. Scopri i trulli di Alberobello, Locorotondo e Cisternino.", type: "tour" },
      { keyword: "ncc-per-tour-salento", title: "NCC per Tour Salento", description: "Servizio NCC per Tour del Salento. Lecce, Otranto, Gallipoli e le meravigliose spiagge salentine.", type: "tour" },
      { keyword: "ncc-per-tour-gargano", title: "NCC per Tour Gargano", description: "Servizio NCC per Tour del Gargano. Vieste, Peschici e la Foresta Umbra con i nostri autisti esperti.", type: "tour" },
      { keyword: "ncc-per-tour-murgia", title: "NCC per Tour Murgia", description: "Servizio NCC per Tour della Murgia. Altamura, Gravina e il Parco Nazionale dell'Alta Murgia.", type: "tour" },
      { keyword: "ncc-per-tour-costa-adriatica", title: "NCC per Tour Costa Adriatica", description: "Servizio NCC per Tour della Costa Adriatica. Da Bari a Otranto passando per le più belle località costiere.", type: "tour" },
      { keyword: "ncc-per-tour-costa-ionica", title: "NCC per Tour Costa Ionica", description: "Servizio NCC per Tour della Costa Ionica. Da Taranto a Gallipoli passando per le più belle spiagge ioniche.", type: "tour" },
      { keyword: "ncc-per-tour-citta-storiche-puglia", title: "NCC per Tour Città Storiche Puglia", description: "Servizio NCC per Tour delle Città Storiche della Puglia. Lecce, Bari, Trani e altre perle storiche.", type: "tour" },
      { keyword: "ncc-per-tour-borghi-autentici-puglia", title: "NCC per Tour Borghi Autentici Puglia", description: "Servizio NCC per Tour dei Borghi Autentici della Puglia. Scopri l'anima autentica della regione.", type: "tour" },
      { keyword: "ncc-per-tour-enogastronomici-puglia", title: "NCC per Tour Enogastronomici Puglia", description: "Servizio NCC per Tour Enogastronomici in Puglia. Degustazioni di vini, oli e prodotti tipici.", type: "tour" },
      { keyword: "ncc-per-tour-culturali-puglia", title: "NCC per Tour Culturali Puglia", description: "Servizio NCC per Tour Culturali in Puglia. Storia, arte e tradizioni con i nostri autisti esperti.", type: "tour" },
      { keyword: "ncc-per-tour-naturalistici-puglia", title: "NCC per Tour Naturalistici Puglia", description: "Servizio NCC per Tour Naturalistici in Puglia. Parchi, riserve naturali e paesaggi mozzafiato.", type: "tour" },
      { keyword: "ncc-per-tour-archeologici-puglia", title: "NCC per Tour Archeologici Puglia", description: "Servizio NCC per Tour Archeologici in Puglia. Scopri le antiche civiltà che hanno abitato questa terra.", type: "tour" },
      { keyword: "ncc-per-tour-religiosi-puglia", title: "NCC per Tour Religiosi Puglia", description: "Servizio NCC per Tour Religiosi in Puglia. Santuari, chiese e luoghi di culto con i nostri autisti esperti.", type: "tour" },
      { keyword: "ncc-per-tour-fotografici-puglia", title: "NCC per Tour Fotografici Puglia", description: "Servizio NCC per Tour Fotografici in Puglia. I luoghi più fotogenici con i nostri autisti esperti.", type: "tour" },
      { keyword: "ncc-per-tour-personalizzati-puglia", title: "NCC per Tour Personalizzati Puglia", description: "Servizio NCC per Tour Personalizzati in Puglia. Creiamo insieme l'itinerario perfetto per te.", type: "tour" }
    ]
  }
};

/**
 * Capitalize the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalizeWords(str) {
  return str.replace(/-/g, ' ').split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generates a list of 3-5 unique services specific to the page based on the keyword
 * @param {string} keyword - The page keyword
 * @param {array} services - The list of all available services
 * @returns {array} - A list of services specific to the page
 */
function generateSpecificServices(keyword, services) {
  // Seed the random number generator based on the keyword for consistency
  const seed = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Simple pseudo-random number generator
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  // Shuffle the services array
  const shuffled = [...services].sort(() => random() - 0.5);
  
  // Take 3-5 services (pseudo-randomly)
  const count = Math.floor(random() * 3) + 3; // 3-5 services
  return shuffled.slice(0, count);
}

/**
 * Generates a list of 3-4 unique advantages specific to the page based on the keyword
 * @param {string} keyword - The page keyword
 * @param {array} advantages - The list of all available advantages
 * @returns {array} - A list of advantages specific to the page
 */
function generateSpecificAdvantages(keyword, advantages) {
  // Seed the random number generator based on the keyword for consistency
  const seed = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 100;
  
  // Simple pseudo-random number generator
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  // Shuffle the advantages array
  const shuffled = [...advantages].sort(() => random() - 0.5);
  
  // Take 3-4 advantages (pseudo-randomly)
  const count = Math.floor(random() * 2) + 3; // 3-4 advantages
  return shuffled.slice(0, count);
}

/**
 * Selects a subset of FAQs for the page
 * @param {string} type - The type of page (ncc, transfer, tour, rental)
 * @param {string} keyword - The page keyword
 * @returns {array} - A list of FAQs for the page
 */
function selectFAQs(type, keyword) {
  // Get base FAQs for the type
  const baseFAQs = config.faqs[type] || config.faqs.ncc;
  
  // Seed the random number generator based on the keyword for consistency
  const seed = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 200;
  
  // Simple pseudo-random number generator
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  // Shuffle the FAQs array
  const shuffled = [...baseFAQs].sort(() => random() - 0.5);
  
  // Take 4-5 FAQs (pseudo-randomly)
  const count = Math.floor(random() * 2) + 4; // 4-5 FAQs
  return shuffled.slice(0, count);
}

/**
 * Main function to generate SEO pages for all keywords
 */
async function generateSEOPages() {
  try {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      await mkdirAsync(OUTPUT_DIR, { recursive: true });
    }
    
    // Track the number of pages generated
    let pagesGenerated = 0;
    
    // Generate pages for each category
    for (const [category, keywords] of Object.entries(config.categories)) {
      console.log(`Generating pages for ${category}...`);
      
      for (const keywordData of keywords) {
        const { keyword, title, description, type = 'ncc' } = keywordData;
        const fileName = `${keyword.toLowerCase().replace(/\s+/g, '-')}.js`;
        const filePath = path.join(OUTPUT_DIR, fileName);
        
        // Generate location-specific data where relevant
        let location = '';
        let serviceArea = 'Puglia';
        
        if (keyword.includes('-bari')) {
          location = 'Bari';
          serviceArea = 'Bari';
        } else if (keyword.includes('-brindisi')) {
          location = 'Brindisi';
          serviceArea = 'Brindisi';
        } else if (keyword.includes('-lecce')) {
          location = 'Lecce';
          serviceArea = 'Lecce';
        } else if (keyword.includes('-ostuni')) {
          location = 'Ostuni';
          serviceArea = 'Ostuni';
        } else if (keyword.includes('-alberobello')) {
          location = 'Alberobello';
          serviceArea = 'Alberobello';
        } else if (keyword.includes('-taranto')) {
          location = 'Taranto';
          serviceArea = 'Taranto';
        } else if (keyword.includes('-foggia')) {
          location = 'Foggia';
          serviceArea = 'Foggia';
        } else if (keyword.includes('-polignano')) {
          location = 'Polignano a Mare';
          serviceArea = 'Polignano a Mare';
        } else if (keyword.includes('-monopoli')) {
          location = 'Monopoli';
          serviceArea = 'Monopoli';
        } else if (keyword.includes('-gallipoli')) {
          location = 'Gallipoli';
          serviceArea = 'Gallipoli';
        } else if (keyword.includes('-otranto')) {
          location = 'Otranto';
          serviceArea = 'Otranto';
        } else if (keyword.includes('-trani')) {
          location = 'Trani';
          serviceArea = 'Trani';
        } else if (keyword.includes('-matera')) {
          location = 'Matera';
          serviceArea = 'Matera';
        }
        
        // Get image based on type
        const imagePath = config.images[type] || config.images.ncc;
        
        // Generate services and advantages specific to this page
        const specificServices = generateSpecificServices(keyword, config.services);
        const specificAdvantages = generateSpecificAdvantages(keyword, config.advantages);
        
        // Select FAQs for this page
        const faqs = selectFAQs(type, keyword);
        
        // Generate content unique to this page
        const introText = generateIntroText(title, description, location, type);
        const servicesText = generateServicesText(specificServices, serviceArea, type);
        
        // Schema.org structured data
        const schemaData = generateSchemaData(title, description, serviceArea, type, faqs);
        
        // Generate the page content
        const pageContent = `import { Suspense } from 'react';
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
    title: "${title}",
    description: "${description}",
    path: "/${keyword}",
    businessName: "${config.baseInfo.businessName}",
    legalName: "${config.baseInfo.legalName}"
  });
}

// Main page component
export default function SEOPage() {
  // Define FAQs data
  const faqs = ${JSON.stringify(faqs, null, 2)};
  
  return (
    <>
      <Header />
      <main className="py-32 bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(schemaData.faqSchema, null, 2)}) }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(schemaData.serviceSchema, null, 2)}) }}
        />
        
        {/* Page content */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            ${title}
          </h1>
          
          {/* Hero section with image */}
          <div className="relative h-80 w-full mb-12 border border-dark-silver">
            <Image 
              src="${imagePath}"
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
            <h2 className="text-3xl font-bold mb-6">${capitalizeWords(title)}</h2>
            ${introText}
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perché Scegliere il Nostro Servizio ${type === 'ncc' ? 'NCC' : capitalizeWords(type)} ${location ? `a ${location}` : 'in Puglia'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${specificAdvantages.map(adv => `
              <div className="metal-card">
                <h3 className="text-xl font-semibold mb-4">${adv.title}</h3>
                <p className="text-silver">
                  ${adv.description}
                </p>
              </div>`).join('')}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">${type === 'ncc' ? 'Servizi NCC' : type === 'transfer' ? 'Tipologie di Transfer' : type === 'tour' ? 'Tour Disponibili' : 'Servizi di Autonoleggio'} ${location ? `a ${location}` : 'in Puglia'}</h2>
            <ul className="space-y-4">
              ${servicesText}
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
              Prenota ora il nostro servizio premium ${type === 'ncc' ? 'ncc' : type} per ${serviceArea}
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

        // Write the page to file
        await writeFileAsync(filePath, pageContent, 'utf8');
        pagesGenerated++;
        
        console.log(`Generated page: ${filePath}`);
      }
    }
    
    console.log(`\nSuccessfully generated ${pagesGenerated} SEO pages.`);
    
    // Update sitemap.js to include the new pages
    await updateSitemap(Object.values(config.categories).flat().map(item => item.keyword));
    
    console.log('Updated sitemap.js with new pages');
    
    // Update middleware.js
    await updateMiddleware(Object.values(config.categories).flat().map(item => item.keyword));
    
    console.log('Updated middleware.js with new SEO slugs');
    
  } catch (error) {
    console.error('Error generating SEO pages:', error);
  }
}

/**
 * Generate intro text based on the title, description, location, and type
 * @param {string} title - The page title
 * @param {string} description - The page description
 * @param {string} location - The location (city/area)
 * @param {string} type - The type of service
 * @returns {string} - HTML string for the intro text
 */
function generateIntroText(title, description, location, type) {
  const serviceType = type === 'ncc' ? 'NCC' : 
                     type === 'transfer' ? 'transfer' : 
                     type === 'tour' ? 'tour' : 'autonoleggio';
  
  const locationText = location ? `a ${location}` : 'in Puglia';
  
  let intro = '';
  
  if (type === 'ncc') {
    intro = `
  <p className="text-lg mb-4">
    Zaccaria NCC offre un esclusivo servizio di noleggio con conducente ${locationText} con autisti professionisti e una flotta di veicoli Mercedes-Benz.
    Il nostro servizio NCC garantisce puntualità, comfort e un'esperienza di viaggio all'insegna dell'eleganza.
  </p>
  <p className="text-lg mb-4">
    Che si tratti di transfer aeroportuali, spostamenti di lavoro o tour turistici ${locationText} e dintorni, il nostro servizio di noleggio con conducente
    rappresenta la soluzione ideale per chi cerca un trasporto privato di alta qualità.
  </p>`;
  } else if (type === 'transfer') {
    intro = `
  <p className="text-lg mb-4">
    Zaccaria NCC offre un servizio di transfer esclusivo da e per ${location || 'le principali località della Puglia'} con vetture Mercedes di ultima generazione e autisti professionisti.
    Il nostro servizio transfer garantisce puntualità, comfort e un'esperienza di viaggio senza stress.
  </p>
  <p className="text-lg mb-4">
    Che siate in viaggio per affari o per piacere, il nostro servizio transfer rappresenta la soluzione ideale per raggiungere ${location || 'la vostra destinazione in Puglia'}
    con il massimo comfort e stile, evitando le complicazioni dei mezzi pubblici o dei taxi standard.
  </p>`;
  } else if (type === 'tour') {
    intro = `
  <p className="text-lg mb-4">
    Zaccaria NCC offre tour esclusivi con autista privato alla scoperta di ${location || 'Puglia e delle meraviglie della Puglia'}.
    I nostri tour personalizzati permettono di esplorare in totale comfort e libertà i luoghi più affascinanti della regione.
  </p>
  <p className="text-lg mb-4">
    Con un autista privato a vostra disposizione, potrete godere di un'esperienza di viaggio su misura, con soste a richiesta,
    itinerari flessibili e consigli locali che solo un professionista del territorio può offrire.
  </p>`;
  } else if (type === 'rental') {
    intro = `
  <p className="text-lg mb-4">
    Zaccaria NCC offre un servizio di autonoleggio senza conducente a ${location || 'in tutta la Puglia'} con veicoli moderni e perfettamente mantenuti.
    Il nostro servizio garantisce affidabilità, convenienza e la massima flessibilità per i vostri spostamenti.
  </p>
  <p className="text-lg mb-4">
    Che siate in Puglia per vacanza o per lavoro, il nostro servizio di autonoleggio rappresenta la soluzione ideale per
    muovervi in autonomia e scoprire le bellezze del territorio a vostro piacimento.
  </p>`;
  }
  
  return intro;
}

/**
 * Generate services text based on the services, service area, and type
 * @param {array} services - The services to include
 * @param {string} serviceArea - The service area (city/region)
 * @param {string} type - The type of service
 * @returns {string} - HTML string for the services section
 */
function generateServicesText(services, serviceArea, type) {
  let servicesText = '';
  
  // Generate different descriptions based on the type and service
  const serviceDescriptions = {
    ncc: {
      "Transfer aeroportuali": `Transfer da e per gli aeroporti di Brindisi e Bari, con monitoraggio dei voli e assistenza bagagli.`,
      "Servizio Business": `Trasporto executive per professionisti e aziende, con massima puntualità e riservatezza.`,
      "Tour turistici privati": `Escursioni personalizzate a ${serviceArea} e nei dintorni con autista a vostra disposizione.`,
      "Servizio cerimonie": `Auto di lusso con conducente per matrimoni ed eventi speciali con decorazioni personalizzate.`,
      "Transfer intercity": `Collegamenti diretti tra le principali città della Puglia, con possibilità di fermate intermedie.`,
      "Tour enogastronomici": `Percorsi alla scoperta delle eccellenze enogastronomiche pugliesi, con visite a cantine, frantoi e masserie.`,
      "Visitare i borghi bianchi": `Tour dei caratteristici borghi bianchi della Valle d'Itria: Ostuni, Locorotondo, Cisternino e Alberobello.`,
      "Noleggio con conducente": `Servizio NCC professionale per qualsiasi esigenza di trasporto, con autista a vostra disposizione.`
    },
    transfer: {
      "Transfer aeroportuali": `Servizio da e per gli aeroporti di Brindisi e Bari, con monitoraggio dei voli e assistenza bagagli.`,
      "Servizio Business": `Transfer business per professionisti e aziende, con massima puntualità e comfort per i vostri spostamenti di lavoro.`,
      "Transfer intercity": `Collegamenti diretti tra ${serviceArea} e le principali città della Puglia, con possibilità di fermate intermedie.`,
      "Servizio cerimonie": `Transfer di lusso per matrimoni ed eventi speciali, con auto Mercedes decorate e servizio personalizzato.`,
      "Tour turistici privati": `Transfer per escursioni personalizzate a ${serviceArea} e nei dintorni, con autista a vostra disposizione.`,
      "Transfer per Eventi": `Servizio dedicato per concerti, meeting aziendali e altri eventi speciali a ${serviceArea}.`,
      "Transfer notturno": `Servizio transfer disponibile 24 ore su 24, anche nelle ore notturne per qualsiasi esigenza.`,
      "Transfer VIP": `Servizio transfer esclusivo per clienti VIP, con massimo comfort, privacy e professionalità.`
    },
    tour: {
      "Tour dei Borghi Bianchi": `Visita i caratteristici borghi bianchi della Valle d'Itria: Ostuni, Locorotondo, Cisternino e Alberobello con i suoi famosi trulli.`,
      "Tour Enogastronomico": `Esperienza sensoriale tra le eccellenze enogastronomiche pugliesi: frantoi, cantine vinicole e masserie con degustazioni di prodotti tipici.`,
      "Tour delle Città d'Arte": `Viaggio culturale nelle città storiche della Puglia: Lecce con il suo barocco, Bari vecchia, Matera e i suoi Sassi (Basilicata).`,
      "Tour delle Spiagge": `Esplorazione delle calette più belle e caratteristiche della costa pugliese, da Torre Guaceto al Salento.`,
      "Tour Personalizzati": `Creiamo insieme l'itinerario ideale in base ai vostri interessi e al tempo a disposizione.`,
      "Tour del Salento": `Alla scoperta delle meraviglie del Salento: Lecce, Otranto, Gallipoli e le splendide spiagge della penisola salentina.`,
      "Tour della Valle d'Itria": `Esplorazione della Valle d'Itria con i suoi paesaggi unici, trulli, masserie e borghi caratteristici.`,
      "Tour di Matera": `Visita guidata della Città dei Sassi, patrimonio UNESCO e Capitale Europea della Cultura 2019.`
    },
    rental: {
      "Autonoleggio Giornaliero": `Noleggio auto per una giornata, ideale per escursioni o brevi soggiorni a ${serviceArea}.`,
      "Autonoleggio Settimanale": `Noleggio auto per una settimana, perfetto per visitare ${serviceArea} e la Puglia in totale libertà.`,
      "Autonoleggio Lungo Termine": `Soluzioni di noleggio per periodi prolungati, con tariffe vantaggiose e assistenza completa.`,
      "Noleggio Auto Economiche": `Veicoli compatti ed economici per spostamenti urbani e brevi distanze.`,
      "Noleggio Auto Familiari": `Veicoli spaziosi e confortevoli, ideali per famiglie e gruppi.`,
      "Noleggio SUV": `Veicoli SUV per massimo comfort e capacità su ogni tipo di strada.`,
      "Servizio di Consegna": `Consegna e ritiro dell'auto presso hotel, aeroporti o stazioni ferroviarie.`,
      "Assistenza 24/7": `Assistenza clienti disponibile 24 ore su 24, 7 giorni su 7 per qualsiasi necessità.`
    }
  };
  
  // Get the right descriptions based on type
  const descriptions = serviceDescriptions[type] || serviceDescriptions.ncc;
  
  services.forEach(service => {
    const description = descriptions[service] || `Servizio di ${service} professionale a ${serviceArea}.`;
    
    servicesText += `
    <li className="flex items-start">
      <div className="text-silver-metallic mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">${service}</h3>
        <p className="text-silver">${description}</p>
      </div>
    </li>`;
  });
  
  return servicesText;
}

/**
 * Generate Schema.org structured data for the page
 * @param {string} title - The page title
 * @param {string} description - The page description
 * @param {string} serviceArea - The service area (city/region)
 * @param {string} type - The type of service
 * @param {array} faqs - The FAQs for the page
 * @returns {object} - Schema.org structured data
 */
function generateSchemaData(title, description, serviceArea, type, faqs) {
  // FAQ Schema
  const faqSchema = {
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
  };
  
  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": config.baseInfo.businessName,
      "telephone": config.baseInfo.phone,
      "email": config.baseInfo.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.baseInfo.address.street,
        "addressLocality": config.baseInfo.address.city,
        "addressRegion": config.baseInfo.address.region,
        "postalCode": config.baseInfo.address.postalCode,
        "addressCountry": config.baseInfo.address.country
      },
      "image": config.baseInfo.logo
    },
    "areaServed": {
      "@type": "City",
      "name": serviceArea
    },
    "serviceType": type,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };
  
  return { faqSchema, serviceSchema };
}

/**
 * Update the sitemap.js file to include the new pages
 * @param {array} keywords - The list of keywords to add to the sitemap
 */
async function updateSitemap(keywords) {
  const sitemapPath = path.join(__dirname, 'src/app/sitemap.js');
  
  try {
    // Check if the sitemap file exists
    if (!fs.existsSync(sitemapPath)) {
      console.error('Sitemap file not found at:', sitemapPath);
      return;
    }
    
    // Read the sitemap file
    let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Find the place to insert the new routes
    const routesEndIndex = sitemapContent.indexOf('return routes;');
    if (routesEndIndex === -1) {
      console.error('Could not find the end of routes in the sitemap file');
      return;
    }
    
    // Generate the new routes
    let newRoutes = '';
    keywords.forEach(keyword => {
      newRoutes += `    // SEO Landing Page - ${keyword}\n`;
      newRoutes += `    {\n`;
      newRoutes += `      url: \`\${baseUrl}/${keyword}\`,\n`;
      newRoutes += `      lastModified: new Date(),\n`;
      newRoutes += `      changeFrequency: 'monthly',\n`;
      newRoutes += `      priority: 0.8,\n`;
      newRoutes += `    },\n`;
    });
    
    // Insert the new routes
    sitemapContent = sitemapContent.slice(0, routesEndIndex) + newRoutes + sitemapContent.slice(routesEndIndex);
    
    // Write the updated sitemap file
    await writeFileAsync(sitemapPath, sitemapContent, 'utf8');
    
  } catch (error) {
    console.error('Error updating sitemap:', error);
  }
}

/**
 * Update the middleware.js file to include the new SEO slugs
 * @param {array} keywords - The list of keywords to add to the middleware
 */
async function updateMiddleware(keywords) {
  try {
    // Check if the middleware file exists
    if (!fs.existsSync(MIDDLEWARE_PATH)) {
      console.error('Middleware file not found at:', MIDDLEWARE_PATH);
      return;
    }
    
    // Read the middleware file
    let middlewareContent = await readFileAsync(MIDDLEWARE_PATH, 'utf8');
    
    // Find the SEO_SLUGS array
    const seoSlugsRegex = /const SEO_SLUGS\s*=\s*\[([\s\S]*?)\];/;
    const seoSlugsMatch = middlewareContent.match(seoSlugsRegex);
    
    if (!seoSlugsMatch) {
      console.error('Could not find SEO_SLUGS array in middleware.js');
      return;
    }
    
    // Get the existing SEO slugs
    const existingSlugs = seoSlugsMatch[1]
      .split(',')
      .map(s => s.trim())
      .filter(s => s.startsWith("'") || s.startsWith('"'))
      .map(s => s.replace(/['"]/g, ''));
    
    // Create a new array with both existing and new slugs (avoiding duplicates)
    const allSlugs = Array.from(new Set([...existingSlugs, ...keywords]));
    
    // Generate the new SEO_SLUGS array content
    const newSeoSlugsContent = allSlugs
      .map(slug => `  '${slug}'`)
      .join(',\n');
    
    // Replace the existing array with the new one
    const newMiddlewareContent = middlewareContent.replace(
      seoSlugsRegex,
      `const SEO_SLUGS = [\n${newSeoSlugsContent}\n];`
    );
    
    // Write the updated middleware file
    await writeFileAsync(MIDDLEWARE_PATH, newMiddlewareContent, 'utf8');
    
  } catch (error) {
    console.error('Error updating middleware:', error);
  }
}

// Don't run the script immediately - the main script will call it
module.exports = { generateSEOPages };
