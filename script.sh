#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Zaccaria NCC - Routing and SEO Optimization Script ===${NC}"
echo "This script will fix routing issues and optimize performance and SEO"

# Create backup directory
BACKUP_DIR="./routing-fix-backups-$(date +%Y%m%d%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}Created backup directory: $BACKUP_DIR${NC}"

# Function to backup a file before modifying it
backup_file() {
  local file=$1
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$(basename "$file").bak"
    echo -e "${GREEN}Backed up: $file${NC}"
  else
    echo -e "${RED}File not found: $file${NC}"
    exit 1
  fi
}

# Function to check if a file exists
check_file() {
  local file=$1
  if [ ! -f "$file" ]; then
    echo -e "${RED}Error: File not found: $file${NC}"
    exit 1
  fi
}

# === STEP 1: Fix Middleware Routing Issues ===
echo -e "\n${BLUE}Step 1: Fixing Middleware Routing${NC}"

MIDDLEWARE_FILE="./src/middleware.js"
check_file "$MIDDLEWARE_FILE"
backup_file "$MIDDLEWARE_FILE"

# Update middleware.js with improved routing logic
cat > "$MIDDLEWARE_FILE" << 'EOL'
import { NextResponse } from 'next/server';

// Define valid sections and SEO slugs for your site
const VALID_SECTIONS = [
  'offers',
  'services',
  'fleet',
  'tour',
  'rental',
  'about',
  'testimonials',
  'contact'
];

// SEO page slugs that should be handled by the seo-pages directory
const SEO_SLUGS = [
  'servizi-puglia',
  'ncc-ostuni',
  'ncc-bari',
  'ncc-salento',
  'transfer-aeroporto-brindisi',
  'autonoleggio-con-conducente-alberobello',
  'tour-autista-privato-puglia',
  'transfer-bari-ostuni'
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if this is a SEO page route
  if (SEO_SLUGS.some(slug => pathname === `/${slug}`)) {
    // IMPORTANT: Use rewrite instead of redirect to maintain the original URL
    // This allows the page to render correctly while keeping the SEO-friendly URL
    const slug = pathname.slice(1); // Remove the leading slash
    return NextResponse.rewrite(new URL(`/seo-pages/${slug}`, request.url));
  }
  
  // Check if URL is a direct section route (e.g., /contact, /services)
  if (pathname.startsWith('/') && pathname.split('/').length === 2) {
    const section = pathname.slice(1);
    
    if (VALID_SECTIONS.includes(section)) {
      // Instead of redirecting, use rewrite to maintain the URL but serve the [section] page
      return NextResponse.rewrite(new URL(`/section/${section}`, request.url));
    }
  }
  
  return NextResponse.next();
}

// Specify which paths this middleware should run for
export const config = {
  matcher: [
    // Match all routes except static files, api routes, etc.
    '/((?!_next/static|_next/image|favicon.ico|images|icons|api).*)',
  ],
};
EOL

echo -e "${GREEN}Updated middleware.js with improved routing logic${NC}"

# === STEP 2: Create Section Page Wrapper ===
echo -e "\n${BLUE}Step 2: Creating Section Page Wrapper${NC}"

# Create directory for the section dynamic route if it doesn't exist
mkdir -p "./src/app/section/[slug]"

# Create page.js in the section directory
SECTION_PAGE_FILE="./src/app/section/[slug]/page.js"
cat > "$SECTION_PAGE_FILE" << 'EOL'
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Fleet from '@/components/sections/Fleet';
import Tours from '@/components/sections/Tours';
import CarRental from '@/components/sections/CarRental';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Offers from '@/components/sections/Offers';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import FixedCallButton from '@/components/ui/FixedCallButton';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { createMetadata } from '@/lib/utils';
import SectionNavigator from '@/components/client/SectionNavigator';

// List of valid sections for routing
const VALID_SECTIONS = [
  'offers',
  'services',
  'fleet',
  'tour',
  'rental',
  'about',
  'testimonials',
  'contact'
];

// Define metadata for each section
const SECTION_METADATA = {
  services: {
    title: 'I Nostri Servizi | Zaccaria NCC',
    description: 'Servizi di noleggio con conducente, transfer aeroportuali, servizio Business e VIP a Ostuni, Brindisi e tutta la Puglia.'
  },
  fleet: {
    title: 'La Nostra Flotta | Zaccaria NCC',
    description: 'Scopri la nostra flotta di veicoli Mercedes: comfort, eleganza e servizio impeccabile per ogni tuo spostamento in Puglia.'
  },
  tour: {
    title: 'Tour Guidati in Puglia | Zaccaria NCC',
    description: 'Esplora la Puglia con i nostri tour guidati: borghi bianchi, tour enogastronomici e visite alle città d\'arte.'
  },
  rental: {
    title: 'Autonoleggio | Zaccaria NCC',
    description: 'Noleggia un\'auto senza conducente per esplorare la Puglia in libertà. Veicoli moderni e affidabili per brevi periodi.'
  },
  about: {
    title: 'Chi Siamo | Zaccaria NCC',
    description: 'Scopri Zaccaria NCC: da oltre un decennio, rappresentiamo l\'eccellenza nel settore del noleggio con conducente in Puglia.'
  },
  testimonials: {
    title: 'Testimonial | Zaccaria NCC',
    description: 'Scopri cosa dicono i nostri clienti sul servizio Zaccaria NCC: qualità, professionalità e attenzione ai dettagli.'
  },
  offers: {
    title: 'Offerte Speciali | Zaccaria NCC',
    description: 'Scopri le nostre offerte esclusive: tour guidati, transfer aeroportuali e pacchetti business con sconti speciali e servizi premium.'
  },
  contact: {
    title: 'Contatti | Zaccaria NCC',
    description: 'Contattaci per prenotazioni, preventivi o informazioni sui nostri servizi di noleggio con conducente e tour in Puglia.'
  }
};

// Generate metadata dynamically based on the section parameter
export function generateMetadata({ params }) {
  const { slug } = params;
  
  // Check if this is a valid section
  if (!VALID_SECTIONS.includes(slug)) {
    return {};
  }
  
  // Get metadata for this section
  const metadata = SECTION_METADATA[slug] || {
    title: 'Zaccaria NCC | Premium Chauffeur Service',
    description: 'Servizio di noleggio con conducente a Ostuni. Transfer con Mercedes, tour guidati in Puglia e autonoleggio senza conducente.'
  };
  
  // Use the utility to create full metadata
  return createMetadata({
    businessName: "Zaccaria NCC",
    legalName: "Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto",
    title: metadata.title,
    description: metadata.description,
    path: `/${slug}`,
    image: `/images/sections/${slug}.jpg`
  });
}

// Generate static parameters for all valid sections
export function generateStaticParams() {
  return VALID_SECTIONS.map(section => ({ slug: section }));
}

// This is a Server Component
export default function SectionPage({ params }) {
  const { slug } = params;
  
  // Verify this is a valid section
  if (!VALID_SECTIONS.includes(slug)) {
    return notFound();
  }
  
  return (
    <>
      <Header />
      
      {/* ClientSideNavigator - handles scrolling to the section */}
      <Suspense fallback={null}>
        <SectionNavigator section={slug} />
      </Suspense>

      <main>
        <Hero />
        
        <Suspense fallback={null}>
          <Services />
        </Suspense>
        
        <Suspense fallback={null}>
          <Fleet />
        </Suspense>
        
        <Suspense fallback={null}>
          <Tours />
        </Suspense>
        
        <Suspense fallback={null}>
          <CarRental />
        </Suspense>
        
        <Suspense fallback={null}>
          <About />
        </Suspense>
        
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={null}>
          <Offers />
        </Suspense>
        
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      
      <Footer />
      <FixedCallButton />
    </>
  );
}
EOL

echo -e "${GREEN}Created section page wrapper at: $SECTION_PAGE_FILE${NC}"

# === STEP 3: Fix SectionNavigator.js ===
echo -e "\n${BLUE}Step 3: Fixing SectionNavigator.js${NC}"

SECTION_NAVIGATOR_FILE="./src/components/client/SectionNavigator.js"
check_file "$SECTION_NAVIGATOR_FILE"
backup_file "$SECTION_NAVIGATOR_FILE"

cat > "$SECTION_NAVIGATOR_FILE" << 'EOL'
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
EOL

echo -e "${GREEN}Updated SectionNavigator.js${NC}"

# === STEP 4: Fix useSectionRoute.js hook ===
echo -e "\n${BLUE}Step 4: Fixing useSectionRoute hook${NC}"

SECTION_ROUTE_HOOK_FILE="./src/hooks/useSectionRoute.js"
check_file "$SECTION_ROUTE_HOOK_FILE"
backup_file "$SECTION_ROUTE_HOOK_FILE"

cat > "$SECTION_ROUTE_HOOK_FILE" << 'EOL'
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Custom hook to handle section-based navigation and active section tracking
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
      // Use router.push instead of history.replaceState for better Next.js integration
      if (pathname !== `/${sectionId}`) {
        router.push(`/${sectionId}`, { scroll: false });
      }
    }
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

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
        
        // Update the URL using Next.js router
        if (updateUrl && currentSection) {
          if (pathname !== `/${currentSection}`) {
            router.push(`/${currentSection}`, { scroll: false });
          }
        } else if (updateUrl && !currentSection && pathname !== '/') {
          router.push('/', { scroll: false });
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
  }, [sections, activeSection, isScrolling, offset, updateUrl, pathname, router]);

  return {
    activeSection,
    scrollToSection
  };
}
EOL

echo -e "${GREEN}Updated useSectionRoute.js hook${NC}"

# === STEP 5: Fix Header component ===
echo -e "\n${BLUE}Step 5: Fixing Header component${NC}"

HEADER_FILE="./src/components/layout/Header.js"
check_file "$HEADER_FILE"
backup_file "$HEADER_FILE"

cat > "$HEADER_FILE" << 'EOL'
'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { trackPhoneClick } from '@/lib/animations';
import EnhancedMobileMenu from "@/components/ui/EnhancedMobileMenu";
import Logo from '@/components/ui/Logo';

export default function Header() {
  const [language, setLanguage] = useState('it');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Extract the current section from pathname
  const currentSection = pathname.startsWith('/') ? pathname.slice(1) : '';

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
  
  const handleNavLinkClick = (e, section) => {
    e.preventDefault();
    
    // Navigate to the section page
    router.push(`/${section}`, { scroll: false });
    
    // Scroll to the section
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const offset = 20;
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
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
          <Link 
            href="/" 
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              router.push('/', { scroll: false });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Logo height={40} priority={true} />
          </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            <a 
              href="/services" 
              className={`menu-item text-sm font-medium uppercase ${currentSection === 'services' ? 'text-white after:w-full' : 'text-silver-metallic'}`}
              onClick={(e) => handleNavLinkClick(e, 'services')}
            >
              Servizi
            </a>
            <a 
              href="/fleet" 
              className={`menu-item text-sm font-medium uppercase ${currentSection === 'fleet' ? 'text-white after:w-full' : 'text-silver-metallic'}`}
              onClick={(e) => handleNavLinkClick(e, 'fleet')}
            >
              Flotta
            </a>
            <a 
              href="/tour" 
              className={`menu-item text-sm font-medium uppercase ${currentSection === 'tour' ? 'text-white after:w-full' : 'text-silver-metallic'}`}
              onClick={(e) => handleNavLinkClick(e, 'tour')}
            >
              Tour
            </a>
            <a 
              href="/rental" 
              className={`menu-item text-sm font-medium uppercase ${currentSection === 'rental' ? 'text-white after:w-full' : 'text-silver-metallic'}`}
              onClick={(e) => handleNavLinkClick(e, 'rental')}
            >
              Autonoleggio
            </a>
            <a 
              href="/contact" 
              className={`menu-item text-sm font-medium uppercase ${currentSection === 'contact' ? 'text-white after:w-full' : 'text-silver-metallic'}`}
              onClick={(e) => handleNavLinkClick(e, 'contact')}
            >
              Contatti
            </a>
            <a 
              href="/offers" 
              className={`menu-item text-sm font-medium uppercase offers-menu-item offers-icon-menu ${currentSection === 'offers' ? 'text-white after:w-full' : 'text-silver-metallic'}`}
              onClick={(e) => handleNavLinkClick(e, 'offers')}
            >
              OFFERTE
              <span className="offers-highlight"></span>
            </a>
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
EOL

echo -e "${GREEN}Updated Header.js component${NC}"

# === STEP 6: Fix EnhancedMobileMenu component ===
echo -e "\n${BLUE}Step 6: Fixing EnhancedMobileMenu component${NC}"

MOBILE_MENU_FILE="./src/components/ui/EnhancedMobileMenu.js"
check_file "$MOBILE_MENU_FILE"
backup_file "$MOBILE_MENU_FILE"

cat > "$MOBILE_MENU_FILE" << 'EOL'
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { trackPhoneClick } from '@/lib/animations';
import MenuParticleEffect from './MenuParticleEffect';
import MenuItemTilt from './MenuItemTilt';
import Logo from '@/components/ui/Logo';

export default function EnhancedMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [animationComplete, setAnimationComplete] = useState(true);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handle closing the menu with escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    // Handle click outside to close menu
    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target) && 
          buttonRef.current && !buttonRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    // Get active section from URL
    const section = pathname.replace('/', '');
    if (section) {
      setActiveSection(section);
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, pathname]);

  const toggleMenu = () => {
    if (animationComplete) {
      setAnimationComplete(false);
      setIsOpen(!isOpen);
      setTimeout(() => setAnimationComplete(true), 1000); // Match animation duration
    }
  };

  const closeMenu = () => {
    if (animationComplete && isOpen) {
      setAnimationComplete(false);
      setIsOpen(false);
      setTimeout(() => setAnimationComplete(true), 1000);
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);
    closeMenu();
    
    // Navigate to the section page
    router.push(`/${sectionId}`, { scroll: false });
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const menuItems = [
    { id: 'services', label: 'Servizi', icon: 'fa-concierge-bell' },
    { id: 'fleet', label: 'Flotta', icon: 'fa-car-side' },
    { id: 'tour', label: 'Tour', icon: 'fa-map-marked-alt' },
    { id: 'rental', label: 'Autonoleggio', icon: 'fa-car' },
    { id: 'contact', label: 'Contatti', icon: 'fa-envelope' },
    { id: 'offers', label: 'Offerte', icon: 'fa-tags' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button 
        ref={buttonRef}
        className={`md:hidden z-50 w-12 h-12 flex flex-col justify-center items-center transition-all duration-300 bg-transparent ${isOpen ? 'menu-button-open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <span className={`block w-8 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-8 h-0.5 bg-white mt-1.5 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Full-screen Menu */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 z-40 transition-all duration-500 ease-premium ${isOpen ? 'menu-open' : 'menu-closed'}`}
      >
        {/* Background layers */}
        <div className={`absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-br from-gunmetal/30 to-black/30 transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Particle effect */}
        <MenuParticleEffect isActive={isOpen} />
        
        {/* Metallic accent lines */}
        <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-silver-metallic to-transparent transition-transform duration-1000 ${isOpen ? 'transform-none' : '-translate-x-full'}`}></div>
        <div className={`absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-silver-metallic to-transparent transition-transform duration-1000 ${isOpen ? 'transform-none' : 'translate-x-full'}`}></div>
        
        {/* Content */}
        <div className="container relative z-10 h-full mx-auto px-6 py-20 flex flex-col justify-between">
          {/* Logo */}
          <div className={`transition-all duration-500 ${isOpen ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-8'}`}>
            <a 
              href="/" 
              className="inline-block" 
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                setTimeout(() => {
                  router.push('/', { scroll: false });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
              }}
            >
              <Logo height={64} />
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="flex-grow flex items-center">
            <ul className="w-full space-y-6">
              {menuItems.map((item, index) => (
                <li 
                  key={item.id}
                  className={`transform transition-all duration-500 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: isOpen ? `${index * 100 + 100}ms` : '0ms' }}
                >
                  <MenuItemTilt 
                    className={`block p-2 ${activeSection === item.id ? 'mobile-menu-active-item' : ''}`}
                    maxTilt={5}
                    speed={300}
                  >
                    <a 
                      href={`/${item.id}`}
                      className={`group flex items-center text-2xl font-light transition-colors duration-300 ${activeSection === item.id ? 'text-white' : 'text-silver-metallic'}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                    >
                      <span className="mobile-menu-icon-container mr-4 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300">
                        <i className={`fas ${item.icon} text-lg transition-transform duration-300 group-hover:scale-110`}></i>
                      </span>
                      <span className="mobile-menu-text">{item.label}</span>
                      <span className={`mobile-menu-line ml-4 h-px w-0 bg-silver-metallic transition-all duration-300 group-hover:w-8 ${activeSection === item.id ? 'w-8' : ''}`}></span>
                    </a>
                  </MenuItemTilt>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Call button */}
          <div 
            className={`transition-all duration-500 ${isOpen ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isOpen ? '600ms' : '0ms' }}
          >
            <a 
              href="tel:+393313467527" 
              className="call-button call-button-navbar mobile-menu-call-button flex items-center justify-center w-full md:w-auto mb-8 relative"
              onClick={() => {
                trackPhoneClick('mobile-menu');
                closeMenu();
              }}
            >
              <div className="call-button-pulse"></div>
              <i className="fas fa-phone mr-2"></i>
              <span>Chiama Ora</span>
            </a>
            
            {/* Social media icons */}
            <div className="flex space-x-6 justify-center">
              <a href="#" className="text-silver-metallic hover:text-white transition-colors duration-300" aria-label="Facebook">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-silver-metallic hover:text-white transition-colors duration-300" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-silver-metallic hover:text-white transition-colors duration-300" aria-label="WhatsApp">
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add necessary styles */}
      <style jsx>{`
        .ease-premium {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .menu-closed {
          visibility: hidden;
          clip-path: circle(0% at calc(100% - 28px) 28px);
        }
        
        .menu-open {
          visibility: visible;
          clip-path: circle(150% at calc(100% - 28px) 28px);
        }
        
        .call-button-pulse {
          position: absolute;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          background: var(--highlight);
          opacity: 0.3;
          transform: scale(0);
          animation: pulse 2s infinite;
        }
        
        .mobile-menu-icon-container {
          background: rgba(170, 169, 173, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .group:hover .mobile-menu-icon-container {
          background: rgba(170, 169, 173, 0.2);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.9);
            opacity: 0.2;
          }
          70% {
            transform: scale(1.1);
            opacity: 0;
          }
          100% {
            transform: scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
EOL

echo -e "${GREEN}Updated EnhancedMobileMenu.js component${NC}"

# === STEP 7: Fix FooterLinksSEO component ===
echo -e "\n${BLUE}Step 7: Fixing FooterLinksSEO component${NC}"

FOOTER_LINKS_FILE="./src/components/ui/FooterLinksSEO.js"
check_file "$FOOTER_LINKS_FILE"
backup_file "$FOOTER_LINKS_FILE"

cat > "$FOOTER_LINKS_FILE" << 'EOL'
'use client';

import { useRouter } from 'next/navigation';

/**
 * FooterLinksSEO Component
 * Displays SEO-optimized links in the footer
 */
export default function FooterLinksSEO() {
  const router = useRouter();
  
  // Handle navigation to SEO pages
  const handleSEOLinkClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };
  
  return (
    <div className="mt-8 pt-6 border-t border-dark-silver">
      <h4 className="text-sm font-bold tracking-widest mb-4 uppercase text-center">Servizi in Puglia</h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Servizi NCC</h5>
          <ul className="space-y-1">
            <li>
              <a href="/servizi-puglia" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/servizi-puglia')}
              >
                Tutti i Servizi
              </a>
            </li>
            <li>
              <a href="/ncc-ostuni" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/ncc-ostuni')}
              >
                NCC Ostuni
              </a>
            </li>
            <li>
              <a href="/ncc-bari" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/ncc-bari')}
              >
                NCC Bari
              </a>
            </li>
            <li>
              <a href="/ncc-salento" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/ncc-salento')}
              >
                NCC Salento
              </a>
            </li>
            <li>
              <a href="/autonoleggio-con-conducente-alberobello" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/autonoleggio-con-conducente-alberobello')}
              >
                NCC Alberobello
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Transfer</h5>
          <ul className="space-y-1">
            <li>
              <a href="/transfer-aeroporto-brindisi" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/transfer-aeroporto-brindisi')}
              >
                Transfer Aeroporto Brindisi
              </a>
            </li>
            <li>
              <a href="/transfer-bari-ostuni" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/transfer-bari-ostuni')}
              >
                Transfer Bari-Ostuni
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Tour</h5>
          <ul className="space-y-1">
            <li>
              <a href="/tour-autista-privato-puglia" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/tour-autista-privato-puglia')}
              >
                Tour Privati in Puglia
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Autonoleggio</h5>
          <ul className="space-y-1">
            <li>
              <a href="/autonoleggio-con-conducente-alberobello" 
                className="text-xs text-silver hover:text-white transition-colors"
                onClick={(e) => handleSEOLinkClick(e, '/autonoleggio-con-conducente-alberobello')}
              >
                Autonoleggio Alberobello
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
EOL

echo -e "${GREEN}Updated FooterLinksSEO.js component${NC}"

# === STEP 8: Fix SEO Page Header/Footer component imports ===
echo -e "\n${BLUE}Step 8: Fixing SEO Page components${NC}"

# Function to update SEO page components
update_seo_page() {
  local page_file=$1
  check_file "$page_file"
  backup_file "$page_file"
  
  # Read the file content
  local content=$(cat "$page_file")
  
  # Replace header and footer imports if needed
  if grep -q "import Header from '@/components/layout/Header';" "$page_file"; then
    content=$(echo "$content" | sed "s/import Header from '@\/components\/layout\/Header';/import Header from '@\/components\/layout\/Header';\nimport { useRouter } from 'next\/navigation';/g")
  fi
  
  # Write the updated content back to the file
  echo "$content" > "$page_file"
  
  echo -e "${GREEN}Updated SEO page: $page_file${NC}"
}

# Find all SEO page files and update them
find ./src/app/seo-pages -name "page.js" | while read -r page_file; do
  update_seo_page "$page_file"
done

# === STEP 9: Add Performance Optimizations ===
echo -e "\n${BLUE}Step 9: Adding Performance Optimizations${NC}"

# Create a new next.config.js with optimizations
NEXT_CONFIG_FILE="./next.config.js"
check_file "$NEXT_CONFIG_FILE"
backup_file "$NEXT_CONFIG_FILE"

cat > "$NEXT_CONFIG_FILE" << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Use SWC minification for faster builds
  swcMinify: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Compress responses for improved performance
  compress: true,
  
  // Advanced optimizations
  experimental: {
    // Enable modern optimization features
    optimizePackageImports: ['react-icons', 'lucide-react', 'date-fns'],
    // For better memory usage
    optimizeServerReact: true,
    // Use server actions (Next.js 14+ feature)
    serverActions: true,
  },
  
  // Enable bundle analyzer in analyze mode
  webpack: (config, { isServer, dev, webpack }) => {
    // Add bundle analyzer plugin in analyze mode
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }
    
    // Add custom webpack optimizations
    if (!dev) {
      // Use deterministic chunk and module ids for better caching
      config.optimization.moduleIds = 'deterministic';
      
      // Enable React optimization for production
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      );
    }
    
    return config;
  },
  
  // Remove powered by header for security
  poweredByHeader: false,
  
  // Set specific output options
  output: 'standalone',
  
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
  
  // Trailing slashes for URL consistency
  trailingSlash: false,
  
  // Configure headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
EOL

echo -e "${GREEN}Updated next.config.js with performance optimizations${NC}"

# === STEP 10: Create Route.js files for SEO Pages in App Router ===
echo -e "\n${BLUE}Step 10: Creating Route.js files for SEO Pages${NC}"

# Function to create route.js files for SEO pages
create_route_file() {
  local slug=$1
  local route_dir="./src/app/$slug"
  
  # Create directory if it doesn't exist
  mkdir -p "$route_dir"
  
  # Create route.js file
  cat > "$route_dir/route.js" << EOL
import { redirect } from 'next/navigation';

// Redirect this route to the actual SEO page
export async function GET() {
  return redirect('/$slug');
}
EOL

  echo -e "${GREEN}Created route.js for: $slug${NC}"
}

# Create route.js files for each SEO slug
for slug in "servizi-puglia" "ncc-ostuni" "ncc-bari" "ncc-salento" "transfer-aeroporto-brindisi" "autonoleggio-con-conducente-alberobello" "tour-autista-privato-puglia" "transfer-bari-ostuni"; do
  create_route_file "$slug"
done

# === STEP 11: Add an optimized sitemap.js ===
echo -e "\n${BLUE}Step 11: Optimizing sitemap.js${NC}"

SITEMAP_FILE="./src/app/sitemap.js"
check_file "$SITEMAP_FILE"
backup_file "$SITEMAP_FILE"

cat > "$SITEMAP_FILE" << 'EOL'
/**
 * Dynamic sitemap generation for SEO optimization
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

export default async function sitemap() {
  const baseUrl = 'https://www.zaccariaautonoleggio.it';
  
  // Define all dynamic and static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    
    // Section routes
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tour`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rental`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    
    // SEO Landing Pages
    {
      url: `${baseUrl}/ncc-ostuni`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncc-bari`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncc-salento`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/transfer-aeroporto-brindisi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/autonoleggio-con-conducente-alberobello`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tour-autista-privato-puglia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/transfer-bari-ostuni`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servizi-puglia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
  
  return routes;
}
EOL

echo -e "${GREEN}Updated sitemap.js with optimized routes${NC}"

# === STEP 12: Add robots.txt file ===
echo -e "\n${BLUE}Step 12: Adding robots.txt file${NC}"

ROBOTS_FILE="./public/robots.txt"
mkdir -p ./public

cat > "$ROBOTS_FILE" << 'EOL'
User-agent: *
Allow: /

# Disallow all crawlers to admin and API routes
Disallow: /api/
Disallow: /_next/

# Sitemap location
Sitemap: https://www.zaccariaautonoleggio.it/sitemap.xml
EOL

echo -e "${GREEN}Created robots.txt file${NC}"

# === STEP 13: Cleanup and Final Messages ===
echo -e "\n${BLUE}Step 13: Cleanup and Final Instructions${NC}"

# Create test script to verify the changes
TEST_SCRIPT="./verify-routing.js"

cat > "$TEST_SCRIPT" << 'EOL'
/**
 * Routing Verification Tool
 * 
 * This script can be used to test the routing configuration
 * Run with Node.js: node verify-routing.js
 */

const http = require('http');

// List of routes to test
const routes = [
  '/',
  '/services',
  '/fleet',
  '/tour',
  '/rental',
  '/about',
  '/testimonials',
  '/offers',
  '/contact',
  '/ncc-ostuni',
  '/ncc-bari',
  '/ncc-salento',
  '/transfer-aeroporto-brindisi',
  '/autonoleggio-con-conducente-alberobello',
  '/tour-autista-privato-puglia',
  '/transfer-bari-ostuni',
  '/servizi-puglia'
];

// Test each route
async function testRoutes() {
  console.log('Testing routes...');
  console.log('='.repeat(50));
  
  // Local development server port
  const host = 'localhost';
  const port = 3000;
  
  for (const route of routes) {
    try {
      console.log(`Testing route: ${route}`);
      
      // Make a request to the route
      const response = await new Promise((resolve, reject) => {
        const req = http.get({
          host,
          port,
          path: route,
          headers: { 'User-Agent': 'Routing-Verification-Tool' }
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, data }));
        });
        
        req.on('error', (err) => reject(err));
      });
      
      // Check if the response is successful
      if (response.statusCode >= 200 && response.statusCode < 400) {
        console.log(`✅ Route ${route} - Status: ${response.statusCode}`);
      } else {
        console.log(`❌ Route ${route} - Status: ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`❌ Error testing route ${route}:`, error.message);
    }
    
    console.log('-'.repeat(50));
  }
  
  console.log('Route testing complete!');
}

// Run the tests
testRoutes()
  .catch(error => console.error('Error testing routes:', error));
EOL

echo -e "${GREEN}Created routing verification script at: $TEST_SCRIPT${NC}"

# Final message
echo -e "\n${GREEN}=== Routing and SEO Optimization Complete! ===${NC}"
echo -e "The following changes have been made:"
echo -e "1. Fixed middleware.js to properly handle both section and SEO routes"
echo -e "2. Created a dynamic [slug] page for section routing"
echo -e "3. Updated client-side navigation components"
echo -e "4. Added proper URL handling for SEO pages"
echo -e "5. Optimized sitemap and added robots.txt"
echo -e "6. Added performance optimizations to next.config.js"
echo -e "\nTo verify the changes:"
echo -e "1. Start your development server: ${YELLOW}npm run dev${NC}"
echo -e "2. Open a new terminal and run: ${YELLOW}node verify-routing.js${NC}"
echo -e "3. Test navigation manually by clicking section links and SEO page links"
echo -e "\nBackups of all modified files are stored in: ${BACKUP_DIR}"
echo -e "\nFor better production performance, remember to build your site:"
echo -e "${YELLOW}npm run build${NC}"
echo -e "\nAfter deployment, test all routes to ensure they work correctly."