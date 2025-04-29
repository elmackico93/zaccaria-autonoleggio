/**
 * Supporting Components for Puglia Locations SEO
 * 
 * This file contains all the reusable components needed for location pages.
 * The setup script will automatically split these into individual files.
 */

// JsonLd.tsx
/**
 * JsonLd Component for structured data
 * 
 * This component renders JSON-LD structured data in the page
 * for improved SEO and rich search results.
 */
interface JsonLdProps {
    data: Record<string, any>;
  }
  
  export function JsonLd({ data }: JsonLdProps) {
    if (!data) return null;
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }
  
  // LocationFAQs.tsx
  /**
   * LocationFAQs Component
   * 
   * Renders a list of FAQs for location pages with consistent styling.
   */
  interface FAQ {
    question: string;
    answer: string;
  }
  
  interface LocationFAQsProps {
    faqs: FAQ[];
  }
  
  export default function LocationFAQs({ faqs }: LocationFAQsProps) {
    return (
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="metal-card">
            <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
            <p className="text-silver">{faq.answer}</p>
          </div>
        ))}
      </div>
    );
  }
  
  // ServiceFeatures.tsx
  /**
   * ServiceFeatures Component
   * 
   * Renders a list of service features with icon bullets.
   */
  interface ServiceFeaturesProps {
    features: string[];
  }
  
  export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
    return (
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="text-silver-metallic mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p className="text-silver">{feature}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  
  // ServiceAdvantages.tsx
  /**
   * ServiceAdvantages Component
   * 
   * Renders a grid of service advantages with cards.
   */
  interface Advantage {
    title: string;
    description: string;
  }
  
  interface ServiceAdvantagesProps {
    advantages: Advantage[];
  }
  
  export default function ServiceAdvantages({ advantages }: ServiceAdvantagesProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advantages.map((advantage, index) => (
          <div key={index} className="metal-card">
            <h3 className="text-xl font-semibold mb-4">{advantage.title}</h3>
            <p className="text-silver">{advantage.description}</p>
          </div>
        ))}
      </div>
    );
  }
  
  // LocationCard.tsx
  /**
   * LocationCard Component
   * 
   * Renders a card for a location with image, description, and service links.
   */
  import Image from 'next/image';
  import Link from 'next/link';
  import { generateSlug } from '@/data/puglia-locations';
  
  interface LocationCardProps {
    location: {
      name: string;
      description: string;
      province: string;
    };
    serviceType?: 'ncc' | 'transfer' | 'tour';
  }
  
  export function LocationCard({ location, serviceType = 'ncc' }: LocationCardProps) {
    const slug = generateSlug(location.name, serviceType);
    
    return (
      <div className="bg-dark-silver rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-102">
        <div className="relative h-48">
          <Image 
            src={`/images/locations/${location.province.toLowerCase()}/${generateSlug(location.name)}.jpg`}
            alt={location.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback to a default image if the specific one doesn't exist
              const target = e.target as HTMLImageElement;
              target.src = "/images/locations/default.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">{location.name}</h3>
              <p className="text-sm text-silver">Provincia di {location.province}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-silver mb-4 line-clamp-3">{location.description}</p>
          <div className="flex space-x-2">
            <Link href={`/ncc-${generateSlug(location.name)}`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
              NCC
            </Link>
            <Link href={`/transfer-${generateSlug(location.name)}`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
              Transfer
            </Link>
            <Link href={`/tour-${generateSlug(location.name)}`} className="text-xs px-2 py-1 bg-silver-metallic text-black rounded hover:bg-silver">
              Tour
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // LocationsGrid.tsx
  /**
   * LocationsGrid Component
   * 
   * Displays a responsive grid of location cards.
   */
  interface LocationsGridProps {
    locations: Array<{
      name: string;
      description: string;
      province: string;
      category?: string;
    }>;
    category?: string | null;
    province?: string | null;
    limit?: number | null;
  }
  
  export function LocationsGrid({ 
    locations, 
    category = null, 
    province = null, 
    limit = null 
  }: LocationsGridProps) {
    // Filter locations if category or province is specified
    let filteredLocations = [...locations];
    
    if (category) {
      filteredLocations = filteredLocations.filter(loc => loc.category === category);
    }
    
    if (province) {
      filteredLocations = filteredLocations.filter(loc => loc.province === province);
    }
    
    // Apply limit if specified
    if (limit && filteredLocations.length > limit) {
      filteredLocations = filteredLocations.slice(0, limit);
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map(location => (
          <LocationCard key={location.name} location={location} />
        ))}
        
        {filteredLocations.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-silver">Nessuna località trovata con i criteri specificati.</p>
          </div>
        )}
      </div>
    );
  }
  
  // LocationsFilter.tsx
  /**
   * LocationsFilter Component
   * 
   * Allows filtering locations by category and province.
   */
  import { useState } from 'react';
  
  interface LocationsFilterProps {
    onFilterChange: (filters: { category: string; province: string }) => void;
    categories: Array<{ value: string; label: string }>;
    provinces: Array<{ code: string; name: string }>;
  }
  
  export function LocationsFilter({ onFilterChange, categories, provinces }: LocationsFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    
    const handleCategoryChange = (e) => {
      const category = e.target.value;
      setSelectedCategory(category);
      onFilterChange({ category, province: selectedProvince });
    };
    
    const handleProvinceChange = (e) => {
      const province = e.target.value;
      setSelectedProvince(province);
      onFilterChange({ category: selectedCategory, province });
    };
    
    const handleReset = () => {
      setSelectedCategory('');
      setSelectedProvince('');
      onFilterChange({ category: '', province: '' });
    };
    
    return (
      <div className="bg-dark-silver p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="category-filter" className="block text-sm font-medium text-silver mb-1">
              Categoria
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full bg-black border border-silver rounded-md py-2 px-3 text-silver"
            >
              <option value="">Tutte le categorie</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label htmlFor="province-filter" className="block text-sm font-medium text-silver mb-1">
              Provincia
            </label>
            <select
              id="province-filter"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full bg-black border border-silver rounded-md py-2 px-3 text-silver"
            >
              <option value="">Tutte le province</option>
              {provinces.map(province => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="py-2 px-4 bg-silver-metallic text-black rounded hover:bg-silver"
            >
              Resetta filtri
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // ProvinceTab.tsx
  /**
   * ProvinceTabs Component
   * 
   * A component for filtering locations by province with tabs.
   */
  interface ProvinceTabsProps {
    provinces: Array<{ code: string; name: string }>;
    activeProvince: string;
    onProvinceChange: (code: string) => void;
  }
  
  export function ProvinceTabs({ 
    provinces, 
    activeProvince, 
    onProvinceChange 
  }: ProvinceTabsProps) {
    return (
      <div className="mb-8">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button
            onClick={() => onProvinceChange('')}
            className={`px-4 py-2 whitespace-nowrap rounded ${
              activeProvince === '' 
                ? 'bg-silver-metallic text-black' 
                : 'bg-dark-silver text-silver hover:bg-silver/20'
            }`}
          >
            Tutte
          </button>
          
          {provinces.map(province => (
            <button
              key={province.code}
              onClick={() => onProvinceChange(province.code)}
              className={`px-4 py-2 whitespace-nowrap rounded ${
                activeProvince === province.code 
                  ? 'bg-silver-metallic text-black' 
                  : 'bg-dark-silver text-silver hover:bg-silver/20'
              }`}
            >
              {province.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  // FooterLinksSEO.tsx
  /**
   * FooterLinksSEO Component
   * 
   * Enhanced footer with SEO-optimized location links.
   */
  import Link from 'next/link';
  
  export function FooterLinksSEO() {
    return (
      <div className="mt-8 pt-6 border-t border-dark-silver">
        <h4 className="text-sm font-bold tracking-widest mb-4 uppercase text-center">Servizi in Puglia</h4>
        
        {/* Main service types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Servizi NCC</h5>
            <ul className="space-y-1">
              <li>
                <Link href="/servizi-puglia" className="text-xs text-silver hover:text-white transition-colors">
                  Tutti i Servizi
                </Link>
              </li>
              <li>
                <Link href="/ncc-ostuni" className="text-xs text-silver hover:text-white transition-colors">
                  NCC Ostuni
                </Link>
              </li>
              <li>
                <Link href="/ncc-bari" className="text-xs text-silver hover:text-white transition-colors">
                  NCC Bari
                </Link>
              </li>
              <li>
                <Link href="/ncc-salento" className="text-xs text-silver hover:text-white transition-colors">
                  NCC Salento
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Transfer</h5>
            <ul className="space-y-1">
              <li>
                <Link href="/transfer-aeroporto-brindisi" className="text-xs text-silver hover:text-white transition-colors">
                  Transfer Aeroporto Brindisi
                </Link>
              </li>
              <li>
                <Link href="/transfer-aeroporto-bari" className="text-xs text-silver hover:text-white transition-colors">
                  Transfer Aeroporto Bari
                </Link>
              </li>
              <li>
                <Link href="/transfer-bari-ostuni" className="text-xs text-silver hover:text-white transition-colors">
                  Transfer Bari-Ostuni
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Tour</h5>
            <ul className="space-y-1">
              <li>
                <Link href="/tour-autista-privato-puglia" className="text-xs text-silver hover:text-white transition-colors">
                  Tour Privati in Puglia
                </Link>
              </li>
              <li>
                <Link href="/tour-valle-ditria" className="text-xs text-silver hover:text-white transition-colors">
                  Tour Valle d'Itria
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* This section will be generated dynamically with province location links */}
        <div className="mt-6">
          <h5 className="text-sm font-semibold mb-4 text-silver-metallic text-center">Servizi per Località</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Province location links will be inserted here by the generator */}
          </div>
        </div>
      </div>
    );
  }