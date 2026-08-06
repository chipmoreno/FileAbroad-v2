import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from '@/components/icons';
import { getFAQPageBySlug, getAllFAQPageSlugs } from '@/lib/faq-pages';
import { getGuideBySlug } from '@/lib/guides';
import { getPostBySlug, formatDate } from '@/lib/blog';
import { buildFAQSchema, buildArticleSchema } from '@/lib/structured-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFAQPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getFAQPageBySlug(slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://fileabroad.com/faq/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: `https://fileabroad.com/faq/${slug}`,
    },
  };
}

export default async function FAQSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getFAQPageBySlug(slug);
  if (!page) notFound();

  const faqItem = { question: page.question, answer: page.answer };
  const schemas = [
    buildFAQSchema([faqItem]),
    buildArticleSchema({
      title: page.title,
      description: page.description,
      datePublished: '2026-07-31',
      url: `/faq/${slug}`,
    }),
  ];

  const relatedGuides = page.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g) => g && !g.reviewRequired);
  const relatedPosts = page.relatedBlogSlugs
    .map((s) => getPostBySlug(s))
    .filter((p) => p && !p.reviewRequired);

  return (
    <PageShell>
      <article className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { label: 'FAQ', href: '/faq' },
            { label: page.question, href: `/faq/${slug}` },
          ]}
        />

        <header className="mb-10 border-b border-border pb-10">
          <Badge className="mb-4 border-0 bg-blue-50 text-blue-700">
            <HelpCircle className="mr-1 h-3 w-3" />
            FAQ
          </Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {page.question}
          </h1>
          <p className="mb-6 mt-4 text-xl text-muted-foreground">{page.description}</p>
        </header>

        {/* Answer */}
        <section className="prose prose-lg prose-fileabroad max-w-none">
          <p className="text-lg leading-relaxed text-foreground">{page.answer}</p>
        </section>

        {/* Related FAQs */}
        {page.relatedFaqs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">Related Questions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {page.relatedFaqs.map((faq) => (
                <Link key={faq.slug} href={`/faq/${faq.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {faq.question}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">Related Guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="grid gap-4 sm:grid-cols-2">
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
        title="Still Have Questions?"
        description="Every expat situation is unique. If you need personalized guidance, let's talk."
        buttonText="Message Chip on WhatsApp"
        buttonHref="https://wa.me/593962848410"
      />

      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
    </PageShell>
  );
}
