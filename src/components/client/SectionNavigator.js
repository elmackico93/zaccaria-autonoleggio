'use client';

import { useEffect } from 'react';

export default function SectionNavigator({ section }) {
  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const offset = 20; // Additional offset
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - offset;
        
        // Use browser's native smooth scrolling
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [section]);

  return null; // This component doesn't render anything visible
}
