import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllVisas } from '@/lib/programmatic-seo';
import { Globe, MapPin, ArrowRight } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Visa Guides for U.S. Expats: Tax Implications by Visa Type',
  description:
    'Compare retirement visas, digital nomad visas, and other residency programs for Americans abroad. Understand the U.S. tax implications of each visa type before you apply.',
  alternates: { canonical: 'https://fileabroad.com/visas' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Visa Guides for U.S. Expats: Tax Implications by Visa Type',
    description:
      'Compare retirement visas, digital nomad visas, and other residency programs for Americans abroad.',
    url: 'https://fileabroad.com/visas',
  },
};

export default function VisasHubPage() {
  const visas = getAllVisas();

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Visas', href: '/visas' },
          ]}
        />

        <header className="mb-10 text-center">
          <h1 className="font-sans text-3xl font-bold text-foreground md:text-4xl">
            Visa Guides for U.S. Expats
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Understand the U.S. tax implications of retirement visas, digital nomad visas,
            and other residency programs before you apply.
          </p>
        </header>

        <div className="mb-10 grid gap-6">
          {visas.map((visa) => (
            <Link key={visa.slug} href={`/visas/${visa.slug}`} className="group">
              <Card className="h-full border-border transition-colors hover:border-secondary/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{visa.countrySlugs.length} countries</span>
                        <span className="text-border">|</span>
                        <MapPin className="h-4 w-4" />
                        <span>{visa.visaName}</span>
                      </div>
                      <h2 className="font-sans text-xl font-semibold text-foreground transition-colors group-hover:text-secondary">
                        {visa.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {visa.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {visa.countrySlugs.map((slug) => (
                          <Badge
                            key={slug}
                            variant="outline"
                            className="border-border text-muted-foreground"
                          >
                            {slug.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="ml-4 mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-secondary" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mb-10 rounded-lg border border-border bg-background p-6">
          <h2 className="mb-3 font-sans text-xl font-bold text-foreground">
            Why Visa Type Matters for U.S. Taxes
          </h2>
          <p className="text-sm text-muted-foreground">
            The visa you hold affects your U.S. tax obligations in several ways:
            it determines whether you can pass the Bona Fide Residence Test for the FEIE;
            it affects your host-country tax residency status and filing obligations;
            it influences whether a Totalization Agreement applies to your self-employment tax;
            and it may impact your ability to open local bank accounts, which in turn triggers
            FBAR and FATCA reporting requirements. Before applying for any visa, model the
            full tax picture for your target country.
          </p>
        </section>
      </div>

      <CTASection
        title="Not Sure Which Visa Is Right for You?"
        description="FileAbroad provides pre-move tax consultations to help you choose the visa and country combination that minimizes your total tax burden — U.S. and foreign."
        buttonText="Book a Pre-Move Consultation"
      />
    </PageShell>
  );
}
