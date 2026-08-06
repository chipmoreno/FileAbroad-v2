import { MetadataRoute } from 'next';
import { getAllPosts, postHasTranslation } from '@/lib/blog';
import { getAllTagSlugs, getPostsByTag, isPillarTopic } from '@/lib/tags';
import { countryHasTranslation, getAllCountries } from '@/lib/countries';
import { getAllGuides, guideHasTranslation } from '@/lib/guides';
import { getAllForms, formHasTranslation } from '@/lib/forms';
import { getAllPersonas } from '@/lib/personas';
import { getAllStates } from '@/lib/state-taxes';
import { getAllFormCountryCombinations, getAllVisas } from '@/lib/programmatic-seo';
import { getMatrixFormCountryParams, getPersonaCountryParams, getStateServiceParams } from '@/lib/programmatic-matrix';
import { getAllComparisonSlugs } from '@/lib/compare-data';
import { getAllFAQPageSlugs } from '@/lib/faq-pages';
import { locales, defaultLocale } from '@/lib/i18n/config';
import localeAvailability from '../../content/locale-availability.json';

// Keep the 2,210-entry sitemap indexable without forcing every entry through
// the static page-generation timeout during a constrained deployment build.
export const dynamic = 'force-dynamic';

const baseUrl = 'https://fileabroad.com';
const executionDate = new Date('2026-08-05');

const localizedPathSet = new Set(localeAvailability.localizedStaticPaths);

function localizeUrl(path: string, locale: string): string {
  if (locale === defaultLocale) return `${baseUrl}${path}`;
  return `${baseUrl}/${locale}${path}`;
}

function getStaticEntries(): MetadataRoute.Sitemap {
  const localizedPathEntries = [
    { path: '/', changeFrequency: 'monthly' as const, priority: 1 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/services/fbar-filing', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/fatca-compliance', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/streamlined-filing', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/expat-tax-filing', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/consultation', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/consultation/pfic', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/consultation/streamlined', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/consultation/business-abroad', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/how-it-works', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/guides', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/forms', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/countries', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/personas', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/state-taxes', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/tools', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/intake', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/editorial-policy', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const englishOnlyStaticPaths = [
    { path: '/compare', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/visas', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/countries/form-matrix', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/personas/country-matrix', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/state-taxes/service-matrix', changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { path, changeFrequency, priority } of localizedPathEntries) {
    for (const locale of locales) {
      if (locale !== defaultLocale && !localizedPathSet.has(path)) continue;
      entries.push({
        url: localizeUrl(path, locale),
        lastModified: executionDate,
        changeFrequency,
        priority,
      });
    }
  }

  for (const { path, changeFrequency, priority } of englishOnlyStaticPaths) {
    entries.push({
      url: localizeUrl(path, defaultLocale),
      lastModified: executionDate,
      changeFrequency,
      priority,
    });
  }

  return entries;
}

function getBlogEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const posts = getAllPosts(defaultLocale);
  for (const locale of locales) {
    for (const post of posts) {
      if (locale !== defaultLocale && !postHasTranslation(post.slug, locale)) continue;
      entries.push({
        url: localizeUrl(`/blog/${post.slug}`, locale),
        lastModified: new Date(post.dateModified || post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }
  return entries;
}

function getBlogPaginationEntries(): MetadataRoute.Sitemap {
  const PAGE_SIZE = 9;
  const entries: MetadataRoute.Sitemap = [];
  const posts = getAllPosts(defaultLocale);
  for (const locale of locales) {
    const localePosts = locale === defaultLocale
      ? posts
      : posts.filter((post) => postHasTranslation(post.slug, locale));
    const totalPages = Math.ceil(localePosts.length / PAGE_SIZE);
    for (let page = 2; page <= totalPages; page++) {
      entries.push({
        url: localizeUrl(`/blog/page/${page}`, locale),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      });
    }
  }
  return entries;
}

function getTagEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const tags = getAllTagSlugs()
    .filter(({ tag }) => isPillarTopic(tag) && getPostsByTag(tag).length >= 2);
  for (const { slug } of tags) {
    entries.push({
      url: localizeUrl(`/topics/${slug}`, defaultLocale),
      lastModified: executionDate,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    });
  }
  return entries;
}

function getCountryEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const countries = getAllCountries(defaultLocale);
  for (const locale of locales) {
    for (const country of countries) {
      if (locale !== defaultLocale && !countryHasTranslation(country.slug, locale)) continue;
      entries.push({
        url: localizeUrl(`/countries/${country.slug}`, locale),
        lastModified: executionDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    }
  }
  return entries;
}

function getGuideEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const guides = getAllGuides(defaultLocale);
  for (const locale of locales) {
    for (const guide of guides) {
      if (locale !== defaultLocale && !guideHasTranslation(guide.slug, locale)) continue;
      entries.push({
        url: localizeUrl(`/guides/${guide.slug}`, locale),
        lastModified: guide.lastUpdated ? new Date(guide.lastUpdated) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    }
  }
  return entries;
}

function getToolEntries(): MetadataRoute.Sitemap {
  const tools = [
    'feie-calculator',
    'fbar-checker',
    'catch-up-program',
    'expat-tax-deadline-calendar',
    'tax-savings-estimator',
    'state-tax-residency-analyzer',
    'quarterly-tax-calculator',
  ];
  const localizedTools = new Set(localeAvailability.localizedToolSlugs);
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const slug of tools) {
      if (locale !== defaultLocale && !localizedTools.has(slug)) continue;
      entries.push({
        url: localizeUrl(`/tools/${slug}`, locale),
        lastModified: executionDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  return entries;
}

function getResourceEntries(): MetadataRoute.Sitemap {
  const localizedResources = ['expat-tax-checklist'];
  const englishOnlyResources = ['fbar-flowchart', 'streamlined-checklist'];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const slug of localizedResources) {
      if (locale !== defaultLocale && !localeAvailability.localizedResourceSlugs.includes(slug)) continue;
      entries.push({
        url: localizeUrl(`/resources/${slug}`, locale),
        lastModified: executionDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }
  }

  for (const slug of englishOnlyResources) {
    entries.push({
      url: localizeUrl(`/resources/${slug}`, defaultLocale),
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    });
  }

  return entries;
}

function getFormEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const forms = getAllForms();
  for (const form of forms) {
    for (const locale of locales) {
      if (locale !== defaultLocale && (!localeAvailability.localizedFormSlugs.includes(form.slug) || !formHasTranslation(form.slug, locale))) continue;
      entries.push({
        url: localizeUrl(`/forms/${form.slug}`, locale),
        lastModified: form.lastUpdated ? new Date(form.lastUpdated) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    }
  }
  return entries;
}

function getPersonaEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const personas = getAllPersonas();
  for (const persona of personas) {
    entries.push({
      url: localizeUrl(`/personas/${persona.slug}`, defaultLocale),
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    });
  }
  return entries;
}

function getStateEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const states = getAllStates();
  for (const state of states) {
    entries.push({
      url: localizeUrl(`/state-taxes/${state.slug}`, defaultLocale),
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    });
  }
  return entries;
}

function getFormCountryEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const combinations = getAllFormCountryCombinations();
  for (const combo of combinations) {
    entries.push({
      url: localizeUrl(`/forms/${combo.formSlug}/${combo.countrySlug}`, defaultLocale),
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    });
  }
  return entries;
}

function getMatrixEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const { country, form } of getMatrixFormCountryParams()) {
    entries.push({
      url: `${baseUrl}/countries/${country}/${form}`,
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    });
  }
  for (const { slug, country } of getPersonaCountryParams()) {
    entries.push({
      url: `${baseUrl}/personas/${slug}/countries/${country}`,
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    });
  }
  for (const { state, service } of getStateServiceParams()) {
    entries.push({
      url: `${baseUrl}/state-taxes/${state}/services/${service}`,
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    });
  }
  return entries;
}

function getVisaEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const visas = getAllVisas();
  for (const visa of visas) {
    entries.push({
      url: localizeUrl(`/visas/${visa.slug}`, defaultLocale),
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    });
  }
  return entries;
}

function getCompareEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const slugs = getAllComparisonSlugs();
  for (const slug of slugs) {
    entries.push({
      url: localizeUrl(`/compare/${slug}`, defaultLocale),
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    });
  }
  return entries;
}

function getFAQPageEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const slugs = getAllFAQPageSlugs();
  for (const slug of slugs) {
    entries.push({
      url: localizeUrl(`/faq/${slug}`, defaultLocale),
      lastModified: executionDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    });
  }
  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    ...getStaticEntries(),
    ...getBlogEntries(),
    ...getBlogPaginationEntries(),
    ...getGuideEntries(),
    ...getFormEntries(),
    ...getPersonaEntries(),
    ...getStateEntries(),
    ...getToolEntries(),
    ...getResourceEntries(),
    ...getTagEntries(),
    ...getCountryEntries(),
    ...getFormCountryEntries(),
    ...getMatrixEntries(),
    ...getVisaEntries(),
    ...getCompareEntries(),
    ...getFAQPageEntries(),
  ];

  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
