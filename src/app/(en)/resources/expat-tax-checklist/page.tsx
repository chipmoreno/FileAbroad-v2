import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ExpatTaxChecklistPageContent from '@/components/pages/ExpatTaxChecklistPageContent';
import { buildFAQSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import EditorialSourceNote from '@/components/seo/EditorialSourceNote';

export const metadata: Metadata = {
  title: 'The Expat Tax Checklist — Free PDF Download',
  description:
    'A one-page checklist of everything US expats need to file taxes from abroad. Download the free printable PDF with bonus items.',
  alternates: { canonical: 'https://fileabroad.com/resources/expat-tax-checklist' },
  openGraph: {
    title: 'The Expat Tax Checklist — Free PDF Download',
    description: 'A one-page checklist of everything US expats need to file taxes from abroad.',
    url: 'https://fileabroad.com/resources/expat-tax-checklist',
  },
};

const faqSchema = buildFAQSchema([
  {
    question: 'What is included in the Expat Tax Checklist PDF?',
    answer: 'The PDF includes pre-move, mid-year, and post-move tax tasks, plus bonus items: an Ecuador-specific addendum, a 330-day FEIE tracking calendar, state termination template letters, an FBAR worksheet, and a 2026 deadline calendar.',
  },
  {
    question: 'Is the checklist really free?',
    answer: 'Yes. Enter your email and we will send you a download link to the printable PDF. You will also receive occasional filing updates; you can unsubscribe anytime.',
  },
  {
    question: 'Does the checklist replace a tax preparer?',
    answer: 'No. The checklist is a planning and organization tool. Every expat situation is different, and a qualified tax professional should review your specific facts before filing.',
  },
  {
    question: 'Which countries does the checklist cover?',
                    answer: 'The checklist is designed for Americans living in any foreign country. It includes general rules plus an Ecuador-specific addendum. If you need guidance for another country, book a consultation.',
  },
]);

export default function ExpatTaxChecklistPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Resources', href: '/resources/expat-tax-checklist' },
            { label: 'Expat Tax Checklist', href: '/resources/expat-tax-checklist' },
          ]}
        />
      </div>
      <ExpatTaxChecklistPageContent />
      <EditorialSourceNote routePattern="/resources/*" />
      <JsonLd data={faqSchema} />
    </PageShell>
  );
}
