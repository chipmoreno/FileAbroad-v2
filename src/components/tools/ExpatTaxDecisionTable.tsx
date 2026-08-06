import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from '@/components/icons';

const pathways = [
  {
    question: 'I need to file a current-year U.S. return.',
    signal: 'You have a return obligation or want a professional review of your annual filing.',
    next: 'Start with expat return preparation',
    href: '/services/expat-tax-filing',
  },
  {
    question: 'I have foreign bank or investment accounts.',
    signal: 'You need to organize account ownership, maximum values, and filing years before deciding what applies.',
    next: 'Check the account facts',
    href: '/tools/fbar-checker',
  },
  {
    question: 'I am behind on U.S. filings.',
    signal: 'You have missed returns or foreign-account reports and need a facts-first procedure review.',
    next: 'Explore catch-up questions',
    href: '/tools/catch-up-program',
  },
  {
    question: 'I earned income outside the United States.',
    signal: 'You want to compare the questions behind FEIE, foreign tax credit, and broader return scope.',
    next: 'Review the planning tools',
    href: '/tools/tax-savings-estimator',
  },
  {
    question: 'I still have ties to a U.S. state.',
    signal: 'Domicile, property, voter registration, and other facts may change the state-filing analysis.',
    next: 'Map the state facts',
    href: '/tools/state-tax-residency-analyzer',
  },
];

export default function ExpatTaxDecisionTable() {
  return (
    <section
      aria-labelledby="expat-tax-decision-heading"
      data-analytics-impression="tax_decision_table_view"
      className="mx-auto mt-12 max-w-4xl border-y border-border bg-surface-elevated px-6 py-10 md:mt-16 md:py-14"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Choose by situation</p>
      <h2 id="expat-tax-decision-heading" className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">
        Start with the question you need answered
      </h2>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        These tools organize facts and point to the next review step. They do not determine eligibility, filing obligations, or a filing position for you.
      </p>

      <div className="mt-8 overflow-hidden border border-border bg-background">
        <div className="hidden grid-cols-[1fr_1.35fr_1fr] gap-5 border-b border-border bg-card px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground md:grid">
          <span>Question</span>
          <span>Facts to organize</span>
          <span>Next step</span>
        </div>
        <div className="divide-y divide-border">
          {pathways.map((pathway) => (
            <article key={pathway.question} className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_1.35fr_1fr] md:items-center">
              <h3 className="font-sans text-lg font-bold text-foreground">{pathway.question}</h3>
              <p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                {pathway.signal}
              </p>
              <Link
                href={pathway.href}
                data-analytics-event="tax_decision_next_step_click"
                data-cta-location="tax-decision-table"
                data-source-type={pathway.question}
                className="inline-flex w-fit items-center gap-2 text-sm font-bold text-secondary hover:underline"
              >
                {pathway.next} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-7 border-l-2 border-secondary bg-background p-5 text-sm leading-relaxed text-muted-foreground">
        Primary sources control current rules. Start with the IRS guidance for Americans abroad, the IRS Form 8938 comparison, and FinCEN&apos;s FBAR instructions before acting on a result.
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-bold">
          <a href="https://www.irs.gov/individuals/international-taxpayers/us-citizens-and-resident-aliens-abroad" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">IRS: citizens abroad</a>
          <a href="https://www.irs.gov/businesses/corporations/do-i-need-to-file-form-8938-statement-of-specified-foreign-financial-assets" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">IRS: Form 8938</a>
          <a href="https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">IRS: FBAR</a>
        </div>
      </div>
    </section>
  );
}
