import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Your Expat Tax Filing',
  description:
    'Share preliminary facts about your US expat tax filing in about 3 minutes. FileAbroad reviews the request before recommending a scope or paid consultation.',
  alternates: {
    canonical: 'https://fileabroad.com/intake',
  },
  openGraph: {
    title: 'Start Your Expat Tax Filing',
    description:
      'Share preliminary facts about your US expat tax filing. FileAbroad reviews the request before recommending a scope or paid consultation.',
    url: 'https://fileabroad.com/intake',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
