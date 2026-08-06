import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownContent from '@/components/blog/MarkdownContent';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, User } from '@/components/icons';
import {
  getFormBySlug,
  getAllFormRouteParams,
} from '@/lib/forms';
import { getPostBySlug, formatDate } from '@/lib/blog';
import { getGuideBySlug } from '@/lib/guides';
import { buildFAQSchema, buildArticleSchema } from '@/lib/structured-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFormRouteParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: formSlug } = await params;
  const form = getFormBySlug(formSlug);

  if (!form) {
    return { title: 'Form Not Found' };
  }

  return {
    title: form.title,
    description: form.description,
    authors: [{ name: form.author }],
    alternates: { canonical: `https://fileabroad.com/forms/${formSlug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: form.title,
      description: form.description,
      type: 'article',
      publishedTime: form.lastUpdated,
      authors: [form.author],
      tags: form.tags,
      url: `https://fileabroad.com/forms/${formSlug}`,
    },
  };
}

export default async function FormPage({ params }: Props) {
  const { slug: formSlug } = await params;
  const form = getFormBySlug(formSlug);

  if (!form) {
    notFound();
  }

  const relatedPosts = form.relatedBlogSlugs
    .map((blogSlug) => getPostBySlug(blogSlug))
    .filter((post) => post && !post.reviewRequired);
  const relatedGuides = form.relatedGuideSlugs
    .map((guideSlug) => getGuideBySlug(guideSlug))
    .filter((guide) => guide && !guide.reviewRequired);

  const schemas: Record<string, unknown>[] = [];

  if (form.faqs.length > 0) {
    schemas.push(buildFAQSchema(form.faqs));
  }

  schemas.push(
    buildArticleSchema({
      title: form.title,
      description: form.description,
      author: form.author,
      datePublished: form.lastUpdated,
      url: `/forms/${formSlug}`,
    })
  );

  return (
    <PageShell>
      <article className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Tax Forms', href: '/forms' },
            { label: form.formNumber, href: `/forms/${formSlug}` },
          ]}
        />

        {/* Header */}
        <header className="mb-10 max-w-4xl border-b border-border pb-10">
          <Badge className="mb-4 border-0 bg-accent text-accent-foreground">
            {form.category}
          </Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {form.title}
          </h1>
          <p className="mb-6 mt-4 max-w-3xl text-xl text-muted-foreground">
            {form.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {form.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Updated {formatDate(form.lastUpdated)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {form.readingTime}
            </span>
          </div>
        </header>

        <aside className="mb-8 max-w-4xl border-l-4 border-secondary bg-surface-elevated p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            IRS Form {form.formNumber}
          </p>
          <p className="mt-2 text-lg font-semibold leading-relaxed text-foreground">
            {form.formName}
          </p>
        </aside>

        <aside className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          Educational information only—not individualized tax or legal advice.
          Rules, thresholds, and agency procedures can change after publication;
          verify current official guidance. FileAbroad&apos;s standard preparation
          scope excludes legal opinions, willfulness determinations, treaty-based
          positions, audit representation, and unsupervised high-risk international
          forms.
        </aside>

        <section className="mb-10 border border-secondary/30 bg-background p-6 md:p-8" aria-label="Consultation call to action">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Before you file</p>
          <h2 className="mt-2 font-sans text-2xl font-bold text-foreground">Need this form mapped to your facts?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">The right answer can depend on the year, account type, ownership, country, and related forms. Book a consultation for a written next-step scope.</p>
          <Link href="/intake" className="mt-5 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90">Get Started</Link>
        </section>

        {/* Content */}
        <div className="prose prose-lg prose-fileabroad max-w-none">
          <MarkdownContent source={form.content} />
        </div>

        <section className="mt-10 border border-secondary/30 bg-background p-6 md:p-8" aria-label="Mid-page consultation call to action">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">A clear next step</p>
          <h2 className="mt-2 font-sans text-2xl font-bold text-foreground">Get a written scope before preparation begins</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Share the broad facts and years involved. FileAbroad will confirm what needs review and whether the form fits an accepted preparation scope.</p>
          <Link href="/intake" className="mt-5 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90">Get Started</Link>
        </section>

        {/* FAQs */}
        {form.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {form.faqs.map((faq, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-semibold text-foreground">
                      {faq.question}
                    </h3>
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
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              Related Guides
            </h2>
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
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              Related Articles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link key={post!.slug} href={`/blog/${post!.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-sm text-muted-foreground">
                        {formatDate(post!.date)}
                      </p>
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

        {/* Service links */}
        {form.relatedServiceSlugs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
              Related Services
            </h2>
            <div className="flex flex-wrap gap-3">
              {form.relatedServiceSlugs.map((serviceSlug) => (
                <Link
                  key={serviceSlug}
                  href={`/services/${serviceSlug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {serviceSlug
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <CTASection
        title="Need Help With This Form?"
        description="FileAbroad prepares accepted forms within a written scope. Book a consultation to discuss your situation before preparation begins."
        buttonText="Get Started"
        buttonHref="/intake"
      />

      {/* Structured Data */}
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
    </PageShell>
  );
}
