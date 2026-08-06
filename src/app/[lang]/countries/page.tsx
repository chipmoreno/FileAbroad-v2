import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CountryCard from '@/components/countries/CountryCard';
import CTASection from '@/components/layout/CTASection';
import { getCountriesByRegion } from '@/lib/countries';
import { generateLocalizedMetadata, extractLocale } from '@/lib/i18n/metadata';
import { getDictionary } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return generateLocalizedMetadata({
    pageKey: 'countries',
    path: '/countries',
    locale,
  });
}

export default async function CountriesPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  const regionMap = getCountriesByRegion(locale);

  return (
    <PageShell locale={locale}>
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.countries, href: '/countries' }]} />

        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-foreground">
            {dict.countries.pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {dict.countries.pageDescription}
          </p>
        </header>

        {Object.entries(regionMap).map(([region, countries]) => (
          <section key={region} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-sans text-foreground">
              {region}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {countries.map((country) => (
                <CountryCard
                  key={country.slug}
                  slug={country.slug}
                  name={country.name}
                  flag={country.flag}
                  region={country.region}
                  taxSystem={country.localTax.system}
                  hasTreaty={country.taxTreaty.exists}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <CTASection
        title={dict.home.heroTitle}
        description={dict.home.heroDescription}
        buttonText={dict.nav.startFiling}
      />
    </PageShell>
  );
}
