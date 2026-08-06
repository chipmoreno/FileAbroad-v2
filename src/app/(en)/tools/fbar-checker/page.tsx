import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import FBARChecker from '@/components/tools/FBARChecker';
import { buildHowToSchema, buildSoftwareApplicationSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'FBAR Requirement Checker - Do You Need to File FinCEN 114?',
  description:
    'Answer 4 quick questions to find out if you need to file an FBAR (FinCEN Form 114) for your foreign bank accounts as a US citizen abroad.',
  keywords: ['FBAR checker', 'do I need to file FBAR', 'FinCEN 114 requirements', 'foreign bank account reporting'],
  alternates: { canonical: 'https://fileabroad.com/tools/fbar-checker' },
};

const schema = buildHowToSchema({
  name: 'How to Check If You Need to File an FBAR',
  description: 'Answer these questions to determine your FBAR filing requirement.',
  steps: [
    { name: 'Confirm US person status', text: 'Determine if you are a US citizen, green card holder, or tax resident.' },
    { name: 'Check for foreign accounts', text: 'Identify if you have any financial accounts outside the United States.' },
    { name: 'Check the $10,000 threshold', text: 'Determine if total foreign account balances exceeded $10,000 at any point.' },
    { name: 'Confirm signature authority', text: 'Verify if you have signature authority or financial interest in the accounts.' },
  ],
});

const appSchema = buildSoftwareApplicationSchema({
  name: 'FBAR Requirement Checker',
  description: 'Answer 4 quick questions to find out if you need to file an FBAR.',
  url: '/tools/fbar-checker',
  applicationCategory: 'FinanceApplication',
  featureList: ['4-question FBAR check', 'Threshold analysis', 'Signature authority guidance'],
});

export default function FBARCheckerPage() {
  return (
    <PageShell>
      <ToolLayout
        title="FBAR Requirement Checker"
        description="Answer 4 quick questions to find out if you need to file an FBAR (FinCEN Form 114) for your foreign financial accounts."
        breadcrumbLabel="FBAR Checker"
        breadcrumbHref="/tools/fbar-checker"
        schema={schema}
      >
        <FBARChecker />
      </ToolLayout>
      <JsonLd data={appSchema} />
    </PageShell>
  );
}
