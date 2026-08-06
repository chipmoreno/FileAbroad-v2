import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PrivacyPageContent from '@/components/pages/PrivacyPageContent';
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
    title: dict.privacy.pageTitle,
    description: dict.privacy.pageDescription,
    alternates: {
      canonical: getCanonicalUrl('/privacy', locale),
      languages: generateHreflang('/privacy'),
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.privacy, href: l('/privacy') }]} />
      </div>
      <PrivacyPageContent dict={dict} />
    </PageShell>
  );
}
