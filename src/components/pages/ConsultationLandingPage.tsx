import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronDown, FileText, LockKeyhole, ShieldCheck, UserRound } from '@/components/icons';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { Card, CardContent } from '@/components/ui/card';
import { buildFAQSchema } from '@/lib/structured-data';
import { getConsultationBookingHref, getConsultationPathway, consultationPathways, type ConsultationPathway } from '@/lib/consultation';
import { localizePath } from '@/lib/i18n/utils';
import type { Locale } from '@/lib/i18n/config';

interface ConsultationLandingPageProps {
  locale?: Locale;
  pathway?: ConsultationPathway;
}

const generalFaqs = [
  {
    question: 'What happens before any preparation work begins?',
    answer: 'The consultation identifies the facts, records, years, and questions that control the next step. If FileAbroad can accept the work, you receive the preparation scope in writing before preparation begins.',
  },
  {
    question: 'Should I upload tax documents before the consultation?',
    answer: 'No. Use the preliminary intake for broad facts only. Do not send Social Security numbers, account numbers, passports, or tax documents through the public form or WhatsApp. Secure upload instructions come after an accepted scope.',
  },
  {
    question: 'Can the consultation determine whether I am legally eligible?',
    answer: 'No. FileAbroad does not issue legal opinions, determine willfulness, represent taxpayers before the IRS, or guarantee an outcome. Higher-risk questions are identified for an appropriate referral or reviewer.',
  },
];

const consultationCommitments = [
  {
    title: 'Direct preparer',
    description: 'Discuss accepted filing work directly with the person preparing it.',
    icon: UserRound,
  },
  {
    title: 'Written scope',
    description: 'Scope and preparation terms are documented before preparation begins.',
    icon: FileText,
  },
  {
    title: 'Secure document transfer',
    description: 'Secure upload instructions follow acceptance of the written scope.',
    icon: LockKeyhole,
  },
];

export default function ConsultationLandingPage({ locale = 'en', pathway = 'general' }: ConsultationLandingPageProps) {
  const data = getConsultationPathway(pathway);
  const isGeneral = data.slug === 'general';
  const bookingHref = getConsultationBookingHref(data.slug);
  const localized = (path: string) => localizePath(path, locale);
  const faqs = isGeneral ? generalFaqs : [
    ...generalFaqs,
    {
      question: `What should I prepare for a ${data.label.toLowerCase()}?`,
      answer: `Bring the broad facts behind your ${data.label.toLowerCase()}: countries, years, account or entity types, income sources, and what records you already have. The consultation will identify the specific records needed for a written scope.`,
    },
  ];

  return (
    <PageShell locale={locale}>
      <JsonLd data={buildFAQSchema(faqs)} />
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ label: 'Consultation', href: localized('/consultation') }, ...(isGeneral ? [] : [{ label: data.label, href: localized(`/consultation/${data.slug}`) }])]} />
      </div>

      <section className="border-y border-border bg-surface-elevated py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">{data.label} · consultation-first process</p>
            <h1 className="max-w-4xl font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl">{data.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{data.description}</p>
            <div className="mt-8">
              <Link href={localized('/intake')} className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-lg font-bold text-primary-foreground hover:bg-foreground">
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Share broad facts first. The accepted scope, documents, and next step are confirmed in writing.</p>
          </div>
          <aside className="border-t-4 border-secondary bg-background p-7 shadow-sm">
            <div className="flex items-center gap-3 text-secondary"><ShieldCheck className="h-6 w-6" /><p className="text-xs font-bold uppercase tracking-[0.18em]">What the consultation clarifies</p></div>
            <ul className="mt-6 space-y-4">
              {data.questions.map((question) => <li key={question} className="flex items-start gap-3 text-foreground"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />{question}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-b border-border bg-card" aria-label="Consultation commitments">
        <ul className="mx-auto grid max-w-6xl divide-y divide-border px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
          {consultationCommitments.map(({ title, description, icon: Icon }) => (
            <li key={title} className="flex items-start gap-4 py-6 md:px-6 md:first:pl-0 md:last:pr-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-foreground">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {isGeneral && (
        <section className="mx-auto max-w-6xl px-6 py-14" aria-labelledby="consultation-pathways-heading">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Choose a starting point</p>
          <h2 id="consultation-pathways-heading" className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">A focused path for the facts you already know</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {consultationPathways.slice(1).map((item) => (
              <Card key={item.slug} className="border-border">
                <CardContent className="flex h-full flex-col p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">{item.label}</p>
                  <h3 className="mt-3 font-sans text-2xl font-bold leading-tight text-foreground">{item.title}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{item.description}</p>
                  <Link href={localized(`/consultation/${item.slug}`)} className="mt-6 inline-flex items-center gap-2 font-bold text-secondary hover:underline">Open this path <ArrowRight className="h-4 w-4" /></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-14" aria-labelledby="consultation-steps-heading">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">What to expect</p>
            <h2 id="consultation-steps-heading" className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">A clear path from questions to scope</h2>
          </div>
          <ol className="border-t border-border">
            {[
              ['Start the intake', 'Choose the general path or the pathway closest to your situation.'],
              ['Share the broad facts', 'Tell us where you live, what years are involved, what you earn or own, and what feels unclear.'],
              ['Review the next step', 'The consultation identifies likely forms, records, scope questions, and any boundary that needs another professional.'],
              ['Receive the written scope', 'If FileAbroad can accept the engagement, the scope and preparation terms are documented before work begins.'],
              ['Approve before preparation', 'Preparation starts only after you understand and approve the accepted work.'],
            ].map(([title, description], index) => (
              <li key={title} className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_1fr]"><span className="font-sans text-2xl font-bold text-secondary">{index + 1}</span><div><h3 className="font-sans text-xl font-bold text-foreground">{title}</h3><p className="mt-2 text-muted-foreground">{description}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8" aria-labelledby="consultation-faq-heading">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Before you book</p>
        <h2 id="consultation-faq-heading" className="mt-2 font-sans text-3xl font-bold text-foreground">Consultation questions</h2>
        <div className="mt-7 border-t border-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-border py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-sans text-lg font-bold text-foreground">
                <span>{faq.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-secondary motion-safe:transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 max-w-3xl text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <CTASection title="Ready to clarify your filing path?" description="Start the preliminary intake. Do not send sensitive tax documents through the public form." buttonText="Get Started" buttonHref={localized('/intake')} />
    </PageShell>
  );
}
