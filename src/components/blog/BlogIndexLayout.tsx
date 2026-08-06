import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import { getAllPosts } from '@/lib/blog';
import PageShell from '@/components/layout/PageShell';
import CTASection from '@/components/layout/CTASection';
import BlogDiscovery from '@/components/blog/BlogDiscovery';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary, localizePath } from '@/lib/i18n/utils';
import { getBlogDiscoveryLabels } from '@/lib/i18n/blog-discovery';

export default function BlogIndexLayout({ initialPage = 1, locale = 'en' }: { initialPage?: number; locale?: Locale }) {
  const posts = getAllPosts(locale);
  const dict = getDictionary(locale);
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <section className="border-b border-border bg-surface-elevated pb-12 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">{dict.breadcrumbs.blog}</p>
          <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <h1 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl">{dict.blog.pageTitle}</h1>
              <p className="mt-5 max-w-3xl text-xl text-muted-foreground">{dict.blog.pageDescription}</p>
            </div>
            <div className="grid gap-3 border-l-2 border-secondary pl-5 text-sm font-semibold">
              <Link href={l('/guides/expat-tax-guide')} className="flex items-center justify-between text-foreground hover:text-secondary">{dict.blog.relatedArticles} <ArrowRight className="h-4 w-4" /></Link>
              <Link href={l('/tools/fbar-checker')} className="flex items-center justify-between text-foreground hover:text-secondary">{dict.common.checkFbarStart} <ArrowRight className="h-4 w-4" /></Link>
              <Link href={l('/services')} className="flex items-center justify-between text-foreground hover:text-secondary">{dict.breadcrumbs.services} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <BlogDiscovery posts={posts} initialPage={initialPage} locale={locale} labels={getBlogDiscoveryLabels(locale)} />
      </div>

      <CTASection
        title={dict.home.faqCtaText}
        description={dict.home.faqDescription}
      />
    </PageShell>
  );
}
