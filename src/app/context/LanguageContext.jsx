import React, { createContext, useContext, useState } from 'react';
import { LANGUAGES, getT } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('EN');

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: getT(lang),
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
