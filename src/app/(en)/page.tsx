import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/pages/HomePage';
import { generateHreflang } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'US Expat Tax Prep by Chip Moreno | Ecuador-Based PTIN Holder for Americans Abroad',
  description:
    'Stop overpaying or under-filing the IRS while living abroad. Work directly with Chip Moreno in Cuenca, Ecuador — PTIN holder and IRS e-file provider. Paid consultation first. Written scope before any preparation.',
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
