'use client';

import { useEffect, useRef } from 'react';

/**
 * Adds a shimmering highlight effect to discount elements
 * @param {Object} props Component props
 * @param {string} props.selector CSS selector to target discount elements
 * @returns {null} This component doesn't render anything visible
 */
export default function DiscountHighlightEffect({ selector = '.offer-discount' }) {
  const intervalRef = useRef(null);
  
  useEffect(() => {
    const highlightDiscounts = () => {
      const discountElements = document.querySelectorAll(selector);
      
      if (discountElements.length === 0) return;
      
      // Highlight each discount element in sequence
      let index = 0;
      
      intervalRef.current = setInterval(() => {
        // Reset previous element
        discountElements.forEach(el => {
          el.style.transform = 'scale(1)';
          el.style.filter = 'brightness(100%)';
          el.style.transition = 'all 0.5s ease-out';
        });
        
        // Highlight current element
        const element = discountElements[index];
        if (element) {
          element.style.transform = 'scale(1.1)';
          element.style.filter = 'brightness(130%)';
          element.style.transition = 'all 0.3s ease-in';
          
          // Reset after a short time
          setTimeout(() => {
            if (element) {
              element.style.transform = 'scale(1)';
              element.style.filter = 'brightness(100%)';
            }
          }, 700);
        }
        
        // Move to next element
        index = (index + 1) % discountElements.length;
      }, 3000);
    };
    
    // Wait for elements to be available
    setTimeout(highlightDiscounts, 1500);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selector]);
  
  // This component doesn't render anything
  return null;
}
