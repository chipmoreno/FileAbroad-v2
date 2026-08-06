import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import { homepageFaqs, type FAQ } from '@/lib/faq-data';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/constants';
import { getDictionary, localizePath } from '@/lib/i18n/utils';
import { defaultLocale, type Locale } from '@/lib/i18n/config';

export default function HomePage({ locale = defaultLocale }: { locale?: Locale }) {
  const dict = getDictionary(locale);
  const localizeHref = (path: string) => localizePath(path, locale);
  const home = dict.home;
  const servicesCopy = dict.services;
  const process = dict.howItWorks;
  const isEnglish = locale === 'en';

  const services = [
    { label: 'Form 1040', title: home.serviceAnnualTitle, description: home.serviceAnnualDesc, href: '/services/tax-filing' },
    { label: 'FinCEN 114', title: servicesCopy.fbarFiling, description: servicesCopy.fbarFilingDesc, href: '/services/fbar-filing' },
    { label: 'Form 8938', title: servicesCopy.fatcaCompliance, description: servicesCopy.fatcaComplianceDesc, href: '/services/fatca-compliance' },
    { label: 'Catch-up', title: home.serviceStreamlinedTitle, description: home.serviceStreamlinedDesc, href: '/services/streamlined-filing' },
  ];
  const steps = [
    [process.step1Title, process.step1Description],
    [process.step2Title, process.step2Description],
    [process.step3Title, process.step3Description],
    [process.step4Title, process.step4Description],
  ];
  const comparisons = [
    { title: home.comparisonSoftware, items: [home.comparisonSoftwareDesc1, home.comparisonSoftwareDesc2, home.comparisonSoftwareDesc3] },
    { title: home.comparisonFirms, items: [home.comparisonFirmsDesc1, home.comparisonFirmsDesc2, home.comparisonFirmsDesc3] },
    { title: home.comparisonFileAbroad, items: [home.comparisonFileAbroadDesc1, home.comparisonFileAbroadDesc2, home.comparisonFileAbroadDesc3], featured: true },
  ];
  const faqs: FAQ[] = isEnglish
    ? homepageFaqs
    : [
        dict.servicesExpat.faqs[0],
        dict.servicesExpat.faqs[2],
        dict.servicesFbar.faqs[0],
        dict.servicesFbar.faqs[1],
        dict.servicesFatca.faqs[0],
        dict.servicesStreamlined.faqs[0],
      ].filter((faq): faq is FAQ => Boolean(faq));

  return (
    <>
      <section className="overflow-hidden pb-24 pt-8 lg:pb-32 lg:pt-12">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {isEnglish ? 'U.S. Expat Tax Services from Ecuador' : home.heroLabel}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-light leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {isEnglish ? 'Tax filing for Americans living abroad.' : `${home.heroTitle} ${home.heroTitleEmphasis}`}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {isEnglish ? 'Work directly with one preparer for annual returns, FBAR, FATCA, foreign tax credits, and carefully screened catch-up filings.' : home.heroDescription}
            </p>
            <div className="mt-8">
              <Link href={localizeHref('/intake')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90">
                {isEnglish ? 'Get Started' : home.heroCtaPrimary}<ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {[home.heroTrustPoint1, isEnglish ? 'Fixed scope before work' : home.heroTrustPoint2, home.trustReviewBeforeFiling].map((point) => (
                <li key={point} className="border-l border-muted pl-6 text-sm leading-relaxed text-muted-foreground">{point}</li>
              ))}
            </ul>
          </div>

          <div className="lg:-mr-8 xl:-mr-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-elevated">
              <Image src="/images/hero.webp" alt={isEnglish ? 'A calm international tax preparation workspace' : home.heroCardDescription} fill priority sizes="(max-width: 1024px) 92vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Service commitments" className="border-y border-muted py-8">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-5 px-6 sm:grid-cols-4 lg:px-8">
          {[home.trustOnePreparer, isEnglish ? 'Fixed scope' : home.trustPublishedPrices, home.trustReviewBeforeFiling, isEnglish ? 'Secure portal' : home.heroTrustPoint3].map((item) => (
            <li key={item} className="text-sm font-medium text-muted-foreground">{item}</li>
          ))}
        </ul>
      </section>

      <section id="services" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{home.servicesSectionLabel}</p>
          <h2 className="mt-6 max-w-2xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{home.servicesHeading}</h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{home.servicesIntro}</p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:auto-rows-[minmax(13rem,auto)] lg:grid-cols-4">
            <Link href={localizeHref('/services/complex-return')} className="card-hover group flex flex-col rounded-xl border border-muted bg-surface-elevated p-8 lg:col-span-2 lg:row-span-2 lg:p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{home.serviceComplexBadge}</span>
              <div className="mt-auto pt-16">
                <h3 className="text-3xl font-medium tracking-tight text-foreground">{home.serviceComplexTitle}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{home.serviceComplexDesc}</p>
                <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-accent">{servicesCopy.learnMore}<ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
            {services.map((service) => (
              <Link key={service.title} href={localizeHref(service.href)} className="card-hover group flex flex-col rounded-xl border border-muted bg-surface p-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{service.label}</span>
                <h3 className="mt-8 text-xl font-medium text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">{servicesCopy.learnMore}<ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-elevated py-24" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{process.heroLabel}</p>
          <h2 id="process-heading" className="mt-6 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{process.heroTitle}</h2>
          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-muted lg:block" />
            <ol className="relative grid gap-10 lg:grid-cols-4">
              {steps.map(([title, description], index) => (
                <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-5 lg:block">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">{index + 1}</span>
                  <div className="lg:mt-6">
                    <h3 className="text-lg font-medium text-foreground">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{isEnglish ? 'A deliberate fit' : home.servicesSectionLabel}</p>
            <h2 className="mt-6 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{home.comparisonTitle}</h2>
          </div>
          <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[.9fr_.9fr_1.2fr]">
            {comparisons.map((card) => (
              <article key={card.title} className={`rounded-xl border p-8 ${card.featured ? 'border-foreground bg-foreground text-background lg:-my-3 lg:p-10' : 'border-muted bg-surface'}`}>
                <h3 className={`text-xl font-medium ${card.featured ? 'text-background' : 'text-foreground'}`}>{card.title}</h3>
                <ul className={`mt-6 space-y-4 text-sm leading-relaxed ${card.featured ? 'text-background/70' : 'text-muted-foreground'}`}>
                  {card.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${card.featured ? 'bg-accent' : 'bg-muted-foreground'}`} /><span>{item}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-elevated py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:px-8">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-muted">
            <Image src="/images/chip-portrait.webp" alt={isEnglish ? 'Chip Moreno in Cuenca, Ecuador' : dict.about.heroTitle} fill loading="lazy" decoding="async" sizes="(max-width: 1024px) 90vw, 38vw" className="object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{dict.about.heroLabel}</p>
            <h2 className="mt-6 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{isEnglish ? 'One preparer, from first review to filing.' : home.aboutHeading}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{home.aboutDescription}</p>
            <blockquote className="mt-8 border-l-2 border-accent pl-6 text-lg italic leading-relaxed text-foreground">
              {isEnglish ? '“You should know who is preparing your return, what is included, and what happens next.”' : home.heroCardDescription}
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link href={localizeHref('/about')} className="link-underline text-accent">{home.heroCardLink}</Link>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`} target="_blank" rel="noopener noreferrer" className="link-underline text-accent">WhatsApp</a>
              <a href="mailto:info@fileabroad.com" className="link-underline text-accent">Email</a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[.75fr_1.25fr] lg:gap-20 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{home.faqSectionLabel}</p>
            <h2 className="mt-6 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{home.faqHeading}</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{home.faqDescription}</p>
            <Link href={localizeHref('/intake')} className="mt-8 inline-flex rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background">{isEnglish ? 'Get Started' : home.aboutCtaIntake}</Link>
          </div>
          <div>
            {faqs.slice(0, 6).map((faq) => (
              <details key={faq.question} className="group border-b border-muted py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-medium text-foreground">
                  {faq.question}<span aria-hidden="true" className="text-muted-foreground transition-transform group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-background/70">{isEnglish ? 'Ready to file?' : home.faqSectionLabel}</p>
          <h2 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">{isEnglish ? 'Start your filing path' : dict.faq.ctaTitle}</h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-background/75">{isEnglish ? 'Share the broad facts, identify the right filing path, and receive a clear written scope before preparation begins.' : dict.faq.ctaDescription}</p>
          <Link href={localizeHref('/intake')} className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground">{isEnglish ? 'Get Started' : home.aboutCtaIntake}</Link>
        </div>
      </section>
    </>
  );
}
