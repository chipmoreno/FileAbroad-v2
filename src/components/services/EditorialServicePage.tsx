import Link from 'next/link';
import { ArrowRight, Check, ExternalLink, ShieldCheck } from '@/components/icons';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { buildFAQSchema } from '@/lib/structured-data';
import { Locale } from '@/lib/i18n/config';
import editorialRegistry from '../../../content/editorial-registry.json';

const serviceEditorialRecord = editorialRegistry.items.find(
  (item) => item.routePattern === '/services/*'
);

const relatedPathways: Record<string, { label: string; href: string; description: string }[]> = {
  'expat-tax-filing': [
    { label: 'FBAR preparation', href: '/services/fbar-filing', description: 'Review foreign-account reporting separately when it is part of the case.' },
    { label: 'FATCA / Form 8938', href: '/services/fatca-compliance', description: 'See how specified foreign assets are scoped for a return.' },
    { label: 'Expat tax guides', href: '/guides', description: 'Read the educational material before choosing a filing path.' },
  ],
  'fbar-filing': [
    { label: 'FBAR checker', href: '/tools/fbar-checker', description: 'Use the basic account-fact screen before sending the intake.' },
    { label: 'FATCA / Form 8938', href: '/services/fatca-compliance', description: 'These are separate reporting systems and may both matter.' },
    { label: 'FBAR flowchart', href: '/resources/fbar-flowchart', description: 'Download the question path for your records.' },
  ],
  'fatca-compliance': [
    { label: 'FBAR preparation', href: '/services/fbar-filing', description: 'Compare the separate foreign-account reporting route.' },
    { label: 'Annual tax filing', href: '/services/expat-tax-filing', description: 'Form 8938 may be part of a broader federal return scope.' },
    { label: 'Consultation', href: '/consultation', description: 'Map the facts and receive a written scope before preparation.' },
  ],
  'streamlined-filing': [
    { label: 'Catch-up program finder', href: '/tools/catch-up-program', description: 'Organize the facts that determine the next review step.' },
    { label: 'Streamlined checklist', href: '/resources/streamlined-checklist', description: 'See the records typically discussed during scope review.' },
    { label: 'Consultation', href: '/consultation', description: 'Book a focused assessment before preparation is accepted.' },
  ],
};

interface ServiceItem {
  title: string;
  description: string;
}

interface EditorialServicePageProps {
  breadcrumb: string;
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  price: string;
  priceNote: string;
  cta: string;
  ctaHref: string;
  scopeNote: string;
  outcomes: string[];
  includedTitle?: string;
  included: ServiceItem[];
  process: ServiceItem[];
  qualifications: string[];
  faqs: { question: string; answer: string }[];
  officialSource?: { label: string; href: string };
  locale?: Locale;
}

export default function EditorialServicePage(props: EditorialServicePageProps) {
  const isEnglish = !props.locale || props.locale === 'en';
  const consultationPath = props.slug === 'streamlined-filing' ? '/consultation/streamlined' : '/consultation';
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: props.breadcrumb, href: `/services/${props.slug}` }]} />
      </div>

      <section className="border-y border-border bg-surface-elevated py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">{props.eyebrow}</p>
            <h1 className="max-w-4xl font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl">{props.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{props.lead}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href={consultationPath} data-analytics-impression="service_primary_cta_view" data-analytics-event="service_primary_cta_click" data-cta-location="service-hero" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-lg font-bold text-primary-foreground hover:bg-foreground">Book a consultation<ArrowRight className="h-5 w-5" /></Link>
              <Link href="/consultation" className="px-3 py-3 font-bold text-foreground underline decoration-secondary decoration-2 underline-offset-8">Book a consultation</Link>
            </div>
          </div>
          <aside className="border-t-4 border-secondary bg-background p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Engagement</p>
            <p className="mt-3 font-sans text-3xl font-bold text-foreground">Written scope first</p>
            <p className="mt-2 text-sm text-muted-foreground">The accepted scope depends on the forms, years, records, and complexity identified during the consultation.</p>
            <ul className="mt-6 space-y-3 border-t border-border pt-5">
              {props.outcomes.map((outcome) => <li key={outcome} className="flex items-start gap-3 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />{outcome}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-b border-border bg-primary py-5 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-start gap-3 px-6 text-sm"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><p><strong className="text-white">Scope before payment:</strong> {props.scopeNote}</p></div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <section>
          <div className="mb-8 grid gap-4 border-b border-border pb-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Clear deliverables</p><h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">{props.includedTitle || 'What is included'}</h2></div>
            <p className="text-muted-foreground md:text-right">Your written scope controls. If a form or legal issue falls outside it, you will know before preparation begins.</p>
          </div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {props.included.map((item, index) => (
              <article key={item.title} className="bg-background p-7 md:p-8"><p className="text-xs font-bold text-secondary">0{index + 1}</p><h3 className="mt-4 font-sans text-xl font-bold text-foreground">{item.title}</h3><p className="mt-3 text-muted-foreground">{item.description}</p></article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">The process</p>
            <h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">From intake to a reviewed filing</h2>
            <p className="mt-4 text-muted-foreground">No sales maze and no silent handoff. You receive the next step in writing.</p>
          </div>
          <ol className="border-t border-border">
            {props.process.map((step, index) => (
              <li key={step.title} className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_1fr]"><span className="font-sans text-2xl font-bold text-secondary">{index + 1}</span><div><h3 className="font-sans text-xl font-bold text-foreground">{step.title}</h3><p className="mt-2 text-muted-foreground">{step.description}</p></div></li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-8 bg-surface-elevated p-7 md:grid-cols-[0.85fr_1.15fr] md:p-10">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Fit and limits</p><h2 className="mt-2 font-sans text-3xl font-bold text-foreground">Before I accept the work</h2></div>
          <ul className="space-y-4">{props.qualifications.map((item) => <li key={item} className="flex items-start gap-3 text-muted-foreground"><Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />{item}</li>)}</ul>
        </section>

        {isEnglish && relatedPathways[props.slug] && (
          <section className="mt-16" aria-labelledby="related-pathways-heading">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Related next steps</p>
            <h2 id="related-pathways-heading" className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">Build the right filing path</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {relatedPathways[props.slug].map((link) => (
                <Link key={link.href} href={link.href} data-analytics-event="related_pathway_click" data-cta-location="related-pathways" data-source-type={props.slug} className="group border border-border bg-background p-6 transition hover:border-secondary hover:shadow-sm">
                  <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-secondary">{link.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{link.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-secondary">Open resource <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Questions before you start</p>
          <h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">Frequently asked questions</h2>
          <div className="mt-7 border-t border-border">
            {props.faqs.map((faq) => <details key={faq.question} className="group border-b border-border py-5"><summary className="cursor-pointer list-none pr-8 font-sans text-lg font-bold text-foreground marker:hidden">{faq.question}</summary><p className="mt-3 max-w-3xl text-muted-foreground">{faq.answer}</p></details>)}
          </div>
          {props.officialSource && (
            <div className="mt-8 border-l-2 border-secondary bg-surface-elevated p-5">
              {isEnglish && <p className="text-sm leading-relaxed text-muted-foreground">Official agency guidance controls current thresholds, forms, and procedures. Use this primary source as a starting point; it does not replace a review of your facts.</p>}
              <a href={props.officialSource.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-bold text-secondary hover:underline">{props.officialSource.label}<ExternalLink className="h-4 w-4" /></a>
            </div>
          )}
          {isEnglish && serviceEditorialRecord && (
            <div className="mt-5 rounded-md border border-border bg-background p-5 text-sm text-muted-foreground">
              <p className="font-bold text-foreground">Editorial review and primary sources</p>
              <p className="mt-2 leading-relaxed">
                Reviewed <time dateTime={serviceEditorialRecord.lastReviewed}>{serviceEditorialRecord.lastReviewed}</time>.
                Tax rules, forms, thresholds, and agency procedures can change; confirm the current official guidance before filing.
              </p>
              <ul className="mt-3 space-y-2">
                {serviceEditorialRecord.primarySources.map((source) => (
                  <li key={source}>
                    <a href={source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-secondary hover:underline">
                      {new URL(source).hostname.replace(/^www\./, '')}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      <section className="border-t border-border bg-primary py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 md:flex-row md:items-center"><div><h2 className="font-sans text-3xl font-bold text-white">Know your next step before you pay.</h2><p className="mt-2 text-primary-foreground/75">Book a consultation and receive the preparation path in writing.</p></div><Link href={consultationPath} data-analytics-event="service_bottom_cta_click" data-cta-location="service-bottom" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-7 py-4 font-bold text-primary">Book a consultation<ArrowRight className="h-5 w-5" /></Link></div>
      </section>

      <JsonLd data={buildFAQSchema(props.faqs)} />
    </PageShell>
  );
}
