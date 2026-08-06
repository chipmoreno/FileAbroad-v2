import ConsultationLandingPage from '@/components/pages/ConsultationLandingPage';
import { extractLocale } from '@/lib/i18n/metadata';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function LocalizedConsultationPage({ params }: Props) {
  const { lang } = await params;
  return <ConsultationLandingPage locale={extractLocale({ lang })} />;
}
