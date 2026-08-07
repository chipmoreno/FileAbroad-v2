import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, MapPin, Globe, MessageCircle, ShieldCheck } from '@/components/icons';

export const metadata: Metadata = {
  title: 'US Expat Tax Preparer in Cuenca, Ecuador | Chip Moreno',
  description:
    'Living in Ecuador and need a US tax preparer who actually understands expat life? Chip Moreno — American expat, PTIN holder, IRS e-file provider — based in Cuenca. Paid consultation first.',
  alternates: {
    canonical: 'https://fileabroad.com/ecuador-expat-tax-preparer',
  },
  openGraph: {
    title: 'US Expat Tax Preparer in Cuenca, Ecuador | Chip Moreno',
    description:
      'Living in Ecuador and need a US tax preparer who actually understands expat life? Based in Cuenca. Paid consultation first.',
    url: 'https://fileabroad.com/ecuador-expat-tax-preparer',
  },
};

const differentiators = [
  {
    icon: MapPin,
    title: 'I actually live here',
    description:
      'Most expat tax firms are call centers in Ohio. I live in Cuenca, Ecuador. I file my own FBAR and US return from here every year. I know what a cedula is, why your Ecuadorian pension is not a 401(k), and which travel days count for the Physical Presence Test — because I count my own.',
  },
  {
    icon: Globe,
    title: 'Ecuador-specific knowledge',
    description:
      'I understand the difference between a DIAN filing and an IRS filing. I know how the US-Ecuador tax relationship works — and does not work. I have helped clients navigate plusvalia tax, SRI registration questions, and the cross-border reporting that comes with living in Ecuador.',
  },
  {
    icon: ShieldCheck,
    title: 'Direct communication, start to finish',
    description:
      'You work directly with me from the first fact review to the final filing. No junior preparer you have never met. No handoffs to a production team. I review your intake personally and reply within one business day.',
  },
  {
    icon: MessageCircle,
    title: 'We can meet in person',
    description:
      'If you are in Cuenca or nearby, we can meet face to face. Most of my work is remote-friendly, but there is something valuable about sitting across from the person who will file your return.',
  },
];

const commonEcuadorIssues = [
  'Foreign Earned Income Exclusion (Form 2555) for Ecuador-based income',
  'FBAR reporting for Ecuadorian bank accounts and the IESS',
  'Plusvalia tax credit when you sell property in Ecuador',
  'Pension income from IESS and how it is treated on your US return',
  'Rental income from Ecuadorian property and depreciation rules',
  'State tax ties — especially if you moved from California, New York, or Virginia',
];

export default function EcuadorExpatTaxPreparerPage() {
  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: 'Ecuador Tax Preparer', href: '/ecuador-expat-tax-preparer' }]} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6 md:pb-16">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-surface-elevated lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 xl:p-16">
            <span className="mb-6 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Based in Cuenca, Ecuador
            </span>
            <h1 className="max-w-xl font-sans text-4xl leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl xl:text-6xl">
              US Tax Filing for Americans Living in Ecuador — From Someone Who Actually Lives Here
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Most expat tax firms are call centers in Ohio. You fill out a form, a junior 
              preparer you have never met does your return, and you get a bill. I do the opposite: 
              you work directly with me, from the first fact review to the final filing. 
              Every engagement starts with a paid consultation.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Reach Out About Your Filing <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'}?text=${encodeURIComponent("Hi Chip — I live in Ecuador and have a question about my US tax filing. [FA-ECUADOR]")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#25D366] px-6 py-3 font-semibold text-[#25D366] transition-opacity hover:bg-[#25D366]/5"
              >
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative min-h-[20rem] lg:min-h-[32rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
            <div className="flex h-full items-center justify-center p-12">
              <div className="text-center">
                <MapPin className="mx-auto h-16 w-16 text-accent" />
                <p className="mt-4 font-sans text-3xl font-bold text-foreground">Cuenca, Ecuador</p>
                <p className="mt-2 text-muted-foreground">Serving American expats in Ecuador and worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-y border-border bg-muted/45 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Why work with a preparer in Ecuador?
              </span>
              <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
                Because I am living the same tax reality you are
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:justify-self-end">
              I started FileAbroad because I could not find a preparer who understood 
              what it is like to actually live abroad. Here is what that means for you.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {differentiators.map((item) => (
              <Card
                key={item.title}
                className="group gap-0 border-border bg-card py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <CardContent className="p-7">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="size-6" aria-hidden="true" />
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

      {/* Common Ecuador Issues */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              What I help with
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              Common US tax issues for Americans in Ecuador
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              These are the questions I answer most often for clients living in Ecuador. 
              Every situation is different, but these are the starting points.
            </p>
          </div>

          <ul className="space-y-4">
            {commonEcuadorIssues.map((item) => (
              <li key={item} className="flex items-start gap-4 rounded-xl border border-border bg-surface-elevated p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-muted/45 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              The process
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              How it works
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Every engagement starts the same way: a paid consultation so we can map 
              your exact situation before any preparation begins.
            </p>
          </div>

          <ol className="relative mt-12 border-l border-border">
            {[
              {
                title: 'Reach out',
                description: 'Use the intake form or WhatsApp. Share your country, income, accounts, and filing history. No tax documents here — just the broad facts.',
              },
              {
                title: 'Personal review',
                description: 'I review every intake personally and reply within one business day. If FileAbroad can accept the work, we schedule a paid consultation.',
              },
              {
                title: 'Paid consultation',
                description: 'We map your exact filing path: which forms you need, which records are missing, and what the scope looks like. You receive a written scope and flat quote.',
              },
              {
                title: 'Preparation and filing',
                description: 'I prepare the accepted return within the written scope. You review it before I file. Every form is prepared by me — not handed to a junior preparer.',
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

      {/* CTA */}
      <CTASection
        title="Unsure about your US tax situation while living in Ecuador?"
        description="I review every intake personally. If FileAbroad can accept the work, you receive a written scope and flat quote — all yours to keep even if you do not proceed."
        buttonText="Reach Out About Your Filing"
        buttonHref="/intake"
        microcopy="Or message Chip directly on WhatsApp for a general question."
      >
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593962848410'}?text=${encodeURIComponent("Hi Chip — I live in Ecuador and have a question about my US tax filing. [FA-ECUADOR-CTA]")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-white/30 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp Chip
        </a>
      </CTASection>
    </PageShell>
  );
}
