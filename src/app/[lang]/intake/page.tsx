import type { Metadata } from 'next';
import IntakeFormPage from "@/components/intake/IntakeFormPage";
import { extractLocale } from '@/lib/i18n/metadata';
import { getCanonicalUrl, generateHreflang } from '@/lib/i18n/utils';
import { localizedPageCopy } from '@/lib/i18n/localized-page-copy';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = localizedPageCopy[locale].intake;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: getCanonicalUrl('/intake', locale),
      languages: generateHreflang('/intake'),
    },
  };
}

export default async function IntakePage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return <IntakeFormPage locale={locale} />;
}
