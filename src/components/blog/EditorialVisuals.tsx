import { ArrowDown, ArrowRight, CheckCircle2, Search, ShieldCheck } from '@/components/icons';

function FigureShell({
  label,
  title,
  children,
  caption,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  caption: string;
}) {
  return (
    <figure className="not-prose my-10 overflow-hidden border border-border bg-surface-elevated">
      <figcaption className="border-b border-border bg-background px-5 py-4 md:px-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">{label}</p>
        <p className="mt-1 font-sans text-xl font-bold text-foreground md:text-2xl">{title}</p>
      </figcaption>
      <div className="p-5 md:p-7">{children}</div>
      <p className="border-t border-border bg-background px-5 py-3 text-xs leading-relaxed text-muted-foreground md:px-7">
        {caption}
      </p>
    </figure>
  );
}

export function TreatySnapshot() {
  return (
    <FigureShell
      label="Treaty snapshot"
      title="No comprehensive income-tax treaty does not mean no relief"
      caption="A Tax Information Exchange Agreement supports information sharing; it does not allocate taxing rights like a comprehensive income-tax treaty."
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="border border-border bg-background p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Step 1</p>
          <p className="mt-2 font-bold text-foreground">Identify each country&apos;s claim</p>
          <p className="mt-2 text-sm text-muted-foreground">Residence, source, income type, and filing status shape which rules apply.</p>
        </div>
        <ArrowRight aria-hidden="true" className="mx-auto hidden h-5 w-5 text-secondary md:block" />
        <ArrowDown aria-hidden="true" className="mx-auto h-5 w-5 text-secondary md:hidden" />
        <div className="border border-secondary bg-background p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-secondary">Step 2</p>
          <p className="mt-2 font-bold text-foreground">Test U.S. domestic relief</p>
          <p className="mt-2 text-sm text-muted-foreground">Compare the Foreign Tax Credit and FEIE, then check reporting such as FBAR separately.</p>
        </div>
      </div>
    </FigureShell>
  );
}

export function FbarAggregateExample() {
  return (
    <FigureShell
      label="Threshold example"
      title="FBAR uses the combined maximum value—not a per-account test"
      caption="This is a simplified threshold illustration. Account type, ownership, signature authority, and currency conversion still need separate review."
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <div className="border border-border bg-background p-5 text-center">
          <p className="text-sm text-muted-foreground">Account A maximum</p>
          <p className="mt-1 font-sans text-3xl font-bold text-foreground">$6,000</p>
        </div>
        <p aria-hidden="true" className="text-center text-2xl font-bold text-secondary">+</p>
        <div className="border border-border bg-background p-5 text-center">
          <p className="text-sm text-muted-foreground">Account B maximum</p>
          <p className="mt-1 font-sans text-3xl font-bold text-foreground">$5,000</p>
        </div>
        <p aria-hidden="true" className="text-center text-2xl font-bold text-secondary">=</p>
        <div className="border border-secondary bg-background p-5 text-center">
          <p className="text-sm font-bold text-secondary">Aggregate maximum</p>
          <p className="mt-1 font-sans text-3xl font-bold text-foreground">$11,000</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-red-700">Threshold exceeded</p>
        </div>
      </div>
    </FigureShell>
  );
}

const comparisonChecks = [
  'What is included in the quoted price?',
  'Who actually prepares and reviews the return?',
  'Are FBAR, FATCA, state, and catch-up forms included?',
  'What happens when the facts do not fit the standard workflow?',
];

export function ServiceComparisonCriteria() {
  return (
    <FigureShell
      label="Comparison framework"
      title="Compare the scope before you compare the headline price"
      caption="Service terms and accepted scope can change. Confirm the full written scope directly with any provider before paying."
    >
      <div className="grid gap-px border border-border bg-border md:grid-cols-2">
        {comparisonChecks.map((item, index) => (
          <div key={item} className="flex gap-3 bg-background p-5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{index + 1}</span>
            <p className="font-semibold leading-relaxed text-foreground">{item}</p>
          </div>
        ))}
      </div>
    </FigureShell>
  );
}

const retirementLayers = [
  { icon: Search, title: 'Classify the payment', text: 'Social Security, pension, IRA, investment income, and work income can follow different rules.' },
  { icon: ShieldCheck, title: 'Apply U.S. federal rules', text: 'U.S. citizens generally report worldwide income even while living abroad.' },
  { icon: CheckCircle2, title: 'Verify Ecuador treatment', text: 'Confirm residency, source, current SRI practice, and any foreign-tax-credit interaction.' },
];

export function RetirementTaxLayers() {
  return (
    <FigureShell
      label="Decision flow"
      title="Retirement-income answers require three separate checks"
      caption="Do not infer current Ecuador treatment from a general territorial-tax label. Verify the payment and your residency facts with current authoritative guidance."
    >
      <ol className="grid gap-3 md:grid-cols-3">
        {retirementLayers.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <Icon aria-hidden="true" className="h-6 w-6 text-secondary" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">0{index + 1}</span>
            </div>
            <p className="mt-5 font-bold text-foreground">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
    </FigureShell>
  );
}
