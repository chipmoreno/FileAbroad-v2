import Link from 'next/link';

interface Props {
  countryName: string;
  path: (href: string) => string;
}

const rows = [
  {
    question: 'U.S. filing',
    answer: 'Country of residence is not the only question. Check filing status, income type, thresholds, and the tax year.',
    href: '/guides/expat-tax-guide',
    label: 'Read the filing guide',
  },
  {
    question: 'Foreign earned income',
    answer: 'FEIE analysis turns on foreign earned income, tax home, and either the Physical Presence or Bona Fide Residence test.',
    href: '/tools/feie-calculator',
    label: 'Check FEIE basics',
  },
  {
    question: 'Tax paid abroad',
    answer: 'FEIE and the Foreign Tax Credit are different tools. Compare them before assuming one is better for your facts.',
    href: '/compare/feie-vs-ftc',
    label: 'Compare FEIE and FTC',
  },
  {
    question: 'Foreign accounts',
    answer: 'FBAR and FATCA are separate reporting questions. Account ownership, signature authority, and balances can matter.',
    href: '/tools/fbar-checker',
    label: 'Check account reporting',
  },
];

export default function CountryQuickAnswer({ countryName, path }: Props) {
  return (
    <section className="mb-10 border border-border bg-card p-6 md:p-8" aria-labelledby="country-quick-answer-heading">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Quick answer</p>
      <h2 id="country-quick-answer-heading" className="mt-2 font-sans text-2xl font-bold text-foreground">
        What living in {countryName} changes—and what it does not
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Your country matters, but it does not answer every U.S. tax question by itself. Use this map to identify the next fact to verify before relying on a filing strategy.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">Key U.S. expat tax decisions for Americans living in {countryName}</caption>
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="pb-3 pr-5 font-bold">Question</th>
              <th scope="col" className="pb-3 pr-5 font-bold">What to verify</th>
              <th scope="col" className="pb-3 font-bold">Next step</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.question} className="border-b border-border last:border-0">
                <th scope="row" className="whitespace-nowrap py-4 pr-5 align-top font-semibold text-foreground">{row.question}</th>
                <td className="py-4 pr-5 align-top leading-relaxed text-muted-foreground">{row.answer}</td>
                <td className="py-4 align-top">
                  <Link
                    href={path(row.href)}
                    data-analytics-event="country_quick_answer_click"
                    data-cta-location="country-quick-answer"
                    data-country={countryName}
                    data-next-step={row.href}
                    className="font-bold text-secondary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary"
                  >
                    {row.label}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
