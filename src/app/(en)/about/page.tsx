import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  FileText,
  Globe,
  GraduationCap,
  MapPin,
  Users,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'About Chip Moreno',
  description:
    'Meet Chip Moreno, founder of FileAbroad, a PTIN-holder and IRS e-file participant serving Americans abroad from Cuenca, Ecuador.',
  alternates: {
    canonical: 'https://fileabroad.com/about',
  },
  openGraph: {
    title: 'About Chip Moreno',
    description:
      'Meet Chip Moreno, founder of FileAbroad, a PTIN-holder and IRS e-file participant serving Americans abroad from Cuenca, Ecuador.',
    url: 'https://fileabroad.com/about',
  },
};

const credentials = [
  {
    icon: FileText,
    title: 'IRS PTIN Holder',
    description:
      'Registered with the IRS as a paid tax return preparer. A PTIN is a preparer identifier, not a CPA, EA, or attorney credential.',
  },
  {
    icon: FileText,
    title: 'IRS E-file Participant',
    description:
      'FileAbroad participates in the IRS e-file program for accepted federal returns. This is not an IRS endorsement, and the private EFIN is never displayed publicly.',
  },
  {
    icon: GraduationCap,
    title: 'Computer Science Degree',
    description:
      'Technical background that drives the systems and automation behind FileAbroad.',
  },
  {
    icon: MapPin,
    title: 'Based in Cuenca, Ecuador',
    description:
      'Living the expat life firsthand. I deal with the same cross-border tax questions my clients face.',
  },
  {
    icon: Building2,
    title: 'Clear Scope and Direct Accountability',
    description:
      'You work directly with Chip, with flat-fee deliverables explained before payment. Audit representation and legal work are outside the standard engagement scope.',
  },
];

const story = [
  {
    number: '01',
    title: 'Cuenca is home',
    description:
      'I am an American expat living in Cuenca, Ecuador. I know the practical friction firsthand: time zones, foreign bank statements, missing records, and the difference between a U.S. filing question and a local-tax question.',
  },
  {
    number: '02',
    title: 'The questions become layered abroad',
    description:
      'A foreign address can change deadlines; foreign accounts can create separate reporting; and FEIE, the Foreign Tax Credit, state residency, and local tax questions do not resolve one another.',
  },
  {
    number: '03',
    title: 'FileAbroad starts with the filing path',
    description:
      'FileAbroad turns those questions into a documented scope. Every accepted client works directly with me. I prepare the forms and filings included in the engagement—such as FEIE, Foreign Tax Credit, FBAR, or FATCA reporting—with the scope confirmed before preparation begins.',
  },
  {
    number: '04',
    title: 'Clear limits are part of clear service',
    description:
      'When the facts require legal, audit, entity, or local-country advice, the right answer is a referral—not a vague promise that one preparer can do everything.',
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6 md:pb-16">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-surface-elevated lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[28rem] lg:order-2 lg:min-h-[42rem]">
            <Image
              src="/images/chip-portrait.webp"
              alt="Portrait of Chip Moreno, founder of FileAbroad"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[center_20%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/85 p-5 text-foreground shadow-xl backdrop-blur-md sm:inset-x-8 sm:bottom-8">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Based abroad
                  </p>
                  <p className="font-sans text-xl">Cuenca, Ecuador</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 text-foreground sm:p-12 lg:order-1 lg:p-14 xl:p-16">
            <span className="mb-6 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              About FileAbroad
            </span>
            <h1 className="max-w-xl font-sans text-5xl leading-[0.98] tracking-[-0.03em] text-foreground sm:text-6xl xl:text-7xl">
              Hi, I&apos;m Chip Moreno
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              I&apos;m an American expat living in Cuenca, Ecuador. I founded
              FileAbroad — the U.S. tax preparation service associated with{' '}
              <a
                href="https://ecuapass.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent/80"
              >
                EcuaPass
              </a>{' '}
              — because the first question is often not &ldquo;Which form do I file?&rdquo;
              but &ldquo;Which filing path fits my facts?&rdquo; The service starts there,
              with a clear scope and direct communication where the work is
              straightforward.
            </p>
            <div className="mt-8 border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted-foreground">
              I have passed Part 1 of the IRS Special Enrollment Examination. I
              am not yet an Enrolled Agent, and this exam result is not presented
              as a professional credential.
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/45 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              The throughline
            </span>
            <h2 className="mt-4 max-w-md font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              Why FileAbroad exists
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Living abroad makes ordinary tax questions more layered. The work
              is to separate those questions, identify the right filing path,
              and define what belongs in the engagement.
            </p>
          </div>

          <ol className="relative border-l border-border">
            {story.map((item) => (
              <li key={item.number} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
                <span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full border border-secondary/40 bg-background font-mono text-[0.65rem] font-semibold text-secondary shadow-sm">
                  {item.number}
                </span>
                <h3 className="font-sans text-2xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Background
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              Credentials, stated precisely
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:justify-self-end">
            Trust starts with knowing what each signal means—and what it does
            not. These are the facts behind the FileAbroad practice.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {credentials.map((item, index) => (
            <Card
              key={item.title}
              className={`group gap-0 border-border bg-card py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl ${
                index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
              }`}
            >
              <CardContent className="p-7">
                <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <item.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="font-sans text-xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-4 md:pb-12">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <div className="lg:py-6">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              The wider ecosystem
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              Other projects
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              FileAbroad is part of a broader ecosystem of tools and services I
              build for the expat community.
            </p>
          </div>

          <div className="grid gap-5">
            <Card className="group relative gap-0 border-border bg-card py-0 text-foreground shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-7 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Globe className="size-6" aria-hidden="true" />
                  </div>
                  <ArrowUpRight
                    className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-8 font-sans text-2xl">
                  <Link
                    href="https://ecuapass.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0"
                  >
                    EcuaPass
                  </Link>
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  Administrative visa-document preparation and process
                  coordination for Americans moving to Ecuador. EcuaPass does
                  not currently have an Ecuadorian attorney on staff and does
                  not promise legal representation.
                </p>
              </CardContent>
            </Card>

            <Card className="gap-0 border-border bg-card py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl">
              <CardContent className="p-7 sm:p-8">
                <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-foreground">
                  <Users className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-8 font-sans text-2xl text-foreground">
                  Iterative Systems LLC
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  The parent company behind FileAbroad and EcuaPass. I build
                  technology and services for the American expat community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 text-center border-t border-muted">
        <p className="text-muted-foreground mb-3">
          Start the intake to identify the records, forms, and filing path before preparation begins.
        </p>
        <Link href="/intake" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </PageShell>
  );
}
