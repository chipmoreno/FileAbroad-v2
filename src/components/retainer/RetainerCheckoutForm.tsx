'use client';

import { useMemo, useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Landmark,
  Loader2,
  Mail,
  User,
  AlertCircle,
  Calendar,
  Check,
} from '@/components/icons';
import {
  formatUsd,
  DEFAULT_TAX_YEAR,
  computeCheckoutTotal,
  SERVICE_PRICING,
  type ServiceKey,
} from '@/lib/pricing';
import { getGaClientId, trackConversionEvent } from '@/components/analytics/ConversionTracking';

type AddOnOption = {
  key: ServiceKey;
  label: string;
  amount: number;
};

type Props = {
  serviceType: ServiceKey;
  serviceLabel: string;
  requiresYear: boolean;
  defaultYear: number;
  availableAddOns: AddOnOption[];
};

type CreateResponse = {
  success: boolean;
  error?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  amount?: number;
  dueDate?: string;
  hostedInvoiceUrl?: string | null;
  customerId?: string;
  serviceType?: ServiceKey;
  year?: number | null;
  addOns?: ServiceKey[];
};

const TAX_FILING_KEYS: ServiceKey[] = ['taxFiling', 'complete'];

export function RetainerCheckoutForm({
  serviceType,
  serviceLabel,
  requiresYear,
  defaultYear,
  availableAddOns,
}: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const year = defaultYear ?? DEFAULT_TAX_YEAR;
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isTaxFiling = TAX_FILING_KEYS.includes(serviceType);
  const isConsultation = [
    'consultation30',
    'consultation60',
    'consultationNonClient',
  ].includes(serviceType);
  const [selectedAddOns, setSelectedAddOns] = useState<ServiceKey[]>([]);

  const totalAmount = useMemo(
    () => computeCheckoutTotal(serviceType, selectedAddOns),
    [serviceType, selectedAddOns]
  );

  function toggleAddOn(key: ServiceKey) {
    setSelectedAddOns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the service terms to continue.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const gaClientId = await getGaClientId();
      const res = await fetch('/api/retainer/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          email,
          name,
          year: requiresYear ? year : undefined,
          addOns: isTaxFiling ? selectedAddOns : undefined,
          agreed: true,
          gaClientId,
        }),
      });
      const data = (await res.json()) as CreateResponse;
      if (!res.ok || !data.success) {
        setError(data.error || 'Could not create your invoice. Please try again.');
        setSubmitting(false);
        return;
      }

      trackConversionEvent('invoice_created', {
        service: serviceType,
        value: data.amount ?? totalAmount,
        currency: 'USD',
      });

      if (data.hostedInvoiceUrl) {
        window.location.assign(data.hostedInvoiceUrl);
        return;
      }

      setSubmitting(false);
      const params = new URLSearchParams({
        invoice: data.invoiceNumber ?? '',
        amount: String(data.amount ?? totalAmount),
        service: serviceType,
        year: data.year ? String(data.year) : '',
      });
      router.push(`/payment/retainer/success?${params.toString()}`);
    } catch {
      setError('Network error. Please try again or email info@fileabroad.com.');
      setSubmitting(false);
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans text-foreground">
            {serviceLabel}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Pay securely via ACH debit through Mercury. I&apos;ll email you a hosted invoice link.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            No US bank account?{' '}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Chip — I don't have a US bank account. Can I pay by card or transfer for my invoice? [FA-GENERAL]")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="checkout"
              data-whatsapp-intent="payment_alternative"
              className="text-secondary hover:underline"
            >
              Message me on WhatsApp for card or transfer options
            </a>.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div
            className="md:col-span-3 bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm"
          >
            <form onSubmit={handleSubmit} data-analytics-form="true" data-form-name="retainer-checkout" className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <User className="h-4 w-4 text-secondary" />
                    Full name
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all text-foreground"
                  placeholder="Jane Smith"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Optional. We&apos;ll derive it from your email if blank.
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-secondary" />
                    Email
                  </span>
                  <span className="text-destructive ml-1">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all text-foreground"
                  placeholder="jane@example.com"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Mercury will send the hosted invoice here. We&apos;ll send your
                  service next steps after payment clears.
                </p>
              </div>

              {requiresYear && (
                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-secondary" />
                      Tax year
                    </span>
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <div
                    id="year"
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground font-semibold"
                  >
                    {year}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Direct checkout is for tax year {year}.{' '}
                    <Link
                      href="/intake?service=consultation"
                      className="font-semibold text-secondary underline underline-offset-2"
                    >
                      Request a quote for another year
                    </Link>
                    .
                  </p>
                </div>
              )}

              {isTaxFiling && availableAddOns.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Add-ons (optional)
                  </label>
                  <div className="space-y-2">
                    {availableAddOns.map((opt) => {
                      const checked = selectedAddOns.includes(opt.key);
                      return (
                        <label
                          key={opt.key}
                          className="flex items-center justify-between gap-3 px-4 py-3 bg-background border border-border rounded-lg cursor-pointer hover:border-secondary/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                                checked
                                  ? 'bg-secondary border-secondary text-secondary-foreground'
                                  : 'border-border'
                              }`}
                            >
                              {checked && <Check className="w-3.5 h-3.5" />}
                            </span>
                            <span className="text-sm text-foreground">
                              {opt.label}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-secondary">
                            {opt.amount > 0 ? `+${formatUsd(opt.amount)}` : ''}
                          </span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddOn(opt.key)}
                            className="sr-only"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {isConsultation && (
                <div className="bg-muted rounded-xl p-5 border border-border">
                  <p className="font-semibold text-foreground">
                    No recording by default
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your call will not be recorded or AI-transcribed unless we ask
                    for your separate permission when you book or at the start of
                    the call.
                  </p>
                </div>
              )}

              <div className="bg-muted rounded-xl p-5 border border-border">
                <h3 className="font-sans text-lg font-bold text-foreground mb-3">
                  Service Terms
                </h3>
                <div className="h-44 overflow-y-auto text-xs text-muted-foreground leading-relaxed bg-card border border-border rounded-lg p-4 mb-4 space-y-3">
                  <p>
                    <strong>FILEABROAD SERVICE AGREEMENT</strong>
                  </p>
                  <p>
                    This agreement is between FileAbroad (a division of Iterative
                    Systems LLC) and the client named above.
                  </p>
                  <p>
                    <strong>Scope.</strong> FileAbroad provides US expat tax
                    preparation and document-support services for the {serviceLabel.toLowerCase()}
                    {requiresYear ? ` (tax year ${year})` : ''}
                    {selectedAddOns.length > 0
                      ? ` with ${selectedAddOns
                          .map(
                            (k) => SERVICE_PRICING[k].label
                          )
                          .join(', ')}`
                      : ''}
                    . This does not include legal representation, audit
                    defense, legal opinions, willfulness analysis, treaty positions,
                    or state and international forms outside the included scope.
                  </p>
                  <p>
                    <strong>No guarantee.</strong> FileAbroad cannot and does
                    not guarantee any specific tax outcome. Final filings are
                    the client&apos;s responsibility; FileAbroad prepares them
                    based on the documents you provide.
                  </p>
                  <p>
                    <strong>Client responsibilities.</strong> The client is
                    responsible for providing complete and accurate information
                    (1099s, W-2s, K-1s, foreign account statements, prior
                    returns), responding to follow-up questions promptly, and
                    reviewing the draft return before filing.
                  </p>
                  <p>
                    <strong>Payments.</strong> The {formatUsd(totalAmount)} fee
                    is non-refundable once preparation has begun. State
                    filings, FBAR-only amendments, prior-year amendments, and
                    additional state returns are quoted separately.
                  </p>
                  {isConsultation && (
                    <p>
                      <strong>Consultation fee.</strong> The consultation is a separate
                      service. If FileAbroad accepts a later preparation engagement,
                      the written scope will state whether the consultation fee is credited.
                      Calls are not recorded or AI-transcribed by default. Any consent
                      request will be made separately at booking or at the start of the call.
                    </p>
                  )}
                  <p>
                    <strong>Documents.</strong> Do not email or send sensitive tax
                    documents through WhatsApp. FileAbroad will provide secure Encyro
                    upload instructions when documents are needed.
                  </p>
                  <p>
                    <strong>Liability limitation.</strong> FileAbroad&apos;s
                    liability is limited to the amount paid for services.
                    FileAbroad is not liable for penalties or interest arising
                    from inaccurate or late client information.
                  </p>
                  <p>
                    By checking the box below and submitting this form, the
                    client agrees to these terms.
                  </p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-5 h-5 text-secondary border-border rounded focus:ring-secondary"
                  />
                  <span className="text-sm text-foreground">
                    I have read and agree to the FileAbroad service terms.
                  </span>
                </label>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive px-5 py-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  submitting ||
                  !email.includes('@') ||
                  !agreed
                }
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:bg-secondary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating your invoice…
                  </>
                ) : (
                  <>
                    <Landmark className="h-5 w-5" />
                    Continue to payment — {formatUsd(totalAmount)}
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                We&apos;ll create a Mercury hosted invoice and email you a secure
                payment link. Nothing is charged until you authorize payment on
                the invoice.
              </p>
            </form>
          </div>

          <aside
            className="md:col-span-2 space-y-4"
          >
            <div className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
              <Image src="/headshot.jpg" alt="Chip Moreno" width={48} height={48} className="rounded-full object-cover" />
              <div>
                <p className="font-semibold text-foreground text-sm">Chip Moreno</p>
                <p className="text-xs text-muted-foreground">PTIN holder · IRS-authorized e-file provider</p>
              </div>
            </div>
            <div className="bg-primary text-primary-foreground rounded-2xl p-6 border border-primary shadow-sm">
              <div className="text-center pb-5 border-b border-white/10">
                <p className="text-secondary text-xs font-semibold tracking-widest uppercase">
                  Due now
                </p>
                <p className="font-sans text-5xl font-bold mt-1">
                  {formatUsd(totalAmount)}
                </p>
                <p className="text-primary-foreground/60 text-sm mt-1">
                  {requiresYear ? `For tax year ${year}` : 'Flat fee'}
                </p>
              </div>

              <div className="pt-5 space-y-2 text-sm">
                <div className="flex items-center justify-between text-primary-foreground/60">
                  <span>Service</span>
                  <span className="text-primary-foreground font-medium text-right">
                    {serviceLabel}
                  </span>
                </div>
                {requiresYear && (
                  <div className="flex items-center justify-between text-primary-foreground/60">
                    <span>Tax year</span>
                    <span className="text-primary-foreground font-medium">{year}</span>
                  </div>
                )}
                {selectedAddOns.length > 0 && (
                  <div className="flex items-start justify-between text-primary-foreground/60 gap-3">
                    <span>Add-ons</span>
                    <span className="text-primary-foreground font-medium text-right">
                      {selectedAddOns
                        .map((k) => `+ ${SERVICE_PRICING[k].label}`)
                        .join('\n')}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-primary-foreground/50 text-xs leading-relaxed">
                  Government fees, state filing fees (if required), and any
                  third-party costs are billed separately.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-sans text-lg font-bold text-foreground mb-3">
                What happens next
              </h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  I&apos;ll email you a secure Mercury link to pay by ACH debit.
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  After payment clears, I&apos;ll send the document checklist or
                  private scheduling link. If it does not arrive, email your
                  Mercury receipt to info@fileabroad.com.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
