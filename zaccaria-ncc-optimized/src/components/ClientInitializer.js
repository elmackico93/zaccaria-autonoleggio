'use client';

import { useEffect } from 'react';

// This is a Client Component that handles client-side initialization
export default function ClientInitializer() {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Dynamically import GSAP to reduce initial bundle size
      const initGSAP = async () => {
        try {
          const gsapModule = await import('gsap');
          const ScrollTriggerModule = await import('gsap/ScrollTrigger');
          
          const gsap = gsapModule.default || gsapModule;
          const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
          
          gsap.registerPlugin(ScrollTrigger);
          
          // Now initialize animations
          import('@/lib/animations').then(({ initAnimations }) => {
            initAnimations(gsap, ScrollTrigger);
          });
        } catch (error) {
          console.error('Error initializing GSAP:', error);
        }
      };
      
      initGSAP();
      
      // Add intersection observer for lazy loading
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px 100px 0px' });
      
      // Observe all fade-in sections
      document.querySelectorAll('.section-fade-in').forEach((section) => {
        observer.observe(section);
      });
      
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // This component doesn't render anything visual
  return null;
}
