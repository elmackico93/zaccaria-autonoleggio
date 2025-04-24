/**
 * Offer analytics tracking functions
 * These functions would integrate with Google Analytics, Facebook Pixel, etc.
 */

// Track when an offer is viewed
export function trackOfferView(offerSectionId) {
  if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      'event': 'offer_view',
      'offer_section_id': offerSectionId,
      'timestamp': new Date().toISOString()
    });
  }
  
  // For development logs
  if (process.env.NODE_ENV === 'development') {
    console.log(`Offer view tracked: ${offerSectionId}`);
  }
}

// Track when an offer is clicked
export function trackOfferClick(offerId) {
  if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      'event': 'offer_click',
      'offer_id': offerId,
      'timestamp': new Date().toISOString()
    });
  }
  
  // For development logs
  if (process.env.NODE_ENV === 'development') {
    console.log(`Offer click tracked: ${offerId}`);
  }
}

// Track offer impression (when it becomes visible)
export function trackOfferImpression(offerId) {
  if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      'event': 'offer_impression',
      'offer_id': offerId,
      'timestamp': new Date().toISOString()
    });
  }
  
  // For development logs
  if (process.env.NODE_ENV === 'development') {
    console.log(`Offer impression tracked: ${offerId}`);
  }
}

// Track offer conversion
export function trackOfferConversion(offerId, value) {
  if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      'event': 'offer_conversion',
      'offer_id': offerId,
      'value': value,
      'currency': 'EUR',
      'timestamp': new Date().toISOString()
    });
  }
  
  // For development logs
  if (process.env.NODE_ENV === 'development') {
    console.log(`Offer conversion tracked: ${offerId}, Value: €${value}`);
  }
}
