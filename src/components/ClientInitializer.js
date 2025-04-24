'use client';
import DiscountHighlightEffect from '@/components/effects/DiscountHighlightEffect';

import { useEffect } from 'react';
import { initViewTransitions } from '@/lib/viewTransitions';

// This is a Client Component that handles client-side initialization and section navigation
export default function ClientInitializer({ targetSection }) {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Initialize view transitions for smoother navigation
      initViewTransitions();
      
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
            
            // After animations are initialized, scroll to target section if specified
            if (targetSection) {
              setTimeout(() => {
                scrollToSection(targetSection);
              }, 100);
            }
          });
        } catch (error) {
          console.error('Error initializing GSAP:', error);
          
          // Still scroll to the section even if GSAP fails
          if (targetSection) {
            setTimeout(() => {
              scrollToSection(targetSection);
            }, 100);
          }
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
      
      // Function to preload critical images
      const preloadCriticalImages = () => {
        const criticalImages = [
          '/images/home.svg',
          '/images/mercedes-s-class.jpg',
          '/images/mercedes-e-class.jpg',
          '/images/mercedes-v-class.jpg'
        ];
        
        criticalImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      };
      
      // Preload images for better performance
      preloadCriticalImages();
      
      return () => {
        observer.disconnect();
      };
    }
  }, [targetSection]);

  // Function to scroll to a specific section
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
    const offset = 20; // Additional offset
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - offset;
    
    // Use browser's native smooth scrolling
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  // This component doesn't render anything visual
  return (
    <>
      <DiscountHighlightEffect selector=".offer-discount" />
    </>
  );
  return null;
}