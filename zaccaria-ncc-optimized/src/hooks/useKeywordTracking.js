'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Hook per tracciare le keyword da referral e parametri di ricerca
 * Registra automaticamente le keyword dai referrer e dai parametri di query
 */
export default function useKeywordTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Funzione per estrarre keyword dai query params (Google, Bing, ecc.)
    const extractKeywordFromQuery = () => {
      // Ottieni il referrer
      const referrer = document.referrer;
      const referrerUrl = referrer ? new URL(referrer) : null;
      const referrerDomain = referrerUrl ? referrerUrl.hostname : '';
      
      let keyword = null;
      
      // Verifica se il referrer è un motore di ricerca e estrai la keyword
      if (referrerDomain.includes('google.')) {
        // Query param di Google
        const queryParams = new URLSearchParams(referrerUrl?.search);
        keyword = queryParams.get('q');
      } else if (referrerDomain.includes('bing.')) {
        // Query param di Bing
        const queryParams = new URLSearchParams(referrerUrl?.search);
        keyword = queryParams.get('q');
      } else if (referrerDomain.includes('yahoo.')) {
        // Query param di Yahoo
        const queryParams = new URLSearchParams(referrerUrl?.search);
        keyword = queryParams.get('p');
      } else {
        // Verifica se la keyword è nei parametri URL (es. utm_term)
        keyword = searchParams.get('utm_term') || searchParams.get('keyword');
      }
      
      return {
        keyword,
        referrer: referrerDomain
      };
    };
    
    // Estrai e registra la keyword
    const { keyword, referrer } = extractKeywordFromQuery();
    
    if (keyword) {
      // Registra la keyword tramite API
      fetch('/api/seo/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword,
          referrer,
          page: pathname,
          timestamp: new Date().toISOString()
        }),
      }).catch(error => {
        console.error('Error logging keyword:', error);
      });
      
      // Registra anche in dataLayer per GTM/GA se disponibile
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'keyword_tracking',
          'keyword': keyword,
          'page': pathname
        });
      }
    }
  }, [pathname, searchParams]);
  
  // Non restituisce nulla, è solo per il tracciamento
  return null;
}
