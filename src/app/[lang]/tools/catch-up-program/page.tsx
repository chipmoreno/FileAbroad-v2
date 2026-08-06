import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import CatchUpProgramFinder from '@/components/tools/CatchUpProgramFinder';
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
  const copy = getLocalizedToolCopy(locale, 'catch-up-program');
  return {
    title: copy.title,
    description: copy.description,
    keywords: [
      'streamlined filing procedures',
      'streamlined foreign offshore',
      'streamlined domestic offshore',
      'late FBAR filing review',
      'missing international information return',
      'IRS amnesty program',
      'catch up on US taxes abroad',
      'haven\'t filed US taxes',
      'which streamlined program',
    ],
    alternates: {
      canonical: getCanonicalUrl('/tools/catch-up-program', locale),
      languages: generateHreflang('/tools/catch-up-program'),
    },
    openGraph: {
      title: 'IRS Catch-Up Program Finder',
      description:
        'Review common IRS catch-up paths and identify when attorney or credentialed-representative review is needed.',
      url: getCanonicalUrl('/tools/catch-up-program', locale),
    },
  };
}

const schema = buildHowToSchema({
  name: 'How to Review Common IRS Catch-Up Paths',
  description:
    'Educational decision tree introducing common IRS catch-up paths for unfiled U.S. tax returns, FBARs, or information returns. It does not determine eligibility or willfulness.',
  steps: [
    {
      name: 'Confirm no active IRS action',
      text: 'The catch-up programs require you are not currently under IRS audit or criminal investigation for the years in question.',
    },
    {
      name: 'Determine what was missed',
      text: 'Identify whether you missed tax returns entirely, missed only FBARs, or missed only international information returns.',
    },
    {
      name: 'Escalate intent questions',
      text: 'Do not use this tool to decide willfulness. Uncertain intent, voluntary disclosure, or potential legal exposure requires advice from an experienced tax attorney.',
    },
    {
      name: 'Check residency',
      text: 'Review the program non-residency requirements and other eligibility facts with an appropriate professional before choosing a Streamlined path.',
    },
    {
      name: 'Submit the correct package',
      text: 'Each path has specific forms, certifications, deadlines, and eligibility rules. Confirm the current official instructions before submitting anything.',
    },
  ],
});

export default async function CatchUpProgramPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = getLocalizedToolCopy(locale, 'catch-up-program');
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <ToolLayout
        title={copy.title}
        description={copy.description}
        breadcrumbLabel={copy.breadcrumb}
        breadcrumbHref={l('/tools/catch-up-program')}
        schema={schema}
      >
        <CatchUpProgramFinder />
      </ToolLayout>
    </PageShell>
  );
}
