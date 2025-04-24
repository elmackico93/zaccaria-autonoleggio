'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useInView } from '@/hooks/useScrollEffect';
import { trackOfferClick } from '@/lib/analytics';

export default function OfferCard({ 
  offer, 
  priority = false,
  onImpression 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  
  // Track impression when card comes into view
  const setRefs = (element) => {
    ref(element);
    cardRef.current = element;
    if (element && inView && onImpression) {
      onImpression();
    }
  };
  
  const handleClick = () => {
    // Track click for analytics
    trackOfferClick(offer.id);
    
    // In a real app, this would navigate to the offer detail page
    // or open a booking modal
    const phoneNumber = '+393313467527';
    window.location.href = `tel:${phoneNumber}`;
  };
  
  // Calculate days until offer expires
  const daysRemaining = () => {
    const today = new Date();
    const expiryDate = new Date(offer.validUntil);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };
  
  return (
    <div 
      ref={setRefs}
      className={`metal-fleet-card hover-effect overflow-hidden transition-all duration-500 ${
        isHovered ? 'transform -translate-y-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={offer.imageUrl}
          alt={offer.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyMjIyIi8+PC9zdmc+"
        />
        
        {/* Discount Badge */}
        {offer.discount && (
          <div className="absolute top-0 right-0 bg-silver-metallic text-black font-bold py-1 px-3 text-sm">
            {offer.discount} SCONTO
          </div>
        )}
        
        {/* Duration Tag */}
        <div className="absolute bottom-0 left-0 bg-black/70 py-1 px-3 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {offer.duration}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col h-64">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {offer.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-gunmetal text-silver-metallic">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
        
        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="text-silver-metallic line-through mr-2">€{offer.price}</span>
          <span className="text-xl font-bold text-white">€{offer.discountedPrice}</span>
        </div>
        
        <p className="text-silver-metallic text-sm flex-grow mb-4">{offer.description}</p>
        
        {/* Countdown */}
        <div className="text-xs text-silver mb-4">
          Offerta valida per <span className="font-bold text-white">{daysRemaining()} giorni</span>
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={handleClick} 
          className="call-button call-button-navbar w-full justify-center group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            {offer.cta}
            <svg 
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
