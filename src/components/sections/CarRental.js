import Image from 'next/image';
import CallButton from '@/components/ui/CallButton';

const CARS = [
  {
    id: 1,
    name: "Fiat 500X",
    description: "Crossover • 5 posti • Climatizzato",
    image: "/images/fiat-500-x.jpeg",
  },
  {
    id: 2,
    name: "Citroen C3",
    description: "Compatta • 5 posti • Economica",
    image: "/images/citroen-c3.jpeg",
  },
  {
    id: 3,
    name: "Fiat Panda",
    description: "City car • 4 posti • Pratica",
    image: "/images/fiat-panda.jpeg",
  }
];

// Server Component
export default function CarRental() {
  return (
    <section id="rental" className="py-32 bg-black section-fade-in">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <h2 className="text-sm font-bold tracking-widest mb-4 uppercase chrome-text-enhanced">Autonoleggio</h2>
            <div className="w-12 h-[1px] bg-silver-metallic"></div>
          </div>
          <div className="md:col-span-9">
            <p className="text-3xl md:text-4xl font-light leading-tight max-w-3xl">
              Noleggia un'auto senza conducente per esplorare la Puglia in libertà.
              Veicoli moderni e affidabili per brevi periodi.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {CARS.map(car => (
            <CarCard
              key={car.id}
              name={car.name}
              description={car.description}
              image={car.image}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <CallButton
            variant="navbar"
            location="rental"
            text="Prenota un'Auto"
          />
        </div>
      </div>
    </section>
  );
}

// Car Card Component
function CarCard({ name, description, image }) {
  return (
    <div className="metal-fleet-card metal-border">
      <span></span>
      <div className="relative h-80 w-full">
        <Image 
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyMjIyIi8+PC9zdmc+"
        />
      </div>
      <div className="metal-fleet-info">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-silver-metallic">{description}</p>
      </div>
    </div>
  );
}
