import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/pages/HomePage';
import { generateHreflang } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'US Expat Tax Prep | FBAR, FEIE & Catch-Up Filing',
  description:
    'Start a review of your U.S. expat tax situation. Get the likely filing path, written scope, and next step before preparation begins.',
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
