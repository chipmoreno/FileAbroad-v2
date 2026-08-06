import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PrivacyPageContent from '@/components/pages/PrivacyPageContent';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How FileAbroad collects, uses, shares, and protects intake, payment, communication, analytics, and tax-service information.',
  alternates: {
    canonical: 'https://fileabroad.com/privacy',
  },
};

export default async function PrivacyPage() {
  const dict = getDictionary('en');

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.privacy, href: '/privacy' }]} />
      </div>
      <PrivacyPageContent dict={dict} />
    </PageShell>
  );
}
