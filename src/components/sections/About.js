import Image from 'next/image';
import CallButton from '@/components/ui/CallButton';

// Server Component
export default function About() {
  return (
    <section id="about" className="py-32 bg-charcoal section-fade-in">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Chi Siamo<span className="chrome-text-enhanced">.</span>
            </h2>
            <p className="text-xl text-silver mb-8 leading-relaxed">
              Da oltre un decennio, Zaccaria NCC rappresenta l'eccellenza nel settore del noleggio con conducente. 
              La nostra missione è fornire un servizio impeccabile che unisce professionalità, comfort e attenzione ai dettagli.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <div className="text-4xl font-bold mb-2 chrome-text-enhanced" id="counter1">0</div>
                <div className="text-sm uppercase tracking-wider text-silver-metallic">Anni di esperienza</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 chrome-text-enhanced" id="counter2">0</div>
                <div className="text-sm uppercase tracking-wider text-silver-metallic">Clienti soddisfatti</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 chrome-text-enhanced" id="counter3">0</div>
                <div className="text-sm uppercase tracking-wider text-silver-metallic">Viaggi completati</div>
              </div>
            </div>
            <CallButton 
              variant="navbar"
              location="about"
              text="Chiama Ora"
            />
          </div>
          <div className="relative">
            <div className="relative h-[600px] w-full">
              <Image 
                src="/images/about-us.jpg"
                alt="About Us"
                fill
                className="object-cover border border-dark-silver parallax-element"
                data-speed="0.5"
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyMjIyIi8+PC9zdmc+"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gunmetal flex items-center justify-center text-white border border-silver-metallic">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 chrome-text-enhanced">24/7</div>
                <div className="text-sm uppercase tracking-wider">Disponibilità</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
