'use client';

import { useEffect } from 'react';

export default function SectionNavigator({ section }) {
  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        // Use setTimeout to ensure the page has fully loaded
        setTimeout(() => {
          const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
          const offset = 20; // Additional offset
          const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - offset;
          
          // Use browser's native smooth scrolling
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
  }, [section]);

  return null; // This component doesn't render anything visible
}
