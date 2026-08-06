import { Metadata } from 'next';
import EditorialServicePage from '@/components/services/EditorialServicePage';
import { getDictionary } from '@/lib/i18n/utils';

export const metadata: Metadata = {
  title: 'US Expat Tax Filing Service | File from Abroad',
  description: 'One-on-one U.S. expat tax preparation from abroad, with accepted foreign-reporting work listed in a written scope before preparation.',
  alternates: { canonical: 'https://fileabroad.com/services/expat-tax-filing' },
};

export default async function Page() {
  const dict = getDictionary('en').servicesExpat;

  return (
    <EditorialServicePage
      breadcrumb={dict.breadcrumb}
      slug="expat-tax-filing"
      eyebrow={dict.eyebrow}
      title={dict.title}
      lead={dict.lead}
      price={dict.price}
      priceNote={dict.priceNote}
      cta={dict.cta}
      ctaHref="/intake"
      scopeNote={dict.scopeNote}
      outcomes={dict.outcomes}
      includedTitle={dict.includedTitle}
      included={dict.included}
      process={dict.process}
      qualifications={dict.qualifications}
      faqs={dict.faqs}
      officialSource={{
        label: dict.officialSourceLabel,
        href: 'https://www.irs.gov/individuals/international-taxpayers/us-citizens-and-resident-aliens-abroad',
      }}
    />
  );
}
