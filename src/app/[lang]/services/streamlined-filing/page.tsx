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
  const dict = getDictionary(locale).servicesStreamlined;
  return generateLocalizedMetadata({
    pageKey: 'services',
    path: '/services/streamlined-filing',
    locale,
    overrides: { title: dict.title, description: dict.lead },
  });
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale).servicesStreamlined;
  const l = (path: string) => localizePath(path, locale);

  return (
    <EditorialServicePage
      breadcrumb={dict.breadcrumb}
      slug="streamlined-filing"
      eyebrow={dict.eyebrow}
      title={dict.title}
      lead={dict.lead}
      price={dict.price}
      priceNote={dict.priceNote}
      cta={dict.cta}
      ctaHref={l('/payment/retainer/consultation30')}
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
        href: 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures',
      }}
    />
  );
}
