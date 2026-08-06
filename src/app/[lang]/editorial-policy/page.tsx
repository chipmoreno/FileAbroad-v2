import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import EditorialPolicyPageContent from '@/components/pages/EditorialPolicyPageContent';
import { extractLocale } from '@/lib/i18n/metadata';
import { getDictionary, localizePath, getCanonicalUrl, generateHreflang } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  return {
    title: dict.editorialPolicy.pageTitle,
    description: dict.editorialPolicy.pageDescription,
    alternates: {
      canonical: getCanonicalUrl('/editorial-policy', locale),
      languages: generateHreflang('/editorial-policy'),
    },
  };
}

export default async function EditorialPolicyPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.editorialPolicy, href: l('/editorial-policy') }]} />
      </div>
      <EditorialPolicyPageContent dict={dict} />
    </PageShell>
  );
}
