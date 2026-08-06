import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogIndexLayout from '@/components/blog/BlogIndexLayout';
import { getAllPosts } from '@/lib/blog';
import { extractLocale } from '@/lib/i18n/metadata';
import { getDictionary, generateHreflang } from '@/lib/i18n/utils';
import { Locale } from '@/lib/i18n/config';

const PAGE_SIZE = 9;

interface Props {
  params: Promise<{ lang: string; page: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; page: string }[] = [];
  const locales = ['en', 'es', 'pt', 'fr', 'de', 'it', 'nl', 'ja', 'zh'];
  for (const lang of locales) {
    const totalPages = Math.ceil(getAllPosts(lang as Locale).length / PAGE_SIZE);
    const pages = Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => String(index + 2));
    for (const page of pages) {
      params.push({ lang, page });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page, lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  return {
    title: `${dict.blog.pageTitle} — ${dict.common.page || 'Page'} ${page}`,
    description: `${dict.blog.pageDescription} — ${dict.common.page || 'Page'} ${page}`,
    alternates: {
      canonical: `https://fileabroad.com${locale === 'en' ? '' : `/${locale}`}/blog/page/${page}`,
      languages: generateHreflang(`/blog/page/${page}`),
    },
  };
}

export default async function PaginatedBlogPage({ params }: Props) {
  const { page: pageParam, lang } = await params;
  const locale = extractLocale({ lang });
  const page = Number(pageParam);
  const totalPages = Math.ceil(getAllPosts(locale).length / PAGE_SIZE);
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound();

  return <BlogIndexLayout initialPage={page} locale={locale} />;
}
