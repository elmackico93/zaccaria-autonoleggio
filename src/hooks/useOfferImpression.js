'use client';

import { useCallback } from 'react';
import { trackOfferImpression } from '@/lib/analytics';

/**
 * Custom hook to track offer impressions
 * An impression is counted when an offer becomes visible to the user
 */
export default function useOfferImpression() {
  // Track when an offer impression occurs
  const trackImpression = useCallback((offerId) => {
    // Delay tracking slightly to ensure the user has actually seen the offer
    // and to reduce false positives from quick scrolling
    setTimeout(() => {
      trackOfferImpression(offerId);
    }, 1000);
  }, []);

  return { trackImpression };
}
