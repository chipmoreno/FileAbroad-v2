import type { Metadata } from 'next';
import ProgrammaticMatrixIndexPage from '@/components/pages/ProgrammaticMatrixIndexPage';
import { getPersonaBySlug } from '@/lib/personas';
import { MATRIX_COUNTRY_PROFILES, MATRIX_PERSONA_SLUGS } from '@/lib/programmatic-matrix';

export const metadata: Metadata = {
  title: 'Persona × Country Tax Guides for Americans Abroad',
  description: 'Browse source-backed persona and country intersections for Americans abroad.',
  alternates: { canonical: 'https://fileabroad.com/personas/country-matrix' },
};

export default function PersonaCountryMatrixIndexPage() {
  return (
    <ProgrammaticMatrixIndexPage
      title="Persona × Country tax guides"
      description="Use these intersections to organize residence, work, income, accounts, forms, state ties, and records for a specific taxpayer profile and country."
      sections={MATRIX_PERSONA_SLUGS.map((slug) => {
        const persona = getPersonaBySlug(slug);
        return {
          heading: persona?.name || slug,
          links: MATRIX_COUNTRY_PROFILES.map((country) => ({
            label: `${persona?.name || slug} in ${country.name}`,
            href: `/personas/${slug}/countries/${country.slug}`,
          })),
        };
      })}
    />
  );
}
