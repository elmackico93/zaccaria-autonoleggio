'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect when page has been scrolled beyond a threshold
 * @param {number} threshold - Number of pixels to trigger the effect (default: 50)
 * @returns {boolean} - Whether the page has scrolled beyond the threshold
 */
export default function useScrollEffect(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, threshold]);

  return scrolled;
}

/**
 * Custom hook to track scroll position
 * @returns {number} - Current scroll position (Y axis)
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
}

/**
 * Custom hook to detect when an element is in viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} - Ref to attach to element and boolean indicating if element is visible
 */
export function useInView(options = {}) {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    });

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options]);

  return [setRef, inView];
}

/**
 * Custom hook to implement parallax scrolling effect
 * @param {number} speed - Speed of the parallax effect (default: 0.5)
 * @returns {React.RefObject} - Ref to attach to element for parallax effect
 */
export function useParallax(speed = 0.5) {
  const [ref, setRef] = useState(null);
  
  useEffect(() => {
    if (!ref) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elementRect = ref.getBoundingClientRect();
      const centerOffset = elementRect.top + elementRect.height / 2 - window.innerHeight / 2;
      const parallaxOffset = centerOffset * speed;
      
      ref.style.transform = `translateY(${parallaxOffset}px)`;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed]);
  
  return setRef;
}