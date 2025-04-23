'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CallButton from '@/components/ui/CallButton';

/**
 * Smart CTA - Call to Action intelligente basato sul comportamento utente
 * - Appare in momenti strategici (scroll, tempo sulla pagina, intento di uscita)
 * - Adatta il messaggio in base al contesto (pagina, referrer, etc.)
 * - Tracking di conversione integrato
 */
export default function SmartCTA({
  variant = 'default',
  delayMs = 8000,
  scrollThreshold = 0.6,
  exitIntent = true
}) {
  const [visible, setVisible] = useState(false);
  const [ctaText, setCtaText] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    if (typeof window === 'undefined' || hasInteracted) return;
    
    // Determina il testo CTA in base al percorso
    const setCTATextBasedOnPath = () => {
      if (pathname.includes('transfer-aeroporto-brindisi')) {
        setCtaText('Prenota il tuo transfer ora');
      } else if (pathname.includes('tour')) {
        setCtaText('Prenota questo tour');
      } else if (pathname.includes('fleet')) {
        setCtaText('Scopri la disponibilità');
      } else {
        setCtaText('Contattaci ora');
      }
    };
    
    setCTATextBasedOnPath();
    
    // Timer basato sul tempo sulla pagina
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setVisible(true);
      }
    }, delayMs);
    
    // Listener per scroll depth
    const handleScroll = () => {
      if (hasInteracted) return;
      
      const scrollPosition = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / totalHeight;
      
      if (scrollPercentage > scrollThreshold) {
        setVisible(true);
      }
    };
    
    // Listener per exit intent
    const handleExitIntent = (e) => {
      if (!exitIntent || hasInteracted) return;
      
      // Se il mouse si sposta verso l'alto e vicino al bordo superiore
      if (e.clientY < 50) {
        setVisible(true);
      }
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (exitIntent) {
      document.addEventListener('mousemove', handleExitIntent);
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      if (exitIntent) {
        document.removeEventListener('mousemove', handleExitIntent);
      }
    };
  }, [pathname, hasInteracted, delayMs, scrollThreshold, exitIntent]);
  
  // Gestisce l'interazione dell'utente
  const handleInteraction = (action) => {
    setHasInteracted(true);
    setVisible(false);
    
    // Traccia l'interazione per analytics
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        'event': 'smart_cta_interaction',
        'cta_action': action,
        'cta_text': ctaText,
        'page': pathname
      });
    }
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
      <div className="bg-gunmetal p-6 rounded-lg shadow-2xl border border-silver-metallic max-w-md">
        <button 
          onClick={() => handleInteraction('close')}
          className="absolute top-2 right-2 text-silver-metallic hover:text-white"
          aria-label="Chiudi"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        
        <h3 className="text-xl font-bold mb-3 chrome-text-enhanced">{ctaText}</h3>
        <p className="text-silver mb-6">
          Prenota ora il tuo servizio di noleggio con conducente in Puglia. 
          Conferma immediata e assistenza 24/7.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <CallButton 
            variant="navbar"
            text="Chiama Ora"
            location={`smart-cta-${pathname.replace(/\//g, '-')}`}
            className="w-full sm:w-auto"
            onClick={() => handleInteraction('call')}
          />
          
          <button 
            className="metal-button-outline w-full sm:w-auto"
            onClick={() => handleInteraction('form')}
          >
            Richiedi Info
          </button>
        </div>
      </div>
    </div>
  );
}
