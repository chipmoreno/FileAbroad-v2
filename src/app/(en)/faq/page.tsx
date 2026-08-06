import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { faqCategories } from '@/lib/faq-data';
import { buildFAQSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { HelpCircle, ArrowRight } from '@/components/icons';

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
      <section className="max-w-6xl mx-auto px-6 py-8 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3 text-secondary">
          <HelpCircle className="w-4 h-4" />
          Questions Answered
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-base max-w-3xl mx-auto leading-relaxed text-muted-foreground">
          Direct answers to common questions about filing U.S. taxes from abroad.
        </p>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <FAQAccordion categories={faqCategories} />
      </section>

      {/* Still Have Questions */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center border-t border-muted">
        <p className="text-muted-foreground mb-4">
          General guidance can identify the next question, but your filing position depends on your facts, tax year, and accepted scope.
        </p>
        <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
          See how it works <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </PageShell>
  );
}
