import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ExpatTaxChecklistPageContent from '@/components/pages/ExpatTaxChecklistPageContent';
import { extractLocale } from '@/lib/i18n/metadata';
import { localizePath, getCanonicalUrl, generateHreflang } from '@/lib/i18n/utils';
import { localizedResourceCopy } from '@/lib/i18n/localized-resource-copy';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = localizedResourceCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: getCanonicalUrl('/resources/expat-tax-checklist', locale),
      languages: generateHreflang('/resources/expat-tax-checklist'),
    },
    openGraph: {
      title: 'Free Expat Tax Checklist 2026',
      description: 'The essential pre-move, mid-year, and post-move tax checklist for Americans living abroad.',
      url: getCanonicalUrl('/resources/expat-tax-checklist', locale),
    },
  };
}

export default async function ExpatTaxChecklistPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Resources', href: l('/resources/expat-tax-checklist') },
            { label: 'Expat Tax Checklist', href: l('/resources/expat-tax-checklist') },
          ]}
        />
      </div>
      <ExpatTaxChecklistPageContent locale={locale} />
    </PageShell>
  );
}
