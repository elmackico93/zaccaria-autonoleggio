import { Suspense } from 'react';
import OffersList from './OffersList';
import OffersSkeleton from './OffersSkeleton';
import OffersHeader from './OffersHeader';
import { createOfferSchema } from '@/lib/schemas/offerSchema';

// Server Component
export default function Offers() {
  return (
    <section id="offers" className="py-32 bg-black section-fade-in">
      <div className="container mx-auto px-6">
        <OffersHeader />
        
        {/* Suspense boundary for better loading experience */}
        <Suspense fallback={<OffersSkeleton />}>
          <OffersList />
        </Suspense>
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createOfferSchema())
          }}
        />
      </div>
    </section>
  );
}
