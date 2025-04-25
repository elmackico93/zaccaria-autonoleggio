'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import config from '@/config';

// Get available languages from config
const availableLanguages = config.business.languages || ['it', 'en'];
const defaultLanguage = config.business.defaultLanguage || 'it';

// Create context
const LanguageContext = createContext({
  language: defaultLanguage,
  setLanguage: () => {},
  availableLanguages,
});

/**
 * Provider component for language settings
 */
export function LanguageProvider({ children, initialLanguage = defaultLanguage }) {
  const [language, setLanguageState] = useState(initialLanguage);

  // Update document language when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Handle language change
  const setLanguage = (newLanguage) => {
    if (availableLanguages.includes(newLanguage)) {
      setLanguageState(newLanguage);
      // Store in localStorage for persistence
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('preferredLanguage', newLanguage);
      }
    }
  };

  // Load preferred language from localStorage on mount
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && availableLanguages.includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        availableLanguages 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook for accessing language settings
 * @returns {Object} Language context
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}

export default LanguageContext;
