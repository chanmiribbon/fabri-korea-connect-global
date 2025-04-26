
import { useState, useEffect } from 'react';

export type Language = "KR" | "EN" | "CN" | "JP";

const getInitialLanguage = (): Language => {
  // Check localStorage first
  const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
  if (storedLanguage) {
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
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  return { language, changeLanguage };
};
