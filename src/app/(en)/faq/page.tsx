import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { faqCategories } from '@/lib/faq-data';
import { buildFAQSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { HelpCircle } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Expat Tax FAQ — US Tax Filing from Abroad',
  description:
    'Answers to common questions about FBAR, FEIE, FATCA, foreign tax credits, and filing US taxes as an American living abroad.',
  alternates: {
    canonical: 'https://fileabroad.com/faq',
  },
  openGraph: {
    title: 'Expat Tax FAQ — US Tax Filing from Abroad',
    description:
      'Answers to common questions about FBAR, FEIE, FATCA, foreign tax credits, and filing US taxes as an American living abroad.',
    url: 'https://fileabroad.com/faq',
  },
};

export default function FAQPage() {
  const allFaqs = faqCategories.flatMap((cat) =>
    cat.faqs.map((q) => ({ question: q.question, answer: q.answer }))
  );
  return (
    <PageShell>
      <JsonLd data={buildFAQSchema(allFaqs)} />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: 'FAQ', href: '/faq' }]} />
      </div>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 text-secondary">
          <HelpCircle className="w-5 h-5" />
          Questions Answered
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-sans text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
          Direct answers to common questions about filing U.S. taxes from abroad.
          If your facts do not fit a general answer, book a consultation to review
          the next step.
        </p>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <FAQAccordion categories={faqCategories} />
      </section>

      {/* Still Have Questions */}
      <CTASection
        title="Still Have Questions?"
        description="General guidance can identify the next question, but your filing position depends on your facts, tax year, and accepted scope."

      >
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/60">
          <Link href="/how-it-works" className="underline hover:text-white">
            How it works
          </Link>
          <Link href="/consultation" className="underline hover:text-white">
            Book a consultation
          </Link>
          <Link href="/services" className="underline hover:text-white">
            Our services
          </Link>
        </div>
      </CTASection>
    </PageShell>
  );
}
