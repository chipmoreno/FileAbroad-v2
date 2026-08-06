import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ConsultationLandingPage from '@/components/pages/ConsultationLandingPage';
import { consultationPathways, getConsultationPathway, type ConsultationPathway } from '@/lib/consultation';
import { extractLocale } from '@/lib/i18n/metadata';

interface Props {
  params: Promise<{ lang: string; pathway: string }>;
}

export function generateStaticParams() {
  return consultationPathways
    .filter((item) => item.slug !== 'general')
    .map((item) => ({ pathway: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, pathway } = await params;
  const locale = extractLocale({ lang });
  const data = getConsultationPathway(pathway);
  if (data.slug === 'general' || data.slug !== pathway) return { title: 'Consultation path not found' };

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `https://fileabroad.com/${locale}/consultation/${data.slug}` },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://fileabroad.com/${locale}/consultation/${data.slug}`,
    },
  };
}

export default async function LocalizedConsultationPathwayPage({ params }: Props) {
  const { lang, pathway } = await params;
  if (!consultationPathways.some((item) => item.slug === pathway && item.slug !== 'general')) notFound();

  return <ConsultationLandingPage locale={extractLocale({ lang })} pathway={pathway as Exclude<ConsultationPathway, 'general'>} />;
}
