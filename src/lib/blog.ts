import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readingTimeText } from './reading-time';
import { Locale, defaultLocale } from './i18n/config';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
let fileCache: string[] | null = null;
const postsCache = new Map<Locale, BlogPostMeta[]>();
const postCache = new Map<string, BlogPost | null>();

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: string;
  faqs?: FAQItem[];
  reviewRequired: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
}

function getFilePath(slug: string, locale: Locale = defaultLocale): string {
  if (locale !== defaultLocale) {
    const localizedPath = path.join(BLOG_DIR, `${slug}.${locale}.mdx`);
    if (fs.existsSync(localizedPath)) {
      return localizedPath;
    }
  }
  return path.join(BLOG_DIR, `${slug}.mdx`);
}

function listMdxFiles(): string[] {
  if (fileCache) return fileCache;
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  fileCache = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));
  return fileCache;
}

export function getAllPosts(locale: Locale = defaultLocale): BlogPostMeta[] {
  const cached = postsCache.get(locale);
  if (cached) return cached;

  const files = listMdxFiles();

  // Build a map of base slug -> available locales
  const slugMap = new Map<string, Set<Locale>>();
  for (const file of files) {
    const match = file.match(/^(.+?)(?:\.(en|es|pt|fr|de|it|nl|ja|zh))?\.mdx$/);
    if (!match) continue;
    const slug = match[1];
    const fileLocale = (match[2] as Locale) || defaultLocale;
    if (!slugMap.has(slug)) slugMap.set(slug, new Set());
    slugMap.get(slug)!.add(fileLocale);
  }

  const posts: BlogPostMeta[] = [];
  for (const [slug, locales] of slugMap) {
    // Use localized file if available, otherwise fallback to default
    const targetLocale = locales.has(locale) ? locale : defaultLocale;
    const filePath = getFilePath(slug, targetLocale);
    if (!fs.existsSync(filePath)) continue;

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    posts.push({
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      ...(data.dateModified && { dateModified: data.dateModified }),
      author: data.author || 'Chip Moreno',
      category: data.category || 'Expat Taxes',
      tags: data.tags || [],
      readingTime: readingTimeText(content),
    });
  }

  const result = posts
    .filter((post) => !BLOG_REVIEW_SLUGS.has(post.slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  postsCache.set(locale, result);
  return result;
}

export function getPostBySlug(slug: string, locale: Locale = defaultLocale): BlogPost | null {
  const cacheKey = `${locale}:${slug}`;
  if (postCache.has(cacheKey)) return postCache.get(cacheKey)!;

  const filePath = getFilePath(slug, locale);

  if (!fs.existsSync(filePath)) {
    postCache.set(cacheKey, null);
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const post = {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'Chip Moreno',
    category: data.category || 'Expat Taxes',
    tags: data.tags || [],
    readingTime: readingTimeText(content),
    content,
    reviewRequired: BLOG_REVIEW_SLUGS.has(slug),
    ...(data.dateModified && { dateModified: data.dateModified }),
    ...(data.faqs && { faqs: data.faqs }),
  };
  postCache.set(cacheKey, post);
  return post;
}

export function getAllSlugs(): string[] {
  const files = listMdxFiles();
  const slugs = new Set<string>();
  for (const file of files) {
    const match = file.match(/^(.+?)(?:\.(en|es|pt|fr|de|it|nl|ja|zh))?\.mdx$/);
    if (match) slugs.add(match[1]);
  }
  return Array.from(slugs);
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  tags: string[],
  limit: number = 3,
  locale: Locale = defaultLocale
): BlogPostMeta[] {
  const allPosts = getAllPosts(locale).filter((p) => p.slug !== currentSlug);

  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.category === category) score += 3;
    const overlap = post.tags.filter((t) => tags.includes(t)).length;
    score += overlap;
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime());

  return scored.slice(0, limit).map((s) => s.post);
}

export function formatDate(dateString: string, locale: Locale = defaultLocale): string {
  const date = new Date(dateString);
  const lang = locale === 'zh' ? 'zh-Hans' : locale;
  return date.toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function postHasTranslation(slug: string, locale: Locale): boolean {
  const localizedPath = path.join(BLOG_DIR, `${slug}.${locale}.mdx`);
  return fs.existsSync(localizedPath);
}

/**
 * Blog templates render the frontmatter title as the page H1. Older MDX files
 * also repeat that title as their first Markdown H1, so remove only that exact
 * duplicate while preserving all other article headings.
 */
export function removeLeadingDuplicateTitle(content: string, title: string): string {
  const lines = content.split(/\r?\n/);
  let firstContentLine = 0;
  while (firstContentLine < lines.length && !lines[firstContentLine].trim()) {
    firstContentLine += 1;
  }

  const match = lines[firstContentLine]?.match(/^#\s+(.+?)\s*#*\s*$/);
  if (!match) return content;

  const normalize = (value: string) => value.trim().replace(/[“”]/g, '"').replace(/[‘’]/g, "'").toLowerCase();
  if (normalize(match[1]) !== normalize(title)) return content;

  lines.splice(firstContentLine, 1);
  if (lines[firstContentLine]?.trim() === '') lines.splice(firstContentLine, 1);
  return lines.join('\n');
}

// Posts listed here are excluded from discovery (blog index, topics, sitemap,
// related posts) while time-sensitive tax claims receive editorial review.
// Direct URLs stay available with noindex,follow metadata.
// Search discovery remains paused for legacy pages with procedure names,
// penalty figures, or outcome language that needs qualified factual review.
export const BLOG_REVIEW_SLUGS = new Set<string>([
  // The six FEIE/Form 2555 pages below were source-reconciled and released
  // on 2026-08-03 against current IRS Form 2555 and amended-return guidance.
  // The four remaining FBAR/FATCA pages were source-reconciled and released
  // on 2026-08-03 with current IRS/FinCEN caveats and scope boundaries.
  // fbar-deadline-2026, fbar-requirements-americans-abroad, and
  // fbar-vs-fatca were source-reviewed and released on 2026-08-03.
  // PR 9 FEIE/Form 2555 posts were source-reviewed and released on 2026-08-03.
  // The four PFIC/Form 8621 pages below were source-reconciled and released
  // on 2026-08-03 against current IRS Form 8621, 3520, and 3520-A guidance.
]);
