'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { Locale, defaultLocale, isValidLocale } from '@/lib/i18n/config';
import { SiteDictionary } from '@/lib/i18n/types';

interface LocaleContextValue {
  locale: Locale;
  dictionary: SiteDictionary;
  localizeHref: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: SiteDictionary;
  children: React.ReactNode;
}) {
  const safeLocale = isValidLocale(locale) ? locale : defaultLocale;

  const localizeHref = useCallback(
    (path: string) => {
      if (safeLocale === defaultLocale || !path.startsWith('/')) return path;
      if (path === '/') return `/${safeLocale}`;
      if (path.startsWith(`/${safeLocale}/`)) return path;
      return `/${safeLocale}${path}`;
    },
    [safeLocale]
  );

  return (
    <LocaleContext.Provider value={{ locale: safeLocale, dictionary, localizeHref }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export function useDictionary(): SiteDictionary {
  return useLocale().dictionary;
}
