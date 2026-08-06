import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProgrammaticMatrixPage from '@/components/pages/ProgrammaticMatrixPage';
import { getMatrixFormCountryContent } from '@/lib/programmatic-matrix';

interface Props {
  params: Promise<{ country: string; form: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, form } = await params;
  const content = getMatrixFormCountryContent(country, form);
  if (!content) return { title: 'Page Not Found' };
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: `https://fileabroad.com/countries/${country}/${form}` },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `https://fileabroad.com/countries/${country}/${form}`,
    },
  };
}

export default async function CountryFormMatrixPage({ params }: Props) {
  const { country, form } = await params;
  const content = getMatrixFormCountryContent(country, form);
  if (!content) notFound();

  return (
    <ProgrammaticMatrixPage
      content={content}
      eyebrow="Country × form guide"
      breadcrumbs={[
        { label: 'Countries', href: '/countries' },
        { label: content.heading, href: `/countries/${country}/${form}` },
      ]}
    />
  );
}
