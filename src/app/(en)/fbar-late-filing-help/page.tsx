import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, AlertTriangle, CheckCircle2, Clock, FileText, ShieldCheck, MessageCircle } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Late FBAR Filing Help for Americans Abroad | Chip Moreno',
  description:
    'Missed your FBAR deadline? The penalty for non-willful violations starts at $10,000 per account. I review your account history and help you file correctly — from Ecuador. Paid consultation first.',
  alternates: {
    canonical: 'https://fileabroad.com/fbar-late-filing-help',
  },
  openGraph: {
    title: 'Late FBAR Filing Help for Americans Abroad | Chip Moreno',
    description:
      'Missed your FBAR deadline? The penalty starts at $10,000 per account. I review your account history and help you file correctly.',
    url: 'https://fileabroad.com/fbar-late-filing-help',
  },
};

const penaltyFacts = [
  {
    title: 'Non-willful violations',
    description:
      'If you did not know you had to file, the civil penalty can reach $16,536 per unfiled FBAR (per the Supreme Court\'s Bittner decision for penalties assessed on or after January 17, 2025). This is per form, not per account.',
  },
  {
    title: 'Willful violations',
    description:
      'If the IRS believes you intentionally avoided filing, penalties are much higher and can include criminal exposure. Willfulness determinations are fact-specific and often require attorney review.',
  },
  {
    title: 'Reasonable cause',
    description:
      'In some cases, you may qualify for penalty relief if you had reasonable cause for not filing. This requires documentation and a written explanation — not just "I forgot."',
  },
];

const whatIDo = [
  'Review your account history and aggregate the maximum values correctly',
  'Identify which years are incomplete and which accounts are reportable',
  'Screen for willfulness flags and IRS contact history',
  'Prepare the accepted FBARs within a written scope',
  'Coordinate with any related tax return preparation',
];

const whatIDoNotDo = [
  'Determine willfulness or provide legal opinions',
  'Promise penalty-free treatment without reviewing your facts',
  'Represent you before the IRS in penalty disputes',
  'Handle criminal exposure or voluntary disclosure matters',
];

export default function FbarLateFilingHelpPage() {
  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: 'Late FBAR Help', href: '/fbar-late-filing-help' }]} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6 md:pb-16">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-surface-elevated lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 xl:p-16">
            <span className="mb-6 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              FBAR Amnesty & Late Filing
            </span>
            <h1 className="max-w-xl font-sans text-4xl leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl xl:text-6xl">
              Missed Your FBAR Deadline? Here is What Actually Happens — And What to Do Next
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              If your foreign accounts totaled over $10,000 at any point during the year, 
              you likely had to file FBAR. Missing it can trigger penalties of $10,000+ per account. 
              The good news: there may be a path back into compliance. The bad news: the wrong move 
              can make it worse. I review your facts before recommending any next step.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Reach Out About Your Filing <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-6 py-3 font-semibold text-accent transition-opacity hover:bg-accent/5"
              >
                See How Consultations Work
              </Link>
            </div>
          </div>
          <div className="relative min-h-[20rem] lg:min-h-[32rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-accent/10" />
            <div className="flex h-full items-center justify-center p-12">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-16 w-16 text-accent" />
                <p className="mt-4 font-sans text-3xl font-bold text-foreground">$10,000+</p>
                <p className="mt-2 text-muted-foreground">Penalty per account for non-willful violations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penalty Facts */}
      <section className="border-y border-border bg-muted/45 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                The stakes
              </span>
              <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
                FBAR penalties are real — and they add up fast
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:justify-self-end">
              The IRS takes foreign account reporting seriously. Here is what you are 
              actually facing if you are behind on FBAR filings.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {penaltyFacts.map((item) => (
              <Card
                key={item.title}
                className="group gap-0 border-border bg-card py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <CardContent className="p-7">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <AlertTriangle className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-sans text-xl text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do / What I Don't */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              What I can help with
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              What I do
            </h2>
            <ul className="mt-8 space-y-4">
              {whatIDo.map((item) => (
                <li key={item} className="flex items-start gap-4 rounded-xl border border-border bg-surface-elevated p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Important limits
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              What I do not do
            </h2>
            <ul className="mt-8 space-y-4">
              {whatIDoNotDo.map((item) => (
                <li key={item} className="flex items-start gap-4 rounded-xl border border-border bg-surface-elevated p-5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              If your situation involves willfulness questions, criminal exposure, or IRS 
              representation, I will tell you honestly and recommend an appropriate attorney 
              or enrolled agent.
            </p>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="border-y border-border bg-muted/45 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              The process
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              How late FBAR help works
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Every late FBAR case is different. The right path depends on your filing history, 
              account values, IRS contact, and other facts. Here is how I approach it.
            </p>
          </div>

          <ol className="relative mt-12 border-l border-border">
            {[
              {
                title: 'Share the facts',
                description: 'Use the intake form to tell me about your countries, years, accounts, approximate maximum values, and whether you have had any IRS contact.',
              },
              {
                title: 'Screen for risk flags',
                description: 'I review your filing history, IRS contact, and account facts to identify whether this is a straightforward late filing or a higher-risk situation requiring attorney review.',
              },
              {
                title: 'Recommend a path',
                description: 'If FileAbroad can accept the work, I recommend a written scope: which years to file, which accounts are reportable, and what the preparation timeline looks like.',
              },
              {
                title: 'Prepare and file',
                description: 'I prepare the accepted FBARs within the written scope, coordinate with any related tax return work, and file through the BSA E-Filing System.',
              },
            ].map((step, index) => (
              <li key={step.title} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
                <span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full border border-accent/40 bg-background font-mono text-[0.65rem] font-semibold text-accent shadow-sm">
                  {index + 1}
                </span>
                <h3 className="font-sans text-2xl text-foreground">{step.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="rounded-3xl border border-border bg-surface-elevated p-8 sm:p-12">
          <h2 className="font-sans text-3xl font-bold text-foreground md:text-4xl">
            Common late FBAR questions
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'How many years back do I need to file?',
                a: 'It depends. The BSA E-Filing System accepts filings for prior years, but the right lookback period depends on your facts, IRS contact, and the corrective-filing path that fits your situation.',
              },
              {
                q: 'Can I just file the current year and ignore the rest?',
                a: 'Generally not. If you were required to file in prior years, filing only the current year does not resolve the past delinquency. The right path depends on your specific facts.',
              },
              {
                q: 'What if I did not know about FBAR?',
                a: 'Non-willful penalties apply when you did not know. But you still need to file. The reasonable-cause defense requires more than ignorance — it requires documentation of why you did not know and what you did once you found out.',
              },
              {
                q: 'Does filing late trigger an audit?',
                a: 'Not automatically. But the IRS does receive FBAR data, and late filings can raise questions. This is why I screen every case before recommending a filing path.',
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="font-sans text-lg font-bold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/blog/fbar-requirements-americans-abroad" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
              Read the full FBAR guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Behind on FBAR? The longer you wait, the worse it gets."
        description="Penalties accrue by the account and by the year. The right time to get compliant is before the IRS finds the gap. I review every intake personally and will tell you honestly if your case requires an attorney instead."
        buttonText="Reach Out About Your Filing"
        buttonHref="/intake"
        microcopy="No tax documents here — just the broad facts."
      />
    </PageShell>
  );
}
