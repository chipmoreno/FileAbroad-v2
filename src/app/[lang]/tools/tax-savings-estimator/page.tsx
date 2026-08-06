import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import TaxSavingsEstimator from '@/components/tools/TaxSavingsEstimator';
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
  const copy = getLocalizedToolCopy(locale, 'tax-savings-estimator');
  return {
    title: copy.title,
    description: copy.description,
    keywords: ['FEIE vs FTC', 'foreign earned income exclusion vs foreign tax credit', 'expat tax savings', 'which is better FEIE FTC'],
    alternates: {
      canonical: getCanonicalUrl('/tools/tax-savings-estimator', locale),
      languages: generateHreflang('/tools/tax-savings-estimator'),
    },
  };
}

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

export default async function TaxSavingsEstimatorPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = getLocalizedToolCopy(locale, 'tax-savings-estimator');
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <ToolLayout
        title={copy.title}
        description={copy.description}
        breadcrumbLabel={copy.breadcrumb}
        breadcrumbHref={l('/tools/tax-savings-estimator')}
        schema={schema}
      >
        <TaxSavingsEstimator />
      </ToolLayout>
    </PageShell>
  );
}
