import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CountryHero from '@/components/countries/CountryHero';
import TaxTreatyCard from '@/components/countries/TaxTreatyCard';
import TaxSystemOverview from '@/components/countries/TaxSystemOverview';
import BankingSection from '@/components/countries/BankingSection';
import CountryCard from '@/components/countries/CountryCard';
import CountryNextSteps from '@/components/countries/CountryNextSteps';
import CountryQuickAnswer from '@/components/countries/CountryQuickAnswer';
import EditorialSourceNote from '@/components/seo/EditorialSourceNote';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ExternalLink,
  FileText,
  Globe,
  Info,
} from '@/components/icons';
import {
  getCountryBySlug,
  getAllCountrySlugs,
  getCountryLongFormSections,
  getRelatedCountries,
} from '@/lib/countries';
import { getPostBySlug, formatDate } from '@/lib/blog';
import { getFormCountryEntry } from '@/lib/programmatic-seo';
import { getRelatedVisasForCountry } from '@/lib/content-relationships';
import { buildFAQSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return getAllCountrySlugs().map((country) => ({ country }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) return { title: 'Country Not Found' };

  return {
    title: country.seo.title,
    description: country.seo.description,
    keywords: country.seo.keywords,
    alternates: { canonical: `https://fileabroad.com/countries/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: country.seo.title,
      description: country.seo.description,
      url: `https://fileabroad.com/countries/${slug}`,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) notFound();

  const relatedCountries = getRelatedCountries(slug, 4);
  const relatedPosts = country.relatedBlogSlugs
    .map((blogSlug) => getPostBySlug(blogSlug))
    .filter((post) => post && !post.reviewRequired);
  const relatedVisas = getRelatedVisasForCountry(slug);
  const longFormSections = country.longFormSections || getCountryLongFormSections(country);

  return (
    <PageShell>
      <article className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Countries', href: '/countries' },
            { label: country.name, href: `/countries/${slug}` },
          ]}
        />

        <CountryHero name={country.name} flag={country.flag} region={country.region} />

        <aside className="mb-8 flex gap-3 border-l-4 border-secondary bg-surface-elevated p-5 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
          <p>
            <strong className="text-foreground">Use this as a planning overview.</strong>{' '}
            Tax residency, treaty treatment, rates, and social-security coverage depend
            on your facts and can change. Confirm current official guidance before making
            a filing or relocation decision.
          </p>
        </aside>

        <CountryQuickAnswer countryName={country.name} path={(href) => href} />

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <Globe className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">Income Tax Treaty</p>
              <p className="text-sm text-muted-foreground">
                {country.taxTreaty.exists ? 'Yes' : 'No'}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <Calendar className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">Tax System</p>
              <p className="text-sm capitalize text-muted-foreground">
                {country.localTax.system === 'none'
                  ? 'No Income Tax'
                  : country.localTax.system}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <CheckCircle className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">Social Security</p>
              <p className="text-sm text-muted-foreground">
                {country.localTax.totalizationAgreement
                  ? 'Agreement in force'
                  : 'No agreement in force'}
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            FEIE Qualification in {country.name}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border">
              <CardContent className="p-5">
                <h3 className="mb-2 font-semibold text-foreground">
                  Physical Presence Test
                </h3>
                <p className="text-sm text-muted-foreground">
                  {country.feie.physicalPresenceNotes}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-5">
                <h3 className="mb-2 font-semibold text-foreground">
                  Bona Fide Residence Test
                </h3>
                <p className="text-sm text-muted-foreground">
                  {country.feie.bonaFideNotes}
                </p>
              </CardContent>
            </Card>
          </div>
          {country.feie.commonVisaTypes.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-foreground">
                Common residence and visa routes
              </p>
              <div className="flex flex-wrap gap-2">
                {country.feie.commonVisaTypes.map((visa) => (
                  <Badge
                    key={visa}
                    variant="outline"
                    className="border-border text-muted-foreground"
                  >
                    {visa}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <TaxSystemOverview
            system={country.localTax.system}
            rates={country.localTax.rates}
            totalizationAgreement={country.localTax.totalizationAgreement}
            countryName={country.name}
          />
          <TaxTreatyCard
            exists={country.taxTreaty.exists}
            yearSigned={country.taxTreaty.yearSigned}
            keyProvisions={country.taxTreaty.keyProvisions}
            countryName={country.name}
          />
        </div>

        <div className="mb-10">
          <BankingSection
            majorBanks={country.banking.majorBanks}
            fbarNotes={country.banking.fbarNotes}
            fatcaCompliance={country.banking.fatcaCompliance}
            currencyCode={country.banking.currencyCode}
            countryName={country.name}
          />
        </div>

        {country.pitfalls.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
              Common Pitfalls for Americans in {country.name}
            </h2>
            <div className="space-y-3">
              {country.pitfalls.map((pitfall) => (
                <div
                  key={pitfall}
                  className="flex items-start gap-3 border border-red-100 bg-red-50 p-4"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <p className="text-sm text-red-800">{pitfall}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            Cost of Living Overview
          </h2>
          <Card className="border-border">
            <CardContent className="p-5">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="mb-1 text-sm font-medium text-foreground">
                    Monthly Estimate
                  </p>
                  <p className="text-lg font-bold text-secondary">
                    {country.costOfLiving.monthlyEstimate}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-foreground">vs. U.S.</p>
                  <p className="text-sm text-muted-foreground">
                    {country.costOfLiving.comparedToUS}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-foreground">Notes</p>
                  <p className="text-sm text-muted-foreground">
                    {country.costOfLiving.notes}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <CountryNextSteps countryName={country.name} path={(href) => href} />

        {country.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              FAQ: U.S. Taxes in {country.name}
            </h2>
            <div className="space-y-4">
              {country.faqs.map((faq) => (
                <Card key={faq.question} className="border-border">
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
          <h2 className="font-sans text-2xl font-bold">Check the current official rules</h2>
          <p className="mt-2 text-sm text-primary-foreground/75">
            Use the IRS for U.S. international-filing guidance, Treasury for income-tax
            treaty documents, and the Social Security Administration for agreements
            currently in force.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://www.irs.gov/individuals/international-taxpayers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-4 py-3 text-sm font-bold text-primary"
            >
              IRS international taxpayers <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://home.treasury.gov/policy-issues/tax-policy/treaties"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/35 px-4 py-3 text-sm font-bold text-white"
            >
              Treasury treaties <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://www.ssa.gov/international/status.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/35 px-4 py-3 text-sm font-bold text-white"
            >
              SSA agreements in force <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {country.officialSources && country.officialSources.length > 0 && (
          <section className="mb-10 rounded-lg border border-border bg-background p-6">
            <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
              Official Sources for {country.name}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {country.officialSources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline underline-offset-2 hover:text-secondary/80"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <EditorialSourceNote routePattern="/countries/*" />

        <section className="mb-10" aria-labelledby="country-deep-dive-heading">
          <h2 id="country-deep-dive-heading" className="mb-6 font-sans text-2xl font-bold text-foreground">
            A records-first U.S. filing map for {country.name}
          </h2>
          <div className="space-y-6">
            {longFormSections.map((section) => (
              <div key={section.heading} className="rounded-lg border border-border bg-white p-6">
                <h3 className="mb-3 font-sans text-xl font-bold text-foreground">{section.heading}</h3>
                <p className="leading-relaxed text-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              Related Articles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link key={post!.slug} href={`/blog/${post!.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-sm text-muted-foreground">
                        {formatDate(post!.date)}
                      </p>
                      <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {post!.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            U.S. Forms and Guides for Americans in {country.name}
          </h2>
          <p className="mb-4 text-muted-foreground">
            Use these foundational resources to connect your {country.name} facts to the
            federal forms that may apply. The correct filing set depends on your income,
            accounts, residence, and ownership details.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'FEIE guide and Form 2555', href: '/guides/feie-guide' },
              { label: 'Foreign Tax Credit guide and Form 1116', href: '/guides/foreign-tax-credit-guide' },
              { label: 'FBAR guide and FinCEN Form 114', href: '/guides/fbar-guide' },
              { label: 'Form 8938 FATCA guide', href: '/forms/8938-fatca' },
              { label: 'Tax treaty reading guide', href: '/guides/tax-treaties-guide' },
              { label: 'Expat tax filing guide', href: '/guides/expat-tax-guide' },
            ].map((resource) => (
              <Link key={resource.href} href={resource.href} className="group">
                <Card className="h-full border-border transition-colors hover:border-secondary/50">
                  <CardContent className="flex items-center gap-3 p-4">
                    <FileText className="h-5 w-5 shrink-0 text-secondary" />
                    <span className="font-semibold text-foreground transition-colors group-hover:text-secondary">
                      {resource.label}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Programmatic SEO: form+country links */}
        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            Form-Specific Filing Guidance for {country.name}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {['2555', '1116', '114', '8938'].map((formSlug) => {
              const combo = getFormCountryEntry(formSlug, slug);
              if (!combo) return null;
              return (
                <Link
                  key={formSlug}
                  href={`/forms/${formSlug}/${slug}`}
                  className="group"
                >
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="flex items-start gap-3 p-4">
                      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <div>
                        <h3 className="font-semibold text-foreground transition-colors group-hover:text-secondary">
                          Form {formSlug} in {country.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {combo.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {relatedVisas.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              Visa and Residency Planning
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedVisas.map((visa) => (
                <Link key={visa.slug} href={`/visas/${visa.slug}`} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
                        Visa tax guide
                      </p>
                      <h3 className="font-sans text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {visa.visaName} considerations for Americans in {country.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {relatedCountries.length > 0 && (
        <section className="mx-auto mb-10 max-w-6xl px-6">
          <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
            Other Countries in {country.region}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedCountries.map((relatedCountry) => (
              <CountryCard
                key={relatedCountry.slug}
                slug={relatedCountry.slug}
                name={relatedCountry.name}
                flag={relatedCountry.flag}
                region={relatedCountry.region}
                taxSystem={relatedCountry.localTax.system}
                hasTreaty={relatedCountry.taxTreaty.exists}
              />
            ))}
          </div>
        </section>
      )}

      <CTASection
        title={`Filing U.S. Taxes from ${country.name}?`}
        description={`Tell us where you live, what you earn, and when you last filed. We'll help you understand what comes next.`}
        buttonText="Get Started"
        buttonHref="/intake"
      />

      {country.faqs.length > 0 && (
        <JsonLd data={buildFAQSchema(country.faqs)} />
      )}
    </PageShell>
  );
}
