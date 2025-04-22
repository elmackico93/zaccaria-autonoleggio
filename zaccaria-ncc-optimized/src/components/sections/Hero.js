import Link from 'next/link';
import CallButton from '@/components/ui/CallButton';

// This is a Server Component by default (no 'use client' directive)
export default function Hero() {
  return (
    <section 
      className="min-h-screen flex items-center hero-metal relative parallax-container"
      style={{
        backgroundImage: "linear-gradient(rgba(10,10,10,.05), rgba(10,10,10,.75)), url('/images/home.svg')"
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div 
        className="parallax-element absolute inset-0" 
        data-depth="0.2" 
        style={{ 
          backgroundImage: "url('/images/home.svg')",
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          zIndex: -1 
        }}
      ></div>
      
      <div className="container mx-auto px-6 pt-20 relative z-10">
        <div className="max-w-3xl">
          <div className="text-reveal">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-reveal-content">
              NOLEGGIO 
              <br/>
              <span className="chrome-text-enhanced">CON CONDUCENTE</span>
            </h1>
          </div>
          <div className="text-reveal">
            <p className="text-xl text-silver mb-12 max-w-xl text-reveal-content">
              Riscopri la Puglia a bordo dei nostri veicoli Mercedes di alta gamma: transfer privati dagli aeroporti di Brindisi e Bari, spostamenti business door‑to‑door e tour su misura tra i borghi bianchi della Valle d'Itria, le scogliere del Gargano e le spiagge cristalline del Salento.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-reveal-content">
            <CallButton 
              variant="hero"
              location="hero"
              text="Prenota Ora"
            />
            <Link href="#services" className="metal-button-outline flex-none text-center">
              Scopri i Servizi
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-6">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium mb-4 rotate-90 origin-left text-silver">SCROLL</span>
          <div className="w-[1px] h-16 bg-silver-metallic"></div>
        </div>
      </div>
    </section>
  );
}
