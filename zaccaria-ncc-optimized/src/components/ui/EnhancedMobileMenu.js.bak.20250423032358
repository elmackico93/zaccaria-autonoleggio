'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPhoneClick } from '@/lib/animations';
import MenuParticleEffect from './MenuParticleEffect';
import MenuItemTilt from './MenuItemTilt';

export default function EnhancedMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [animationComplete, setAnimationComplete] = useState(true);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

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
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL
        window.history.replaceState(
          { ...window.history.state, as: `/${sectionId}`, url: `/${sectionId}` },
          '',
          `/${sectionId}`
        );
      }
    }, 300);
  };

  const menuItems = [
    { id: 'services', label: 'Servizi', icon: 'fa-concierge-bell' },
    { id: 'fleet', label: 'Flotta', icon: 'fa-car-side' },
    { id: 'tour', label: 'Tour', icon: 'fa-map-marked-alt' },
    { id: 'rental', label: 'Autonoleggio', icon: 'fa-car' },
    { id: 'contact', label: 'Contatti', icon: 'fa-envelope' }
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
            <a href="/" className="text-2xl font-bold chrome-text-enhanced" onClick={(e) => {
              e.preventDefault();
              closeMenu();
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.replaceState(null, '', '/');
              }, 300);
            }}>
              ZACCARIA
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
              href="tel:+39123456789" 
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
