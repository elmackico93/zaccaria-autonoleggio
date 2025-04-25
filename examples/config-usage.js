/**
 * Example usage of the configuration system
 */

// Import the whole config
import config from '@/config';

// Import specific parts
import { getConfig, getLocalizedContent } from '@/config';

// Example 1: Access business information
const businessName = config.business.name;
console.log(`Business name: ${businessName}`);

// Example 2: Get a nested value with dot notation
const phone = getConfig('business.contact.phone');
console.log(`Phone number: ${phone}`);

// Example 3: Get with default value for safety
const instagram = getConfig('business.social.instagram', 'Not available');
console.log(`Instagram: ${instagram}`);

// Example 4: Get localized content
const tourTitle = getConfig('tours.tours[0]');
const localizedTour = getLocalizedContent(tourTitle, 'en');
console.log(`Tour title (EN): ${localizedTour.title}`);

// Example 5: Get config path
const logoPath = getConfig('paths.images.logo');
console.log(`Logo path: ${logoPath}`);

// Example 6: Get color values
const primaryColor = getConfig('colorScheme.colors.silverMetallic');
console.log(`Primary color: ${primaryColor}`);

// Example 7: Loop through services
const services = getConfig('services.serviceItems');
services.forEach(service => {
  console.log(`Service: ${service.title} - ${service.description}`);
});

// Example 8: Access SEO information
const seoTitle = getConfig('seo.global.metaTitle');
console.log(`SEO Title: ${seoTitle}`);
