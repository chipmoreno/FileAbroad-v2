import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/pages/HomePage';
import { generateHreflang } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'US Expat Tax Filing & FBAR | Chip Moreno in Ecuador',
  description:
    'Americans abroad: stop overpaying or missing penalty-triggering forms. Work directly with Chip — PTIN holder, IRS e-file provider, based in Cuenca. Paid consultation. Written scope first.',
  alternates: {
    canonical: 'https://fileabroad.com',
    languages: generateHreflang('/'),
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
