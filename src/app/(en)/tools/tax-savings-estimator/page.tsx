import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import TaxSavingsEstimator from '@/components/tools/TaxSavingsEstimator';
import { buildHowToSchema, buildSoftwareApplicationSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'FEIE vs FTC Estimator - Which Saves You More?',
  description:
    'Compare the Foreign Earned Income Exclusion vs Foreign Tax Credit side by side. See which strategy saves you more on your US expat taxes.',
  keywords: ['FEIE vs FTC', 'foreign earned income exclusion vs foreign tax credit', 'expat tax savings', 'which is better FEIE FTC'],
  alternates: { canonical: 'https://fileabroad.com/tools/tax-savings-estimator' },
};

const schema = buildHowToSchema({
  name: 'How to Compare FEIE vs Foreign Tax Credit',
  description: 'Use this tool to determine whether FEIE or FTC saves you more on taxes.',
  steps: [
    { name: 'Enter foreign income', text: 'Input your total foreign earned income for the tax year.' },
    { name: 'Enter foreign taxes paid', text: 'Input the total income taxes you paid to your country of residence.' },
    { name: 'Select filing status', text: 'Choose your US tax filing status.' },
    { name: 'Compare results', text: 'View the side-by-side comparison showing which method saves more.' },
  ],
});

const appSchema = buildSoftwareApplicationSchema({
  name: 'FEIE vs FTC Tax Savings Estimator',
  description: 'Compare the Foreign Earned Income Exclusion vs Foreign Tax Credit side by side.',
  url: '/tools/tax-savings-estimator',
  applicationCategory: 'FinanceApplication',
  featureList: ['Side-by-side comparison', 'FEIE estimation', 'FTC estimation'],
});

export default function TaxSavingsEstimatorPage() {
  return (
    <PageShell>
      <ToolLayout
        title="FEIE vs FTC Estimator"
        description="Should you use the Foreign Earned Income Exclusion or the Foreign Tax Credit? Enter your details for a side-by-side comparison."
        breadcrumbLabel="FEIE vs FTC Estimator"
        breadcrumbHref="/tools/tax-savings-estimator"
        schema={schema}
      >
        <TaxSavingsEstimator />
      </ToolLayout>
      <JsonLd data={appSchema} />
    </PageShell>
  );
}
