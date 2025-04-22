import CallButton from '@/components/ui/CallButton';
import TourCallButton from '@/components/ui/buttons/TourCallButton';

const TOURS = [
  {
    id: 1,
    title: "Tour dei Borghi Bianchi",
    description: "Visita i caratteristici borghi bianchi della Valle d'Itria: Ostuni, Locorotondo, Cisternino e Alberobello con i suoi famosi trulli.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V7l8-4v18M13 7l6 3v11M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Tour Enogastronomico",
    description: "Esperienza sensoriale tra le eccellenze enogastronomiche pugliesi: frantoi, cantine vinicole e masserie con degustazioni di prodotti tipici.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 3l9 9m-9-9l-9 9m9-9v12m0 6v.01"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Tour delle Città d'Arte",
    description: "Viaggio culturale nelle città storiche della Puglia: Lecce con il suo barocco, Bari vecchia, Matera e i suoi Sassi (Basilicata).",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 6l6-2l6 2M4 10v10h16v-10M13 10v4M17 10.2v3.6m-10-3.8v4"/>
      </svg>
    )
  }
];

// Server Component
export default function Tours() {
  return (
    <section id="tour" className="py-32 bg-charcoal section-fade-in">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <h2 className="text-sm font-bold tracking-widest mb-4 uppercase chrome-text-enhanced">Tour Guidati</h2>
            <div className="w-12 h-[1px] bg-silver-metallic"></div>
          </div>
          <div className="md:col-span-9">
            <p className="text-3xl md:text-4xl font-light leading-tight max-w-3xl">
              Scopri le meraviglie della Puglia con i nostri tour esclusivi,
              pensati per offrirti un'esperienza autentica e indimenticabile.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TOURS.map((tour) => (
            <TourCard 
              key={tour.id}
              id={tour.id}
              title={tour.title}
              description={tour.description}
              icon={tour.icon}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <CallButton
            variant="navbar"
            location="tours"
            text="Prenota un Tour"
          />
        </div>
      </div>
    </section>
  );
}

// Tour Card Component
function TourCard({ id, title, description, icon }) {
  return (
    <div className="metal-card hover-effect">
      <div className="w-12 h-12 mb-8">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-silver mb-8">
        {description}
      </p>
      <TourCallButton location={`tours-${id}`} />
    </div>
  );
}
