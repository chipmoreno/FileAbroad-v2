import Link from 'next/link';
import { ArrowRight, Check } from '@/components/icons';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { SiteDictionary } from '@/lib/i18n/types';
import { Locale } from '@/lib/i18n/config';
import { localizePath } from '@/lib/i18n/utils';

interface Props {
  dict: SiteDictionary;
  locale: Locale;
}

export default function PricingPageContent({ dict, locale }: Props) {
  const l = (path: string) => localizePath(path, locale);
  const d = dict.pricing;

  const packages = [
    {
      name: d.planStandardTitle,
      description: d.planStandardDescription,
      price: d.planStandardPrice,
      features: d.planStandardFeatures,
      details: d.planStandardNote,
      href: '/intake?service=taxFiling',
      cta: d.planStandardCta,
    },
    {
      name: d.planComplexTitle,
      description: d.planComplexDescription,
      price: d.planComplexPrice,
      features: d.planComplexFeatures,
      details: d.planComplexNote,
      href: '/intake?service=complex-return',
      cta: d.planComplexCta,
    },
    {
      name: d.planAssessmentTitle,
      description: d.planAssessmentDescription,
      price: d.planAssessmentPrice,
      features: d.planAssessmentFeatures,
      details: d.planAssessmentNote,
      href: '/intake?service=streamlined',
      cta: d.planAssessmentCta,
    },
  ];

  return (
    <>
      <PageHero
        label={d.heroLabel}
        title={d.heroTitle}
        description={d.heroDescription}
      />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.name} className="rounded-md p-8 border border-border">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 font-sans text-foreground">{pkg.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  <p className="text-4xl font-bold font-sans text-foreground">{pkg.price}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                  <p className="text-xs text-muted-foreground bg-muted rounded-md p-4 mb-6">
                  <strong className="text-foreground">{locale === 'en' ? 'How pricing works:' : ''}</strong> {pkg.details}
                </p>

                <Link
                  href={pkg.href}
                  data-cta-location="pricing-card"
                  className="mt-auto w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold bg-secondary text-white hover:bg-secondary/90"
                >
                  {pkg.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center text-muted-foreground">
          <p>
            {d.consultationNote.split(d.consultationLink)[0]}
            <Link href={l('/consultations')} className="font-semibold text-secondary hover:underline">
              {d.consultationLink}
            </Link>
            {d.consultationNote.split(d.consultationLink)[1] || ''}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <Card className="rounded-md border-secondary/30 bg-surface-elevated">
          <CardContent className="p-8 md:p-10">
            <h2 className="text-3xl font-bold font-sans text-foreground mb-6">{d.whatHappensTitle}</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              {d.whatHappensSteps.map((step, i) => (
                <div key={i}>
                  <p className="font-bold text-foreground mb-2">
                    {i === 0 ? packages[0].name : i === 1 ? packages[1].name : packages[2].name}
                  </p>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <CTASection
        title={d.ctaTitle}
        description={d.ctaDescription}
        buttonText={d.ctaButton}
        buttonHref={l('/intake')}
      />
    </>
  );
}
