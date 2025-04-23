// This is a Server Component
import Image from 'next/image';
import CallButton from '@/components/ui/CallButton';

const VEHICLES = [
  {
    id: 1,
    name: "Mercedes S-Class",
    description: "Berlina executive • 4 posti • Wi-Fi",
    image: "/images/mercedes-s-class.jpg",
  },
  {
    id: 2,
    name: "Mercedes E-Class",
    description: "Berlina business • 4 posti • Comfort",
    image: "/images/mercedes-e-class.jpg",
  },
  {
    id: 3,
    name: "Mercedes V-Class",
    description: "Van premium • 7 posti • Extra spazio",
    image: "/images/mercedes-v-class.jpg",
  }
];

export default function Fleet() {
  return (
    <section id="fleet" className="py-32 bg-black section-fade-in">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <h2 className="text-sm font-bold tracking-widest mb-4 uppercase chrome-text-enhanced">La Nostra Flotta</h2>
            <div className="w-12 h-[1px] bg-silver-metallic"></div>
          </div>
          <div className="md:col-span-9">
            <p className="text-3xl md:text-4xl font-light leading-tight max-w-3xl">
              Veicoli Mercedes selezionati per offrire il massimo comfort e stile. 
              Una flotta all'altezza delle aspettative più elevate.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {VEHICLES.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              description={vehicle.description}
              image={vehicle.image}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <CallButton
            variant="navbar"
            location="fleet"
            text="Prenota un Transfer"
          />
        </div>
      </div>
    </section>
  );
}

// This function returns a Server Component
function VehicleCard({ name, description, image }) {
  // Server-rendered optimized image component
  return (
    <div className="metal-fleet-card metal-border">
      <span></span>
      <div className="relative h-80 w-full">
        {/* Progressive image loading strategy */}
        <Image 
          src={image} 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
          loading="lazy"
          quality={80}
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
