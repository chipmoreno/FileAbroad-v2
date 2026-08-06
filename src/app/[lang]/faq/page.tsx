import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { faqCategories } from '@/lib/faq-data';
import { buildFAQSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { HelpCircle } from '@/components/icons';
import { generateLocalizedMetadata, extractLocale } from '@/lib/i18n/metadata';
import { getDictionary, localizePath } from '@/lib/i18n/utils';
import Link from 'next/link';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return generateLocalizedMetadata({
    pageKey: 'faq',
    path: '/faq',
    locale,
  });
}

export default async function FAQPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  const faq = dict.faq;
  const l = (path: string) => localizePath(path, locale);

  const allFaqs = faqCategories.flatMap((cat) =>
    cat.faqs.map((q) => ({ question: q.question, answer: q.answer }))
  );

  return (
    <PageShell locale={locale}>
      <JsonLd data={buildFAQSchema(allFaqs)} />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.faq, href: l('/faq') }]} />
      </div>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 text-secondary">
          <HelpCircle className="w-5 h-5" />
          {faq.heroLabel}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-sans text-foreground">
          {faq.heroTitle}
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
          {faq.heroDescription}
        </p>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <FAQAccordion categories={faqCategories} />
      </section>

      {/* Still Have Questions */}
      <CTASection
        title={faq.ctaTitle}
        description={faq.ctaDescription}
      >
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/60">
          <Link href={l('/how-it-works')} className="underline hover:text-white">
            {dict.breadcrumbs.howItWorks}
          </Link>
          <Link href={l('/consultation')} className="underline hover:text-white">
            Book a consultation
          </Link>
          <Link href={l('/services')} className="underline hover:text-white">
            {dict.breadcrumbs.services}
          </Link>
        </div>
      </CTASection>
    </PageShell>
  );
}
