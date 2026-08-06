import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/pages/HomePage';
import { generateLocalizedMetadata, extractLocale } from '@/lib/i18n/metadata';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return generateLocalizedMetadata({
    pageKey: 'home',
    path: '/',
    locale,
  });
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HomePage locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
