import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import TermsPageContent from '@/components/pages/TermsPageContent';
import { extractLocale } from '@/lib/i18n/metadata';
import { getDictionary, getCanonicalUrl, generateHreflang } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  return {
    title: dict.terms.pageTitle,
    description: dict.terms.pageDescription,
    alternates: {
      canonical: getCanonicalUrl('/terms', locale),
      languages: generateHreflang('/terms'),
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);

  return (
    <PageShell locale={locale}>
      <TermsPageContent dict={dict} />
    </PageShell>
  );
}
