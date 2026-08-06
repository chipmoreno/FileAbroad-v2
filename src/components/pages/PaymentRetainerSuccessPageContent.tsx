import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, MessageCircle } from "@/components/icons";
import {
  formatUsd,
  SERVICE_PRICING,
  type ServiceKey,
} from "@/lib/pricing";

import { Locale, defaultLocale } from "@/lib/i18n/config";

interface PaymentRetainerSuccessPageContentProps {
  invoice: string;
  amount: number;
  year: number | null;
  serviceRaw: ServiceKey;
  locale?: Locale;
}

export default function PaymentRetainerSuccessPageContent({
  invoice,
  amount,
  year,
  serviceRaw,
  locale = defaultLocale,
}: PaymentRetainerSuccessPageContentProps) {
  const serviceLabel =
    SERVICE_PRICING[serviceRaw]?.label ?? "FileAbroad service";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-20">
        <section className="py-20 md:py-28">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-sans text-foreground">
              Your invoice is on the way
            </h1>
            <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
              I just sent a Mercury hosted invoice to your email. Please check
              your inbox (and spam folder) for your secure payment link. Once
              payment clears, I&apos;ll send your next steps. If it does not arrive,
              email your Mercury receipt to info@fileabroad.com.
            </p>

            {serviceRaw === "consultation30" && (
              <div className="mt-8 bg-surface-elevated rounded-2xl p-6 border border-secondary/30">
                <p className="font-semibold text-foreground mb-2">
                  Next: schedule your consultation
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  After payment clears, I&apos;ll send available time slots via email.
                </p>
                <a
                  href="mailto:info@fileabroad.com?subject=Consultation%20Paid%20-%20Ready%20to%20Schedule"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold text-base shadow hover:shadow-md transition-all"
                >
                  Email to Schedule
                </a>
              </div>
            )}

            {invoice && (
              <div className="bg-card rounded-2xl p-6 mt-10 border border-border shadow-sm text-left">
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Invoice number</dt>
                    <dd className="font-mono text-foreground">{invoice}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Amount due</dt>
                    <dd className="text-foreground font-semibold">
                      {formatUsd(amount)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Service</dt>
                    <dd className="text-foreground">{serviceLabel}</dd>
                  </div>
                  {year && (
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Tax year</dt>
                      <dd className="text-foreground">{year}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            <p className="text-muted-foreground text-sm mt-10">
              Need help? Email me at{" "}
              <a
                href="mailto:info@fileabroad.com?subject=Invoice%20help"
                className="text-secondary hover:underline underline-offset-2"
              >
                info@fileabroad.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
