import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MarkdownContent from '@/components/blog/MarkdownContent';
import { getPostBySlug, getRelatedPosts, formatDate, removeLeadingDuplicateTitle, postHasTranslation } from '@/lib/blog';
import { getTagSlug } from '@/lib/tags';
import { buildArticleSchema, buildFAQSchema } from '@/lib/structured-data';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import EditorialSourceNote from '@/components/seo/EditorialSourceNote';
import ArticleActions from '@/components/seo/ArticleActions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogFaqs from '@/components/blog/BlogFaqs';
import NewsletterSignup from '@/components/forms/NewsletterSignup';
import TableOfContents from '@/components/guides/TableOfContents';
import StateTaxGuideLinks from '@/components/seo/StateTaxGuideLinks';
import CountryGuideLinks from '@/components/seo/CountryGuideLinks';
import ReadingProgress from '@/components/blog/ReadingProgress';
import { extractTableOfContents } from '@/lib/guides';
import { getRelatedGuidesForPost } from '@/lib/guide-resource-links';
import {
  getRelatedCountriesForPost,
  getRelatedFaqsForPost,
  getRelatedPersonasForPost,
} from '@/lib/content-relationships';
import { Clock, Calendar, User } from '@/components/icons';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { localizePath } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

const expandedDisclaimerBySlug: Record<string, string> = {
  'amending-prior-returns-feie-refund':
    'Amended-return and refund choices depend on the original filing, deadlines, elections, and full facts. Verify current official guidance and obtain qualified advice before making a corrective filing.',
  'delinquent-fbar-filing-how-to-catch-up':
    'Late-FBAR and other corrective-filing choices can turn on reporting history, willfulness, and IRS contact. Verify current official guidance and obtain qualified tax or legal advice before filing.',
  'fbar-late-filing-reasonable-cause':
    'Reasonable cause, willfulness, and the right late-filing procedure are fact-specific and can affect penalties. Verify current official guidance and obtain qualified tax or legal advice before filing.',
  'us-colombia-tax-treaty-expats':
    'Treaty positions depend on residence, citizenship, income, saving-clause rules, and disclosure requirements. Verify the current treaty and official guidance and obtain qualified advice before taking a return position.',
};

function getArticleNextStep(slug: string) {
  if (slug.includes('fbar')) {
    return { href: '/tools/fbar-checker', label: 'Check my FBAR starting point', detail: 'Answer four threshold questions before deciding what to do next.' };
  }
  if (slug.includes('feie') || slug.includes('remote-worker')) {
    return { href: '/tools/feie-calculator', label: 'Estimate the FEIE impact', detail: 'Run an educational estimate using your income and housing costs.' };
  }
  if (slug.includes('streamlined') || slug.includes('delinquent') || slug.includes('amending')) {
    return { href: '/tools/catch-up-program', label: 'Review catch-up starting points', detail: 'Use the educational decision tool, then verify the path for your facts.' };
  }
  return { href: '/intake', label: 'Get a filing recommendation', detail: 'Complete the three-minute intake for a written scope or referral recommendation.' };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    if (locale !== defaultLocale && !postHasTranslation(slug, locale)) continue;
    languages[locale === defaultLocale ? 'en-us' : locale] =
      `https://fileabroad.com${localizePath(`/blog/${slug}`, locale)}`;
  }
  languages['x-default'] = `https://fileabroad.com/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    robots: post.reviewRequired
      ? { index: false, follow: true }
      : { index: true, follow: true },
    alternates: {
      canonical: `https://fileabroad.com/blog/${slug}`,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@FileAbroad',
      creator: '@FileAbroad',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.category, post.tags, 3);
  const relatedGuides = getRelatedGuidesForPost(post.tags);
  const relatedCountries = getRelatedCountriesForPost(slug);
  const relatedPersonas = getRelatedPersonasForPost(slug);
  const relatedFaqs = getRelatedFaqsForPost(slug);
  const expandedDisclaimer = expandedDisclaimerBySlug[slug];
  const articleContent = removeLeadingDuplicateTitle(post.content, post.title);
  const toc = extractTableOfContents(articleContent);
  const firstSectionIndex = articleContent.search(/^##\s/m);
  const introContent = firstSectionIndex > -1 ? articleContent.slice(0, firstSectionIndex) : articleContent;
  const remainingContent = firstSectionIndex > -1 ? articleContent.slice(firstSectionIndex) : '';
  const nextStep = getArticleNextStep(slug);

  const articleSchema = !post.reviewRequired
    ? buildArticleSchema({
        title: post.title,
        description: post.description,
        author: post.author,
        datePublished: post.date,
        dateModified: post.dateModified,
        url: `/blog/${slug}`,
      })
    : null;

  const faqSchema =
    !post.reviewRequired && post.faqs?.length ? buildFAQSchema(post.faqs) : null;

  return (
    <PageShell>
      <ReadingProgress />
      <article className="mx-auto max-w-6xl px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />

        {/* Article header */}
        <header className="mb-10 max-w-4xl border-b border-border pb-10">
          <Badge className="bg-surface-elevated text-secondary hover:bg-muted border-0 mb-4">
            {post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight font-sans text-foreground">
            {post.title}
          </h1>

          <p className="mb-6 max-w-3xl text-xl text-muted-foreground">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <Link href="/about" className="font-semibold text-secondary underline-offset-4 hover:underline">
                {post.author}
              </Link>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {post.dateModified ? `Updated ${formatDate(post.dateModified)}` : `Published ${formatDate(post.date)}`}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readingTime}
            </span>
          </div>
        </header>

        {post.reviewRequired && (
          <aside className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-950">
            <strong>Editorial review in progress.</strong> This legacy article is
            temporarily excluded from search indexing and site discovery while
            its time-sensitive tax claims and source support are reviewed. Verify
            current rules with official authorities and an appropriately qualified
            professional before relying on it.
          </aside>
        )}

        <aside
          className={`mb-8 rounded-lg border p-4 text-sm leading-relaxed ${
            expandedDisclaimer
              ? 'border-amber-200 bg-amber-50 text-amber-950'
              : 'border-border bg-muted/50 text-muted-foreground'
          }`}
        >
          {expandedDisclaimer
            ? `Educational information only—not individualized tax or legal advice. ${expandedDisclaimer} FileAbroad does not provide legal opinions or IRS representation.`
            : 'General educational information—not individualized tax or legal advice. Tax rules change, so check current official guidance for your facts.'}
        </aside>

        {!post.reviewRequired && (
          <aside className="mb-8 max-w-4xl border-l-4 border-secondary bg-surface-elevated p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Direct answer</p>
            <p className="mt-2 text-lg font-semibold leading-relaxed text-foreground">{post.description}</p>
          </aside>
        )}

        <ArticleActions title={post.title} />

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-14">
        <div>
        <TableOfContents items={toc} variant="mobile" />
        {/* Article content */}
        <div className="prose prose-lg prose-fileabroad max-w-none">
          <MarkdownContent source={introContent} />
          <aside className="not-prose my-9 grid gap-4 border-l-4 border-secondary bg-primary p-5 text-primary-foreground sm:grid-cols-[1fr_auto] sm:items-center md:p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Useful next step</p>
              <p className="mt-2 font-sans text-xl font-bold">{nextStep.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-primary-foreground/75">{nextStep.detail}</p>
            </div>
            <Link href={nextStep.href} data-analytics-event="cta_recommendation_click" data-cta-location="article_context" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 font-bold text-primary hover:bg-surface-elevated">
              Continue
            </Link>
          </aside>
          {remainingContent && (
            <MarkdownContent source={remainingContent} />
          )}
          <p className="not-prose mt-10 border-l-4 border-secondary bg-surface-elevated p-5 text-lg font-semibold leading-relaxed text-foreground">
            Every expat tax situation is different. Book a consultation to get a written scope and next step.
          </p>
        </div>

        {!post.reviewRequired && post.faqs?.length ? (
          <BlogFaqs faqs={post.faqs} title="Frequently Asked Questions" />
        ) : null}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <Link key={tag} href={`/topics/${getTagSlug(tag)}`}>
                <Badge variant="outline" className="text-muted-foreground border-border hover:bg-surface-elevated hover:text-secondary transition-colors cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {relatedGuides.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">Continue with a guide</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Guide</p>
                      <h3 className="font-sans text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{guide.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(relatedCountries.length > 0 || relatedPersonas.length > 0 || relatedFaqs.length > 0) && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">Find the path that fits</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedCountries.map((country) => (
                <Link key={`country-${country.slug}`} href={`/countries/${country.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Country guide</p>
                      <h3 className="font-sans text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        U.S. tax guide for Americans in {country.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {relatedPersonas.map((persona) => (
                <Link key={`persona-${persona.slug}`} href={`/personas/${persona.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Who we help</p>
                      <h3 className="font-sans text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        Tax filing for {persona.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {relatedFaqs.map((faq) => (
                <Link key={`faq-${faq.slug}`} href={`/faq/${faq.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">FAQ</p>
                      <h3 className="font-sans text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {faq.question}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {['state-tax-obligations-americans-abroad', 'best-state-domicile-expats'].includes(slug) && (
          <StateTaxGuideLinks />
        )}

        {slug === 'feie-vs-foreign-tax-credit' && <CountryGuideLinks />}

        {/* Author CTA */}
        <Card className="mt-12 border-border">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Link href="/about" className="flex-shrink-0">
                <Image
                  src="/headshot.jpg"
                  alt="Chip Moreno, founder of FileAbroad"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </Link>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 font-sans text-foreground">
                  About the Author
                </h3>
                <p className="text-base mb-4 text-muted-foreground">
                  <Link href="/about" className="text-secondary hover:underline">
                    Chip Moreno
                  </Link>
                  {' '}helps Americans living abroad navigate U.S. tax obligations.
                  Based in Ecuador, he understands the expat experience firsthand.
                  Start with a{' '}
                  <Link href="/consultation" className="text-secondary hover:underline">
                    consultation
                  </Link>
                  {' '}or{' '}
                  <Link href="/intake" className="text-secondary hover:underline">
                    start your intake
                  </Link>
                  .
                </p>

              </div>
            </div>
          </CardContent>
        </Card>
        </div>
        <aside className="hidden lg:block">
          <TableOfContents items={toc} variant="desktop" />
        </aside>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mt-16">
          <h2 className="text-2xl font-bold mb-8 font-sans text-foreground">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                <Card className="h-full border-border hover:border-secondary/50 transition-colors">
                  <CardContent className="p-5">
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatDate(related.date)}
                    </p>
                    <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors leading-snug mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <NewsletterSignup />
      <EditorialSourceNote routePattern="/blog/*" />

      {/* Structured data */}
      {articleSchema && <JsonLd data={articleSchema} />}
      {faqSchema && <JsonLd data={faqSchema} />}
    </PageShell>
  );
}
