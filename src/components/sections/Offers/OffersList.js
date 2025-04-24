'use client';

import { useState, useEffect } from 'react';
import OfferCard from '@/components/ui/offers/OfferCard';
import useOfferImpression from '@/hooks/useOfferImpression';
import { trackOfferView } from '@/lib/analytics';

// Offers data - in a real app, this would come from an API or CMS
const OFFERS = [
  {
    id: 'summer-2025',
    title: 'Offerta Estate 2025',
    description: 'Transfer aeroportuale + tour guidato di 4 ore. Scopri le spiagge più belle del Salento con autista dedicato e guida locale.',
    imageUrl: '/images/offers/summer-offer.jpg',
    discount: '20%',
    price: 240,
    discountedPrice: 192,
    duration: '4 ore',
    validUntil: '2025-09-30',
    tags: ['Estate', 'Spiagge', 'Tour Guidato'],
    cta: 'Prenota Ora a €192'
  },
  {
    id: 'valle-ditria',
    title: 'Tour Valle d\'Itria',
    description: 'Visita guidata dei borghi bianchi: Ostuni, Cisternino, Locorotondo e Alberobello. Degustazione di prodotti tipici inclusa.',
    imageUrl: '/images/offers/valle-itria.jpg',
    discount: '15%',
    price: 320,
    discountedPrice: 272,
    duration: '8 ore',
    validUntil: '2025-12-31',
    tags: ['Borghi', 'Cultura', 'Enogastronomia'],
    cta: 'Scopri il Tour'
  },
  {
    id: 'business-transfer',
    title: 'Business Transfer',
    description: 'Servizio premium Mercedes Class E per trasferimenti business. Wi-Fi a bordo, acqua minerale e quotidiani a disposizione.',
    imageUrl: '/images/offers/business-transfer.jpg',
    discount: '10%',
    price: 180,
    discountedPrice: 162,
    duration: 'Giornaliero',
    validUntil: '2025-12-31',
    tags: ['Business', 'Mercedes', 'Premium'],
    cta: 'Prenota il Trasferimento'
  }
];

export default function OffersList() {
  const [sortedOffers, setSortedOffers] = useState([]);
  const { trackImpression } = useOfferImpression();

  // Sort and optimize offers based on conversion data
  useEffect(() => {
    // In a real app, this would use analytics data to sort offers
    // For now, we'll use the default order
    setSortedOffers(OFFERS);
    
    // Track view for analytics
    trackOfferView('offers_section_view');
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedOffers.map((offer, index) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          priority={index === 0} // Prioritize loading of the first offer
          onImpression={() => trackImpression(offer.id)}
        />
      ))}
    </div>
  );
}
