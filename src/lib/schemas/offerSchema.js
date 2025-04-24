/**
 * Schema.org structured data for offers
 * Enhances SEO and rich results in search engines
 */

// Create schema for a single offer
export function createSingleOfferSchema(offer) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    'name': offer.title,
    'description': offer.description,
    'price': offer.discountedPrice.toFixed(2),
    'priceCurrency': 'EUR',
    'priceValidUntil': offer.validUntil,
    'url': `https://www.zaccariaautonoleggio.it/offers/${offer.id}`,
    'availability': 'https://schema.org/InStock',
    'seller': {
      '@type': 'LocalBusiness',
      'name': 'Zaccaria NCC',
      'telephone': '+393313467527',
      'email': 'info@zaccariaautonoleggio.it'
    },
    'areaServed': {
      '@type': 'State',
      'name': 'Puglia'
    },
    'serviceOutput': {
      '@type': 'Service',
      'name': offer.title,
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Zaccaria NCC',
        'image': 'https://www.zaccariaautonoleggio.it/images/logo.jpg'
      }
    }
  };
}

// Create schema for the entire offers section
export function createOfferSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Offerte Speciali Zaccaria NCC',
    'description': 'Soluzioni esclusive per esplorare la Puglia con stile e comfort. Approfitta delle nostre offerte limitate.',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@type': 'Offer',
          'name': 'Offerta Estate 2025',
          'description': 'Transfer aeroportuale + tour guidato di 4 ore. Scopri le spiagge più belle del Salento con autista dedicato e guida locale.',
          'price': '192.00',
          'priceCurrency': 'EUR',
          'url': 'https://www.zaccariaautonoleggio.it/offers/summer-2025',
          'validFrom': '2025-05-01',
          'validThrough': '2025-09-30'
        }
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'item': {
          '@type': 'Offer',
          'name': 'Tour Valle d\'Itria',
          'description': 'Visita guidata dei borghi bianchi: Ostuni, Cisternino, Locorotondo e Alberobello. Degustazione di prodotti tipici inclusa.',
          'price': '272.00',
          'priceCurrency': 'EUR',
          'url': 'https://www.zaccariaautonoleggio.it/offers/valle-ditria',
          'validThrough': '2025-12-31'
        }
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'item': {
          '@type': 'Offer',
          'name': 'Business Transfer',
          'description': 'Servizio premium Mercedes Class E per trasferimenti business. Wi-Fi a bordo, acqua minerale e quotidiani a disposizione.',
          'price': '162.00',
          'priceCurrency': 'EUR',
          'url': 'https://www.zaccariaautonoleggio.it/offers/business-transfer',
          'validThrough': '2025-12-31'
        }
      }
    ]
  };
}
