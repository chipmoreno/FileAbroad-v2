import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RetainerCheckoutForm } from '@/components/retainer/RetainerCheckoutForm';
import {
  CHECKOUT_SERVICE_KEYS,
  DEFAULT_TAX_YEAR,
  SERVICE_PRICING,
  formatUsd,
  getServiceFirstMilestoneAmount,
  type ServiceKey,
} from '@/lib/pricing';

export const dynamic = 'force-static';
export const dynamicParams = true;

type Params = { serviceType: string };

function isServiceKey(value: string): value is ServiceKey {
  return (CHECKOUT_SERVICE_KEYS as string[]).includes(value);
}

export function generateStaticParams() {
  return CHECKOUT_SERVICE_KEYS.map((serviceType) => ({ serviceType }));
}

function normalizeServiceType(raw: string): ServiceKey | null {
  const lower = raw.toLowerCase();
  for (const key of CHECKOUT_SERVICE_KEYS) {
    if (lower === key.toLowerCase()) return key;
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { serviceType } = await params;
  const key = normalizeServiceType(serviceType);
  if (!key) return { title: 'Checkout' };
  const pricing = SERVICE_PRICING[key];
  const amount = getServiceFirstMilestoneAmount(key);
  return {
    title: `Pay ${formatUsd(amount)} \u2014 ${pricing.label}`,
    description: `Pay for the ${pricing.label} via Mercury ACH debit. Secure hosted invoice sent to your email.`,
    robots: { index: false, follow: false },
  };
}

export default async function RetainerCheckoutPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { serviceType } = await params;
  const key = normalizeServiceType(serviceType);
  if (!key || !isServiceKey(key)) notFound();

  const pricing = SERVICE_PRICING[key];
  const availableAddOns = (pricing.availableAddOns ?? []).map((k) => ({
    key: k,
    label: SERVICE_PRICING[k].label,
    amount: getServiceFirstMilestoneAmount(k),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-20">
        <RetainerCheckoutForm
          serviceType={key}
          serviceLabel={pricing.label}
          requiresYear={Boolean(pricing.requiresYear)}
          defaultYear={pricing.defaultYear ?? DEFAULT_TAX_YEAR}
          availableAddOns={availableAddOns}
        />
      </main>
      <Footer />
    </div>
  );
}
