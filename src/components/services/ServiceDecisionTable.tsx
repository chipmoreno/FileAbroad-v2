import Link from 'next/link';
import { ArrowRight } from '@/components/icons';

const pathways = [
  {
    name: 'Annual federal return',
    fit: 'A current-year individual return with a defined, straightforward scope.',
    firstStep: 'Book a consultation',
    href: '/services/expat-tax-filing',
    actionHref: '/consultation',
    actionLabel: 'Book consultation',
  },
  {
    name: 'FBAR preparation',
    fit: 'Foreign-account reporting that needs account ownership, values, and filing history reviewed.',
    firstStep: 'Map the accounts and years',
    href: '/services/fbar-filing',
    actionHref: '/tools/fbar-checker',
    actionLabel: 'Check the basics',
  },
  {
    name: 'Form 8938 / FATCA',
    fit: 'Specified foreign financial asset reporting that may accompany a federal return.',
    firstStep: 'Review the asset scope',
    href: '/services/fatca-compliance',
    actionHref: '/services/fatca-compliance',
    actionLabel: 'Review FATCA',
  },
  {
    name: 'Catch-up filing',
    fit: 'Missed U.S. returns or foreign reporting that needs a facts-and-risk screen before a procedure is chosen.',
    firstStep: 'Book a scope assessment',
    href: '/services/streamlined-filing',
    actionHref: '/tools/catch-up-program',
    actionLabel: 'Explore catch-up',
  },
];

export default function ServiceDecisionTable() {
  return (
    <section aria-labelledby="service-fit-heading" data-analytics-impression="service_decision_view" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Choose by situation</p>
        <h2 id="service-fit-heading" className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">
          Start with the problem you need solved
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          These are starting points, not automatic eligibility decisions. The accepted forms, years, and scope are confirmed in writing before preparation begins.
        </p>
      </div>

      <div className="overflow-hidden border border-border bg-background">
        <div className="hidden grid-cols-[1fr_1.5fr_1fr_1fr] gap-4 border-b border-border bg-surface-elevated px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground md:grid">
          <span>Path</span>
          <span>When it may fit</span>
          <span>First step</span>
          <span>Explore</span>
        </div>
        <div className="divide-y divide-border">
          {pathways.map((path) => (
            <article key={path.name} className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_1.5fr_1fr_1fr] md:items-center">
              <div>
                <h3 className="font-sans text-lg font-bold text-foreground">{path.name}</h3>
                <Link href={path.href} data-analytics-event="service_detail_click" data-cta-location="service-decision-table" className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline">
                  Service details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{path.fit}</p>
              <p className="text-sm font-semibold text-foreground">{path.firstStep}</p>
              <Link href={path.actionHref} data-analytics-event="service_decision_action" data-cta-location="service-decision-table" data-source-type={path.name} className="inline-flex w-fit items-center gap-2 text-sm font-bold text-secondary hover:underline">
                {path.actionLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
