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
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ExternalLink,
  Globe,
  Info,
} from '@/components/icons';
import {
  countryHasTranslation,
  getCountryBySlug,
  getCountryLongFormSections,
  getRelatedCountries,
} from '@/lib/countries';
import { getPostBySlug, formatDate } from '@/lib/blog';
import { buildFAQSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { extractLocale } from '@/lib/i18n/metadata';
import { getDictionary, localizePath } from '@/lib/i18n/utils';
import { defaultLocale } from '@/lib/i18n/config';

interface Props {
  params: Promise<{ lang: string; country: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug, lang } = await params;
  const locale = extractLocale({ lang });
  const country = getCountryBySlug(slug, locale);

  if (!country) return { title: 'Country Not Found' };

  const hasLocalizedContent = locale === defaultLocale || countryHasTranslation(slug, locale);
  const canonicalLocale = hasLocalizedContent ? locale : defaultLocale;
  const canonical = canonicalLocale === defaultLocale
    ? `https://fileabroad.com/countries/${slug}`
    : `https://fileabroad.com/${canonicalLocale}/countries/${slug}`;

  const hreflangUrls: Record<string, string> = {};
  for (const loc of ['en', 'es', 'pt', 'fr', 'de', 'it', 'nl', 'ja', 'zh']) {
    if (loc !== defaultLocale && !countryHasTranslation(slug, loc)) continue;
    const url = loc === 'en'
      ? `https://fileabroad.com/countries/${slug}`
      : `https://fileabroad.com/${loc}/countries/${slug}`;
    hreflangUrls[loc === 'en' ? 'en-us' : loc] = url;
  }
  hreflangUrls['x-default'] = `https://fileabroad.com/countries/${slug}`;

  return {
    title: country.seo.title,
    description: country.seo.description,
    keywords: country.seo.keywords,
    alternates: { canonical, languages: hreflangUrls },
    robots: hasLocalizedContent ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: country.seo.title,
      description: country.seo.description,
      url: canonical,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: slug, lang } = await params;
  const locale = extractLocale({ lang });
  const country = getCountryBySlug(slug, locale);
  const dict = getDictionary(locale);

  if (!country) notFound();

  const relatedCountries = getRelatedCountries(slug, 4, locale);
  const relatedPosts = country.relatedBlogSlugs
    .map((blogSlug) => getPostBySlug(blogSlug, locale))
    .filter((post) => post && !post.reviewRequired);
  const longFormSections = country.longFormSections || getCountryLongFormSections(country);

  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <article className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { label: dict.breadcrumbs.countries, href: l('/countries') },
            { label: country.name, href: l(`/countries/${slug}`) },
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

        <CountryQuickAnswer countryName={country.name} path={l} />

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

        <CountryNextSteps countryName={country.name} path={l} />

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

        {relatedPosts.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              {dict.blog.relatedArticles}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link key={post!.slug} href={l(`/blog/${post!.slug}`)} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-sm text-muted-foreground">
                        {formatDate(post!.date, locale)}
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
        buttonText={dict.nav.startFiling}
      />

      {country.faqs.length > 0 && (
        <JsonLd data={buildFAQSchema(country.faqs)} />
      )}
    </PageShell>
  );
}
