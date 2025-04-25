'use client';

// Try multiple import paths to handle different configurations
let config;
try {
  // First try the path alias
  config = require('@config');
} catch (e) {
  try {
    // Then try the direct path
    config = require('../lib/config');
  } catch (e2) {
    // Fallback to relative path
    config = require('../../config');
  }
}

export default function SchemaOrg() {
  // Get business info from config
  const business = config.business;
  const address = business.address;
  const contact = business.contact;
  const social = business.social;
  const ratings = business.ratings;
  
  // Build structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "alternateName": business.legalName,
    "description": business.description,
    "url": business.siteUrl,
    "telephone": contact.phone,
    "email": contact.email,
    "logo": `${business.siteUrl}/images/logo.jpg`,
    "image": `${business.siteUrl}/images/service-cars.jpg`,
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card",
    "priceRange": "€€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.street,
      "addressLocality": address.city,
      "addressRegion": address.province,
      "postalCode": address.postalCode,
      "addressCountry": address.country
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
        "@type": "State",
        "name": "Puglia"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratings.average.toString(),
      "reviewCount": ratings.count.toString()
    },
    "sameAs": [
      social.facebook,
      social.instagram,
      address.googleMapsUrl
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
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transfer luxury Mercedes"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
