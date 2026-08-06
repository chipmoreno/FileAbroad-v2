import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PersonasHubPageContent from '@/components/pages/PersonasHubPageContent';

export const metadata: Metadata = {
  title: 'Who We Help | Expat Tax Services by Life Situation',
  description:
    'US expat tax filing tailored to your situation: digital nomads, retirees, accidental Americans, business owners, military contractors, and more. See how FileAbroad can help.',
  alternates: { canonical: 'https://fileabroad.com/personas' },
  openGraph: {
    title: 'Who We Help | Expat Tax Services',
    description: 'US expat tax filing tailored to your life situation.',
    url: 'https://fileabroad.com/personas',
  },
};

export default function PersonasHubPage() {
  return (
    <PageShell>
      <PersonasHubPageContent />
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <Link href="/personas/country-matrix" className="block rounded-lg border border-secondary/30 bg-background p-5 text-sm font-semibold text-secondary hover:bg-surface-elevated">
          Browse priority persona × country guides →
        </Link>
      </div>
    </PageShell>
  );
}
