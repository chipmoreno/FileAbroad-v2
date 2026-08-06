import { Locale, defaultLocale, locales, isValidLocale, siteConfig } from './config';
import { SiteDictionary, PageMeta } from './types';
import en from './dictionaries/en';
import es from './dictionaries/es';
import pt from './dictionaries/pt';
import fr from './dictionaries/fr';
import de from './dictionaries/de';
import it from './dictionaries/it';
import nl from './dictionaries/nl';
import ja from './dictionaries/ja';
import zh from './dictionaries/zh';

const dictionaries: Record<Locale, SiteDictionary> = {
  en,
  es,
  pt,
  fr,
  de,
  it,
  nl,
  ja,
  zh,
};

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function getAllLocales(): Locale[] {
  return locales;
}

export function getDefaultLocale(): Locale {
  return defaultLocale;
}

export { isValidLocale, siteConfig };
export type { Locale, SiteDictionary, PageMeta };

// URL helpers
export function localizePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  // Prevent double-prefixing
  if (path.startsWith(`/${locale}/`)) return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

export function delocalizePath(path: string): { locale: Locale | null; path: string } {
  const segments = path.split('/').filter(Boolean);
  const first = segments[0];
  if (first && isValidLocale(first)) {
    return {
      locale: first,
      path: '/' + segments.slice(1).join('/'),
    };
  }
  return { locale: null, path };
}

export function getCanonicalUrl(path: string, locale: Locale): string {
  const localized = localizePath(path, locale);
  return `${siteConfig.baseUrl}${localized}`;
}

export function generateHreflang(path: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const locale of locales) {
    const localized = localizePath(path, locale);
    const lang = locale === 'en' ? 'en-us' : locale;
    result[lang] = `${siteConfig.baseUrl}${localized}`;
  }
  // x-default points to English (root) for unmapped traffic
  result['x-default'] = `${siteConfig.baseUrl}${path}`;
  return result;
}

// Date formatting
export function formatLocalizedDate(
  dateString: string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateString);
  const lang = locale === 'zh' ? 'zh-Hans' : locale;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  return date.toLocaleDateString(lang, options ?? defaultOptions);
}

// Currency formatting
export function formatLocalizedCurrency(
  amount: number,
  locale: Locale
): string {
  const lang = locale === 'zh' ? 'zh-Hans' : locale;
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Number formatting
export function formatLocalizedNumber(
  num: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  const lang = locale === 'zh' ? 'zh-Hans' : locale;
  return new Intl.NumberFormat(lang, options).format(num);
}

// Metadata factory for static pages
export function createPageMeta(
  pageKey: keyof SiteDictionary,
  locale: Locale,
  overrides?: Partial<PageMeta>
): PageMeta {
  const dict = getDictionary(locale);
  const page = dict[pageKey] as unknown as PageMeta | undefined;
  if (!page) {
    return {
      title: dict.common.notFound,
      description: dict.common.notFoundDescription,
      keywords: [],
      ...overrides,
    };
  }
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords ?? [],
    ogTitle: page.ogTitle ?? page.title,
    ogDescription: page.ogDescription ?? page.description,
    ...overrides,
  };
}
