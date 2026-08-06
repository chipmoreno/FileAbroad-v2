import { Metadata } from 'next';
import EditorialServicePage from '@/components/services/EditorialServicePage';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'FBAR Filing Service | Foreign Bank Account Reporting',
  description: 'FBAR preparation for Americans abroad after a facts-and-scope review. Current-year and late filings are screened separately.',
  alternates: { canonical: 'https://fileabroad.com/services/fbar-filing' },
};

export default async function Page() {
  const dict = getDictionary('en').servicesFbar;

  return (
    <EditorialServicePage
      breadcrumb={dict.breadcrumb}
      slug="fbar-filing"
      eyebrow={dict.eyebrow}
      title={dict.title}
      lead={dict.lead}
      price={dict.price}
      priceNote={dict.priceNote}
      cta={dict.cta}
      ctaHref="/intake?service=fbar"
      scopeNote={dict.scopeNote}
      outcomes={dict.outcomes}
      includedTitle={dict.includedTitle}
      included={dict.included}
      process={dict.process}
      qualifications={dict.qualifications}
      faqs={dict.faqs}
      officialSource={{
        label: dict.officialSourceLabel,
        href: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar',
      }}
    />
  );
}
