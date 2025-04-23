'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Componente di feedback per migliorare il ranking SEO tramite engagement
 * - Raccoglie feedback degli utenti per migliorare contenuti
 * - Aumenta il tempo di permanenza sulla pagina
 * - Migliora il CTR e altri segnali di engagement
 */
export default function SEOFeedback() {
  const [feedback, setFeedback] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const pathname = usePathname();
  
  const handleFeedback = (value) => {
    setFeedback(value);
    setHasInteracted(true);
    setShowMessage(true);
    
    // Traccia il feedback per analytics
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        'event': 'page_feedback',
        'feedback_value': value,
        'page': pathname
      });
    }
    
    // Nascondi il messaggio dopo 5 secondi
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };
  
  if (!pathname || pathname === '/') return null;
  
  return (
    <div className="mt-12 border-t border-dark-silver pt-6">
      <div className="text-center">
        <p className="text-silver-metallic mb-4">
          Ti è stata utile questa informazione?
        </p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleFeedback('yes')}
            className={`px-4 py-2 rounded transition-colors ${
              feedback === 'yes' 
                ? 'bg-green-800 text-white' 
                : 'hover:bg-gunmetal text-silver-metallic'
            }`}
            disabled={hasInteracted}
          >
            <span role="img" aria-label="Sì">👍</span> Sì
          </button>
          
          <button
            onClick={() => handleFeedback('no')}
            className={`px-4 py-2 rounded transition-colors ${
              feedback === 'no' 
                ? 'bg-red-900 text-white' 
                : 'hover:bg-gunmetal text-silver-metallic'
            }`}
            disabled={hasInteracted}
          >
            <span role="img" aria-label="No">👎</span> No
          </button>
        </div>
        
        {showMessage && (
          <p className="mt-4 text-silver animate-fadeIn">
            {feedback === 'yes' 
              ? 'Grazie per il tuo feedback positivo!' 
              : 'Grazie per il tuo feedback. Ci impegneremo a migliorare i contenuti.'}
          </p>
        )}
      </div>
    </div>
  );
}
