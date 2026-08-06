import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CountryCard from '@/components/countries/CountryCard';
import {
  getVisaBySlug,
  getAllVisaSlugs,
} from '@/lib/programmatic-seo';
import { getCountryBySlug } from '@/lib/countries';
import { CheckCircle, Globe, MapPin, Wallet } from '@/components/icons';

interface Props {
  params: Promise<{ visa: string }>;
}

export async function generateStaticParams() {
  return getAllVisaSlugs().map((slug) => ({ visa: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { visa } = await params;
  const entry = getVisaBySlug(visa);

  if (!entry) return { title: 'Page Not Found' };

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: `https://fileabroad.com/visas/${visa}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: `https://fileabroad.com/visas/${visa}`,
    },
  };
}

export default async function VisaPage({ params }: Props) {
  const { visa } = await params;
  const entry = getVisaBySlug(visa);

  if (!entry) notFound();

  const countries = entry.countrySlugs
    .map((slug) => getCountryBySlug(slug))
    .filter(Boolean);

  return (
    <PageShell>
      <article className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Visas', href: '/visas' },
            { label: entry.visaName, href: `/visas/${visa}` },
          ]}
        />

        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>U.S. Expat Visa Guide</span>
          </div>
          <h1 className="font-sans text-3xl font-bold text-foreground md:text-4xl">
            {entry.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{entry.description}</p>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <MapPin className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">Countries Covered</p>
              <p className="text-sm text-muted-foreground">{entry.countrySlugs.length} destinations</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <Wallet className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">Income Requirement</p>
              <p className="text-sm text-muted-foreground">Varies by country</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <CheckCircle className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">FEIE Eligible</p>
              <p className="text-sm text-muted-foreground">Yes, if tests are met</p>
            </CardContent>
          </Card>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            Overview
          </h2>
          <div className="rounded-lg border border-border bg-background p-6">
            <p className="leading-relaxed text-muted-foreground">
              {entry.overview}
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            Eligibility Criteria
          </h2>
          <div className="space-y-3">
            {entry.eligibilityCriteria.map((criterion, idx) => (
              <div key={idx} className="flex items-start gap-3 border-l-4 border-secondary bg-surface-elevated p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <p className="text-sm text-muted-foreground">{criterion}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            U.S. Tax Implications
          </h2>
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="leading-relaxed text-muted-foreground">
                {entry.taxImplications}
              </p>
            </CardContent>
          </Card>
        </section>

        {entry.officialSources && entry.officialSources.length > 0 && (
          <section className="mb-10 rounded-lg border border-border bg-background p-6">
            <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
              Official Sources
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {entry.officialSources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary underline underline-offset-2 hover:text-secondary/80"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {countries.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              Country-Specific Information
            </h2>
            <div className="space-y-6">
              {countries.map((country) => {
                const note = entry.countrySpecificNotes[country!.slug];
                if (!note) return null;
                return (
                  <Card key={country!.slug} className="border-border">
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-2xl">{country!.flag}</span>
                        <h3 className="font-semibold text-foreground">{country!.name}</h3>
                        <Link href={`/countries/${country!.slug}`}>
                          <Badge variant="outline" className="border-border text-muted-foreground">
                            View Tax Guide
                          </Badge>
                        </Link>
                      </div>
                      <p className="text-sm text-muted-foreground">{note}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {entry.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {entry.faqs.map((faq, idx) => (
                <Card key={idx} className="border-border">
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
        )}

        <section className="mb-10 border border-border bg-primary p-6 text-primary-foreground md:p-8">
          <h2 className="font-sans text-2xl font-bold">
            Planning Your Move on a {entry.visaName}?
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/75">
            FileAbroad helps Americans understand the tax implications of living abroad
            on any visa type. We model your FEIE eligibility, FTC strategy, and filing
            obligations before you move.
          </p>
          <div className="mt-5">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-primary"
            >
              Book a pre-move consultation
            </Link>
          </div>
        </section>
      </article>

      {countries.length > 0 && (
        <section className="mx-auto mb-10 max-w-6xl px-6">
          <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
            Countries Offering {entry.visaName}s
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <CountryCard
                key={country!.slug}
                slug={country!.slug}
                name={country!.name}
                flag={country!.flag}
                region={country!.region}
                taxSystem={country!.localTax.system}
                hasTreaty={country!.taxTreaty.exists}
              />
            ))}
          </div>
        </section>
      )}

      <CTASection
        title={`Considering a ${entry.visaName}?`}
        description="Talk to a U.S. expat tax specialist before you apply. We help you understand the full tax picture — FEIE, FTC, self-employment tax, and reporting requirements — for your target country."
        buttonText="Schedule a Consultation"
      />
    </PageShell>
  );
}
