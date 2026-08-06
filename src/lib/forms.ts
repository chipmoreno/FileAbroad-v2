import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readingTimeText } from './reading-time';
import { Locale, defaultLocale, locales } from './i18n/config';

const FORMS_DIR = path.join(process.cwd(), 'content/forms');
let formSlugCache: string[] | null = null;
const formsCache = new Map<Locale, FormPageMeta[]>();
const formCache = new Map<string, FormPage | null>();

function getFormFilePath(slug: string, locale: Locale = defaultLocale): string {
  if (locale !== defaultLocale) {
    const localizedPath = path.join(FORMS_DIR, `${slug}.${locale}.mdx`);
    if (fs.existsSync(localizedPath)) return localizedPath;
  }
  return path.join(FORMS_DIR, `${slug}.mdx`);
}

function getBaseFormSlugs(): string[] {
  if (formSlugCache) return formSlugCache;
  if (!fs.existsSync(FORMS_DIR)) return [];
  formSlugCache = fs.readdirSync(FORMS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.match(/^(.+?)\.(?:es|pt|fr|de|it|nl|ja|zh)\.mdx$/)?.[1] ?? file.replace(/\.mdx$/, ''))
    .filter((slug, index, slugs) => slugs.indexOf(slug) === index)
    .filter((slug) => fs.existsSync(path.join(FORMS_DIR, `${slug}.mdx`)));
  return formSlugCache;
}

export interface FormPage {
  slug: string;
  title: string;
  description: string;
  formNumber: string;
  formName: string;
  lastUpdated: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: string;
  faqs: { question: string; answer: string }[];
  relatedBlogSlugs: string[];
  relatedGuideSlugs: string[];
  relatedServiceSlugs: string[];
}

export interface FormPageMeta {
  slug: string;
  title: string;
  description: string;
  formNumber: string;
  formName: string;
  lastUpdated: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
}

export function getAllForms(locale: Locale = defaultLocale): FormPageMeta[] {
  const cached = formsCache.get(locale);
  if (cached) return cached;

  const forms = getBaseFormSlugs()
    .map((slug) => {
      const filePath = getFormFilePath(slug, locale);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        formNumber: data.formNumber || '',
        formName: data.formName || '',
        lastUpdated: data.lastUpdated || '',
        author: data.author || 'Chip Moreno',
        category: data.category || 'Tax Forms',
        tags: data.tags || [],
        readingTime: readingTimeText(content),
      };
    })
    .sort((a, b) => a.formNumber.localeCompare(b.formNumber));
  formsCache.set(locale, forms);
  return forms;
}

export function getFormBySlug(slug: string, locale: Locale = defaultLocale): FormPage | null {
  const cacheKey = `${locale}:${slug}`;
  if (formCache.has(cacheKey)) return formCache.get(cacheKey)!;

  const filePath = getFormFilePath(slug, locale);
  if (!fs.existsSync(filePath)) {
    formCache.set(cacheKey, null);
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const form = {
    slug,
    title: data.title || '',
    description: data.description || '',
    formNumber: data.formNumber || '',
    formName: data.formName || '',
    lastUpdated: data.lastUpdated || '',
    author: data.author || 'Chip Moreno',
    category: data.category || 'Tax Forms',
    tags: data.tags || [],
    readingTime: readingTimeText(content),
    content,
    faqs: data.faqs || [],
    relatedBlogSlugs: data.relatedBlogSlugs || [],
    relatedGuideSlugs: data.relatedGuideSlugs || [],
    relatedServiceSlugs: data.relatedServiceSlugs || [],
  };
  formCache.set(cacheKey, form);
  return form;
}

export function getFormByNumber(formNumber: string): FormPage | null {
  return getAllFormSlugs()
    .map((slug) => getFormBySlug(slug))
    .find((form) => form?.formNumber === formNumber) || null;
}

export function getAllFormSlugs(): string[] {
  return getBaseFormSlugs();
}

export function getAllFormRouteParams(): { slug: string }[] {
  return getAllFormSlugs().map((slug) => ({ slug }));
}

export function formHasTranslation(slug: string, locale: Locale): boolean {
  return locale !== defaultLocale && fs.existsSync(path.join(FORMS_DIR, `${slug}.${locale}.mdx`));
}

export function getFormAvailableLocales(slug: string): Locale[] {
  return locales.filter((locale) => locale === defaultLocale || formHasTranslation(slug, locale));
}
