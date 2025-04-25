'use client';

import { useEffect } from 'react';

/**
 * Client component for section navigation
 * This handles the client-side scrolling to sections without requiring
 * useSearchParams or other client hooks in the main page component
 */
export default function SectionNavigation({ sectionId }) {
  useEffect(() => {
    if (!sectionId) return;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;
      
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const offset = 20; // Additional offset for spacing
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [sectionId]);
  
  return null; // This component doesn't render anything visible
}
