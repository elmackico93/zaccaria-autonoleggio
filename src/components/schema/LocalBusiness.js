'use client';

/**
 * Enhanced LocalBusiness schema component for Zaccaria NCC
 * This component provides comprehensive Schema.org structured data
 */
export default function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://www.zaccariaautonoleggio.it/#localbusiness",
          "name": "Zaccaria NCC",
          "legalName": "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto",
          "alternateName": "Zaccaria Autonoleggio",
          "description": "Servizio di noleggio con conducente e autonoleggio senza conducente a Ostuni. Transfer con Mercedes, tour guidati in Puglia.",
          "url": "https://www.zaccariaautonoleggio.it",
          "telephone": "+39-331 346 7527",
          "email": "info@zaccariaautonoleggio.it",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.zaccariaautonoleggio.it/images/logo.jpg",
            "width": "180",
            "height": "180"
          },
          "image": [
            "https://www.zaccariaautonoleggio.it/images/service-cars.jpg",
            "https://www.zaccariaautonoleggio.it/images/tour-puglia.jpg"
          ],
          "currenciesAccepted": "EUR",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer",
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
              "@type": "City",
              "name": "Lecce"
            },
            {
              "@type": "State",
              "name": "Puglia"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Marco Rossi"
              },
              "datePublished": "2025-01-15",
              "reviewBody": "Servizio impeccabile! L'autista è stato puntualissimo e molto professionale. L'auto era pulitissima e molto confortevole. Consigliatissimo!",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
              }
            },
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Laura Bianchi"
              },
              "datePublished": "2025-02-20",
              "reviewBody": "Ho utilizzato il servizio per un tour della Valle d'Itria. L'autista era molto preparato e ci ha fatto scoprire luoghi meravigliosi. Un'esperienza fantastica!",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          ],
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
                  "description": "Servizio di transfer da e per gli aeroporti di Bari e Brindisi"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tour guidati in Puglia",
                  "description": "Tour personalizzati alla scoperta delle meraviglie della Puglia"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Noleggio auto senza conducente",
                  "description": "Servizio di autonoleggio per esplorare la Puglia in autonomia"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Transfer luxury Mercedes",
                  "description": "Servizio di trasporto con auto Mercedes di lusso e autista"
                }
              }
            ]
          },
          "makesOffer": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Transfer Aeroporto Bari",
                "description": "Servizio di transfer dall'aeroporto di Bari"
              },
              "areaServed": {
                "@type": "City",
                "name": "Bari"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Transfer Aeroporto Brindisi",
                "description": "Servizio di transfer dall'aeroporto di Brindisi"
              },
              "areaServed": {
                "@type": "City",
                "name": "Brindisi"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tour Valle d'Itria",
                "description": "Tour guidato della Valle d'Itria con autista privato"
              },
              "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Valle d'Itria"
              }
            }
          ]
        }),
      }}
    />
  );
}
