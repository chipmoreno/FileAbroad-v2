import { Metadata } from 'next';
import EditorialServicePage from '@/components/services/EditorialServicePage';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'FATCA Compliance & Form 8938 Filing for Expats',
  description: 'Form 8938 preparation for Americans abroad after a filing-status, residence, threshold, and asset-scope review.',
  alternates: { canonical: 'https://fileabroad.com/services/fatca-compliance' },
};

export default async function Page() {
  const dict = getDictionary('en').servicesFatca;

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
      ctaHref="/intake?service=fatca"
      scopeNote={dict.scopeNote}
      outcomes={dict.outcomes}
      includedTitle={dict.includedTitle}
      included={dict.included}
      process={dict.process}
      qualifications={dict.qualifications}
      faqs={dict.faqs}
      officialSource={{
        label: dict.officialSourceLabel,
        href: 'https://www.irs.gov/businesses/corporations/do-i-need-to-file-form-8938-statement-of-specified-foreign-financial-assets',
      }}
    />
  );
}
