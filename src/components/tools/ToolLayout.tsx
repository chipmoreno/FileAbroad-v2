import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/layout/CTASection';
import Link from 'next/link';
import { AlertTriangle } from '@/components/icons';

const relatedContentByTool: Record<string, { label: string; href: string }[]> = {
  '/tools/feie-calculator': [
    { label: 'Foreign Earned Income Exclusion guide', href: '/guides/feie-guide' },
    { label: 'FEIE vs. Foreign Tax Credit', href: '/blog/feie-vs-foreign-tax-credit' },
    { label: 'How to use the FEIE calculator', href: '/blog/feie-calculator-how-to-use' },
  ],
  '/tools/fbar-checker': [
    { label: 'FBAR filing guide', href: '/guides/fbar-guide' },
    { label: 'FBAR vs. Form 8938', href: '/blog/fbar-vs-form-8938-do-you-need-both' },
    { label: 'FBAR requirements for Americans abroad', href: '/blog/fbar-requirements-americans-abroad' },
  ],
  '/tools/catch-up-program': [
    { label: 'Streamlined Filing guide', href: '/guides/streamlined-filing-guide' },
    { label: 'Organize a multi-year catch-up file', href: '/blog/how-to-organize-a-multi-year-catch-up-file' },
    { label: 'What to gather for late FBARs', href: '/blog/late-fbars-what-to-gather-before-choosing-a-path' },
  ],
  '/tools/expat-tax-deadline-calendar': [
    { label: 'Expat tax guide', href: '/guides/expat-tax-guide' },
    { label: '2026 expat tax deadlines', href: '/blog/2026-expat-tax-deadlines' },
    { label: 'FBAR deadline guide', href: '/blog/fbar-deadline-2026' },
  ],
  '/tools/tax-savings-estimator': [
    { label: 'Foreign Tax Credit guide', href: '/guides/foreign-tax-credit-guide' },
    { label: 'FEIE or Foreign Tax Credit questions', href: '/blog/feie-or-foreign-tax-credit-questions-to-ask-first' },
    { label: 'FTC in high-tax countries', href: '/blog/ftc-high-tax-countries' },
  ],
  '/tools/state-tax-residency-analyzer': [
    { label: 'State taxes abroad guide', href: '/guides/state-taxes-abroad' },
    { label: 'Domicile vs. physical presence', href: '/blog/state-tax-residency-domicile-vs-physical-presence' },
    { label: 'How to terminate state residency', href: '/blog/how-to-terminate-state-residency' },
  ],
  '/tools/quarterly-tax-calculator': [
    { label: 'Self-employment abroad guide', href: '/guides/self-employment-abroad-tax-guide' },
    { label: 'Quarterly estimated taxes for expats', href: '/blog/quarterly-estimated-taxes-expats' },
    { label: '2026 expat tax deadlines', href: '/blog/2026-expat-tax-deadlines' },
  ],
};

interface ToolLayoutProps {
  title: string;
  description: string;
  breadcrumbLabel: string;
  breadcrumbHref: string;
  schema?: Record<string, unknown>;
  children: React.ReactNode;
}

export default function ToolLayout({
  title,
  description,
  breadcrumbLabel,
  breadcrumbHref,
  schema,
  children,
}: ToolLayoutProps) {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: breadcrumbLabel, href: breadcrumbHref },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-foreground">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {description}
          </p>
        </header>

        {children}

        {relatedContentByTool[breadcrumbHref] && (
          <section className="mt-10 border-t border-border pt-8" aria-labelledby="related-tool-content">
            <h2 id="related-tool-content" className="mb-4 font-sans text-2xl font-bold text-foreground">
              Keep researching
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {relatedContentByTool[breadcrumbHref].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-border p-4 text-sm font-semibold text-secondary transition-colors hover:border-secondary/50 hover:bg-background"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mt-8">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This tool provides estimates for educational purposes only.
            Tax situations vary significantly based on individual circumstances. Always consult
            a qualified tax professional before making tax decisions.
          </p>
        </div>
      </div>

      <CTASection
        title="Get Personalized Tax Advice"
        description="These tools are educational starting points. Book a consultation for guidance tailored to your specific situation."
        buttonText="Get Started"
        buttonHref="/intake"
      />

      {schema && <JsonLd data={{ ...schema, name: title, description }} />}
    </>
  );
}
