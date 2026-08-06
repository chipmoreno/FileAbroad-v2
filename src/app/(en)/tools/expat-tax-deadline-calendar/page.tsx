import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import DeadlineCalendar from '@/components/tools/DeadlineCalendar';
import { buildHowToSchema, buildSoftwareApplicationSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: '2026 Expat Tax Deadline Calendar - Key Dates for Americans Abroad',
  description:
    'Never miss a tax deadline. Interactive calendar of every important date for US expats in 2026: FBAR, tax returns, extensions, and estimated payments.',
  keywords: ['expat tax deadlines 2026', 'FBAR deadline', 'expat filing deadline', 'tax extension dates abroad'],
  alternates: { canonical: 'https://fileabroad.com/tools/expat-tax-deadline-calendar' },
};

const schema = buildHowToSchema({
  name: 'How to Track Expat Tax Deadlines',
  description: 'Use this interactive calendar to stay on top of all important tax dates for Americans abroad.',
  steps: [
    { name: 'Select the tax year', text: 'Choose the current or upcoming tax year to view relevant deadlines.' },
    { name: 'Filter by category', text: 'Narrow down to tax returns, FBAR, extensions, or estimated payments.' },
    { name: 'Add reminders', text: 'Set calendar alerts for key dates to avoid late filing penalties.' },
  ],
});

const appSchema = buildSoftwareApplicationSchema({
  name: 'Expat Tax Deadline Calendar',
  description: 'Interactive calendar of key tax dates for US expats.',
  url: '/tools/expat-tax-deadline-calendar',
  applicationCategory: 'FinanceApplication',
  featureList: ['Deadline tracking', 'Category filtering', 'Year selection'],
});

export default function DeadlineCalendarPage() {
  return (
    <PageShell>
      <ToolLayout
        title="2026 Expat Tax Deadline Calendar"
        description="Every important tax date for Americans living abroad in 2026. Filter by category, expand for details, and never miss a deadline."
        breadcrumbLabel="Deadline Calendar"
        breadcrumbHref="/tools/expat-tax-deadline-calendar"
        schema={schema}
      >
        <DeadlineCalendar />
      </ToolLayout>
      <JsonLd data={appSchema} />
    </PageShell>
  );
}
