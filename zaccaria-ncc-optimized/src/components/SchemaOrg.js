'use client';

export default function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Zaccaria NCC",
            "alternateName": "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto",
            "description": "Servizio di noleggio con conducente e autonoleggio senza conducente a Ostuni. Transfer con Mercedes, tour guidati in Puglia.",
            "url": "https://www.zaccariaautonoleggio.it",
            "telephone": "+39-331 346 7527",
            "email": "info@zaccariaautonoleggio.it",
            "logo": "https://www.zaccariaautonoleggio.it/images/logo.jpg",
            "image": "https://www.zaccariaautonoleggio.it/images/service-cars.jpg",
            "currenciesAccepted": "EUR",
            "paymentAccepted": "Cash, Credit Card",
            "priceRange": "€€€",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via Armando Diaz, 91",
                "addressLocality": "Ostuni",
                "addressRegion": "BR",
                "postalCode": "72017",
                "addressCountry": "IT"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.7290,
                "longitude": 17.5742
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            },
            "areaServed": [
                {
                    "@type": "City",
                    "name": "Ostuni"
                },
                {
                    "@type": "City",
                    "name": "Brindisi"
                },
                {
                    "@type": "City",
                    "name": "Bari"
                },
                {
                    "@type": "State",
                    "name": "Puglia"
                },
                {
                    "@type": "City",
                    "name": "Lecce"
                },
                {
                    "@type": "City",
                    "name": "Alberobello"
                },
                {
                    "@type": "City",
                    "name": "Gallipoli"
                },
                {
                    "@type": "City",
                    "name": "Otranto"
                }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.6",
              "reviewCount": "105"
            },
            "sameAs": [
              "https://www.facebook.com/zaccariancc",
              "https://www.instagram.com/zaccariancc",
              "https://www.google.com/maps/place/TAXI+-+NCC+OSTUNI+Rent+a+Car/@40.7290,17.5742,17z"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servizi NCC",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Transfer aeroportuali",
                    "description": "Servizio di transfer privato dagli aeroporti di Brindisi e Bari",
                    "areaServed": ["Brindisi", "Bari", "Ostuni", "Puglia"]
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Tour guidati in Puglia",
                    "description": "Tour guidati tra i borghi bianchi della Valle d'Itria, le scogliere del Gargano e le spiagge del Salento",
                    "areaServed": ["Valle d'Itria", "Gargano", "Salento", "Puglia"]
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Noleggio auto senza conducente",
                    "description": "Servizio di autonoleggio senza conducente con veicoli moderni e affidabili"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Transfer luxury Mercedes",
                    "description": "Servizio premium di trasporto con auto Mercedes di alta gamma"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Tour enogastronomici",
                    "description": "Esperienze enogastronomiche alla scoperta delle eccellenze pugliesi: frantoi, cantine vinicole e masserie",
                    "areaServed": ["Puglia"]
                  }
                }
              ]
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Marco Rossi"
                },
                "datePublished": "2024-03-15",
                "reviewBody": "Un servizio eccezionale in ogni dettaglio. La professionalità e la puntualità sono la loro firma distintiva. Non potrei immaginare un servizio migliore.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                }
              }
            ],
            "mainEntityOfPage": {
              "@type": "WebPage",
              "name": "Zaccaria NCC | Premium Chauffeur Service",
              "description": "Servizio di noleggio con conducente a Ostuni. Transfer con Mercedes, tour guidati in Puglia e autonoleggio senza conducente."
            }
          }
        `,
      }}
    />
  );
}