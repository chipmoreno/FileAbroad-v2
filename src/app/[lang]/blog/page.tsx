import { Metadata } from 'next';
import BlogIndexLayout from '@/components/blog/BlogIndexLayout';
import { generateLocalizedMetadata, extractLocale } from '@/lib/i18n/metadata';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return generateLocalizedMetadata({
    pageKey: 'blog',
    path: '/blog',
    locale,
  });
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return <BlogIndexLayout locale={locale} />;
}
