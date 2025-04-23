'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import useKeywordTracking from '@/hooks/useKeywordTracking';
import SmartCTA from '@/components/ui/SmartCTA';

/**
 * Componente globale che implementa le ottimizzazioni SEO avanzate
 * - Monitoraggio keyword
 * - Tracking comportamento utente
 * - CTA intelligenti
 */
export default function SEOOptimizationLayer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Usa il hook di tracciamento keyword
  useKeywordTracking();
  
  // Tracking delle performance SEO e comportamento utente
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Traccia la visualizzazione della pagina
    const trackPageView = () => {
      // Ottieni i dati di performance
      const getPerformanceData = () => {
        const performanceEntries = performance.getEntriesByType('navigation');
        
        if (performanceEntries.length > 0) {
          const nav = performanceEntries[0];
          
          return {
            page_load_time: nav.domComplete - nav.fetchStart,
            ttfb: nav.responseStart - nav.requestStart,
            dom_load_time: nav.domContentLoadedEventEnd - nav.fetchStart,
            redirect_time: nav.redirectEnd - nav.redirectStart,
            first_paint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
          };
        }
        
        return null;
      };
      
      // Raccogli dati sulla pagina
      const pageData = {
        url: pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        performance: getPerformanceData(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        user_agent: navigator.userAgent
      };
      
      // Invia i dati all'API
      fetch('/api/seo/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'page_view',
          ...pageData
        }),
      }).catch(error => {
        console.error('Error logging page view:', error);
      });
      
      // Traccia anche in dataLayer per GTM/GA
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'pageview',
          'page': pathname,
          'performance': pageData.performance
        });
      }
    };
    
    // Avvia il tracciamento dopo che la pagina è completamente caricata
    if (document.readyState === 'complete') {
      trackPageView();
    } else {
      window.addEventListener('load', trackPageView, { once: true });
    }
    
    // Traccia il comportamento di scrolling
    let lastScrollPercentage = 0;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = Math.floor((scrollTop / (documentHeight - windowHeight)) * 100);
      
      // Tracciamo solo ai checkpoint (25%, 50%, 75%, 100%)
      const checkpoints = [25, 50, 75, 100];
      
      for (const checkpoint of checkpoints) {
        if (lastScrollPercentage < checkpoint && scrollPercentage >= checkpoint) {
          // Invia i dati all'API
          fetch('/api/seo/performance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              event_type: 'scroll_depth',
              url: pathname,
              scroll_percentage: checkpoint,
              timestamp: new Date().toISOString()
            }),
          }).catch(error => {
            console.error('Error logging scroll depth:', error);
          });
          
          // Traccia anche in dataLayer per GTM/GA
          if (window.dataLayer) {
            window.dataLayer.push({
              'event': 'scroll_depth',
              'page': pathname,
              'scroll_percentage': checkpoint
            });
          }
        }
      }
      
      lastScrollPercentage = scrollPercentage;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);
  
  return (
    <>
      {/* Aggiungi la Smart CTA dopo che l'utente ha navigato un po' sul sito */}
      <SmartCTA />
    </>
  );
}
