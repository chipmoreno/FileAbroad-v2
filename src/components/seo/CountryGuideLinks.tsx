import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getAllCountries } from '@/lib/countries';
import { defaultLocale, Locale } from '@/lib/i18n/config';
import { localizePath } from '@/lib/i18n/utils';

interface Props {
  locale?: Locale;
}

export default function CountryGuideLinks({ locale = defaultLocale }: Props) {
  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-3 font-sans text-2xl font-bold text-foreground">
        Country-by-country tax guides
      </h2>
      <p className="mb-6 max-w-3xl text-muted-foreground">
        The best filing path depends on local tax rules, treaty coverage, account
        reporting, and the income you earn in your country of residence.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {getAllCountries().map((country) => (
          <Link key={country.slug} href={localizePath(`/countries/${country.slug}`, locale)} className="group">
            <Card className="h-full border-border transition-colors hover:border-secondary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground transition-colors group-hover:text-secondary">
                  {country.flag} {country.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {country.taxTreaty.exists ? 'Treaty and filing guide' : 'FEIE and filing guide'}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
