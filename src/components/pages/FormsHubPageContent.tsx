import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import CTASection from "@/components/layout/CTASection";
import FormsDirectory from '@/components/forms/FormsDirectory';
import { formHasTranslation, getAllForms } from "@/lib/forms";
import { defaultLocale, Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";
import { localizedPageCopy } from "@/lib/i18n/localized-page-copy";

export default function FormsHubPageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const forms = getAllForms(locale).filter(
    (form) => locale === defaultLocale || formHasTranslation(form.slug, locale),
  );
  const localized = localizedPageCopy[locale].forms;
  const copy = {
    label: localized.label,
    title: localized.title,
    description: localized.description,
    readGuide: localized.readGuide,
    notSure: localized.missingTitle,
    notSureDescription: localized.missingDescription,
    start: localized.start,
    ctaTitle: localized.ctaTitle,
    ctaDescription: localized.ctaDescription,
    ctaButton: localized.ctaButton,
  };

  return (
    <>
      <section className="border-b border-border bg-surface-elevated pb-12 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {copy.label}
          </p>
          <h1 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
            {copy.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <FormsDirectory forms={forms} locale={locale} readGuide={copy.readGuide} />

        {/* High-value forms callout */}
        <aside className="mt-12 rounded-lg border border-secondary/30 bg-background p-6 md:p-8">
          <h2 className="mb-3 font-sans text-2xl font-bold text-foreground">
            {copy.notSure}
          </h2>
          <p className="mb-5 max-w-2xl text-muted-foreground">
            {copy.notSureDescription}
          </p>
          <Link
            href={localizePath('/consultation', locale)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground hover:bg-primary/90"
          >
            {copy.start} <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>

      <CTASection
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        buttonText={copy.ctaButton}
        buttonHref={localizePath('/consultation', locale)}
      />
    </>
  );
}
