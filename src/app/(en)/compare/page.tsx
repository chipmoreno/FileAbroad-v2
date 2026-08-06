import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COMPARISON_PAGES } from '@/lib/compare-data';

export const metadata: Metadata = {
  title: 'US Expat Tax Comparisons',
  description:
    'Compare FEIE vs. foreign tax credit, FBAR vs. Form 8938, Streamlined Filing options, and other U.S. expat tax strategies in plain English.',
  alternates: { canonical: 'https://fileabroad.com/compare' },
  openGraph: {
    title: 'US Expat Tax Comparisons | FileAbroad',
    description:
      'Plain-English comparisons for Americans deciding how to handle U.S. taxes from abroad.',
    url: 'https://fileabroad.com/compare',
  },
};

export default function CompareHubPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6">
        <Breadcrumbs items={[{ label: 'Compare', href: '/compare' }]} />

        <header className="mb-12 max-w-4xl border-b border-border pb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            Decision guides for Americans abroad
          </p>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Compare your U.S. expat tax options
          </h1>
          <p className="mt-5 text-xl text-muted-foreground">
            Understand the practical differences between common filing strategies,
            reporting forms, and catch-up paths before choosing your next step.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {COMPARISON_PAGES.map((comparison) => (
            <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="group">
              <Card className="h-full border-border transition-all hover:border-secondary/50 hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  <Badge className="mb-4 w-fit border-0 bg-blue-50 text-blue-700">Comparison</Badge>
                  <h2 className="font-sans text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-secondary">
                    {comparison.title}
                  </h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{comparison.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-secondary">
                    Read the comparison <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <CTASection
        title="Need help choosing the right path?"
        description="A consultation turns your facts, years, forms, and records into a written scope before any preparation begins."
        buttonText="Book a consultation"
        buttonHref="/consultation"
      />
    </PageShell>
  );
}
