import { Metadata } from 'next';
import { Locale, defaultLocale, locales } from './config';
import { getDictionary, getCanonicalUrl, generateHreflang } from './utils';
import { SiteDictionary } from './types';

export interface LocalizedMetadataInput {
  pageKey: keyof SiteDictionary;
  path: string;
  locale: Locale;
  overrides?: Partial<Metadata>;
}

function stripBrandSuffix(value: string): string {
  return value.replace(/(?:\s*\|\s*FileAbroad)+\s*$/i, '').trim();
}

export function generateLocalizedMetadata({
  pageKey,
  path,
  locale,
  overrides,
}: LocalizedMetadataInput): Metadata {
  const dict = getDictionary(locale);
  const page = dict[pageKey] as unknown as {
    pageTitle?: string;
    pageDescription?: string;
    title?: string;
    description?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    heroTitle?: string;
    heroTitleEmphasis?: string;
    heroDescription?: string;
  } | undefined;

  if (!page) {
    return {
      title: dict.common.notFound,
      description: dict.common.notFoundDescription,
      ...overrides,
    };
  }

  // Static dictionaries use pageTitle/pageDescription. Keep title/description
  // as a compatibility fallback for older or content-driven dictionary entries.
  const homeTitle = pageKey === 'home'
    ? `${page.heroTitle ?? ''}${page.heroTitleEmphasis ?? ''}`.trim()
    : undefined;
  const title = stripBrandSuffix(page.pageTitle ?? page.title ?? homeTitle ?? dict.common.notFound);
  const description = page.pageDescription ?? page.description ?? page.heroDescription ?? dict.common.notFoundDescription;
  const openGraphTitle = stripBrandSuffix(page.ogTitle ?? title);
  const openGraphDescription = page.ogDescription ?? description;

  const canonical = locale === defaultLocale
    ? getCanonicalUrl(path, defaultLocale)
    : getCanonicalUrl(path, locale);

  const hreflangUrls = generateHreflang(path);
  const languages: Record<string, string> = {};
  for (const [lang, url] of Object.entries(hreflangUrls)) {
    languages[lang] = url;
  }

  const normalizedOverrides = { ...overrides };
  if (typeof normalizedOverrides.title === 'string') {
    normalizedOverrides.title = stripBrandSuffix(normalizedOverrides.title);
  }

  return {
    title,
    description,
    keywords: page.keywords ?? [],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: canonical,
      locale: dict.locale === 'en' ? 'en_US' : dict.locale === 'es' ? 'es_ES' : dict.locale === 'pt' ? 'pt_PT' : dict.locale === 'fr' ? 'fr_FR' : dict.locale === 'de' ? 'de_DE' : dict.locale === 'it' ? 'it_IT' : dict.locale === 'nl' ? 'nl_NL' : dict.locale === 'ja' ? 'ja_JP' : 'zh_CN',
      siteName: 'FileAbroad',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@FileAbroad',
      creator: '@FileAbroad',
      title: openGraphTitle,
      description: openGraphDescription,
    },
    ...normalizedOverrides,
  };
}

export function generateLangParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export function extractLocale(params: { lang?: string }): Locale {
  if (params.lang && locales.includes(params.lang as Locale)) {
    return params.lang as Locale;
  }
  return defaultLocale;
}
