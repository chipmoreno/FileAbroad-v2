import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CountryCard from '@/components/countries/CountryCard';
import CTASection from '@/components/layout/CTASection';
import { getCountriesByRegion } from '@/lib/countries';

export const metadata: Metadata = {
  title: 'US Expat Tax Guides by Country',
  description:
    'Explore U.S. expat tax guides for Americans in 20 countries, including FEIE, FBAR, treaty, banking, and local-tax planning considerations.',
  alternates: { canonical: 'https://fileabroad.com/countries' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'US Expat Tax Guides by Country',
    description:
      'Country-by-country tax guides for Americans living abroad. Tax treaties, FBAR, FEIE, and local tax systems.',
    url: 'https://fileabroad.com/countries',
  },
};

export default function CountriesPage() {
  const regionMap = getCountriesByRegion();

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Countries', href: '/countries' }]} />

        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-foreground">
            US Expat Tax Guides by Country
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Start with the country you call home. Each guide covers the U.S. filing
            questions expats ask most, including FEIE, FBAR, treaty considerations,
            local tax systems, banking, and common planning traps.
          </p>
        </header>

        <Link href="/countries/form-matrix" className="mb-12 block rounded-lg border border-secondary/30 bg-background p-5 text-sm font-semibold text-secondary hover:bg-surface-elevated">
          Browse the 80-country × 10-form records-first guide matrix →
        </Link>

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
        title="Need Help Filing from Abroad?"
        description="No matter which country you call home, U.S. filing obligations may follow you. Tell us where you live and we’ll help you understand the next step."
        buttonText="Book a consultation"
        buttonHref="/consultation"
      />
    </PageShell>
  );
}
