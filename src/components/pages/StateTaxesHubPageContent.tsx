import Link from "next/link";
import { MapPin, ArrowRight, AlertTriangle, ShieldCheck } from "@/components/icons";
import CTASection from "@/components/layout/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllStates } from "@/lib/state-taxes";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";
import { localizedPageCopy } from "@/lib/i18n/localized-page-copy";

const riskBadge = {
  extreme: "bg-red-50 text-red-700 border-red-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  moderate: "bg-yellow-50 text-yellow-700 border-yellow-200",
  low: "bg-green-50 text-green-700 border-green-200",
};

const riskIcon = {
  extreme: AlertTriangle,
  high: AlertTriangle,
  moderate: ShieldCheck,
  low: ShieldCheck,
};

export default function StateTaxesHubPageContent({ locale = "en" }: { locale?: Locale }) {
  const states = getAllStates();
  const copy = localizedPageCopy[locale].stateTaxes;

  return (
    <>
      <section className="border-b border-border bg-surface-elevated pb-12 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {copy.label}
          </p>
          <h1 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
            {copy.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Overview card */}
        <Card className="mb-10 border-secondary/30 bg-background">
          <CardContent className="p-6 md:p-8">
            <h2 className="mb-3 font-sans text-2xl font-bold text-foreground">
              {copy.overviewTitle}
            </h2>
            <p className="mb-4 max-w-3xl text-muted-foreground">
              {copy.overviewOne}
            </p>
            <p className="max-w-3xl text-muted-foreground">
              {copy.overviewTwo}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => {
            const Icon = riskIcon[state.persistenceRisk];
            return (
              <Link
                key={state.slug}
                href={localizePath(`/state-taxes/${state.slug}`, locale)}
                className="group"
              >
                <Card className="h-full border-border transition-colors hover:border-secondary/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-elevated">
                          <MapPin className="h-5 w-5 text-secondary" />
                        </div>
                        <span className="font-sans text-xl font-bold text-foreground">
                          {state.name}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`mb-3 ${riskBadge[state.persistenceRisk]}`}
                    >
                      <Icon className="mr-1 h-3 w-3" />
                      {copy.risk[state.persistenceRisk]}
                    </Badge>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {state.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                      {copy.readGuide} <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <aside className="mt-12 rounded-lg border border-secondary/30 bg-background p-6 md:p-8">
          <h2 className="mb-3 font-sans text-2xl font-bold text-foreground">
            {copy.missingTitle}
          </h2>
          <p className="mb-5 max-w-2xl text-muted-foreground">
            {copy.missingDescription}
          </p>
          <Link
            href={localizePath('/intake', locale)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground hover:bg-primary/90"
          >
            {copy.start} <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>

      <CTASection
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        buttonText={copy.ctaButton}
        buttonHref={localizePath('/intake', locale)}
      />
    </>
  );
}
