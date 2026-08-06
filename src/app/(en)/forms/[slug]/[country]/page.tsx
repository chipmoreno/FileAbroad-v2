import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  getFormCountryEntry,
} from '@/lib/programmatic-seo';
import { getCountryBySlug } from '@/lib/countries';
import { getFormByNumber } from '@/lib/forms';
import { AlertTriangle, CheckCircle, FileText, Globe } from '@/components/icons';

interface Props {
  params: Promise<{ slug: string; country: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country } = await params;
  const entry = getFormCountryEntry(slug, country);

  if (!entry) return { title: 'Page Not Found' };

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: `https://fileabroad.com/forms/${slug}/${country}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: `https://fileabroad.com/forms/${slug}/${country}`,
    },
  };
}

export default async function FormCountryPage({ params }: Props) {
  const { slug, country } = await params;
  const entry = getFormCountryEntry(slug, country);

  if (!entry) notFound();

  const countryData = getCountryBySlug(country);
  const formData = getFormByNumber(slug);
  const formHref = formData ? `/forms/${formData.slug}` : `/forms/${slug}`;

  return (
    <PageShell>
      <article className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Forms', href: '/forms' },
            { label: formData?.formName || slug, href: formHref },
            { label: countryData?.name || country, href: `/forms/${slug}/${country}` },
          ]}
        />

        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>Form {formData?.formNumber || slug}</span>
            <span className="text-border">/</span>
            <Globe className="h-4 w-4" />
            <span>{countryData?.name || country}</span>
          </div>
          <h1 className="font-sans text-3xl font-bold text-foreground md:text-4xl">
            {entry.heading}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{entry.description}</p>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <FileText className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">Form</p>
              <p className="text-sm text-muted-foreground">
                {formData?.formName || `Form ${slug}`}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <Globe className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">Country</p>
              <p className="text-sm text-muted-foreground">
                {countryData?.name || country}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <CheckCircle className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-foreground">Filing Status</p>
              <p className="text-sm text-muted-foreground">
                {countryData?.taxTreaty?.exists ? 'Treaty in force' : 'No income tax treaty'}
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            Overview
          </h2>
          <div className="rounded-lg border border-border bg-background p-6">
            <p className="leading-relaxed text-muted-foreground">
              {entry.introduction}
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            Country-Specific Guidance
          </h2>
          <div className="space-y-3">
            {entry.specificGuidance.map((guidance, idx) => (
              <div key={idx} className="flex items-start gap-3 border-l-4 border-secondary bg-surface-elevated p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <p className="text-sm text-muted-foreground">{guidance}</p>
              </div>
            ))}
          </div>
        </section>

        {entry.commonMistakes.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
              Common Mistakes
            </h2>
            <div className="space-y-3">
              {entry.commonMistakes.map((mistake, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 border border-red-100 bg-red-50 p-4"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <p className="text-sm text-red-800">{mistake}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {entry.filingTips.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
              Filing Tips
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {entry.filingTips.map((tip, idx) => (
                <Card key={idx} className="border-border">
                  <CardContent className="flex items-start gap-3 p-4">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </CardContent>
                </Card>
              ))}
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
            Need Help Filing Form {formData?.formNumber || slug} from {countryData?.name || country}?
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/75">
            FileAbroad specializes in U.S. expat tax filing. We help Americans in{' '}
            {countryData?.name || country} navigate Form {formData?.formNumber || slug},{' '}
            the FEIE, FBAR, and FATCA requirements.
          </p>
          <div className="mt-5">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-primary"
            >
              Book a consultation
            </Link>
          </div>
        </section>

        {countryData && (
          <section className="mb-10">
            <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
              Related Resources
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href={`/countries/${country}`}>
                <Badge variant="outline" className="border-border hover:bg-surface-elevated">
                  {countryData.name} Tax Guide
                </Badge>
              </Link>
                <Link href={formHref}>
                <Badge variant="outline" className="border-border hover:bg-surface-elevated">
                  {formData?.formName || `Form ${slug}`} Overview
                </Badge>
              </Link>
              {formData?.relatedGuideSlugs?.map((guideSlug) => (
                <Link key={guideSlug} href={`/guides/${guideSlug}`}>
                  <Badge variant="outline" className="border-border hover:bg-surface-elevated">
                    Related Guide
                  </Badge>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <CTASection
        title={`Filing Form ${formData?.formNumber || slug} from ${countryData?.name || country}?`}
        description="Get personalized guidance from a U.S. expat tax specialist who understands both IRS rules and your host country's requirements."
        buttonText="Schedule a Consultation"
      />
    </PageShell>
  );
}
