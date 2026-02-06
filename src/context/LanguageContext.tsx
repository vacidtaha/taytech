"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import tr from "@/locales/tr.json";
import en from "@/locales/en.json";

type Locale = "TR" | "EN";
type Translations = Record<string, string>;

const translations: Record<Locale, Translations> = { TR: tr, EN: en };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "TR",
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("TR");

  const t = useCallback(
    (key: string): string => {
      return translations[locale]?.[key] || translations["TR"]?.[key] || key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

