import Link from 'next/link';
import Image from 'next/image';
import FooterLinksSEO from '@/components/ui/FooterLinksSEO';

/**
 * Footer Component
 * Displays the site footer with contact information, navigation links, and copyright notice
 * 
 * @returns {JSX.Element} The footer component
 */
export default function Footer() {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-black border-t border-dark-silver" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6">
        {/* Main footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Company info - 4 columns on desktop */}
          <div className="md:col-span-4 flex flex-col">
            <div className="flex items-center mb-4">
              {/* Logo with proper alt text and dimensions */}
              <div className="w-16 h-16 mr-4 relative flex-shrink-0">
                <Image 
                  src="/images/logo/logo-128.png" 
                  alt="Zaccaria NCC Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              {/* Company name */}
              <div>
                <h3 className="text-xl font-bold text-white">ZACCARIA</h3>
                <p className="text-silver-metallic text-sm">NCC</p>
              </div>
            </div>
            <p className="text-silver-metallic text-sm mb-4">
              Servizio di noleggio con conducente di alta qualità dal 2010.
            </p>
            
            {/* Social icons for mobile - shown at bottom on desktop */}
            <div className="flex mt-auto space-x-4 md:hidden">
              <a 
                href="https://www.facebook.com/zaccariancc" 
                className="text-silver-metallic hover:text-white transition-colors p-2" 
                aria-label="Pagina Facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-facebook-f" aria-hidden="true"></i>
              </a>
              <a 
                href="https://www.instagram.com/zaccariancc" 
                className="text-silver-metallic hover:text-white transition-colors p-2" 
                aria-label="Profilo Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
              <a 
                href="https://wa.me/393313467527" 
                className="text-silver-metallic hover:text-white transition-colors p-2" 
                aria-label="Contatto WhatsApp"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-whatsapp" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          
          {/* Services section - 2 columns */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold tracking-widest mb-4 uppercase">Servizi</h4>
            <nav aria-label="Servizi">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="#services" 
                    className="text-silver-metallic hover:text-white transition-colors text-sm inline-block py-1"
                  >
                    Taxi NCC Mercedes
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#tour" 
                    className="text-silver-metallic hover:text-white transition-colors text-sm inline-block py-1"
                  >
                    Tour Guidati
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#rental" 
                    className="text-silver-metallic hover:text-white transition-colors text-sm inline-block py-1"
                  >
                    Autonoleggio
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Quick Links section - 2 columns */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold tracking-widest mb-4 uppercase">Quick Links</h4>
            <nav aria-label="Link rapidi">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="#about" 
                    className="text-silver-metallic hover:text-white transition-colors text-sm inline-block py-1"
                  >
                    Chi Siamo
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#fleet" 
                    className="text-silver-metallic hover:text-white transition-colors text-sm inline-block py-1"
                  >
                    La Nostra Flotta
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#contact" 
                    className="text-silver-metallic hover:text-white transition-colors text-sm inline-block py-1"
                  >
                    Contatti
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Contact section - 4 columns */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold tracking-widest mb-4 uppercase">Contattaci</h4>
            <address className="not-italic">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-phone-alt text-silver-metallic mt-1 mr-3 w-4 text-center" aria-hidden="true"></i>
                  <a 
                    href="tel:+393313467527" 
                    className="text-silver-metallic hover:text-white transition-colors text-sm inline-block py-1"
                  >
                    +39 331 346 7527
                  </a>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-envelope text-silver-metallic mt-1 mr-3 w-4 text-center" aria-hidden="true"></i>
                  <a 
                    href="mailto:info@zaccariaautonoleggio.it" 
                    className="text-silver-metallic hover:text-white transition-colors text-sm inline-block py-1"
                  >
                    info@zaccariaautonoleggio.it
                  </a>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt text-silver-metallic mt-1 mr-3 w-4 text-center" aria-hidden="true"></i>
                  <span className="text-silver-metallic text-sm inline-block py-1">
                    Via Armando Diaz, 91, 72017 Ostuni (BR)
                  </span>
                </li>
              </ul>
            </address>
          </div>
        </div>
        
        {/* SEO Links */}
        <FooterLinksSEO />
        
        {/* Fine separator line */}
        <div className="metal-divider mb-6"></div>
        
        {/* Copyright and social icons row */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-silver-metallic text-sm mb-4 md:mb-0">
            © {currentYear} Zaccaria NCC. Tutti i diritti riservati. P.IVA: 01234567890
          </p>
          
          {/* Social icons - hidden on mobile, shown on desktop */}
          <div className="hidden md:flex space-x-4">
            <a 
              href="https://www.facebook.com/zaccariancc" 
              className="text-silver-metallic hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full border border-dark-silver hover:border-silver" 
              aria-label="Facebook"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a 
              href="https://www.instagram.com/zaccariancc" 
              className="text-silver-metallic hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full border border-dark-silver hover:border-silver" 
              aria-label="Instagram"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a 
              href="https://wa.me/393313467527" 
              className="text-silver-metallic hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full border border-dark-silver hover:border-silver" 
              aria-label="WhatsApp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}