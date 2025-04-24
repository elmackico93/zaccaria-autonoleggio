'use client';

import { useState } from 'react';
import Image from 'next/image';

// Data for offers
const OFFERS = [
  {
    id: "summer-2025",
    title: "Offerta Estate 2025",
    description: "Transfer aeroportuale + tour guidato di 4 ore. Scopri le spiagge più belle del Salento con autista dedicato e guida locale.",
    price: 240,
    discountedPrice: 192,
    discount: "20%",
    validUntil: "2025-09-30",
    image: "/images/offers/summer-offer.jpg",
    popular: true
  },
  {
    id: "valle-ditria",
    title: "Tour Valle d'Itria",
    description: "Visita guidata dei borghi bianchi: Ostuni, Cisternino, Locorotondo e Alberobello. Degustazione di prodotti tipici inclusa.",
    price: 320,
    discountedPrice: 272,
    discount: "15%",
    validUntil: "2025-12-31",
    image: "/images/offers/valle-itria.jpg"
  },
  {
    id: "business-transfer",
    title: "Business Transfer",
    description: "Servizio premium Mercedes Class E per trasferimenti business. Wi-Fi a bordo, acqua minerale e quotidiani a disposizione.",
    price: 180,
    discountedPrice: 162,
    discount: "10%",
    validUntil: "2025-12-31",
    image: "/images/offers/business-transfer.jpg"
  }
];

export default function Offers() {
  return (
    <section 
      id="offers" 
      className="relative py-32 bg-gradient-to-b from-black to-charcoal overflow-hidden"
    >
      {/* Metallic accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-silver-metallic to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-silver-metallic to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 chrome-text-enhanced">
            Offerte Speciali
          </h2>
          <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-silver-metallic to-transparent mb-6"></div>
          <p className="text-xl text-silver-metallic max-w-2xl mx-auto">
            Soluzioni esclusive per esplorare la Puglia con stile e comfort. 
            Approfitta dei nostri pacchetti a <span className="text-white font-semibold">prezzo ridotto</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OFFERS.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-silver-metallic mb-6">Prenota una delle nostre offerte speciali o richiedi un pacchetto personalizzato</p>
          <a 
            href="tel:+393313467527"
            className="inline-block bg-silver-metallic hover:bg-silver text-black font-semibold px-8 py-4 text-lg transition-all duration-300 border border-transparent hover:shadow-lg"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Contattaci per un Preventivo
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// Refined Offer Card Component with improved CTA and badges
function OfferCard({ offer, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate days until offer expires
  const daysRemaining = () => {
    const today = new Date();
    const expiryDate = new Date(offer.validUntil);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };
  
  // Calculate saved amount
  const savedAmount = offer.price - offer.discountedPrice;
  
  return (
    <div className="h-full flex flex-col transform transition-all duration-500 bg-charcoal">
      <div 
        className={`flex-1 flex flex-col overflow-hidden border border-dark-silver hover:border-silver-metallic transition-all duration-300 ${
          isHovered ? 'shadow-lg' : 'shadow-md'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with refined discount badge */}
        <div className="relative h-56 w-full overflow-hidden">
          {/* Image */}
          <Image 
            src={offer.image}
            alt={offer.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            priority={index === 0}
          />
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          
          {/* Refined Popular Badge - Professional and consistent with site style */}
          {offer.popular && (
            <div className="absolute top-4 left-0 z-10">
              <div className="bg-silver-metallic py-1 px-3 flex items-center shadow-md">
                <span className="text-xs font-bold tracking-wide text-black uppercase">Popolare</span>
              </div>
            </div>
          )}
          
          {/* Refined Discount Badge - Professional and aligned with site style */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-silver text-black font-bold flex items-center justify-center w-12 h-12 rounded-full shadow-md">
              <span className="text-sm">-{offer.discount}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2">
            {offer.title}
          </h3>
          
          {/* Price Display */}
          <div className="flex items-center mb-4">
            <div className="flex flex-col">
              <span className="text-silver-metallic line-through text-sm">€{offer.price}</span>
              <span className="text-2xl font-bold text-white">€{offer.discountedPrice}</span>
            </div>
            <div className="ml-auto bg-gunmetal px-3 py-1 flex items-center">
              <span className="text-silver-metallic text-xs mr-1">Risparmi</span>
              <span className="text-white font-bold">€{savedAmount}</span>
            </div>
          </div>
          
          <p className="text-silver-metallic text-sm mb-4 flex-grow">{offer.description}</p>
          
          {/* Countdown with metallic styling */}
          <div className="mb-6 flex items-center text-silver">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span className="text-xs">
              Valida per <span className="font-bold text-white">{daysRemaining()} giorni</span>
            </span>
          </div>
          
          {/* Refined Always-Visible CTA Button */}
          <a 
            href="tel:+393313467527" 
            className="metal-cta-button block w-full py-3 text-center text-black font-semibold bg-silver-metallic hover:bg-silver transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-silver focus:ring-opacity-50"
          >
            <span className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Prenota Ora
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
