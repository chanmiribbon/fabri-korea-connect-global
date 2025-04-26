
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

export const useLanguageStore = () => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const changeLanguage = (newLanguage: Language) => {
    if (!["KR", "EN", "CN", "JP"].includes(newLanguage)) {
      console.error(`Invalid language code: ${newLanguage}, defaulting to KR`);
      newLanguage = "KR";
    }
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = newLanguage.toLowerCase();
  };

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (storedLanguage && ["KR", "EN", "CN", "JP"].includes(storedLanguage)) {
      setLanguage(storedLanguage);
      document.documentElement.lang = storedLanguage.toLowerCase();
    } else {
      // If no stored language, use browser detection and save it
      const initialLang = getInitialLanguage();
      localStorage.setItem('preferredLanguage', initialLang);
      document.documentElement.lang = initialLang.toLowerCase();
    }
  }, []);

  return { language, changeLanguage };
};
