'use client';

import Link from 'next/link';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  FileText,
  Files,
  Globe,
  Building2,
  Calculator,
  Check,
  ClipboardCheck,
  Users,
  ShieldCheck,
} from '@/components/icons';
import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';
import ServiceDecisionTable from '@/components/services/ServiceDecisionTable';

export default function ServicesPage() {
  const dict = useDictionary();
  const { localizeHref, locale } = useLocale();
  const s = dict.services;
  const h = dict.home;

  const featuredService = {
    icon: Files,
    title: h.serviceComplexTitle,
    slug: '/services/complex-return',
    description: h.serviceComplexDesc,
    features: [
      h.serviceComplexFeature1,
      h.serviceComplexFeature2,
      h.serviceComplexFeature3,
      h.serviceComplexFeature4,
    ],
  };

  const mainServices = [
    {
      icon: FileText,
      title: s.individualReturns,
      slug: '/services/expat-tax-filing',
      description: s.individualReturnsDesc,
      features: [
        'Form 1040 preparation',
        'Foreign Earned Income Exclusion (Form 2555)',
        'Foreign Tax Credit (Form 1116)',
        'Schedule C for self-employed expats',
      ],
    },
    {
      icon: Globe,
      title: s.fbarFiling,
      slug: '/services/fbar-filing',
      description: s.fbarFilingDesc,
      features: [
        'FinCEN Form 114 preparation',
        'Account aggregation calculation',
        'Multi-year catch-up filing',
        'Compliance review',
      ],
    },
    {
      icon: Building2,
      title: s.fatcaCompliance,
      slug: '/services/fatca-compliance',
      description: s.fatcaComplianceDesc,
      features: [
        'Form 8938 preparation',
        'Asset valuation guidance',
        'Threshold determination',
        'Coordination with FBAR',
      ],
    },
    {
      icon: ShieldCheck,
      title: s.streamlinedFiling,
      slug: '/services/streamlined-filing',
      description: s.streamlinedFilingDesc,
      features: [
        'Return and FBAR periods required by current instructions',
        'Accepted information returns in the written scope',
        'Factual Form 14653 preparation support',
        'Submission-ready federal package',
      ],
    },
  ];

  const additionalServices = [
    {
      icon: Calculator,
      title: s.foreignTaxCredit,
      description: s.foreignTaxCreditDesc,
    },
    {
      icon: ClipboardCheck,
      title: s.feiePlanning,
      description: s.feiePlanningDesc,
    },
    {
      icon: Users,
      title: s.stateTax,
      description: s.stateTaxDesc,
    },
  ];

  return (
    <>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              {h.servicesSectionLabel}
            </span>
            <h1 className="mt-6 max-w-3xl font-sans text-5xl leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              {s.pageTitle}
            </h1>
          </div>
          <div className="border-l border-primary-foreground/20 pl-6 lg:mb-2">
            <p className="text-lg leading-relaxed text-primary-foreground/70">
              {s.pageDescription}
            </p>
            <p className="mt-5 text-sm font-medium leading-relaxed text-secondary">
              {h.servicesIntro}
            </p>
          </div>
        </div>
      </section>

      {locale === 'en' && <ServiceDecisionTable />}

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-10 grid gap-6 border-b border-border pb-8 md:grid-cols-[1fr_1.1fr] md:items-end">
          <h2 className="font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
            {h.servicesHeading}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground md:justify-self-end">
            {s.ctaDescription}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative gap-0 overflow-hidden border-primary bg-primary py-0 text-primary-foreground shadow-xl shadow-primary/10 md:col-span-2">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 size-64 rounded-full border border-secondary/25"
            />
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 size-40 rounded-full border border-secondary/15"
            />
            <CardContent className="relative grid h-full gap-8 p-8 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              <div className="flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20">
                    <featuredService.icon className="size-7" aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                    {h.serviceComplexBadge}
                  </span>
                </div>

                <h2 className="mt-8 font-sans text-3xl leading-tight sm:text-4xl">
                  {featuredService.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
                  {featuredService.description}
                </p>

                <Link
                  href={localizeHref(featuredService.slug)}
                  className="mt-8 inline-flex w-fit items-center gap-2 font-semibold text-secondary transition-all hover:gap-3"
                >
                  {s.learnMore}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <ul className="grid content-center gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {featuredService.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 border-b border-primary-foreground/15 pb-3 text-sm leading-relaxed text-primary-foreground/75 last:border-b-0"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {mainServices.map((service) => (
            <Card
              key={service.title}
              className="group gap-0 border-border bg-card py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl"
            >
              <CardContent className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex size-13 items-center justify-center rounded-2xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="size-6" aria-hidden="true" />
                </div>

                <h2 className="mt-7 font-sans text-2xl leading-tight text-foreground">
                  {service.title}
                </h2>

                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {service.slug && (
                  <Link
                    href={localizeHref(service.slug)}
                    className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-secondary transition-all hover:gap-3"
                  >
                    {s.learnMore}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/45 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-9 font-sans text-3xl text-foreground md:text-4xl">
            {s.additionalServices}
          </h2>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {additionalServices.map((service) => (
              <div
                key={service.title}
                className="group bg-background p-7 transition-colors hover:bg-card sm:p-8"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors group-hover:border-secondary/40 group-hover:text-secondary">
                  <service.icon className="size-5" aria-hidden="true" />
                </div>

                <h3 className="mt-6 font-sans text-xl text-foreground">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={s.ctaTitle}
        description={s.ctaDescription}
        buttonText={s.ctaButton}
        buttonHref={localizeHref('/consultation')}
      />
    </>
  );
}
