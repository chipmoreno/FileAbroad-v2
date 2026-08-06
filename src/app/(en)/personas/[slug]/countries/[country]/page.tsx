import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ProgrammaticMatrixPage from '@/components/pages/ProgrammaticMatrixPage';
import { getPersonaCountryContent, resolvePersonaMatrixSlug } from '@/lib/programmatic-matrix';

interface Props {
  params: Promise<{ slug: string; country: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country } = await params;
  const content = getPersonaCountryContent(slug, country);
  if (!content) return { title: 'Page Not Found' };
  const canonicalSlug = resolvePersonaMatrixSlug(slug);
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: `https://fileabroad.com/personas/${canonicalSlug}/countries/${country}` },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `https://fileabroad.com/personas/${canonicalSlug}/countries/${country}`,
    },
  };
}

export default async function PersonaCountryMatrixPage({ params }: Props) {
  const { slug, country } = await params;
  const canonicalSlug = resolvePersonaMatrixSlug(slug);
  if (canonicalSlug !== slug) redirect(`/personas/${canonicalSlug}/countries/${country}`);
  const content = getPersonaCountryContent(slug, country);
  if (!content) notFound();

  return (
    <ProgrammaticMatrixPage
      content={content}
      eyebrow="Persona × country guide"
      breadcrumbs={[
        { label: 'Personas', href: '/personas' },
        { label: content.heading, href: `/personas/${slug}/countries/${country}` },
      ]}
    />
  );
}
