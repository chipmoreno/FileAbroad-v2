import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import StateTaxesHubPageContent from '@/components/pages/StateTaxesHubPageContent';
import { extractLocale } from '@/lib/i18n/metadata';
import { localizePath, getCanonicalUrl, generateHreflang } from '@/lib/i18n/utils';
import { localizedPageCopy } from '@/lib/i18n/localized-page-copy';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = localizedPageCopy[locale].stateTaxes;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: getCanonicalUrl('/state-taxes', locale),
      languages: generateHreflang('/state-taxes'),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: getCanonicalUrl('/state-taxes', locale),
    },
  };
}

export default async function StateTaxesHubPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumbs items={[{ label: 'State Taxes', href: l('/state-taxes') }]} />
      </div>
      <StateTaxesHubPageContent locale={locale} />
    </PageShell>
  );
}
