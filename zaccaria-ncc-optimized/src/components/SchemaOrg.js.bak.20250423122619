'use client';

export default function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
          {
            "@context": "https://schema.org",
            "@type": "LimousineService",
            "name": "Zaccaria NCC",
            "description": "Servizio professionale di noleggio con conducente a Ostuni e provincia di Brindisi",
            "url": "https://www.zaccariaautonoleggio.it",
            "telephone": "+39-123-456-7890",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via Roma 123",
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
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "€€€",
            "areaServed": [
                {
                    "@type": "City",
                    "name": "Ostuni"
                },
                {
                    "@type": "City",
                    "name": "Brindisi"
                }
            ],
            "image": "https://www.zaccariaautonoleggio.it/images/service-cars.jpg",
            "sameAs": [
              "https://www.facebook.com/zaccariancc",
              "https://www.instagram.com/zaccariancc"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servizi NCC",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Transfer aeroportuali"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Tour guidati in Puglia"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Noleggio auto senza conducente"
                  }
                }
              ]
            }
          }
        `,
      }}
    />
  );
}