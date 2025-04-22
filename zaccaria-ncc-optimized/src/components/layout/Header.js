'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackPhoneClick } from '@/lib/animations';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
          <Link href="/" className="text-2xl font-bold tracking-tight chrome-text-enhanced">
            ZACCARIA
          </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            <Link href="#services" className="menu-item text-sm font-medium uppercase">Servizi</Link>
            <Link href="#fleet" className="menu-item text-sm font-medium uppercase">Flotta</Link>
            <Link href="#tour" className="menu-item text-sm font-medium uppercase">Tour</Link>
            <Link href="#rental" className="menu-item text-sm font-medium uppercase">Autonoleggio</Link>
            <Link href="#contact" className="menu-item text-sm font-medium uppercase">Contatti</Link>
            <a 
              href="tel:+39123456789" 
              className="call-button call-button-navbar" 
              onClick={() => trackPhoneClick('header')}
            >
              <i className="fas fa-phone mr-2"></i>
              <span>Chiama Ora</span>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" id="mobileMenuBtn" onClick={toggleMobileMenu} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </nav>
        
        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-50 ${mobileMenuOpen ? '' : 'hidden'}`} id="mobileMenu">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-16">
              <Link href="/" className="text-2xl font-bold chrome-text-enhanced">ZACCARIA</Link>
              <button id="closeMobileMenu" onClick={toggleMobileMenu} aria-label="Close menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-8">
              <Link href="#services" className="text-2xl font-light" onClick={toggleMobileMenu}>Servizi</Link>
              <Link href="#fleet" className="text-2xl font-light" onClick={toggleMobileMenu}>Flotta</Link>
              <Link href="#tour" className="text-2xl font-light" onClick={toggleMobileMenu}>Tour</Link>
              <Link href="#rental" className="text-2xl font-light" onClick={toggleMobileMenu}>Autonoleggio</Link>
              <Link href="#contact" className="text-2xl font-light" onClick={toggleMobileMenu}>Contatti</Link>
              <a 
                href="tel:+39123456789" 
                className="call-button call-button-navbar inline-block text-center"
                onClick={() => {
                  trackPhoneClick('mobile-menu');
                  toggleMobileMenu();
                }}
              >
                <i className="fas fa-phone mr-2"></i>
                <span>Chiama Ora</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
