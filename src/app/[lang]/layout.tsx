import '../globals.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RootDocument from '@/components/layout/RootDocument';
import { isValidLocale, languages, locales, type Locale } from '@/lib/i18n/config';
import { rootMetadata, rootViewport } from '@/lib/root-metadata';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export const viewport = rootViewport;

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

function getLocale(lang: string): Locale {
  if (!isValidLocale(lang)) notFound();
  return lang;
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getLocale(lang);
  const language = languages[locale];
  return {
    ...rootMetadata,
    openGraph: {
      ...rootMetadata.openGraph,
      locale: language.ogLocale,
      url: `https://fileabroad.com/${locale}`,
    },
    alternates: { canonical: `https://fileabroad.com/${locale}` },
  };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  return <RootDocument locale={getLocale(lang)}>{children}</RootDocument>;
}
