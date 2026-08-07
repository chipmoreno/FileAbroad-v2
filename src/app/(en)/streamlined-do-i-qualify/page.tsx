import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle, Clock, FileText, ShieldCheck } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Do You Qualify for IRS Streamlined Filing? | Chip Moreno',
  description:
    'The IRS Streamlined program allows some expats to file past returns without certain penalties — but eligibility is strict. I review your facts in a paid consultation before any preparation begins.',
  alternates: {
    canonical: 'https://fileabroad.com/streamlined-do-i-qualify',
  },
  openGraph: {
    title: 'Do You Qualify for IRS Streamlined Filing? | Chip Moreno',
    description:
      'The IRS Streamlined program allows some expats to file past returns without certain penalties — but eligibility is strict.',
    url: 'https://fileabroad.com/streamlined-do-i-qualify',
  },
};

const whoQualifies = [
  {
    title: 'Non-residency requirement',
    description:
      'You must have lived outside the US for at least 330 full days in any one of the three most recent tax years, or been a bona fide resident of a foreign country for an uninterrupted period that includes an entire tax year.',
  },
  {
    title: 'No prior IRS contact',
    description:
      'You cannot have an open IRS examination, criminal investigation, or prior contact about your non-compliance. If the IRS has already asked about your returns, Streamlined may not be available.',
  },
  {
    title: 'Non-willful certification',
    description:
      'You must certify under penalties of perjury that your failure to file was non-willful. This is your responsibility — not mine. I can organize your facts, but I cannot give a legal opinion on willfulness.',
  },
  {
    title: 'Required filing periods',
    description:
      'You must file the last three delinquent federal tax returns and the last six FBARs. Missing records or incomplete years can disqualify you or require a different path.',
  },
];

const whoDoesNotQualify = [
  'You have already been contacted by the IRS about your non-compliance',
  'You are under criminal investigation',
  'You have an open IRS examination',
  'You cannot certify that your failure was non-willful',
  'You are a US resident (not abroad) seeking domestic streamlined procedures',
  'You have missing records that make it impossible to file complete returns',
];

const whatHappens = [
  {
    title: 'You file the missing returns',
    description:
      'The required federal tax returns and FBARs are prepared and submitted. You pay any tax and interest due, but you may avoid certain penalties.',
  },
  {
    title: 'You pay tax and interest',
    description:
      'Streamlined does not erase your tax liability. You still owe the tax and interest on the delinquent years. The benefit is the potential avoidance of certain failure-to-file and failure-to-pay penalties.',
  },
  {
    title: 'The IRS processes your submission',
    description:
      'There is no formal "acceptance" letter for Streamlined. The IRS processes your returns like any other submission. If they agree with your filings, the matter is generally closed.',
  },
];

export default function StreamlinedDoIQualifyPage() {
  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: 'Streamlined Eligibility', href: '/streamlined-do-i-qualify' }]} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6 md:pb-16">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-surface-elevated lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 xl:p-16">
            <span className="mb-6 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              IRS Streamlined Filing
            </span>
            <h1 className="max-w-xl font-sans text-4xl leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl xl:text-6xl">
              The Penalty-Free Catch-Up Window: Do You Actually Qualify?
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              The IRS Streamlined Foreign Offshore procedure allows some expats to file 
              past returns without certain penalties — but eligibility is strict, the certification 
              is your responsibility, and one wrong assumption can close the door. I review 
              your facts honestly before recommending any path.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Reach Out About Your Filing <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/consultation/streamlined"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-6 py-3 font-semibold text-accent transition-opacity hover:bg-accent/5"
              >
                Book a Streamlined Consultation
              </Link>
            </div>
          </div>
          <div className="relative min-h-[20rem] lg:min-h-[32rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
            <div className="flex h-full items-center justify-center p-12">
              <div className="text-center">
                <Clock className="mx-auto h-16 w-16 text-accent" />
                <p className="mt-4 font-sans text-3xl font-bold text-foreground">3 years</p>
                <p className="mt-2 text-muted-foreground">Of delinquent returns required</p>
                <p className="mt-1 text-muted-foreground">6 years of FBARs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="border-y border-border bg-muted/45 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                The requirements
              </span>
              <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
                Who qualifies for Streamlined?
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:justify-self-end">
              These are the four pillars of Streamlined Foreign Offshore eligibility. 
              Miss one and the door closes.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {whoQualifies.map((item) => (
              <Card
                key={item.title}
                className="group gap-0 border-border bg-card py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <CardContent className="p-7">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <CheckCircle2 className="size-6" aria-hidden="true" />
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

      {/* Who Does Not Qualify */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              When Streamlined is not an option
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              Who does not qualify?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              If any of these apply to you, Streamlined is likely not the right path. 
              I will tell you honestly and recommend the appropriate next step — even if 
              that means referring you to an attorney.
            </p>
          </div>

          <ul className="space-y-4">
            {whoDoesNotQualify.map((item) => (
              <li key={item} className="flex items-start gap-4 rounded-xl border border-border bg-surface-elevated p-5">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What Happens */}
      <section className="border-y border-border bg-muted/45 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              The outcome
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              What actually happens if you qualify?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Streamlined is not a "get out of jail free" card. Here is what the process 
              actually looks like if you are eligible.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {whatHappens.map((item) => (
              <Card
                key={item.title}
                className="group gap-0 border-border bg-card py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <CardContent className="p-7">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <FileText className="size-6" aria-hidden="true" />
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

      {/* The Process */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            How I work
          </span>
          <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
            My Streamlined assessment process
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I do not promise eligibility before reviewing your facts. Here is how 
            I determine whether Streamlined fits your situation.
          </p>
        </div>

        <ol className="relative mx-auto mt-12 max-w-3xl border-l border-border">
          {[
            {
              title: 'Share the broad facts',
              description: 'Use the intake form to tell me about your years abroad, filing history, IRS contact, income, accounts, and what records you have.',
            },
            {
              title: 'Screen for eligibility flags',
              description: 'I review your facts for the four pillars: non-residency, no IRS contact, non-willful certification, and required filing periods.',
            },
            {
              title: 'Identify missing records',
              description: 'Missing W-2s, foreign tax statements, or account records can derail a Streamlined submission. I identify what you need before any preparation begins.',
            },
            {
              title: 'Recommend a path — honestly',
              description: 'If you qualify, I recommend a written scope for the Streamlined submission. If you do not qualify, I tell you why and what type of professional you actually need.',
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
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" />
            <div>
              <h3 className="font-sans text-lg font-bold text-amber-950">Important disclaimer</h3>
              <p className="mt-2 text-sm leading-relaxed text-amber-900">
                I am not an attorney, CPA, or Enrolled Agent. I am a PTIN holder and IRS e-file 
                participant. I organize your facts and prepare accepted forms within a written scope. 
                I do not determine willfulness, provide legal opinions, or represent you before the IRS. 
                If your situation involves willfulness questions, criminal exposure, or IRS representation, 
                I will recommend an appropriate attorney or credentialed representative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Behind on US taxes and think you might qualify for Streamlined?"
        description="The window is not open forever. The longer you wait, the more interest accrues — and the harder it becomes to gather the records you need. I review every intake personally and will tell you honestly if Streamlined fits your situation."
        buttonText="Reach Out About Your Filing"
        buttonHref="/intake"
        microcopy="Or book a focused Streamlined consultation directly."
      >
        <Link
          href="/consultation/streamlined"
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-white/30 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
        >
          Book Streamlined Consultation
        </Link>
      </CTASection>
    </PageShell>
  );
}
