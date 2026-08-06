import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import HowItWorksPageContent from '@/components/pages/HowItWorksPageContent';
import { getDictionary } from '@/lib/i18n/utils';
import { buildHowToSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'How It Works | U.S. Expat Tax Preparation',
  description:
    'See how FileAbroad reviews your facts, confirms the written scope, prepares the accepted filing, and gives you a review before submission.',
  alternates: {
    canonical: 'https://fileabroad.com/how-it-works',
  },
  openGraph: {
    title: 'How It Works',
    description:
      'A four-stage process: intake, document collection, preparation and review, then submission and confirmation within the accepted scope.',
    url: 'https://fileabroad.com/how-it-works',
  },
};

export default async function HowItWorksPage() {
  const dict = getDictionary('en');
  const howToSchema = buildHowToSchema({
    name: 'How I File Your US Expat Tax Return',
    description:
      'The 4-step process for filing US taxes from abroad with FileAbroad: intake, document collection, preparation and review, filing and confirmation.',
    totalTime: 'P3W',
    steps: [
      { name: dict.howItWorks.step1Title, text: dict.howItWorks.step1Description },
      { name: dict.howItWorks.step2Title, text: dict.howItWorks.step2Description },
      { name: dict.howItWorks.step3Title, text: dict.howItWorks.step3Description },
      { name: dict.howItWorks.step4Title, text: dict.howItWorks.step4Description },
    ],
  });

  return (
    <PageShell>
      <JsonLd data={howToSchema} />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.howItWorks, href: '/how-it-works' }]} />
      </div>
      <HowItWorksPageContent dict={dict} locale="en" />
    </PageShell>
  );
}
