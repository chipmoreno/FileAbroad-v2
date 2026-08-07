import { Metadata } from 'next';
import EditorialServicePage from '@/components/services/EditorialServicePage';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'Streamlined Filing for Expats Behind on US Taxes | Chip Moreno',
  description: 'The IRS Streamlined program allows some expats to file past returns without certain penalties — but eligibility is strict. I review your facts in a paid consultation to see if you qualify before any preparation begins.',
  alternates: { canonical: 'https://fileabroad.com/services/streamlined-filing' },
};

export default async function Page() {
  const dict = getDictionary('en').servicesStreamlined;

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
      ctaHref="/consultation/streamlined"
      scopeNote={dict.scopeNote}
      outcomes={dict.outcomes}
      includedTitle={dict.includedTitle}
      included={dict.included}
      process={dict.process}
      qualifications={dict.qualifications}
      faqs={dict.faqs}
      officialSource={{
        label: dict.officialSourceLabel,
        href: 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures',
      }}
    />
  );
}
