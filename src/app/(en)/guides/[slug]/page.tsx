import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownContent from '@/components/blog/MarkdownContent';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import EditorialSourceNote from '@/components/seo/EditorialSourceNote';
import ArticleActions from '@/components/seo/ArticleActions';
import TableOfContents from '@/components/guides/TableOfContents';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, User } from '@/components/icons';
import ReadingProgress from '@/components/blog/ReadingProgress';
import {
  getGuideBySlug,
  getAllGuideSlugs,
  extractTableOfContents,
} from '@/lib/guides';
import { getPostBySlug, formatDate } from '@/lib/blog';
import { buildFAQSchema, buildArticleSchema } from '@/lib/structured-data';
import { getGuideResourceLinks } from '@/lib/guide-resource-links';
import { getRelatedPersonasForGuide } from '@/lib/content-relationships';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: guide.title,
    description: guide.description,
    authors: [{ name: guide.author }],
    alternates: { canonical: `https://fileabroad.com/guides/${slug}` },
    robots: guide.reviewRequired
      ? { index: false, follow: true }
      : undefined,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.lastUpdated,
      authors: [guide.author],
      tags: guide.tags,
      url: `https://fileabroad.com/guides/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const toc = extractTableOfContents(guide.content);
  const isStreamlinedGuide = slug === 'streamlined-filing-guide';
  const relatedPosts = guide.relatedBlogSlugs
    .map((blogSlug) => getPostBySlug(blogSlug))
    .filter((post) => post && !post.reviewRequired);
  const resourceLinks = getGuideResourceLinks(slug);
  const relatedPersonas = getRelatedPersonasForGuide(slug, slug === 'expat-tax-guide' ? 12 : 3);
  const consultationHref = slug.includes('pfic')
    ? '/consultation/pfic'
    : slug.includes('streamlined')
      ? '/consultation/streamlined'
      : slug.includes('cfc') || slug.includes('self-employment')
        ? '/consultation/business-abroad'
        : '/consultation';

  const schemas: Record<string, unknown>[] = [];

  if (!guide.reviewRequired && guide.faqs.length > 0) {
    schemas.push(buildFAQSchema(guide.faqs));
  }

  if (!guide.reviewRequired) {
    schemas.push(
      buildArticleSchema({
        title: guide.title,
        description: guide.description,
        author: guide.author,
        datePublished: guide.lastUpdated,
        url: `/guides/${slug}`,
      })
    );
  }

  return (
    <PageShell>
      <ReadingProgress />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: 'Guides', href: '/guides' },
            { label: guide.title, href: `/guides/${slug}` },
          ]}
        />

        {/* Header */}
        <header className="max-w-4xl mb-10 border-b border-border pb-10">
          <Badge className="bg-blue-50 text-blue-700 border-0 mb-4">
            {guide.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight font-sans text-foreground">
            {guide.title}
          </h1>
          <p className="text-xl mb-6 text-muted-foreground">
            {guide.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-base text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <Link href="/about" className="font-semibold text-secondary underline-offset-4 hover:underline">
                {guide.author}
              </Link>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Updated {formatDate(guide.lastUpdated)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {guide.readingTime}
            </span>
          </div>
        </header>

        {!guide.reviewRequired && (
          <aside className="mb-8 max-w-4xl border-l-4 border-secondary bg-surface-elevated p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Direct answer</p>
            <p className="mt-2 text-lg font-semibold leading-relaxed text-foreground">{guide.description}</p>
          </aside>
        )}

        <ArticleActions title={guide.title} />

        {guide.reviewRequired && (
          <aside className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
            <strong>Editorial review in progress.</strong> This archived guide may
            contain rules, thresholds, or procedural descriptions that have changed.
            Do not use it to determine Streamlined eligibility, willfulness, or penalty
            treatment. Check current IRS guidance and obtain appropriate professional
            advice before acting.
          </aside>
        )}

        {/* Content with sidebar */}
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
          <div>
            {/* Mobile TOC */}
            <TableOfContents items={toc} variant="mobile" />

            <aside className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
              Educational information only—not individualized tax or legal advice.
              Rules, thresholds, and agency procedures can change after publication;
              verify current official guidance. FileAbroad&apos;s standard preparation
              scope excludes legal opinions, willfulness determinations, treaty-based
              positions, audit representation, and unsupervised high-risk international
              forms.
            </aside>

            {/* Guide content */}
            <div className="prose prose-lg prose-fileabroad max-w-none">
              <MarkdownContent source={guide.content} />
            </div>

            <section className="not-prose my-12 border-y border-secondary/30 bg-background px-6 py-8 md:px-8" aria-labelledby="guide-inline-consultation-heading">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Before you file</p>
              <h2 id="guide-inline-consultation-heading" className="mt-2 font-sans text-2xl font-bold text-foreground">Get a written scope for your situation</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">The guide is educational. A consultation maps the facts, records, and forms that control your next step before preparation begins.</p>
              <Link href={consultationHref} data-analytics-event="guide_inline_consultation_click" data-cta-location="guide-inline" className="mt-5 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground hover:bg-foreground">Book a consultation</Link>
            </section>

            {/* FAQs */}
            {!guide.reviewRequired && guide.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6 font-sans text-foreground">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {guide.faqs.map((faq, i) => (
                    <Card key={i} className="border-border">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6 font-sans text-foreground">
                  Related Articles
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <Link key={post!.slug} href={`/blog/${post!.slug}`} className="group">
                      <Card className="h-full border-border hover:border-secondary/50 transition-colors">
                        <CardContent className="p-5">
                          <p className="text-sm text-muted-foreground mb-2">
                            {formatDate(post!.date)}
                          </p>
                          <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors leading-snug">
                            {post!.title}
                          </h3>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {relatedPersonas.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6 font-sans text-foreground">
                  Who this guide helps
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPersonas.map((persona) => (
                    <Link key={persona.slug} href={`/personas/${persona.slug}`} className="group">
                      <Card className="h-full border-border hover:border-secondary/50 transition-colors">
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors leading-snug">
                            Tax filing for {persona.name}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                            {persona.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Service links */}
            {guide.relatedServiceSlugs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-4 font-sans text-foreground">
                  Related Services
                </h2>
                <div className="flex flex-wrap gap-3">
                  {guide.relatedServiceSlugs.map((serviceSlug) => (
                    <Link
                      key={serviceSlug}
                      href={`/services/${serviceSlug}`}
                      className="inline-flex items-center gap-2 bg-surface-elevated hover:bg-muted text-foreground px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      {serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {resourceLinks.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-4 font-sans text-foreground">
                  Forms, tools, and next steps
                </h2>
                <div className="flex flex-wrap gap-3">
                  {resourceLinks.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="inline-flex items-center gap-2 border border-secondary/40 bg-background hover:bg-surface-elevated text-foreground px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      {resource.label}
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Desktop sidebar TOC */}
          <aside className="hidden lg:block">
            <TableOfContents items={toc} variant="desktop" />
          </aside>
        </div>
      </div>

      <EditorialSourceNote routePattern="/guides/*" />

      <CTASection
        title={isStreamlinedGuide ? 'Ready to map your Streamlined filing path?' : 'Need a written next step?'}
        description="Every expat situation is different. Book a consultation to review your facts before preparation begins."
        buttonText="Book Your Consultation"
        buttonHref={consultationHref}
      />

      {/* Structured Data */}
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
    </PageShell>
  );
}
