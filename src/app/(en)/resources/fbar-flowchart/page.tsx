import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FBARFlowchartPageContent from '@/components/pages/FBARFlowchartPageContent';
import { buildFAQSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import EditorialSourceNote from '@/components/seo/EditorialSourceNote';

export const metadata: Metadata = {
  title: 'FBAR Requirement Flowchart — Free PDF Download',
  description:
    'Visual decision tree to determine if you need to file FBAR. Free printable PDF with filing instructions, deadlines, and penalty overview.',
  alternates: { canonical: 'https://fileabroad.com/resources/fbar-flowchart' },
  openGraph: {
    title: 'FBAR Requirement Flowchart — Free PDF Download',
    description: 'Visual decision tree to determine if you need to file FBAR.',
    url: 'https://fileabroad.com/resources/fbar-flowchart',
  },
};

const faqSchema = buildFAQSchema([
  {
    question: 'What is FBAR and who must file it?',
    answer: 'FBAR (FinCEN Report 114) is required if you have a financial interest in or signature authority over foreign accounts with an aggregate value exceeding $10,000 at any time during the calendar year.',
  },
  {
    question: 'Does owning one foreign account trigger FBAR?',
    answer: 'It depends on the balance. If your single foreign account ever held more than $10,000 during the year, you must file. The threshold is aggregate across all foreign accounts.',
  },
  {
    question: 'What is the difference between FBAR and Form 8938?',
    answer: 'FBAR is filed with FinCEN (Treasury) and has a $10,000 threshold. Form 8938 is filed with the IRS (FATCA) and has higher thresholds ($200,000 year-end for single expats). You may need both.',
  },
  {
    question: 'What if I have never filed FBAR before?',
    answer: 'If your failure was non-willful, you may qualify for the Streamlined Filing Compliance Procedures or a delinquent FBAR submission.',
  },
  {
    question: 'Is this flowchart legally binding advice?',
    answer: 'No. The flowchart is educational and based on publicly available FinCEN and IRS guidance. For your specific situation, consult a qualified tax professional.',
  },
]);

export default function FBARFlowchartPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Resources', href: '/resources/fbar-flowchart' },
            { label: 'FBAR Flowchart', href: '/resources/fbar-flowchart' },
          ]}
        />
      </div>
      <FBARFlowchartPageContent />
      <EditorialSourceNote routePattern="/resources/*" />
      <JsonLd data={faqSchema} />
    </PageShell>
  );
}
