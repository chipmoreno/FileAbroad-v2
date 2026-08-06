import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import FBARChecker from '@/components/tools/FBARChecker';
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
  const copy = getLocalizedToolCopy(locale, 'fbar-checker');
  return {
    title: copy.title,
    description: copy.description,
    keywords: ['FBAR checker', 'do I need to file FBAR', 'FinCEN 114 requirements', 'foreign bank account reporting'],
    alternates: {
      canonical: getCanonicalUrl('/tools/fbar-checker', locale),
      languages: generateHreflang('/tools/fbar-checker'),
    },
  };
}

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

export default async function FBARCheckerPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = getLocalizedToolCopy(locale, 'fbar-checker');
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <ToolLayout
        title={copy.title}
        description={copy.description}
        breadcrumbLabel={copy.breadcrumb}
        breadcrumbHref={l('/tools/fbar-checker')}
        schema={schema}
      >
        <FBARChecker />
      </ToolLayout>
    </PageShell>
  );
}
