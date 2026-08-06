import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowUpRight,
  Building2,
  FileText,
  Globe,
  GraduationCap,
  MapPin,
  Users,
} from '@/components/icons';

import { generateLocalizedMetadata, extractLocale } from '@/lib/i18n/metadata';
import { getDictionary, localizePath } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ lang: string }>;
}

const defaultWhyStartedParagraphs = [
  'Living abroad makes ordinary tax questions more layered. A foreign address can change deadlines; foreign accounts can create separate reporting; and FEIE, the Foreign Tax Credit, state residency, and local tax questions do not resolve one another.',
  'FileAbroad turns those questions into a documented scope. Every accepted client works directly with me. I prepare the forms and filings included in the engagement—such as FEIE, Foreign Tax Credit, FBAR, or FATCA reporting—with the scope confirmed before preparation begins.',
  'I also know the practical friction: time zones, foreign bank statements, missing records, and the difference between a U.S. filing question and a local-tax question. When the facts require legal, audit, entity, or local-country advice, the right answer is a referral—not a vague promise that one preparer can do everything.',
];

const defaultCredentials = [
  {
    title: 'IRS PTIN Holder',
    description:
      'Registered with the IRS as a paid tax return preparer. A PTIN is a preparer identifier, not a CPA, EA, or attorney credential.',
  },
  {
    title: 'IRS E-file Participant',
    description:
      'FileAbroad participates in the IRS e-file program for accepted federal returns. This is not an IRS endorsement, and the private EFIN is never displayed publicly.',
  },
  {
    title: 'Computer Science Degree',
    description:
      'Technical background that drives the systems and automation behind FileAbroad.',
  },
  {
    title: 'Based in Cuenca, Ecuador',
    description:
      'Living the expat life firsthand. I deal with the same cross-border tax questions my clients face.',
  },
  {
    title: 'Clear Scope and Direct Accountability',
    description:
      'You work directly with Chip, with flat-fee deliverables explained before payment. Audit representation and legal work are outside the standard engagement scope.',
  },
];

const credentialIcons = [FileText, FileText, GraduationCap, MapPin, Building2];

const defaultOtherProjectsIntro =
  'FileAbroad is part of a broader ecosystem of tools and services I build for the expat community.';
const defaultEcuapassDesc =
  'Administrative visa-document preparation and process coordination for Americans moving to Ecuador. EcuaPass does not currently have an Ecuadorian attorney on staff and does not promise legal representation.';
const defaultIterativeDesc =
  'The parent company behind FileAbroad and EcuaPass. I build technology and services for the American expat community.';
const enrollmentExamCaveat =
  'I have passed Part 1 of the IRS Special Enrollment Examination. I am not yet an Enrolled Agent, and this exam result is not presented as a professional credential.';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return generateLocalizedMetadata({
    pageKey: 'about',
    path: '/about',
    locale,
  });
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  const about = dict.about;
  const l = (path: string) => localizePath(path, locale);

  // Fall back to the English body copy where a locale does not yet provide it.
  const enDict = locale !== 'en' ? getDictionary('en') : dict;
  const whyStartedParagraphs =
    about.whyStartedParagraphs ??
    enDict.about.whyStartedParagraphs ??
    defaultWhyStartedParagraphs;
  const credentials =
    about.credentials ?? enDict.about.credentials ?? defaultCredentials;
  const otherProjectsIntro =
    about.otherProjectsIntro ??
    enDict.about.otherProjectsIntro ??
    defaultOtherProjectsIntro;
  const ecuapassDesc =
    about.ecuapassDesc ?? enDict.about.ecuapassDesc ?? defaultEcuapassDesc;
  const iterativeDesc =
    about.iterativeDesc ?? enDict.about.iterativeDesc ?? defaultIterativeDesc;

  return (
    <PageShell locale={locale}>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs
          items={[{ label: dict.breadcrumbs.about, href: l('/about') }]}
        />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:pb-24">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-primary shadow-2xl shadow-primary/15 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[28rem] lg:order-2 lg:min-h-[42rem]">
            <Image
              src="/images/chip-portrait.webp"
              alt={`${about.heroTitle} — FileAbroad`}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[center_20%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary/75 via-transparent to-transparent"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-primary-foreground/20 bg-primary/85 p-5 text-primary-foreground shadow-xl backdrop-blur-md sm:inset-x-8 sm:bottom-8">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <p className="font-sans text-xl">Cuenca, Ecuador</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 text-primary-foreground sm:p-12 lg:order-1 lg:p-14 xl:p-16">
            <span className="mb-6 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              {about.heroLabel}
            </span>
            <h1 className="max-w-xl font-sans text-5xl leading-[0.98] tracking-[-0.03em] text-primary-foreground sm:text-6xl xl:text-7xl">
              {about.heroTitle}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-primary-foreground/75 sm:text-xl">
              {about.heroDescription}
            </p>
            <div className="mt-8 border-l-2 border-secondary pl-5 text-sm leading-relaxed text-primary-foreground/65">
              {enrollmentExamCaveat}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/45 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              {about.heroLabel}
            </span>
            <h2 className="mt-4 max-w-md font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              {about.whyStartedTitle}
            </h2>
          </div>

          <ol className="relative border-l border-border">
            {whyStartedParagraphs.map((paragraph, index) => (
              <li
                key={paragraph}
                className="relative pb-10 pl-8 last:pb-0 sm:pl-12"
              >
                <span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full border border-secondary/40 bg-background font-mono text-[0.65rem] font-semibold text-secondary shadow-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="border-b border-border pb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            {about.heroLabel}
          </span>
          <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
            {about.backgroundTitle}
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {credentials.map((item, index) => {
            const CredentialIcon = credentialIcons[index] ?? FileText;

            return (
              <Card
                key={item.title}
                className={`group gap-0 border-border bg-card py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl ${
                  index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
                }`}
              >
                <CardContent className="p-7">
                  <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <CredentialIcon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-sans text-xl text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-4 md:pb-12">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <div className="lg:py-6">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              {about.heroLabel}
            </span>
            <h2 className="mt-4 font-sans text-4xl leading-tight tracking-[-0.02em] text-foreground md:text-5xl">
              {about.otherProjectsTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {otherProjectsIntro}
            </p>
          </div>

          <div className="grid gap-5">
            <Card className="group relative gap-0 border-border bg-primary py-0 text-primary-foreground shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-7 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <Globe className="size-6" aria-hidden="true" />
                  </div>
                  <ArrowUpRight
                    className="size-5 text-primary-foreground/45 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-secondary"
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
                <p className="mt-3 max-w-2xl leading-relaxed text-primary-foreground/70">
                  {ecuapassDesc}
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
                  {iterativeDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CTASection
        title={about.ctaTitle}
        description={about.ctaDescription}
        buttonText={about.ctaButton}
        buttonHref={l('/intake')}
      />
    </PageShell>
  );
}
