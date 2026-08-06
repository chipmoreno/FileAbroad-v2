import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import FormsHubPageContent from '@/components/pages/FormsHubPageContent';

export const metadata: Metadata = {
  title: 'US Expat Tax Forms Explained',
  description:
    'Plain-English guides to the IRS forms Americans abroad need most: Form 2555 (FEIE), Form 1116 (Foreign Tax Credit), FinCEN 114 (FBAR), Form 8938 (FATCA), and more.',
  alternates: { canonical: 'https://fileabroad.com/forms' },
  openGraph: {
    title: 'US Expat Tax Forms Explained',
    description:
      'Plain-English guides to the IRS forms Americans abroad need most.',
    url: 'https://fileabroad.com/forms',
  },
};

export default function FormsHubPage() {
  return (
    <PageShell>
      <FormsHubPageContent />
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <Link href="/countries/form-matrix" className="block rounded-lg border border-secondary/30 bg-background p-5 text-sm font-semibold text-secondary hover:bg-surface-elevated">
          Browse country × form guides for Americans abroad →
        </Link>
      </div>
    </PageShell>
  );
}
