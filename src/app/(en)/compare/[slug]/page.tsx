import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from '@/components/icons';
import { getComparisonBySlug, getAllComparisonSlugs } from '@/lib/compare-data';
import { getGuideBySlug } from '@/lib/guides';
import { getPostBySlug, formatDate } from '@/lib/blog';
import { buildFAQSchema, buildArticleSchema } from '@/lib/structured-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonBySlug(slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://fileabroad.com/compare/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: `https://fileabroad.com/compare/${slug}`,
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const page = getComparisonBySlug(slug);
  if (!page) notFound();

  const schemas: Record<string, unknown>[] = [];
  if (page.faqs.length > 0) {
    schemas.push(buildFAQSchema(page.faqs));
  }
  schemas.push(
    buildArticleSchema({
      title: page.title,
      description: page.description,
      datePublished: '2026-07-31',
      url: `/compare/${slug}`,
    })
  );

  const relatedGuides = page.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g) => g && !g.reviewRequired);
  const relatedPosts = page.relatedBlogSlugs
    .map((s) => getPostBySlug(s))
    .filter((p) => p && !p.reviewRequired);

  return (
    <PageShell>
      <article className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Compare', href: '/compare' },
            { label: page.title, href: `/compare/${slug}` },
          ]}
        />

        <header className="mb-10 max-w-4xl border-b border-border pb-10">
          <Badge className="mb-4 border-0 bg-blue-50 text-blue-700">Comparison</Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {page.title}
          </h1>
          <p className="mb-6 mt-4 max-w-3xl text-xl text-muted-foreground">{page.description}</p>
        </header>

        {/* Side-by-side cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="mb-4 font-sans text-xl font-bold text-foreground">{page.leftTitle}</h2>
              <ul className="space-y-4">
                {page.leftPoints.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <div>
                      <p className="font-semibold text-foreground">{point.label}</p>
                      <p className="text-sm text-muted-foreground">{point.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="mb-4 font-sans text-xl font-bold text-foreground">{page.rightTitle}</h2>
              <ul className="space-y-4">
                {page.rightPoints.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <div>
                      <p className="font-semibold text-foreground">{point.label}</p>
                      <p className="text-sm text-muted-foreground">{point.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Key differences table */}
        <section className="mt-12">
          <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">Key Differences</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Aspect</th>
                  <th className="px-4 py-3 font-semibold">{page.leftTitle}</th>
                  <th className="px-4 py-3 font-semibold">{page.rightTitle}</th>
                </tr>
              </thead>
              <tbody>
                {page.keyDifferences.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{row.aspect}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.left}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to choose */}
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <Card className="border-border bg-blue-50/50">
            <CardContent className="p-6">
              <h3 className="mb-3 font-sans text-lg font-bold text-foreground">When to Choose {page.leftTitle.split('(')[0].trim()}</h3>
              <p className="text-muted-foreground">{page.whenToChooseLeft}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-green-50/50">
            <CardContent className="p-6">
              <h3 className="mb-3 font-sans text-lg font-bold text-foreground">When to Choose {page.rightTitle.split('(')[0].trim()}</h3>
              <p className="text-muted-foreground">{page.whenToChooseRight}</p>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        {page.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {page.faqs.map((faq, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-semibold text-foreground">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">Related Guides</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((guide) => (
                <Link key={guide!.slug} href={`/guides/${guide!.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {guide!.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link key={post!.slug} href={`/blog/${post!.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-sm text-muted-foreground">{formatDate(post!.date)}</p>
                      <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {post!.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <CTASection
        title="Not Sure Which Applies to You?"
        description="Every expat situation is different. FileAbroad can analyze your specific income, country, and goals to recommend the optimal strategy."
        buttonText="Get Started"
        buttonHref="/intake"
      />

      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
    </PageShell>
  );
}
