'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackPhoneClick } from '@/lib/animations';
import EnhancedMobileMenu from "@/components/ui/EnhancedMobileMenu";
import Logo from '@/components/ui/Logo';

export default function Header() {
  const [language, setLanguage] = useState('it');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect without requiring full GSAP initialization
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Add event listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    document.documentElement.lang = e.target.value;
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

      {/* Navigation */}
      <header className={`metal-navbar py-6 ${scrolled ? 'nav-scrolled' : ''}`} id="navbar">
        <nav className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            {/* Use the Logo component instead of text */}
            <Logo height={40} priority={true} />
          </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            <Link href="#services" className="menu-item text-sm font-medium uppercase">Servizi</Link>
            <Link href="#fleet" className="menu-item text-sm font-medium uppercase">Flotta</Link>
            <Link href="#tour" className="menu-item text-sm font-medium uppercase">Tour</Link>
            <Link href="#rental" className="menu-item text-sm font-medium uppercase">Autonoleggio</Link>
            <Link href="#contact" className="menu-item text-sm font-medium uppercase">Contatti</Link>
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