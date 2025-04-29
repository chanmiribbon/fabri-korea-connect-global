
import { useState, useEffect } from 'react';

export type Language = "KR" | "EN" | "CN" | "JP";

const getInitialLanguage = (): Language => {
  // Check localStorage first
  const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
  if (storedLanguage && ["KR", "EN", "CN", "JP"].includes(storedLanguage)) {
    return storedLanguage;
  }

  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ko')) return 'KR';
  if (browserLang.startsWith('zh')) return 'CN';
  if (browserLang.startsWith('ja')) return 'JP';
  if (browserLang.startsWith('en')) return 'EN';

  // Default to Korean
  return 'KR';
};

// Create a singleton instance to ensure the same state is shared across components
let globalLanguage: Language = getInitialLanguage();
const listeners: Set<(lang: Language) => void> = new Set();

export const useLanguageStore = () => {
  const [language, setLanguage] = useState<Language>(globalLanguage);

  // Subscribe to language changes
  useEffect(() => {
    const updateLanguage = (newLang: Language) => {
      setLanguage(newLang);
    };
    
    listeners.add(updateLanguage);
    
    // Initial sync with global state
    if (language !== globalLanguage) {
      setLanguage(globalLanguage);
    }
    
    return () => {
      listeners.delete(updateLanguage);
    };
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    if (!["KR", "EN", "CN", "JP"].includes(newLanguage)) {
      console.error(`Invalid language code: ${newLanguage}, defaulting to KR`);
      newLanguage = "KR";
    }
    
    // Update global variable
    globalLanguage = newLanguage;
    
    // Update localStorage
    localStorage.setItem('preferredLanguage', newLanguage);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = newLanguage.toLowerCase();
    
    // Notify all subscribers
    listeners.forEach(listener => listener(newLanguage));
  };

  // Initialize language from localStorage on first mount only
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (storedLanguage && ["KR", "EN", "CN", "JP"].includes(storedLanguage)) {
      // Only update if different from current global state
      if (storedLanguage !== globalLanguage) {
        globalLanguage = storedLanguage;
        setLanguage(storedLanguage);
      }
      document.documentElement.lang = storedLanguage.toLowerCase();
    }
  }, []);

  return { language, changeLanguage };
};
