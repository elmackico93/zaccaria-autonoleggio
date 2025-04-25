'use client';

import { createContext, useContext } from 'react';

// Try multiple import paths to handle different configurations
let config, getConfig, getLocalizedContent;
try {
  // First try the path alias
  const configModule = require('@config');
  config = configModule.default || configModule;
  getConfig = configModule.getConfig;
  getLocalizedContent = configModule.getLocalizedContent;
} catch (e) {
  try {
    // Then try the direct path
    const configModule = require('@/lib/config');
    config = configModule.default || configModule;
    getConfig = configModule.getConfig;
    getLocalizedContent = configModule.getLocalizedContent;
  } catch (e2) {
    // Fallback to hardcoded minimal config
    console.error("Could not load configuration. Falling back to minimal config.");
    config = {
      business: {
        name: "Zaccaria NCC",
        legalName: "Autonoleggio Zaccaria Ostuni",
        contact: { phone: "+39-331-346-7527", email: "info@example.com" }
      }
    };
    getConfig = (path, defaultValue) => {
      const parts = path.split('.');
      let current = config;
      
      for (const part of parts) {
        if (current[part] === undefined) {
          return defaultValue;
        }
        current = current[part];
      }
      
      return current;
    };
    getLocalizedContent = (obj) => obj;
  }
}

// Create context with default values
const ConfigContext = createContext({
  config,
  getConfig,
  getLocalizedContent,
  language: 'it',
});

/**
 * Provider component for configuration
 */
export function ConfigProvider({ children, language = 'it' }) {
  const value = {
    config,
    getConfig,
    getLocalizedContent,
    language,
    // Helper for getting localized content in current language
    t: (obj) => getLocalizedContent(obj, language),
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

/**
 * Hook for accessing configuration
 * @returns {Object} Configuration context
 */
export function useConfig() {
  const context = useContext(ConfigContext);
  
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  
  return context;
}

export default ConfigContext;
