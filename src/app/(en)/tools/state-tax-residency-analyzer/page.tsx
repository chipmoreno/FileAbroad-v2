import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import StateTaxResidencyAnalyzer from '@/components/tools/StateTaxResidencyAnalyzer';
import { buildHowToSchema, buildSoftwareApplicationSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'State Tax Residency Analyzer for US Expats',
  description:
    'Find out which US states may still claim you as a tax resident. Answer 6 questions and get a risk level with state-specific guidance.',
  keywords: ['state tax residency', 'sticky state', 'expat state taxes', 'California expat tax', 'Virginia tax residency', 'domicile test'],
  alternates: { canonical: 'https://fileabroad.com/tools/state-tax-residency-analyzer' },
};

const schema = buildHowToSchema({
  name: 'How to Analyze Your State Tax Residency Risk',
  description: 'Answer 6 questions about your ties to a former US state to assess residency risk.',
  steps: [
    { name: 'Select your former state', text: 'Choose the last state you lived in before moving abroad.' },
    { name: 'Report property ties', text: 'Indicate if you still own real estate there.' },
    { name: 'Report license ties', text: 'Indicate if you still hold a driver\'s license there.' },
    { name: 'Report voter ties', text: 'Indicate if you are still registered to vote there.' },
    { name: 'Report financial ties', text: 'Indicate if you still maintain bank accounts there.' },
    { name: 'Report days present', text: 'Indicate how many days you spent in the state last year.' },
  ],
});

const appSchema = buildSoftwareApplicationSchema({
  name: 'State Tax Residency Analyzer',
  description: 'Assess which US states may still claim you as a tax resident based on your remaining ties.',
  url: '/tools/state-tax-residency-analyzer',
  applicationCategory: 'FinanceApplication',
  featureList: ['Residency risk scoring', 'State-specific guidance', 'Sticky-state detection'],
});

export default function StateTaxResidencyAnalyzerPage() {
  return (
    <PageShell>
      <ToolLayout
        title="State Tax Residency Analyzer"
        description="Find out which US states may still claim you as a tax resident."
        breadcrumbLabel="State Tax Residency Analyzer"
        breadcrumbHref="/tools/state-tax-residency-analyzer"
        schema={schema}
      >
        <StateTaxResidencyAnalyzer />
      </ToolLayout>
      <JsonLd data={appSchema} />
    </PageShell>
  );
}
