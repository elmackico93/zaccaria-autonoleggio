'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

/**
 * Custom hook to handle section-based navigation and active section tracking
 * 
 * This hook provides:
 * 1. Detection of the current active section based on scroll position
 * 2. History API integration to change the URL when scrolling between sections
 * 3. Proper section navigation when directly accessing a section URL
 * 
 * @param {Object} options - Configuration options
 * @param {string[]} options.sections - Array of section IDs to track
 * @param {number} options.offset - Offset from the top of the section to trigger activation (default: 100)
 * @param {boolean} options.updateUrl - Whether to update the URL as sections change (default: true)
 * @returns {Object} - { activeSection, scrollToSection }
 */
export default function useSectionRoute({ 
  sections = [], 
  offset = 100,
  updateUrl = true
}) {
  const [activeSection, setActiveSection] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    setIsScrolling(true);
    
    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - offset + 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Update active section and URL
    setActiveSection(sectionId);
    if (updateUrl && typeof window !== 'undefined') {
      // Use history API for cleaner URL updates without full navigation
      window.history.replaceState(
        { ...window.history.state, as: `/${sectionId}`, url: `/${sectionId}` },
        '',
        `/${sectionId}`
      );
    }
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  // Handle initial section from URL on page load
  useEffect(() => {
    // Check if the URL has a hash
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.includes(hash)) {
      // Wait a bit for the page to load, then scroll
      setTimeout(() => {
        scrollToSection(hash);
      }, 500);
    } else if (pathname !== '/') {
      // Check if we are on a section route
      const currentSection = pathname.slice(1);
      if (sections.includes(currentSection)) {
        setTimeout(() => {
          scrollToSection(currentSection);
        }, 500);
      }
    }
  }, [pathname, sections]);

  // Track active section based on scroll position
  useEffect(() => {
    if (typeof window === 'undefined' || sections.length === 0 || isScrolling) return;

    const handleScroll = () => {
      if (isScrolling) return;
      
      // Find the current section based on scroll position
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const scrollPosition = window.scrollY + navbarHeight + offset;
      
      // Get all sections and their positions
      const sectionPositions = sections
        .map(id => {
          const element = document.getElementById(id);
          if (!element) return { id, top: 0, bottom: 0 };
          
          const rect = element.getBoundingClientRect();
          return {
            id,
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
            height: rect.height
          };
        })
        .sort((a, b) => a.top - b.top);
      
      // Find which section we're currently in
      let currentSection = null;
      
      // Special case for very top of the page
      if (scrollPosition < sectionPositions[0]?.top) {
        currentSection = null;
      } else {
        // Find the section we're currently in
        for (let i = 0; i < sectionPositions.length; i++) {
          const section = sectionPositions[i];
          const nextSection = sectionPositions[i + 1];
          
          // If this is the last section or we're above the next section,
          // this is our current section
          if (!nextSection || scrollPosition < nextSection.top) {
            // Make sure we've scrolled at least a bit into the section
            if (scrollPosition >= section.top) {
              currentSection = section.id;
            }
            break;
          }
        }
      }
      
      // Only update if we've changed sections
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        
        // Update the URL using history API
        if (updateUrl && currentSection) {
          window.history.replaceState(
            { ...window.history.state, as: `/${currentSection}`, url: `/${currentSection}` },
            '',
            `/${currentSection}`
          );
        } else if (updateUrl && !currentSection && pathname !== '/') {
          window.history.replaceState(
            { ...window.history.state, as: '/', url: '/' },
            '',
            '/'
          );
        }
      }
    };
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, activeSection, isScrolling, offset, updateUrl, pathname]);

  return {
    activeSection,
    scrollToSection
  };
}