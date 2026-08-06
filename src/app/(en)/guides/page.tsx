import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock, ShieldCheck } from '@/components/icons';
import { getAllGuides } from '@/lib/guides';
import { formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Expat Tax Guides - Complete Resources for Americans Abroad',
  description:
    'In-depth guides covering FEIE, FBAR, Foreign Tax Credits, Streamlined Filing, and everything American expats need to know about US taxes from abroad.',
  alternates: { canonical: 'https://fileabroad.com/guides' },
  openGraph: {
    title: 'Expat Tax Guides',
    description:
      'In-depth guides covering FEIE, FBAR, Foreign Tax Credits, and everything American expats need to know.',
    url: 'https://fileabroad.com/guides',
  },
};

const advancedTopics = [
  ['Accidental American filing requirements', '/blog/accidental-american-filing-requirements'],
  ['Best state domicile for expats', '/blog/best-state-domicile-expats'],
  ['Digital nomad tax residency', '/blog/digital-nomad-tax-residency'],
  ['Foreign inheritance and U.S. tax', '/blog/foreign-inheritance-us-tax'],
  ['Foreign LLC tax issues', '/blog/foreign-llc-abroad-us-tax'],
  ['Foreign trust beneficiary rules', '/blog/foreign-trust-beneficiary-rules'],
  ['PFIC foreign mutual funds', '/blog/pfic-foreign-mutual-funds'],
  ['PFIC penalty questions', '/blog/pfic-penalties'],
  ['Renouncing U.S. citizenship and tax', '/blog/renouncing-us-citizenship-tax-consequences'],
  ['Self-employment tax for digital nomads', '/blog/self-employment-tax-digital-nomads'],
  ['Subpart F income explained', '/blog/subpart-f-income-explained'],
  ['What is a PFIC?', '/blog/what-is-a-pfic-expats'],
  ['What is an accidental American?', '/blog/what-is-accidental-american'],
  ['How to terminate state residency', '/blog/how-to-terminate-state-residency'],
  ['How to choose an expat tax service', '/blog/best-expat-tax-filing-services-2026'],
];

export default function GuidesPage() {
  const guides = getAllGuides();
  const resources = [
    {
      href: '/resources/expat-tax-checklist',
      title: 'Expat tax checklist',
      description: 'Organize the documents, deadlines, and reporting tasks that follow you abroad.',
    },
    {
      href: '/resources/fbar-flowchart',
      title: 'FBAR requirement flowchart',
      description: 'Walk through the foreign-account threshold and identify your next filing step.',
    },
    {
      href: '/resources/streamlined-checklist',
      title: 'Streamlined filing checklist',
      description: 'Gather the records needed to discuss a potential catch-up filing scope.',
    },
  ];

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Guides', href: '/guides' }]} />

        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-foreground">
            Expat Tax Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Clear guides to the tax questions that matter most to Americans living abroad.
            Each guide is general education; check current primary sources and your facts
            before you act.
          </p>

          <section className="mt-10 border-y border-border bg-surface-elevated px-6 py-8" aria-labelledby="guide-pathways-heading" data-analytics-impression="guide_pathways_view">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Choose by question</p>
            <h2 id="guide-pathways-heading" className="mt-2 font-sans text-2xl font-bold text-foreground">Find the next useful page</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['I need an annual return', 'See filing scope and start the intake.', '/services/expat-tax-filing'],
                ['I have foreign accounts', 'Organize the facts behind FBAR and Form 8938.', '/tools/fbar-checker'],
                ['I am behind on filing', 'Start with the catch-up fact pattern.', '/tools/catch-up-program'],
                ['I still have state ties', 'Map the state-residency questions.', '/tools/state-tax-residency-analyzer'],
                ['I want a one-page checklist', 'Save the expat filing checklist.', '/resources/expat-tax-checklist'],
                ['I need a scope review', 'Discuss a complex or uncertain case.', '/consultation'],
              ].map(([label, description, href]) => (
                <Link key={href} href={href} data-analytics-event="guide_pathway_click" data-cta-location="guides-pathways" className="group border border-border bg-background p-5 transition hover:border-secondary hover:shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <h3 className="mt-3 font-sans text-lg font-bold text-foreground group-hover:text-secondary">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-secondary">Open path <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </section>
        </header>

        <section className="mb-12 border-b border-border pb-10" aria-labelledby="advanced-topics-heading" data-analytics-impression="advanced_topics_view">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Advanced topics</p>
          <h2 id="advanced-topics-heading" className="mt-2 font-sans text-2xl font-bold text-foreground">Go deeper when your situation is less typical</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">These articles cover fact patterns that often need more careful review. They are educational starting points, not individualized tax advice.</p>
          <div className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {advancedTopics.map(([label, href]) => (
              <Link key={href} href={href} data-analytics-event="advanced_topic_click" data-cta-location="guides-advanced-topics" className="inline-flex items-start gap-2 text-sm font-semibold text-secondary hover:underline">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />{label}
              </Link>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block">
              <Card className="border-border hover:border-secondary/50 transition-colors">
                <CardContent className="p-6">
                  <Badge className="bg-blue-50 text-blue-700 border-0 mb-3">
                    {guide.category}
                  </Badge>
                  <h2 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors mb-2 font-sans">
                    {guide.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {guide.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {guide.readingTime}
                    </span>
                    {guide.lastUpdated && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        Updated {formatDate(guide.lastUpdated)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mt-14 border-t border-border pt-10">
          <h2 className="mb-3 font-sans text-2xl font-bold text-foreground">
            Free planning resources
          </h2>
          <p className="mb-6 max-w-3xl text-muted-foreground">
            Use these checklists and decision aids to organize your facts before
            filing or starting an intake review.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href} className="group">
                <Card className="h-full border-border transition-colors hover:border-secondary/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-12 text-center border-t border-muted">
        <p className="text-muted-foreground mb-4">
          These guides are educational. For preparation help, start with a scope review of your facts and required forms.
        </p>
        <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
          See how it works <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </PageShell>
  );
}
