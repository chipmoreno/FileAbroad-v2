import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import EditorialPolicyPageContent from '@/components/pages/EditorialPolicyPageContent';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'Editorial Standards and Corrections',
  description: 'How FileAbroad researches, updates, reviews, and corrects expat tax content.',
  alternates: { canonical: 'https://fileabroad.com/editorial-policy' },
};

export default async function EditorialPolicyPage() {
  const dict = getDictionary('en');

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.editorialPolicy, href: '/editorial-policy' }]} />
      </div>
      <EditorialPolicyPageContent dict={dict} />
    </PageShell>
  );
}
