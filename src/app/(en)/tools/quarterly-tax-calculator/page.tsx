import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import QuarterlyTaxCalculator from '@/components/tools/QuarterlyTaxCalculator';
import { buildHowToSchema, buildSoftwareApplicationSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Quarterly Tax Calculator for Self-Employed Expats',
  description:
    'Estimate your quarterly estimated tax payments as a self-employed American abroad. Accounts for FEIE, foreign tax credits, and self-employment tax.',
  keywords: ['quarterly tax calculator', 'self-employed expat taxes', '1040-ES calculator', 'expat estimated tax', 'foreign tax credit calculator', 'SE tax calculator'],
  alternates: { canonical: 'https://fileabroad.com/tools/quarterly-tax-calculator' },
};

const schema = buildHowToSchema({
  name: 'How to Calculate Quarterly Estimated Taxes as a Self-Employed Expat',
  description: 'Enter your income, foreign tax paid, filing status, and FEIE eligibility to estimate quarterly payments.',
  steps: [
    { name: 'Enter net self-employment income', text: 'Input your estimated annual net profit from self-employment.' },
    { name: 'Enter foreign tax paid', text: 'Input the total income tax you expect to pay to your host country.' },
    { name: 'Select filing status', text: 'Choose Single/HOH or Married Filing Jointly.' },
    { name: 'Indicate FEIE eligibility', text: 'Let us know if you qualify for the Foreign Earned Income Exclusion.' },
    { name: 'View quarterly estimate', text: 'See your estimated payment amount and due dates.' },
  ],
});

const appSchema = buildSoftwareApplicationSchema({
  name: 'Quarterly Tax Calculator for Self-Employed Expats',
  description: 'Estimate quarterly estimated tax payments as a self-employed American abroad.',
  url: '/tools/quarterly-tax-calculator',
  applicationCategory: 'FinanceApplication',
  featureList: ['Quarterly payment estimate', 'FEIE adjustment', 'Foreign tax credit', 'Due date calendar'],
});

export default function QuarterlyTaxCalculatorPage() {
  return (
    <PageShell>
      <ToolLayout
        title="Quarterly Tax Calculator for Self-Employed Expats"
        description="Estimate your quarterly estimated tax payments as a self-employed American abroad."
        breadcrumbLabel="Quarterly Tax Calculator"
        breadcrumbHref="/tools/quarterly-tax-calculator"
        schema={schema}
      >
        <QuarterlyTaxCalculator />
      </ToolLayout>
      <JsonLd data={appSchema} />
    </PageShell>
  );
}
