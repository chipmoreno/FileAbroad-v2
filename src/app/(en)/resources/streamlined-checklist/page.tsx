import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import StreamlinedChecklistPageContent from '@/components/pages/StreamlinedChecklistPageContent';
import { buildFAQSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import EditorialSourceNote from '@/components/seo/EditorialSourceNote';

export const metadata: Metadata = {
  title: 'Streamlined Filing Document Checklist — Free PDF Download',
  description:
    'The exact documents you need for Streamlined Foreign Offshore filing. Free printable checklist with templates and tracking worksheets.',
  alternates: { canonical: 'https://fileabroad.com/resources/streamlined-checklist' },
  openGraph: {
    title: 'Streamlined Filing Document Checklist — Free PDF Download',
    description: 'The exact documents you need for Streamlined Foreign Offshore filing.',
    url: 'https://fileabroad.com/resources/streamlined-checklist',
  },
};

const faqSchema = buildFAQSchema([
  {
    question: 'What is Streamlined Foreign Offshore?',
    answer: 'It is an IRS program for non-willful non-filers living abroad. You file 3 years of delinquent tax returns and 6 years of FBARs, and the IRS waives failure-to-file and failure-to-pay penalties.',
  },
  {
    question: 'Do I qualify for Streamlined?',
    answer: 'You must certify that your failure to file was non-willful. You must also have lived outside the US for at least 330 days in one of the last 3 years or be a bona fide resident of another country.',
  },
  {
    question: 'Will I owe penalties under Streamlined?',
    answer: 'The IRS generally waives failure-to-file and failure-to-pay penalties under Streamlined Foreign Offshore. However, you still owe any tax due plus interest.',
  },
  {
    question: 'What documents do I need for the 3 years of returns?',
    answer: 'You need income documents, foreign tax documents, bank statements for FBAR maximum balances, proof of FEIE qualification, and a non-willfulness statement.',
  },
  {
    question: 'Can I do Streamlined filing myself?',
    answer: 'Some taxpayers do, but Streamlined returns often involve currency conversion, treaty positions, and FEIE calculations. Many expats hire a preparer to avoid errors.',
  },
]);

export default function StreamlinedChecklistPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Resources', href: '/resources/streamlined-checklist' },
            { label: 'Streamlined Checklist', href: '/resources/streamlined-checklist' },
          ]}
        />
      </div>
      <StreamlinedChecklistPageContent />
      <EditorialSourceNote routePattern="/resources/*" />
      <JsonLd data={faqSchema} />
    </PageShell>
  );
}
