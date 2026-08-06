import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProgrammaticMatrixPage from '@/components/pages/ProgrammaticMatrixPage';
import { getStateServiceContent } from '@/lib/programmatic-matrix';

interface Props {
  params: Promise<{ state: string; service: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, service } = await params;
  const content = getStateServiceContent(state, service);
  if (!content) return { title: 'Page Not Found' };
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: `https://fileabroad.com/state-taxes/${state}/services/${service}` },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `https://fileabroad.com/state-taxes/${state}/services/${service}`,
    },
  };
}

export default async function StateServiceMatrixPage({ params }: Props) {
  const { state, service } = await params;
  const content = getStateServiceContent(state, service);
  if (!content) notFound();

  return (
    <ProgrammaticMatrixPage
      content={content}
      eyebrow="State × service guide"
      breadcrumbs={[
        { label: 'State taxes', href: '/state-taxes' },
        { label: content.heading, href: `/state-taxes/${state}/services/${service}` },
      ]}
    />
  );
}
