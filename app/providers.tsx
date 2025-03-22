"use client";

import { clientEnv } from "@/env/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { getTranslation } from './translations';

if (typeof window !== 'undefined') {
  posthog.init(clientEnv.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: clientEnv.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always',
  })
}

// Language context type definitions
type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Create the language context
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  toggleLanguage: () => {},
  t: (key: string) => key,
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [direction, setDirection] = useState<Direction>('ltr');

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    setDirection(newLanguage === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('preferredLanguage', newLanguage);
    // Apply direction to document element
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  // Translation function
  const t = (key: string) => {
    return getTranslation(language, key);
  };

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setDirection(savedLanguage === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </NextThemesProvider>
    </PostHogProvider>
  )
}