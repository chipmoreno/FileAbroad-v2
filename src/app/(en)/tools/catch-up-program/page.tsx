import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import CatchUpProgramFinder from '@/components/tools/CatchUpProgramFinder';
import { buildHowToSchema, buildSoftwareApplicationSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'IRS Catch-Up Path Overview — Educational Screening Tool',
  description:
    'Review educational information about common IRS catch-up paths. This tool does not determine eligibility or willfulness and is not legal advice.',
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
  alternates: { canonical: 'https://fileabroad.com/tools/catch-up-program' },
  openGraph: {
    title: 'IRS Catch-Up Program Finder',
    description:
      'Review common IRS catch-up paths and identify when attorney or credentialed-representative review is needed.',
    url: 'https://fileabroad.com/tools/catch-up-program',
  },
};

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

const appSchema = buildSoftwareApplicationSchema({
  name: 'IRS Catch-Up Program Finder',
  description: 'Review common IRS catch-up paths for unfiled US tax returns and FBARs.',
  url: '/tools/catch-up-program',
  applicationCategory: 'FinanceApplication',
  featureList: ['Streamlined screening', 'Delinquent FBAR guidance', 'Amnesty path overview'],
});

export default function CatchUpProgramPage() {
  return (
    <PageShell>
      <ToolLayout
        title="Which IRS Catch-Up Program Fits Me?"
        description="Review educational information about common catch-up paths. This tool cannot determine eligibility or willfulness and does not replace advice from an attorney or credentialed representative."
        breadcrumbLabel="Catch-Up Program Finder"
        breadcrumbHref="/tools/catch-up-program"
        schema={schema}
      >
        <CatchUpProgramFinder />
      </ToolLayout>
      <JsonLd data={appSchema} />
    </PageShell>
  );
}
