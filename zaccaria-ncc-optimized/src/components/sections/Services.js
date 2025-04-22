import ServiceCallButton from '@/components/ui/buttons/ServiceCallButton';
import CallButton from '@/components/ui/CallButton';

const SERVICES = [
  {
    id: "01",
    title: "Taxi NCC Mercedes",
    description: "Servizio premium di trasporto con auto e furgonati Mercedes. Transfer aeroportuali, viaggi business e trasporto privato con autisti professionisti.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M5 9h14m-10 4v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6M5 9l2 8M19 9l-2 8"/>
      </svg>
    )
  },
  {
    id: "02",
    title: "Tour Guidati in Puglia",
    description: "Scopri le migliori destinazioni della Puglia con i nostri tour personalizzati. Visite culturali, enogastronomiche e naturalistiche con guide esperte.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    )
  },
  {
    id: "03",
    title: "Autonoleggio",
    description: "Noleggio auto a breve termine senza conducente. Modelli Citroen C3, Fiat Panda e 500X disponibili per il tuo soggiorno in Puglia, con tariffe competitive.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 16.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0M15 16.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0M3 6h19l-2 11h-15zm0 0l2 5M8 11h8m-8 -3h9"/>
      </svg>
    )
  }
];

// This is a Server Component
export default function Services() {
  return (
    <section id="services" className="py-32 bg-charcoal section-fade-in">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <h2 className="text-sm font-bold tracking-widest mb-4 uppercase chrome-text-enhanced">I Nostri Servizi</h2>
            <div className="w-12 h-[1px] bg-silver-metallic"></div>
          </div>
          <div className="md:col-span-9">
            <p className="text-3xl md:text-4xl font-light leading-tight max-w-3xl">
              Un'esperienza di trasporto su misura per ogni esigenza, 
              dove professionalità e comfort si incontrano.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard 
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// This component is split out for better code organization
function ServiceCard({ id, title, description, icon }) {
  return (
    <div className="metal-card tilt-card" data-tilt-speed="400" data-tilt-max="5" data-tilt-glare="true">
      <span className="service-number">{id}</span>
      <div className="w-12 h-12 mb-8">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-silver mb-8">
        {description}
      </p>
      <ServiceCallButton location={`services-${id}`} />
    </div>
  );
}
