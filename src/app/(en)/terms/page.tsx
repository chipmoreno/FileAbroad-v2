import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import TermsPageContent from '@/components/pages/TermsPageContent';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for FileAbroad expat tax services. Understand your rights and responsibilities when using our services.',
  alternates: {
    canonical: 'https://fileabroad.com/terms',
  },
};

export default async function TermsPage() {
  const dict = getDictionary('en');

  return (
    <PageShell>
      <TermsPageContent dict={dict} />
    </PageShell>
  );
}
