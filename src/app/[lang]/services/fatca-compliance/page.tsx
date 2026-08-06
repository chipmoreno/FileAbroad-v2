import { Metadata } from 'next';
import EditorialServicePage from '@/components/services/EditorialServicePage';
import { extractLocale, generateLocalizedMetadata } from '@/lib/i18n/metadata';
import { getDictionary, localizePath } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale).servicesFatca;
  return generateLocalizedMetadata({
    pageKey: 'services',
    path: '/services/fatca-compliance',
    locale,
    overrides: { title: dict.title, description: dict.lead },
  });
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale).servicesFatca;
  const l = (path: string) => localizePath(path, locale);

  return (
    <EditorialServicePage
      breadcrumb={dict.breadcrumb}
      slug="fatca-compliance"
      eyebrow={dict.eyebrow}
      title={dict.title}
      lead={dict.lead}
      price={dict.price}
      priceNote={dict.priceNote}
      cta={dict.cta}
      ctaHref={l('/intake?service=fatca')}
      scopeNote={dict.scopeNote}
      outcomes={dict.outcomes}
      includedTitle={dict.includedTitle}
      included={dict.included}
      process={dict.process}
      qualifications={dict.qualifications}
      faqs={dict.faqs}
      locale={locale}
      officialSource={{
        label: dict.officialSourceLabel,
        href: 'https://www.irs.gov/businesses/corporations/do-i-need-to-file-form-8938-statement-of-specified-foreign-financial-assets',
      }}
    />
  );
}
