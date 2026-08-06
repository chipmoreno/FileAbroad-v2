import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RelatedItem {
  type: 'blog' | 'guide' | 'country' | 'tool';
  slug: string;
  title: string;
  description: string;
  badge?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
}

const typeConfig: Record<string, { prefix: string; badgeColor: string; defaultBadge: string }> = {
  blog: { prefix: '/blog', badgeColor: 'bg-surface-elevated text-secondary', defaultBadge: 'Blog' },
  guide: { prefix: '/guides', badgeColor: 'bg-blue-50 text-blue-700', defaultBadge: 'Guide' },
  country: { prefix: '/countries', badgeColor: 'bg-green-50 text-green-700', defaultBadge: 'Country' },
  tool: { prefix: '/tools', badgeColor: 'bg-purple-50 text-purple-700', defaultBadge: 'Tool' },
};

export default function RelatedContent({
  title = 'Related Content',
  items,
}: RelatedContentProps) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8 font-sans text-foreground">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const href = `${config.prefix}/${item.slug}`;

          return (
            <Link key={`${item.type}-${item.slug}`} href={href} className="group">
              <Card className="h-full border-border hover:border-secondary/50 transition-colors">
                <CardContent className="p-5">
                  <Badge className={`${config.badgeColor} border-0 mb-3`}>
                    {item.badge || config.defaultBadge}
                  </Badge>
                  <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
