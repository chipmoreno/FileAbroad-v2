import type { Metadata } from 'next';
import ProgrammaticMatrixIndexPage from '@/components/pages/ProgrammaticMatrixIndexPage';
import { getStateBySlug } from '@/lib/state-taxes';
import { MATRIX_SERVICE_DEFINITIONS, MATRIX_STATE_SLUGS } from '@/lib/programmatic-matrix';

export const metadata: Metadata = {
  title: 'State × Service Tax Guides for Americans Abroad',
  description: 'Browse state domicile, sourcing, and service intersections for Americans abroad.',
  alternates: { canonical: 'https://fileabroad.com/state-taxes/service-matrix' },
};

export default function StateServiceMatrixIndexPage() {
  return (
    <ProgrammaticMatrixIndexPage
      title="State × Service tax guides"
      description="Review how a state domicile and sourcing file changes the records needed for a specific expat tax service."
      sections={MATRIX_STATE_SLUGS.map((slug) => {
        const state = getStateBySlug(slug);
        return {
          heading: state?.name || slug,
          links: MATRIX_SERVICE_DEFINITIONS.map((service) => ({
            label: `${state?.name || slug}: ${service.name}`,
            href: `/state-taxes/${slug}/services/${service.slug}`,
          })),
        };
      })}
    />
  );
}
