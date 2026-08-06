import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readingTimeText } from './reading-time';
import { cleanHeadingText, slugifyHeading } from '@/lib/headings';
import { Locale, defaultLocale } from './i18n/config';

const GUIDES_DIR = path.join(process.cwd(), 'content/guides');
let guideFileCache: string[] | null = null;
const guidesCache = new Map<Locale, GuideMeta[]>();
const guideCache = new Map<string, Guide | null>();

// Add a slug here only while a high-stakes guide is awaiting a full factual review.
export const GUIDE_REVIEW_SLUGS = new Set<string>([
  // Released 2026-07-31: pfic-guide, foreign-trusts-guide, cfc-guide, exit-tax-guide, foreign-pensions-guide
]);

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  faqs: { question: string; answer: string }[];
  relatedBlogSlugs: string[];
  relatedServiceSlugs: string[];
  reviewRequired: boolean;
}

export interface Guide extends GuideMeta {
  content: string;
}

function getGuideFilePath(slug: string, locale: Locale = defaultLocale): string {
  if (locale !== defaultLocale) {
    const localizedPath = path.join(GUIDES_DIR, `${slug}.${locale}.mdx`);
    if (fs.existsSync(localizedPath)) {
      return localizedPath;
    }
  }
  return path.join(GUIDES_DIR, `${slug}.mdx`);
}

function listGuideFiles(): string[] {
  if (guideFileCache) return guideFileCache;
  if (!fs.existsSync(GUIDES_DIR)) {
    return [];
  }
  guideFileCache = fs.readdirSync(GUIDES_DIR).filter((file) => file.endsWith('.mdx'));
  return guideFileCache;
}

export function getAllGuides(locale: Locale = defaultLocale): GuideMeta[] {
  const cached = guidesCache.get(locale);
  if (cached) return cached;

  const files = listGuideFiles();

  // Build map of base slug -> available locales
  const slugMap = new Map<string, Set<Locale>>();
  for (const file of files) {
    const match = file.match(/^(.+?)(?:\.(en|es|pt|fr|de|it|nl|ja|zh))?\.mdx$/);
    if (!match) continue;
    const slug = match[1];
    const fileLocale = (match[2] as Locale) || defaultLocale;
    if (!slugMap.has(slug)) slugMap.set(slug, new Set());
    slugMap.get(slug)!.add(fileLocale);
  }

  const guides: GuideMeta[] = [];
  for (const [slug, locales] of slugMap) {
    const targetLocale = locales.has(locale) ? locale : defaultLocale;
    const filePath = getGuideFilePath(slug, targetLocale);
    if (!fs.existsSync(filePath)) continue;

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    guides.push({
      slug,
      title: data.title || '',
      description: data.description || '',
      lastUpdated: data.lastUpdated || data.date || '',
      author: data.author || 'Chip Moreno',
      category: data.category || 'Guides',
      tags: data.tags || [],
      readingTime: readingTimeText(content),
      faqs: data.faqs || [],
      relatedBlogSlugs: data.relatedBlogSlugs || [],
      relatedServiceSlugs: data.relatedServiceSlugs || [],
      reviewRequired: GUIDE_REVIEW_SLUGS.has(slug),
    });
  }

  const result = guides
    .filter((guide) => !guide.reviewRequired)
    .sort((a, b) => a.title.localeCompare(b.title));
  guidesCache.set(locale, result);
  return result;
}

export function getGuideBySlug(slug: string, locale: Locale = defaultLocale): Guide | null {
  const cacheKey = `${locale}:${slug}`;
  if (guideCache.has(cacheKey)) return guideCache.get(cacheKey)!;

  const filePath = getGuideFilePath(slug, locale);

  if (!fs.existsSync(filePath)) {
    guideCache.set(cacheKey, null);
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const guide = {
    slug,
    title: data.title || '',
    description: data.description || '',
    lastUpdated: data.lastUpdated || data.date || '',
    author: data.author || 'Chip Moreno',
    category: data.category || 'Guides',
    tags: data.tags || [],
    readingTime: readingTimeText(content),
    content,
    faqs: data.faqs || [],
    relatedBlogSlugs: data.relatedBlogSlugs || [],
    relatedServiceSlugs: data.relatedServiceSlugs || [],
    reviewRequired: GUIDE_REVIEW_SLUGS.has(slug),
  };
  guideCache.set(cacheKey, guide);
  return guide;
}

export function getAllGuideSlugs(): string[] {
  const files = listGuideFiles();
  const slugs = new Set<string>();
  for (const file of files) {
    const match = file.match(/^(.+?)(?:\.(en|es|pt|fr|de|it|nl|ja|zh))?\.mdx$/);
    if (match) slugs.add(match[1]);
  }
  return Array.from(slugs);
}

export function guideHasTranslation(slug: string, locale: Locale): boolean {
  const localizedPath = path.join(GUIDES_DIR, `${slug}.${locale}.mdx`);
  return fs.existsSync(localizedPath);
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function extractTableOfContents(content: string): TOCItem[] {
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  const idCounts = new Map<string, number>();

  for (const match of content.matchAll(headingPattern)) {
    const level = match[1].length;
    const text = cleanHeadingText(match[2]);
    const baseId = slugifyHeading(text);
    const occurrence = (idCounts.get(baseId) ?? 0) + 1;
    idCounts.set(baseId, occurrence);
    const id = occurrence === 1 ? baseId : `${baseId}-${occurrence}`;

    toc.push({ id, text, level });
  }

  return toc;
}
