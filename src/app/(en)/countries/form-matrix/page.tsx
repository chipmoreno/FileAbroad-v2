import type { Metadata } from 'next';
import ProgrammaticMatrixIndexPage from '@/components/pages/ProgrammaticMatrixIndexPage';
import { MATRIX_COUNTRY_PROFILES, MATRIX_FORM_DEFINITIONS } from '@/lib/programmatic-matrix';

export const metadata: Metadata = {
  title: 'Country × Form Tax Guides for Americans Abroad',
  description: 'Browse source-backed country and U.S. form intersections for Americans abroad.',
  alternates: { canonical: 'https://fileabroad.com/countries/form-matrix' },
};

export default function CountryFormMatrixIndexPage() {
  return (
    <ProgrammaticMatrixIndexPage
      title="Country × Form tax guides"
      description="Each guide combines a country record, a U.S. form definition, primary-source links, records to gather, and a consultation boundary. These pages are screening maps, not automatic filing determinations."
      sections={MATRIX_COUNTRY_PROFILES.map((country) => ({
        heading: country.name,
        links: MATRIX_FORM_DEFINITIONS.map((form) => ({
          label: `Form ${form.number} in ${country.name}`,
          href: `/countries/${country.slug}/form-${form.slug}`,
        })),
      }))}
    />
  );
}
