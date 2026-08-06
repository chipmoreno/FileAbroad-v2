import Link from 'next/link';
import { ArrowRight, Calculator, FileCheck2, MessageSquareText } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  countryName: string;
  path: (href: string) => string;
}

const steps = [
  {
    title: 'Estimate FEIE fit',
    description: 'Use the basic calculator to frame the Physical Presence and Bona Fide Residence questions.',
    href: '/tools/feie-calculator',
    icon: Calculator,
  },
  {
    title: 'Check foreign-account reporting',
    description: 'Review the account facts that can point to FBAR or FATCA reporting before you file.',
    href: '/tools/fbar-checker',
    icon: FileCheck2,
  },
  {
    title: 'Get a fact-specific path',
    description: 'Not sure whether FEIE, the Foreign Tax Credit, or another filing path fits? Book a consultation.',
    href: '/intake',
    icon: MessageSquareText,
  },
];

export default function CountryNextSteps({ countryName, path }: Props) {
  return (
    <section className="mb-10 border border-secondary/30 bg-secondary/5 p-6 md:p-8" aria-labelledby="country-next-steps">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Your next decision</p>
      <h2 id="country-next-steps" className="mt-2 font-sans text-2xl font-bold text-foreground">
        Filing from {countryName}? Start with the question you can answer now.
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Country rules are only one part of the analysis. Use the right starting point for your facts, then move to a reviewed filing path when the decision depends on details.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={path(href)}
            data-analytics-event="country_next_step_click"
            data-cta-location="country-next-steps"
            data-country={countryName}
            data-next-step={href}
            className="group"
          >
            <Card className="h-full border-border bg-card transition-colors group-hover:border-secondary/60">
              <CardContent className="flex h-full flex-col p-5">
                <Icon className="mb-4 h-5 w-5 text-secondary" aria-hidden="true" />
                <h3 className="font-semibold text-foreground group-hover:text-secondary">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-secondary">
                  Open next step <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
