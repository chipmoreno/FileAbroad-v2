import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'content/countries/countries-data.json');

export interface CountryData {
  slug: string;
  name: string;
  region: string;
  flag: string;
  taxTreaty: {
    exists: boolean;
    yearSigned: number | null;
    keyProvisions: string[];
  };
  feie: {
    physicalPresenceNotes: string;
    bonaFideNotes: string;
    commonVisaTypes: string[];
  };
  localTax: {
    system: 'territorial' | 'worldwide' | 'remittance' | 'none';
    rates: string;
    totalizationAgreement: boolean;
  };
  banking: {
    majorBanks: string[];
    fbarNotes: string;
    fatcaCompliance: string;
    currencyCode: string;
  };
  pitfalls: string[];
  costOfLiving: {
    monthlyEstimate: string;
    comparedToUS: string;
    notes: string;
  };
  faqs: { question: string; answer: string }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  relatedBlogSlugs: string[];
  officialSources?: { label: string; href: string }[];
  longFormSections?: { heading: string; body: string }[];
}

export interface CountryTranslations {
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  faqs?: { question: string; answer: string }[];
  name?: string;
}

let cachedData: CountryData[] | null = null;
const translationCache: Map<string, Record<string, CountryTranslations>> = new Map();

function loadCountries(): CountryData[] {
  if (cachedData) return cachedData;

  if (!fs.existsSync(DATA_PATH)) {
    return [];
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  cachedData = JSON.parse(raw) as CountryData[];
  return cachedData;
}

function loadTranslations(locale: string): Record<string, CountryTranslations> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  const translationPath = path.join(
    process.cwd(),
    `content/countries/countries-translations.${locale}.json`
  );

  if (!fs.existsSync(translationPath)) {
    translationCache.set(locale, {});
    return {};
  }

  const raw = fs.readFileSync(translationPath, 'utf8');
  const data = JSON.parse(raw) as Record<string, CountryTranslations>;
  translationCache.set(locale, data);
  return data;
}

function mergeCountryWithTranslations(
  country: CountryData,
  translations: CountryTranslations | undefined
): CountryData {
  if (!translations) return country;

  return {
    ...country,
    name: translations.name || country.name,
    seo: translations.seo
      ? { ...country.seo, ...translations.seo }
      : country.seo,
    faqs: translations.faqs || country.faqs,
  };
}

export function getAllCountries(locale?: string): CountryData[] {
  const countries = loadCountries();
  if (!locale) return countries;

  const translations = loadTranslations(locale);
  return countries.map((c) => mergeCountryWithTranslations(c, translations[c.slug]));
}

export function getCountryBySlug(slug: string, locale?: string): CountryData | null {
  const country = loadCountries().find((c) => c.slug === slug) || null;
  if (!country || !locale) return country;

  const translations = loadTranslations(locale);
  return mergeCountryWithTranslations(country, translations[slug]);
}

export function countryHasTranslation(slug: string, locale: string): boolean {
  if (!locale || locale === 'en') return true;
  return Boolean(loadTranslations(locale)[slug]);
}

export function getCountriesByRegion(locale?: string): Record<string, CountryData[]> {
  const countries = getAllCountries(locale);
  const grouped: Record<string, CountryData[]> = {};

  for (const country of countries) {
    if (!grouped[country.region]) {
      grouped[country.region] = [];
    }
    grouped[country.region].push(country);
  }

  // Sort regions by count (descending) and countries alphabetically within each
  const sorted: Record<string, CountryData[]> = {};
  const regionOrder = Object.keys(grouped).sort(
    (a, b) => grouped[b].length - grouped[a].length
  );

  for (const region of regionOrder) {
    sorted[region] = grouped[region].sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted;
}

export function getRelatedCountries(slug: string, limit = 4, locale?: string): CountryData[] {
  const country = getCountryBySlug(slug, locale);
  if (!country) return [];

  const all = getAllCountries(locale).filter((c) => c.slug !== slug);

  // Prioritize same region
  const sameRegion = all.filter((c) => c.region === country.region);
  const otherRegion = all.filter((c) => c.region !== country.region);

  return [...sameRegion, ...otherRegion].slice(0, limit);
}

export function getAllCountrySlugs(): string[] {
  return loadCountries().map((c) => c.slug);
}

/**
 * Adds the editorial layer used by country pillar pages. Every paragraph is
 * grounded in the country record so the page explains the actual treaty,
 * residence, banking, currency, and local-tax context instead of rendering a
 * generic destination template.
 */
export function getCountryLongFormSections(country: CountryData): { heading: string; body: string }[] {
  const related = country.relatedBlogSlugs.slice(0, 3).join(', ') || 'the country-specific articles in the blog';
  const pitfalls = country.pitfalls.slice(0, 3).join(' ');
  const visas = country.feie.commonVisaTypes.join(', ') || 'the residence route shown in your local records';
  const sources = country.officialSources?.map((source) => source.label).join(', ') || 'the current IRS, Treasury, and local authority sources';

  return [
    {
      heading: `Residence and the U.S. filing starting point in ${country.name}`,
      body: `A U.S. citizen or green-card holder generally continues to analyze U.S. worldwide-income filing while living in ${country.name}. Local residence is a separate question. Start a year-by-year timeline that identifies arrival, visa or residence status, days present, homes available, work performed, family location, local registration, and departure or renewal dates. ${country.feie.physicalPresenceNotes} ${country.feie.bonaFideNotes} Do not treat a visa label or a local tax number as a substitute for the U.S. return analysis.`,
    },
    {
      heading: `FEIE and earned income for Americans in ${country.name}`,
      body: `The Foreign Earned Income Exclusion applies only to qualifying earned income and requires the relevant tax-home and presence or residence test. Salary, self-employment receipts, and services performed abroad need a work-location record. Pensions, Social Security, dividends, interest, rent, and capital gains need separate treatment. Track every trip to the United States, including partial days where the current rules count them, and preserve the residence evidence behind a bona fide claim. Compare the FEIE with the Foreign Tax Credit rather than assuming the exclusion is best.`,
    },
    {
      heading: `The ${country.name} local tax system and the U.S. return`,
      body: `${country.name} is described in the country record as having a ${country.localTax.system} tax system, with local-rate context of ${country.localTax.rates}. The local result may depend on residence, source, remittance, employment, business activity, and the tax year. Preserve the local registration, return, assessment, payment receipt, withholding records, and any refund. A local exemption or reduced rate can change the foreign taxes available for a U.S. credit; it does not generally turn off U.S. citizenship-based reporting.`,
    },
    {
      heading: `Treaty and social-security questions for ${country.name}`,
      body: `The country record currently marks the U.S.–${country.name} income-tax treaty as ${country.taxTreaty.exists ? 'present' : 'not present in the source record'}${country.taxTreaty.yearSigned ? `, signed in ${country.taxTreaty.yearSigned}` : ''}. Its listed provisions should be checked against the current treaty text, protocol, saving clause, and residence facts. Social-security coordination is recorded as ${country.localTax.totalizationAgreement ? 'an agreement in force' : 'no agreement in force in this data set'}. Do not use a treaty headline to decide a pension, employment, self-employment, or state result without identifying the exact article and tax year.`,
    },
    {
      heading: `Banks, accounts, and FATCA in ${country.name}`,
      body: `${country.banking.fbarNotes} ${country.banking.fatcaCompliance} Build one account inventory with the legal owner, joint owners, signature authority, institution, account type, currency (${country.banking.currencyCode}), maximum value, year-end value, and closure date. Compare it with the current FBAR and Form 8938 instructions. A foreign bank’s FATCA request is a documentation issue, not automatically an IRS assessment. Keep bank correspondence and secure records separate from the U.S. income calculation.`,
    },
    {
      heading: `Income source and work-location records`,
      body: `For an employee, contractor, or business owner in ${country.name}, record where services were physically performed, which entity paid, where the customer or employer is located, and where the work was managed. A ${country.name} payer does not automatically make every item foreign-source, and a U.S. payer does not automatically make services U.S.-source. Keep contracts, invoices, payroll, travel records, foreign withholding, local filings, and entity books. Separate personal income, business income, distributions, and investment returns before applying a credit or exclusion.`,
    },
    {
      heading: `Pensions, funds, and savings products from ${country.name}`,
      body: `Ask whether a local pension, insurance policy, mutual fund, ETF, savings plan, or employer account is a pension arrangement, trust, foreign corporation, or another product for U.S. purposes. The local label may not answer the U.S. classification. Preserve plan documents, investment menus, annual statements, distributions, beneficiary records, and any annual information statement. If the product contains foreign pooled funds, screen Form 8621 and PFIC questions. If it is a pension, review treaty and Form 8938 questions separately from current income.`,
    },
    {
      heading: `Residence routes and documentation in ${country.name}`,
      body: `Common residence routes in the country record include ${visas}. For each route, preserve the application, approval, renewal, local address, work permission, health coverage, and evidence of actual use. A residence permit may support a bona fide-residence analysis, but the taxpayer’s conduct and full-year facts still matter. If the taxpayer is a digital nomad, retiree, student, contractor, or family member, connect the visa record to the actual income and household timeline rather than relying on a visa marketing description.`,
    },
    {
      heading: `Common ${country.name} pitfalls to test before filing`,
      body: `${pitfalls} These are screening prompts, not conclusions. For each one, identify the year, owner, transaction, document, and form affected. Add gifts, inheritances, foreign entities, local funds, rental property, state ties, and IRS or bank notices to the same inventory. The country-specific articles linked from this record include ${related}; use them to frame questions, then check the current primary sources.`,
    },
    {
      heading: `A records-first annual workflow for ${country.name}`,
      body: `Collect identity, residence, travel, income, account, pension, entity, local-tax, state, prior-return, and notice records. Classify each item, calculate the federal return, reconcile the foreign tax credit or FEIE, review FBAR and Form 8938 overlap, and compare the U.S. return with the local return. Save the final return, acceptance records, payment evidence, conversion rates, and unresolved issues for next year. Current official source material to check includes ${sources}. A paid consultation can turn the map into a written preparation scope before work begins.`,
    },
  ];
}
