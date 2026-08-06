import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTagSlug, getPostsByTag, getAllTags, isPillarTopic } from '@/lib/tags';
import { formatDate } from '@/lib/blog';
import { getDictionary, localizePath } from '@/lib/i18n/utils';
import { defaultLocale } from '@/lib/i18n/config';
import { extractLocale } from '@/lib/i18n/metadata';

interface Props {
  params: Promise<{ lang: string; tag: string }>;
}

export const dynamic = 'force-dynamic';

function findTagBySlug(slug: string): string | null {
  const tags = getAllTags();
  return tags.find((tag) => getTagSlug(tag) === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: tagSlug, lang } = await params;
  const tag = findTagBySlug(tagSlug);

  if (!tag) {
    return { title: 'Topic Not Found' };
  }

  const contentCount = getPostsByTag(tag).length;
  const locale = extractLocale({ lang });
  const shouldIndex = locale === defaultLocale && isPillarTopic(tag) && contentCount >= 5;
  const canonical = locale === defaultLocale
    ? `https://fileabroad.com/topics/${tagSlug}`
    : `https://fileabroad.com/${locale}/topics/${tagSlug}`;

  return {
    title: `${tag} - Expat Tax Articles & Resources`,
    description: `A focused library of ${tag.toLowerCase()} articles, guides, and resources for Americans living or filing abroad.`,
    alternates: { canonical },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

const typeConfig: Record<string, { prefix: string; badgeColor: string; label: string }> = {
  blog: { prefix: '/blog', badgeColor: 'bg-surface-elevated text-secondary', label: 'Blog' },
  guide: { prefix: '/guides', badgeColor: 'bg-blue-50 text-blue-700', label: 'Guide' },
  country: { prefix: '/countries', badgeColor: 'bg-green-50 text-green-700', label: 'Country' },
};

export default async function TopicPage({ params }: Props) {
  const { tag: tagSlug, lang } = await params;
  const tag = findTagBySlug(tagSlug);
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);

  if (!tag) {
    notFound();
  }

  const content = getPostsByTag(tag);
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: dict.breadcrumbs.blog, href: l('/blog') },
            { label: tag, href: l(`/topics/${tagSlug}`) },
          ]}
        />

        <header className="mb-12 border-b border-border pb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Topic library</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-foreground">
            {tag}
          </h1>
          <p className="text-lg text-muted-foreground">
            {content.length} {content.length === 1 ? 'resource' : 'resources'} covering {tag.toLowerCase()} for Americans living or filing abroad.
          </p>
        </header>

        <div className="space-y-6">
          {content.map((item) => {
            const config = typeConfig[item.type];
            const href = l(`${config.prefix}/${item.slug}`);

            return (
              <Link key={`${item.type}-${item.slug}`} href={href} className="group block">
                <Card className="border-border hover:border-secondary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${config.badgeColor} border-0`}>
                            {config.label}
                          </Badge>
                          {item.date && (
                            <span className="text-sm text-muted-foreground">
                              {formatDate(item.date, locale)}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-semibold text-foreground group-hover:text-secondary transition-colors mb-2">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
