import type { Metadata } from 'next';
import PaymentRetainerSuccessPageContent from '@/components/pages/PaymentRetainerSuccessPageContent';
import { extractLocale } from '@/lib/i18n/metadata';
import { type ServiceKey } from '@/lib/pricing';

type SearchParams = {
  invoice?: string;
  amount?: string;
  service?: string;
  year?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Invoice created - next steps',
    description:
      'Your FileAbroad service invoice has been created. Check your email for the secure payment link.',
    robots: { index: false, follow: false },
  };
}

export default async function RetainerSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const sp = await searchParams;
  const invoice = sp.invoice ?? '';
  const amount = Number(sp.amount) || 0;
  const year = sp.year ? Number(sp.year) : null;
  const serviceRaw = (sp.service ?? '') as ServiceKey;

  return (
    <PaymentRetainerSuccessPageContent
      invoice={invoice}
      amount={amount}
      year={year}
      serviceRaw={serviceRaw}
      locale={locale}
    />
  );
}
