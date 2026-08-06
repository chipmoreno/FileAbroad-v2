import { Metadata } from 'next';
import BlogIndexLayout from '@/components/blog/BlogIndexLayout';

export const metadata: Metadata = {
  title: 'Blog | Expat Tax Tips & Guides',
  description:
    'Educational U.S. tax articles for Americans living abroad, including FBAR, FATCA, and Foreign Earned Income Exclusion topics.',
  alternates: { canonical: 'https://fileabroad.com/blog' },
  openGraph: {
    title: 'Blog | Expat Tax Tips & Guides',
    description:
      'Educational U.S. tax articles for Americans abroad, including FBAR, FATCA, and FEIE guides.',
  },
};

export default function BlogPage() {
  return <BlogIndexLayout />;
}
