import { getAllCountries, CountryData } from './countries';
import { getAllPersonas, PersonaData } from './personas';
import { getAllVisas, VisaEntry } from './programmatic-seo';
import { FAQ_PAGES } from './faq-pages';

/**
 * Reverse relationships used to add contextual links from editorial content
 * back to the destination pages that already identify that content as relevant.
 */
export function getRelatedCountriesForPost(postSlug: string, limit = 2): CountryData[] {
  return getAllCountries()
    .filter((country) => country.relatedBlogSlugs.includes(postSlug))
    .slice(0, limit);
}

export function getRelatedPersonasForPost(postSlug: string, limit = 2): PersonaData[] {
  const postHref = `/blog/${postSlug}`;

  return getAllPersonas()
    .filter((persona) => persona.relevantContent.some((item) => item.href === postHref))
    .slice(0, limit);
}

export function getRelatedPersonasForGuide(guideSlug: string, limit = 3): PersonaData[] {
  const guideHref = `/guides/${guideSlug}`;

  return getAllPersonas()
    .filter((persona) => persona.relevantContent.some((item) => item.href === guideHref))
    .slice(0, limit);
}

export function getRelatedFaqsForPost(postSlug: string, limit = 2) {
  return FAQ_PAGES
    .filter((page) => page.relatedBlogSlugs.includes(postSlug))
    .slice(0, limit);
}

export function getRelatedVisasForCountry(countrySlug: string, limit = 6): VisaEntry[] {
  return getAllVisas()
    .filter((visa) => visa.countrySlugs.includes(countrySlug))
    .slice(0, limit);
}
