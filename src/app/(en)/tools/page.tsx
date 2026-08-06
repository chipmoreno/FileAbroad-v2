import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ToolsPageContent from '@/components/pages/ToolsPageContent';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'Expat Tax Tools & Calculators',
  description:
    'Free tax tools for Americans abroad: FEIE calculator, FBAR checker, tax deadline calendar, and FEIE vs FTC savings estimator.',
  alternates: { canonical: 'https://fileabroad.com/tools' },
  openGraph: {
    title: 'Expat Tax Tools & Calculators',
    description:
      'Free tax tools for Americans abroad: FEIE calculator, FBAR checker, tax deadline calendar, and savings estimator.',
    url: 'https://fileabroad.com/tools',
  },
};

export default async function ToolsPage() {
  const dict = getDictionary('en');

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.tools, href: '/tools' }]} />
      </div>
      <ToolsPageContent dict={dict} locale="en" />
    </PageShell>
  );
}
