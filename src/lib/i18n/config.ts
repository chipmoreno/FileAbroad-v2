export type Locale = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it' | 'nl' | 'ja' | 'zh';

export interface LanguageConfig {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  ogLocale: string;
  htmlLang: string;
  dateFormat: string;
  dateLocale: string;
  currency: string;
  currencyLocale: string;
  searchConsoleLang: string;
}

export const languages: Record<Locale, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    ogLocale: 'en_US',
    htmlLang: 'en',
    dateFormat: 'MMMM d, yyyy',
    dateLocale: 'en-US',
    currency: 'USD',
    currencyLocale: 'en-US',
    searchConsoleLang: 'en',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
    ogLocale: 'es_ES',
    htmlLang: 'es',
    dateFormat: 'd de MMMM de yyyy',
    dateLocale: 'es-ES',
    currency: 'USD',
    currencyLocale: 'es-ES',
    searchConsoleLang: 'es',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    dir: 'ltr',
    ogLocale: 'pt_PT',
    htmlLang: 'pt',
    dateFormat: 'd de MMMM de yyyy',
    dateLocale: 'pt-PT',
    currency: 'USD',
    currencyLocale: 'pt-PT',
    searchConsoleLang: 'pt',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    ogLocale: 'fr_FR',
    htmlLang: 'fr',
    dateFormat: 'd MMMM yyyy',
    dateLocale: 'fr-FR',
    currency: 'USD',
    currencyLocale: 'fr-FR',
    searchConsoleLang: 'fr',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr',
    ogLocale: 'de_DE',
    htmlLang: 'de',
    dateFormat: 'd. MMMM yyyy',
    dateLocale: 'de-DE',
    currency: 'USD',
    currencyLocale: 'de-DE',
    searchConsoleLang: 'de',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    dir: 'ltr',
    ogLocale: 'it_IT',
    htmlLang: 'it',
    dateFormat: 'd MMMM yyyy',
    dateLocale: 'it-IT',
    currency: 'USD',
    currencyLocale: 'it-IT',
    searchConsoleLang: 'it',
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    dir: 'ltr',
    ogLocale: 'nl_NL',
    htmlLang: 'nl',
    dateFormat: 'd MMMM yyyy',
    dateLocale: 'nl-NL',
    currency: 'USD',
    currencyLocale: 'nl-NL',
    searchConsoleLang: 'nl',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    dir: 'ltr',
    ogLocale: 'ja_JP',
    htmlLang: 'ja',
    dateFormat: 'yyyy年M月d日',
    dateLocale: 'ja-JP',
    currency: 'USD',
    currencyLocale: 'ja-JP',
    searchConsoleLang: 'ja',
  },
  zh: {
    code: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
    dir: 'ltr',
    ogLocale: 'zh_CN',
    htmlLang: 'zh-Hans',
    dateFormat: 'yyyy年M月d日',
    dateLocale: 'zh-CN',
    currency: 'USD',
    currencyLocale: 'zh-CN',
    searchConsoleLang: 'zh-Hans',
  },
};

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'es', 'pt', 'fr', 'de', 'it', 'nl', 'ja', 'zh'];
export const nonDefaultLocales: Locale[] = locales.filter((l) => l !== defaultLocale);

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLanguageConfig(locale: Locale): LanguageConfig {
  return languages[locale];
}

export const siteConfig = {
  name: 'FileAbroad',
  domain: 'fileabroad.com',
  baseUrl: 'https://fileabroad.com',
  author: 'Chip Moreno',
  twitterHandle: '@FileAbroad',
};
