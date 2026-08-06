import { getAllPosts } from './blog';

/**
 * Whitelist of canonical pillar topics that get their own /topics/* pages.
 *
 * Every blog post can still use free-form tags in frontmatter, but only these
 * generate indexable topic hubs — prevents ~150 thin/near-duplicate tag pages
 * from cannibalizing the pillar guides and /blog.
 *
 * Tag matching is case-insensitive. If you add a new pillar, make sure at
 * least 5 pieces of content use that tag before whitelisting it.
 */
export const PILLAR_TOPICS = [
  'FEIE',
  'FBAR',
  'FATCA',
  'Foreign Tax Credit',
  'Streamlined Filing',
  'Ecuador',
  'Self-Employment',
  'Expat Taxes',
  'Form 2555',
  'Form 8938',
  'Compliance',
  'Tax Deadlines',
] as const;

export function isPillarTopic(tag: string): boolean {
  const normalized = tag.toLowerCase();
  return PILLAR_TOPICS.some((pillar) => pillar.toLowerCase() === normalized);
}

export function getTagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface TaggedContent {
  type: 'blog' | 'guide' | 'country';
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags: string[];
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();

  // Blog tags
  const posts = getAllPosts();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }

  // Guide tags will be added in Phase 3
  // Country tags will be added in Phase 2

  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): TaggedContent[] {
  const results: TaggedContent[] = [];
  const normalizedTag = tag.toLowerCase();

  // Blog posts
  const posts = getAllPosts();
  for (const post of posts) {
    if (post.tags.some((t) => t.toLowerCase() === normalizedTag)) {
      results.push({
        type: 'blog',
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
      });
    }
  }

  // Guides and countries will be added in later phases

  return results.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getAllTagSlugs(): { tag: string; slug: string }[] {
  const seen = new Set<string>();

  return getAllTags()
    .filter((tag) => isPillarTopic(tag))
    .map((tag) => ({
      tag,
      slug: getTagSlug(tag),
    }))
    .filter(({ slug }) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    });
}
