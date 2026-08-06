import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getAllStates } from '@/lib/state-taxes';
import { defaultLocale, Locale } from '@/lib/i18n/config';
import { localizePath } from '@/lib/i18n/utils';

interface Props {
  locale?: Locale;
}

export default function StateTaxGuideLinks({ locale = defaultLocale }: Props) {
  const states = getAllStates();

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-3 font-sans text-2xl font-bold text-foreground">
        State-by-state tax guides
      </h2>
      <p className="mb-6 max-w-3xl text-muted-foreground">
        State residency and domicile rules vary. Use the guide for your former state
        before assuming that the FEIE eliminates state tax obligations.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {states.map((state) => (
          <Link key={state.slug} href={localizePath(`/state-taxes/${state.slug}`, locale)} className="group">
            <Card className="h-full border-border transition-colors hover:border-secondary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground transition-colors group-hover:text-secondary">
                  {state.name} state tax guide
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {state.persistenceRisk} persistence risk
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
