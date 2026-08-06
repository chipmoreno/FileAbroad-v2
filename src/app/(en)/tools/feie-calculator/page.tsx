import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import FEIECalculator from '@/components/tools/FEIECalculator';
import { buildHowToSchema, buildSoftwareApplicationSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'FEIE Savings Calculator (2026 Filing Season) for US Expats',
  description:
    'Free FEIE calculator for US expats. Estimate your Foreign Earned Income Exclusion savings for tax year 2025 ($130,000 limit). Enter your income and see results instantly.',
  keywords: ['FEIE calculator', 'foreign earned income exclusion calculator', 'expat tax calculator', 'Form 2555 calculator', 'feie savings calculator', 'feie tax calculator', 'foreign income exclusion calculator', 'foreign earned income calculator'],
  alternates: { canonical: 'https://fileabroad.com/tools/feie-calculator' },
};

const schema = buildHowToSchema({
  name: 'How to Calculate Your FEIE Savings',
  description: 'Use this calculator to estimate your tax savings from the Foreign Earned Income Exclusion.',
  steps: [
    { name: 'Enter your foreign earned income', text: 'Input your total foreign earned income for the 2025 tax year.' },
    { name: 'Add housing expenses', text: 'Enter your annual foreign housing expenses (rent, utilities, etc.).' },
    { name: 'Select filing status', text: 'Choose Single/HOH or Married Filing Jointly.' },
    { name: 'View your results', text: 'See your estimated FEIE exclusion and potential tax savings.' },
  ],
});

const appSchema = buildSoftwareApplicationSchema({
  name: 'FEIE Savings Calculator',
  description: 'Estimate your Foreign Earned Income Exclusion savings for US expats.',
  url: '/tools/feie-calculator',
  applicationCategory: 'FinanceApplication',
  featureList: ['Estimate FEIE savings', 'Foreign housing exclusion', 'Side-by-side comparison'],
});

export default function FEIECalculatorPage() {
  return (
    <PageShell>
      <ToolLayout
        title="FEIE Calculator"
        description="Estimate how much you could save with the Foreign Earned Income Exclusion (Form 2555). The 2025 exclusion limit is $130,000."
        breadcrumbLabel="FEIE Calculator"
        breadcrumbHref="/tools/feie-calculator"
        schema={schema}
      >
        <FEIECalculator />
      </ToolLayout>
      <JsonLd data={appSchema} />
    </PageShell>
  );
}
