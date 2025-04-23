export function createMetadata({ title, description, path, image }) {
({ title, description, path, image, businessName, legalName }) {
  const baseUrl = 'https://www.zaccariaautonoleggio.it';
  const imageUrl = image || '/images/og-image.jpg';
  
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: businessName,
      locale: 'it_IT',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    other: {
      'business:contact_data:street_address': '${BUSINESS_ADDRESS}',
      'business:contact_data:locality': '${BUSINESS_CITY}',
      'business:contact_data:postal_code': '${BUSINESS_POSTAL}',
      'business:contact_data:country_name': 'Italy',
      'business:contact_data:phone_number': '+39 ${BUSINESS_PHONE}',
      'og:site_name': businessName,
      'og:locale': 'it_IT',
    }
  };
}
/**
 * Utility functions for the Zaccaria NCC website
 */

// Format a phone number consistently
export function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
}

// Create optimized image URL with Cloudinary or similar service
export function getOptimizedImageUrl(path, width = 800) {
  // Replace with actual CDN implementation - this is a placeholder
  if (path.startsWith('http')) {
    return path;
  }
  // Example Cloudinary URL construction
  // return `https://res.cloudinary.com/your-account/image/upload/w_${width},q_auto,f_auto/${path}`;
  return path;
}

// Create structured data for services
export function createServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.title,
    'description': service.description,
    'provider': {
      '@type': 'LimousineService',
      'name': 'Zaccaria NCC',
    }
  };
}

// SEO helper function to create page metadata
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    }
  };
}

// Format price with proper currency symbol
export function formatPrice(price, currency = '€') {
  return `${currency}${price.toFixed(2)}`;
}

// Get relative time (e.g. "2 days ago")
export function getRelativeTime(date) {
  const rtf = new Intl.RelativeTimeFormat('it', { numeric: 'auto' });
  const now = new Date();
  const diff = now - new Date(date);
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  if (minutes > 0) return rtf.format(-minutes, 'minute');
  return rtf.format(-seconds, 'second');
}

// Debounce function for input handling
export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Create a unique ID
export function uniqueId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Clamp a number between min and max
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

// Format a date using Intl.DateTimeFormat
export function formatDate(date, options = {}) {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const dateFormatter = new Intl.DateTimeFormat(
    'it-IT', 
    { ...defaultOptions, ...options }
  );
  
  return dateFormatter.format(new Date(date));
}

// Truncate text with ellipsis
export function truncateText(text, length = 100) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// Parse a URL query string into an object
export function parseQueryString(queryString) {
  if (!queryString || !queryString.includes('=')) return {};
  
  return queryString
    .replace(/^\?/, '')
    .split('&')
    .reduce((params, param) => {
      const [key, value] = param.split('=');
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
      return params;
    }, {});
}
