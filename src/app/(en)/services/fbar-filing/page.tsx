import { Metadata } from 'next';
import EditorialServicePage from '@/components/services/EditorialServicePage';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'FBAR Filing & Late FBAR Help for Americans Abroad | Chip Moreno',
  description: 'Foreign accounts over $10,000? You likely must file FBAR. Late? The penalty starts at $10,000 per account. I review your account history and file correctly — from Ecuador. Paid consultation first. Written scope before work.',
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
