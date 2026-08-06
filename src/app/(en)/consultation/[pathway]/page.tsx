import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ConsultationLandingPage from '@/components/pages/ConsultationLandingPage';
import { consultationPathways, getConsultationPathway, type ConsultationPathway } from '@/lib/consultation';

interface Props {
  params: Promise<{ pathway: string }>;
}

export function generateStaticParams() {
  return consultationPathways
    .filter((item) => item.slug !== 'general')
    .map((item) => ({ pathway: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pathway } = await params;
  const data = getConsultationPathway(pathway);
  if (data.slug === 'general' || data.slug !== pathway) return { title: 'Consultation path not found' };

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `https://fileabroad.com/consultation/${data.slug}` },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://fileabroad.com/consultation/${data.slug}`,
    },
  };
}

export default async function ConsultationPathwayPage({ params }: Props) {
  const { pathway } = await params;
  if (!consultationPathways.some((item) => item.slug === pathway && item.slug !== 'general')) notFound();

  return <ConsultationLandingPage pathway={pathway as Exclude<ConsultationPathway, 'general'>} />;
}
