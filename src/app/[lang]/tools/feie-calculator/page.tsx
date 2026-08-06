import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import FEIECalculator from '@/components/tools/FEIECalculator';
import { buildHowToSchema } from '@/lib/structured-data';
import { extractLocale } from '@/lib/i18n/metadata';
import { localizePath, getCanonicalUrl, generateHreflang } from '@/lib/i18n/utils';
import { getLocalizedToolCopy } from '@/lib/i18n/localized-tool-copy';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = getLocalizedToolCopy(locale, 'feie-calculator');
  return {
    title: copy.title,
    description: copy.description,
    keywords: ['FEIE calculator', 'foreign earned income exclusion calculator', 'expat tax calculator', 'Form 2555 calculator', 'feie savings calculator', 'feie tax calculator', 'foreign income exclusion calculator', 'foreign earned income calculator'],
    alternates: {
      canonical: getCanonicalUrl('/tools/feie-calculator', locale),
      languages: generateHreflang('/tools/feie-calculator'),
    },
  };
}

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

export default async function FEIECalculatorPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = getLocalizedToolCopy(locale, 'feie-calculator');
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <ToolLayout
        title={copy.title}
        description={copy.description}
        breadcrumbLabel={copy.breadcrumb}
        breadcrumbHref={l('/tools/feie-calculator')}
        schema={schema}
      >
        <FEIECalculator />
      </ToolLayout>
    </PageShell>
  );
}
