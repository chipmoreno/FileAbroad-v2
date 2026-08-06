import type { Metadata } from 'next';
import PaymentRetainerSuccessPageContent from '@/components/pages/PaymentRetainerSuccessPageContent';

export const metadata: Metadata = {
  title: 'Invoice created - next steps',
  description:
    'Your FileAbroad service invoice has been created. Check your email for the secure payment link.',
  robots: { index: false, follow: false },
};

type SearchParams = {
  invoice?: string;
  amount?: string;
  service?: string;
  year?: string;
};

export default async function RetainerSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const invoice = sp.invoice ?? '';
  const amount = Number(sp.amount) || 0;
  const year = sp.year ? Number(sp.year) : null;
  const serviceRaw = (sp.service ?? '') as import('@/lib/pricing').ServiceKey;

  return (
    <PaymentRetainerSuccessPageContent
      invoice={invoice}
      amount={amount}
      year={year}
      serviceRaw={serviceRaw}
    />
  );
}
