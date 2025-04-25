/**
 * Central configuration export for Zaccaria NCC
 * This file exports all configuration objects for easy access throughout the application
 */

const business = require('./business.json');
const services = require('./services.json');
const fleet = require('./fleet.json');
const tours = require('./tours.json');
const offers = require('./offers.json');
const testimonials = require('./testimonials.json');
const seo = require('./seo.json');
const paths = require('./paths.json');
const colorScheme = require('./color-scheme.json');

// Combine all configurations
const config = {
  business,
  services,
  fleet,
  tours,
  offers,
  testimonials,
  seo,
  paths,
  colorScheme
};

/**
 * Helper function to get a nested configuration value by path
 * @param {string} path - Dot-notation path to the config value
 * @param {any} defaultValue - Default value if path doesn't exist
 * @returns {any} - The configuration value or default
 */
function getConfig(path, defaultValue = null) {
  const parts = path.split('.');
  let current = config;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      return defaultValue;
    }
    current = current[part];
  }
  
  return current;
}

/**
 * Get the content in the current language
 * @param {Object} obj - Object with language variations
 * @param {string} language - Language code (e.g., 'en')
 * @returns {string} - The content in the requested language or default language
 */
function getLocalizedContent(obj, language = 'it') {
  if (!obj) return '';
  
  // For Italian (default language), use the base property
  if (language === 'it') {
    return obj;
  }
  
  // Convert language code to proper property suffix (e.g., 'en' -> 'En')
  const suffix = language.charAt(0).toUpperCase() + language.slice(1);
  
  // For each property, check if there's a localized version
  const localizedObj = {};
  
  for (const key in obj) {
    // Skip properties that are already language-specific
    if (key.endsWith('En') || key.endsWith('Fr') || key.endsWith('De')) {
      continue;
    }
    
    // Check if there's a localized version of this property
    const localizedKey = `${key}${suffix}`;
    localizedObj[key] = obj[localizedKey] !== undefined ? obj[localizedKey] : obj[key];
  }
  
  return localizedObj;
}

// Use CommonJS exports for better compatibility
module.exports = config;
module.exports.getConfig = getConfig;
module.exports.getLocalizedContent = getLocalizedContent;
// Also export as default for ES module support
module.exports.default = config;
