'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackPhoneClick } from '@/lib/animations';
import useScrollEffect from '@/hooks/useScrollEffect';
import useSectionRoute from '@/hooks/useSectionRoute';
import EnhancedMobileMenu from "@/components/ui/EnhancedMobileMenu";
import Logo from '@/components/ui/Logo';

const MENU_ITEMS = [
  { id: 'services', label: 'Servizi' },
  { id: 'fleet', label: 'Flotta' },
  { id: 'tour', label: 'Tour' },
  { id: 'rental', label: 'Autonoleggio' },
  { id: 'offers', label: 'Offerte' },
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

      {/* Desktop Navigation */}
      <header className={`metal-navbar py-6 ${scrolled ? 'nav-scrolled' : ''}`} id="navbar">
        <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
            {/* Use the Logo component instead of text */}
            <Logo height={100} priority={true} />
          </Link>
          
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
              href="tel:+393313467527" 
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
