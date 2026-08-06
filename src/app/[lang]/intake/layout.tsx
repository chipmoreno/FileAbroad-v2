import { Metadata } from 'next';
import { extractLocale } from '@/lib/i18n/metadata';
import { getCanonicalUrl } from '@/lib/i18n/utils';

interface IntakeLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Pick<IntakeLayoutProps, 'params'>): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const canonical = getCanonicalUrl('/intake', locale);

  return {
    title: 'Start Your Expat Tax Filing',
    description:
      'Share preliminary facts about your US expat tax filing in about 3 minutes. FileAbroad reviews the request before recommending a scope or paid consultation.',
    alternates: { canonical },
    openGraph: {
      title: 'Start Your Expat Tax Filing | FileAbroad',
      description:
        'Share preliminary facts about your US expat tax filing. FileAbroad reviews the request before recommending a scope or paid consultation.',
      url: canonical,
    },
    robots: { index: true, follow: true },
  };
}

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
