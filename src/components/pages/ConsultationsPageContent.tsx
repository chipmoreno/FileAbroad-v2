import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { SiteDictionary } from "@/lib/i18n/types";
import { Locale } from "@/lib/i18n/config";

interface Props {
  dict: SiteDictionary;
  locale: Locale;
}

export default function ConsultationsPageContent({ dict, locale }: Props) {
  const d = dict.consultations;
  const l = (path: string) => {
    if (locale === 'en') return path;
    return `/${locale}${path}`;
  };

  const consultations = [
    {
      name: d.cardScopeTitle,
      duration: d.cardScopeDuration,
      price: d.cardScopePrice,
      description: d.cardScopeDescription,
      features: d.cardScopeFeatures,
      href: '/payment/retainer/consultation30',
      cta: d.cardScopeCta,
    },
    {
      name: d.cardPlanningTitle,
      duration: d.cardPlanningDuration,
      price: d.cardPlanningPrice,
      description: d.cardPlanningDescription,
      features: d.cardPlanningFeatures,
      href: '/payment/retainer/consultation60',
      cta: d.cardPlanningCta,
    },
    {
      name: d.cardStandaloneTitle,
      duration: d.cardStandaloneDuration,
      price: d.cardStandalonePrice,
      description: d.cardStandaloneDescription,
      features: d.cardStandaloneFeatures,
      href: '/payment/retainer/consultationNonClient',
      cta: d.cardStandaloneCta,
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
          {consultations.map((consultation) => (
            <Card
              key={consultation.name}
              className="rounded-2xl border-2 border-border"
            >
              <CardContent className="p-8 flex flex-col h-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">
                  {consultation.duration}
                </p>
                <h2 className="text-2xl font-bold font-sans text-foreground">
                  {consultation.name}
                </h2>
                <p className="text-4xl font-bold font-sans text-foreground my-4">
                  {consultation.price}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {consultation.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {consultation.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={l(consultation.href)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-secondary text-white hover:bg-secondary/90"
                >
                  {consultation.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-10 text-center text-sm text-muted-foreground space-y-3">
          <p>{d.disclaimer}</p>
          <p>
            {d.freeIntakePrompt}{" "}
            <Link
              href={l('/intake')}
              className="font-semibold text-secondary hover:underline"
            >
              {d.freeIntakeLink}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
