import Link from 'next/link';
import { ExternalLink, FileCheck, Globe2 } from '@/components/icons';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { Card, CardContent } from '@/components/ui/card';
import { buildFAQSchema } from '@/lib/structured-data';
import type { MatrixPageContent } from '@/lib/programmatic-matrix';

interface Props {
  content: MatrixPageContent;
  breadcrumbs: { label: string; href: string }[];
  eyebrow?: string;
}

export default function ProgrammaticMatrixPage({ content, breadcrumbs, eyebrow }: Props) {
  return (
    <PageShell>
      <JsonLd data={buildFAQSchema(content.faqs)} />
      <article className="mx-auto max-w-4xl px-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary">
            {eyebrow || 'Records-first international tax guide'}
          </div>
          <h1 className="font-sans text-3xl font-bold text-foreground md:text-5xl">{content.heading}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{content.description}</p>
        </header>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <Card className="border-border">
            <CardContent className="flex items-start gap-3 p-5">
              <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="font-semibold text-foreground">Start with the source record</p>
                <p className="mt-1 text-sm text-muted-foreground">Country, state, residence, ownership, work location, and tax year facts come before a form conclusion.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-start gap-3 p-5">
              <FileCheck className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="font-semibold text-foreground">Written scope before preparation</p>
                <p className="mt-1 text-sm text-muted-foreground">A paid consultation identifies missing records, deliverables, assumptions, and boundaries before accepted work.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 font-sans text-2xl font-bold text-foreground md:text-3xl">{section.heading}</h2>
              <p className="leading-8 text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="mb-5 font-sans text-2xl font-bold text-foreground">Frequently asked questions</h2>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <Card key={faq.question} className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-border bg-background p-6">
          <h2 className="font-sans text-2xl font-bold text-foreground">Related resources</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {content.relatedLinks.map((link) => (
              <Link key={`${link.href}-${link.label}`} href={link.href} className="rounded border border-border bg-white px-4 py-2 text-sm font-semibold text-secondary hover:bg-surface-elevated">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-border p-6">
          <h2 className="font-sans text-2xl font-bold text-foreground">Primary sources to verify</h2>
          <ul className="mt-4 space-y-2">
            {content.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline">
                  {source.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <CTASection
        title="Need this mapped to your facts?"
        description="Book a paid consultation to identify the relevant years, records, forms, and a written preparation scope before work begins."
        buttonText="Book a consultation"
        buttonHref="/consultation"
        microcopy="No public service pricing. Scope follows the consultation and written review."
      />
    </PageShell>
  );
}
