import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PersonasHubPageContent from '@/components/pages/PersonasHubPageContent';
import { extractLocale } from '@/lib/i18n/metadata';
import { localizePath, getCanonicalUrl, generateHreflang } from '@/lib/i18n/utils';
import { localizedPageCopy } from '@/lib/i18n/localized-page-copy';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = localizedPageCopy[locale].personas;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: getCanonicalUrl('/personas', locale),
      languages: generateHreflang('/personas'),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: getCanonicalUrl('/personas', locale),
    },
  };
}

export default async function PersonasHubPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumbs items={[{ label: 'Who We Help', href: l('/personas') }]} />
      </div>
      <PersonasHubPageContent locale={locale} />
    </PageShell>
  );
}
