import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, CheckCircle2, ArrowRight, Shield, HelpCircle } from '@/components/icons';
import { getStateBySlug } from '@/lib/state-taxes';
import { buildFAQSchema } from '@/lib/structured-data';
import { extractLocale } from '@/lib/i18n/metadata';
import { localizePath } from '@/lib/i18n/utils';
import { defaultLocale } from '@/lib/i18n/config';

interface Props {
  params: Promise<{ lang: string; state: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug, lang } = await params;
  const locale = extractLocale({ lang });
  const state = getStateBySlug(slug);

  if (!state) {
    return { title: 'State Not Found' };
  }

  const hasLocalizedContent = locale === defaultLocale;
  const canonical = locale === defaultLocale
    ? `https://fileabroad.com/state-taxes/${slug}`
    : `https://fileabroad.com/state-taxes/${slug}`;

  const languages = {
    'en-us': `https://fileabroad.com/state-taxes/${slug}`,
    'x-default': `https://fileabroad.com/state-taxes/${slug}`,
  };

  return {
    title: state.seo.title,
    description: state.seo.description,
    alternates: { canonical, languages },
    robots: hasLocalizedContent ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: state.seo.title,
      description: state.seo.description,
      url: canonical,
    },
  };
}

const riskBadge = {
  extreme: 'bg-red-50 text-red-700 border-red-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  moderate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  low: 'bg-green-50 text-green-700 border-green-200',
};

const riskLabel = {
  extreme: 'Extreme Persistence Risk',
  high: 'High Persistence Risk',
  moderate: 'Moderate Persistence Risk',
  low: 'Low Persistence Risk',
};

export default async function StateTaxPage({ params }: Props) {
  const { state: slug, lang } = await params;
  const locale = extractLocale({ lang });
  const state = getStateBySlug(slug);

  if (!state) {
    notFound();
  }

  const faqSchema = buildFAQSchema(state.faqs);
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { label: 'State Taxes', href: l('/state-taxes') },
            { label: state.name, href: l(`/state-taxes/${slug}`) },
          ]}
        />

        {/* Hero */}
        <header className="mb-10 border-b border-border pb-10">
          <Badge
            variant="outline"
            className={`mb-4 ${riskBadge[state.persistenceRisk]}`}
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            {riskLabel[state.persistenceRisk]}
          </Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {state.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
            {state.description}
          </p>
        </header>

        {/* Persistence Summary */}
        <section className="mb-10 rounded-lg border border-secondary/30 bg-background p-6 md:p-8">
          <h2 className="mb-3 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <Shield className="h-6 w-6 text-secondary" />
            Residency Persistence
          </h2>
          <p className="text-muted-foreground">{state.persistenceSummary}</p>
        </section>

        {/* Key Rules */}
        <section className="mb-10">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <AlertCircle className="h-6 w-6 text-secondary" />
            Key Rules for {state.name} Expats
          </h2>
          <div className="space-y-4">
            {state.keyRules.map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-white p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-sm font-bold text-secondary">
                  {i + 1}
                </div>
                <p className="text-foreground">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Termination Steps */}
        <section className="mb-10">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <CheckCircle2 className="h-6 w-6 text-secondary" />
            Steps to Terminate {state.name} Residency
          </h2>
          <div className="space-y-4">
            {state.terminationSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-secondary/20 bg-background p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <p className="text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Traps */}
        <section className="mb-10">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            Common {state.name} Audit Traps
          </h2>
          <div className="space-y-3">
            {state.commonTraps.map((trap, i) => (
              <Card key={i} className="border-red-100 bg-red-50">
                <CardContent className="flex items-start gap-3 p-4">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <p className="text-sm text-red-800">{trap}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Expat Considerations */}
        <section className="mb-10">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <ArrowRight className="h-6 w-6 text-secondary" />
            Special Considerations for Expats
          </h2>
          <div className="space-y-4">
            {state.expatConsiderations.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border p-5"
              >
                <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {state.residencyAnalysis && state.residencyAnalysis.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              How {state.name} Analyzes Domicile and Residency
            </h2>
            <div className="space-y-4">
              {state.residencyAnalysis.map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-white p-5">
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <HelpCircle className="h-6 w-6 text-secondary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {state.faqs.map((faq, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-5">
                  <h3 className="mb-2 font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <CTASection
        title={`Need Help With ${state.name} Tax Issues?`}
        description="State residency termination is fact-specific. Book a consultation to review your ties and receive a written next-step scope."
        buttonText="Book a consultation"
        buttonHref={l('/consultation')}
      />

      <JsonLd data={faqSchema} />
    </PageShell>
  );
}
