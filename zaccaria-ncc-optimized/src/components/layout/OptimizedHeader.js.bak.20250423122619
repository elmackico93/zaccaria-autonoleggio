'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackPhoneClick } from '@/lib/animations';
import useScrollEffect from '@/hooks/useScrollEffect';
import useSectionRoute from '@/hooks/useSectionRoute';
import EnhancedMobileMenu from "@/components/ui/EnhancedMobileMenu";

const MENU_ITEMS = [
  { id: 'services', label: 'Servizi' },
  { id: 'fleet', label: 'Flotta' },
  { id: 'tour', label: 'Tour' },
  { id: 'rental', label: 'Autonoleggio' },
  { id: 'contact', label: 'Contatti' }
];

export default function Header() {
  const scrolled = useScrollEffect();
  const [language, setLanguage] = useState('it');
  
  // Use our custom hook for section-based navigation
  const { activeSection, scrollToSection } = useSectionRoute({ 
    sections: MENU_ITEMS.map(item => item.id),
    updateUrl: true
  });

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    document.documentElement.lang = e.target.value;
  };
  
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <>
      {/* Language Selector */}
      <div className="fixed top-6 right-6 z-50">
        <select 
          id="langSelector" 
          value={language}
          onChange={handleLanguageChange}
          className="bg-transparent text-sm font-medium px-2 py-1 border border-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer"
        >
          <option value="it">IT</option>
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
        </select>
      </div>

      {/* Desktop Navigation */}
      <header className={`metal-navbar py-6 ${scrolled ? 'nav-scrolled' : ''}`} id="navbar">
        <nav className="container mx-auto px-6 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold tracking-tight chrome-text-enhanced" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState(null, '', '/');
          }}>
            ZACCARIA
          </a>
          
          <div className="hidden md:flex items-center space-x-12">
            {MENU_ITEMS.map(item => (
              <a 
                key={item.id}
                href={`/${item.id}`}
                className={`menu-item text-sm font-medium uppercase ${activeSection === item.id ? 'text-white after:w-full' : 'text-silver-metallic'}`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="tel:+39123456789" 
              className="call-button call-button-navbar" 
              onClick={() => trackPhoneClick('header')}
            >
              <i className="fas fa-phone mr-2"></i>
              <span>Chiama Ora</span>
            </a>
          </div>
          
          {/* Enhanced Mobile Menu (shown on mobile only) */}
          <div className="md:hidden">
            <EnhancedMobileMenu />
          </div>
        </nav>
      </header>
    </>
  );
}
