import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, AlertCircle, HelpCircle } from '@/components/icons';
import { getPersonaBySlug, getPersonaLongFormSections } from '@/lib/personas';
import { buildFAQSchema } from '@/lib/structured-data';
import { extractLocale } from '@/lib/i18n/metadata';
import { localizePath } from '@/lib/i18n/utils';
import { defaultLocale } from '@/lib/i18n/config';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale = extractLocale({ lang });
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    return { title: 'Persona Not Found' };
  }

  const hasLocalizedContent = locale === defaultLocale;
  const canonical = locale === defaultLocale
    ? `https://fileabroad.com/personas/${slug}`
    : `https://fileabroad.com/personas/${slug}`;

  const languages = {
    'en-us': `https://fileabroad.com/personas/${slug}`,
    'x-default': `https://fileabroad.com/personas/${slug}`,
  };

  return {
    title: persona.seo.title,
    description: persona.seo.description,
    alternates: { canonical, languages },
    robots: hasLocalizedContent ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: persona.seo.title,
      description: persona.seo.description,
      url: canonical,
    },
  };
}

export default async function PersonaPage({ params }: Props) {
  const { slug, lang } = await params;
  const locale = extractLocale({ lang });
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    notFound();
  }

  const faqSchema = buildFAQSchema(persona.faqs);
  const longFormSections = persona.longFormSections || getPersonaLongFormSections(persona);
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Who We Help', href: l('/personas') },
            { label: persona.name, href: l(`/personas/${slug}`) },
          ]}
        />

        {/* Hero */}
        <header className="mb-12 border-b border-border pb-10">
          <Badge className="mb-4 border-0 bg-surface-elevated text-secondary">
            {persona.name}
          </Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {persona.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
            {persona.description}
          </p>
        </header>

        {/* Pain Points */}
        <section className="mb-12">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <AlertCircle className="h-6 w-6 text-secondary" />
            Common Challenges
          </h2>
          <div className="space-y-4">
            {persona.painPoints.map((point, i) => (
              <Card key={i} className="border-border">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-sm font-bold text-secondary">
                    {i + 1}
                  </div>
                  <p className="text-foreground">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How We Help */}
        <section className="mb-12">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <CheckCircle2 className="h-6 w-6 text-secondary" />
            How FileAbroad Helps
          </h2>
          <div className="space-y-4">
            {persona.howWeHelp.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-secondary/20 bg-background p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Relevant Content */}
        {persona.relevantContent.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
              <ArrowRight className="h-6 w-6 text-secondary" />
              Resources for {persona.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {persona.relevantContent.map((link, i) => (
                <Link key={i} href={l(link.href)} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="flex items-center justify-between p-5">
                      <span className="font-medium text-foreground transition-colors group-hover:text-secondary">
                        {link.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-secondary" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {persona.relevantTools.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
              <ArrowRight className="h-6 w-6 text-secondary" />
              Tools for {persona.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {persona.relevantTools.map((tool, i) => (
                <Link key={i} href={l(tool.href)} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="flex items-center justify-between p-5">
                      <span className="font-medium text-foreground transition-colors group-hover:text-secondary">
                        {tool.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-secondary" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12" aria-labelledby="persona-deep-dive-heading">
          <h2 id="persona-deep-dive-heading" className="mb-6 font-sans text-2xl font-bold text-foreground">
            A records-first filing map for {persona.name}
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

        {/* Consultation path */}
        <section className="mb-12 rounded-lg border border-secondary/30 bg-background p-6 md:p-8">
          <h2 className="mb-3 font-sans text-2xl font-bold text-foreground">
            Your next step
          </h2>
          <p className="mb-5 text-muted-foreground">Your facts, years, forms, and records determine the appropriate scope. Start with a consultation to identify the next step before any preparation begins.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={l('/consultation')}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground hover:bg-primary/90"
            >
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <HelpCircle className="h-6 w-6 text-secondary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {persona.faqs.map((faq, i) => (
              <Card key={i} className="border-border">
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
      </div>

      <CTASection
        title={`Questions About ${persona.name} Taxes?`}
        description="Every situation is different. Start with a consultation to receive a written scope and next step."
        buttonText="Get Started"
        buttonHref={l('/intake')}
      />

      <JsonLd data={faqSchema} />
    </PageShell>
  );
}
