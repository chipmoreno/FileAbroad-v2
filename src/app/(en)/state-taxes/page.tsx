import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import StateTaxesHubPageContent from '@/components/pages/StateTaxesHubPageContent';

export const metadata: Metadata = {
  title: 'State Taxes for Americans Abroad | Termination Guides by State',
  description:
    'Which states chase expats for income tax? Learn domicile termination steps, safe harbor rules, FEIE conformity, and audit triggers for California, Virginia, New York, and more.',
  alternates: { canonical: 'https://fileabroad.com/state-taxes' },
  openGraph: {
    title: 'State Taxes for Americans Abroad',
    description: 'State-by-state guides to terminating residency and stopping state tax obligations from abroad.',
    url: 'https://fileabroad.com/state-taxes',
  },
};

export default function StateTaxesHubPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumbs items={[{ label: 'State Taxes', href: '/state-taxes' }]} />
      </div>
      <StateTaxesHubPageContent />
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <Link href="/state-taxes/service-matrix" className="block rounded-lg border border-secondary/30 bg-background p-5 text-sm font-semibold text-secondary hover:bg-surface-elevated">
          Browse priority state × service guides →
        </Link>
      </div>
    </PageShell>
  );
}
