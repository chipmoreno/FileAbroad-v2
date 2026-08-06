import { Metadata } from 'next';
import ConsultationLandingPage from '@/components/pages/ConsultationLandingPage';

export const metadata: Metadata = {
  title: 'U.S. Expat Tax Consultation | Written Scope Before Preparation',
  description: 'Book a consultation to map your U.S. expat tax situation, likely forms, records, and next step before preparation begins.',
  alternates: { canonical: 'https://fileabroad.com/consultation' },
  openGraph: {
    title: 'U.S. Expat Tax Consultation | FileAbroad',
    description: 'Map your filing path and receive a written scope before preparation begins.',
    url: 'https://fileabroad.com/consultation',
  },
};

export default function ConsultationPage() {
  return <ConsultationLandingPage />;
}
