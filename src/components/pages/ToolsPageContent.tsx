import Link from 'next/link';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { SiteDictionary } from '@/lib/i18n/types';
import { Locale } from '@/lib/i18n/config';
import { Calculator, ClipboardCheck, CalendarDays, Scale, ShieldCheck, MapPin, Calendar } from '@/components/icons';
import ExpatTaxDecisionTable from '@/components/tools/ExpatTaxDecisionTable';

interface Props {
  dict: SiteDictionary;
  locale: Locale;
}

const toolIcons = [Calculator, ClipboardCheck, ShieldCheck, CalendarDays, Scale, MapPin, Calendar];
const toolRoutes = [
  { href: '/tools/feie-calculator', localized: true },
  { href: '/tools/fbar-checker', localized: true },
  { href: '/tools/catch-up-program', localized: true },
  { href: '/tools/expat-tax-deadline-calendar', localized: true },
  { href: '/tools/tax-savings-estimator', localized: true },
  { href: '/tools/state-tax-residency-analyzer', localized: false },
  { href: '/tools/quarterly-tax-calculator', localized: false },
];

export default function ToolsPageContent({ dict, locale }: Props) {
  const d = dict.tools;
  const l = (path: string) => {
    if (locale === 'en') return path;
    return `/${locale}${path}`;
  };

  const tools = [
    { title: d.toolFeieTitle, description: d.toolFeieDescription, icon: toolIcons[0] },
    { title: d.toolFbarTitle, description: d.toolFbarDescription, icon: toolIcons[1] },
    { title: d.toolCatchUpTitle, description: d.toolCatchUpDescription, icon: toolIcons[2] },
    { title: d.toolCalendarTitle, description: d.toolCalendarDescription, icon: toolIcons[3] },
    { title: d.toolEstimatorTitle, description: d.toolEstimatorDescription, icon: toolIcons[4] },
    { title: d.toolStateResidencyTitle, description: d.toolStateResidencyDescription, icon: toolIcons[5] },
    { title: d.toolQuarterlyTaxTitle, description: d.toolQuarterlyTaxDescription, icon: toolIcons[6] },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-foreground">
            {d.heroTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{d.heroDescription}</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const route = toolRoutes[index];
            return (
              <Link
                key={route.href}
                href={route.localized ? l(route.href) : route.href}
                className="group"
              >
                <Card className="h-full border-border hover:border-secondary/50 transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-surface-elevated flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors mb-2 font-sans">
                      {tool.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        {locale === 'en' && <ExpatTaxDecisionTable />}
        {locale === 'en' && (
          <section className="mt-14" aria-labelledby="tools-resource-heading">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Free resources</p>
            <h2 id="tools-resource-heading" className="mt-2 font-sans text-3xl font-bold text-foreground">Keep the decision path moving</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">Save or share a practical checklist after you use a tool. Each resource explains what to gather and when a fact-specific review is worthwhile.</p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                { href: '/resources/expat-tax-checklist', title: 'Expat tax checklist', description: 'Organize pre-move, annual, and catch-up filing tasks.' },
                { href: '/resources/fbar-flowchart', title: 'FBAR flowchart', description: 'Walk through the foreign-account reporting questions.' },
                { href: '/resources/streamlined-checklist', title: 'Streamlined checklist', description: 'Gather records before a scope review for late filings.' },
              ].map((resource) => (
                <Link key={resource.href} href={resource.href} data-analytics-event="tool_resource_click" data-cta-location="tools-resource-path" className="group border border-border bg-background p-6 transition hover:border-secondary hover:shadow-sm">
                  <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-secondary">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
                  <span className="mt-4 inline-flex text-sm font-bold text-secondary">Open resource →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CTASection title={d.ctaTitle} description={d.ctaDescription} buttonText={d.ctaButton} buttonHref={l('/intake')} />
    </>
  );
}
