import { Badge } from '@/components/ui/badge';

interface CountryHeroProps {
  name: string;
  flag: string;
  region: string;
}

export default function CountryHero({ name, flag, region }: CountryHeroProps) {
  return (
    <section className="relative isolate mb-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(135deg, var(--card) 0%, var(--card) 55%, var(--muted) 100%)' }}
        aria-hidden="true"
      />
      <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
      <svg
        viewBox="0 0 720 300"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-3/4 text-secondary opacity-25 md:w-2/3 md:opacity-35"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="570" cy="150" r="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="570" cy="150" rx="48" ry="112" fill="none" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="570" cy="150" rx="112" ry="43" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M458 150h224" fill="none" stroke="currentColor" strokeWidth="1" />
        <path
          d="M82 228C218 82 370 79 493 134"
          fill="none"
          stroke="currentColor"
          strokeDasharray="7 10"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        <circle cx="82" cy="228" r="6" fill="currentColor" />
        <circle cx="493" cy="134" r="6" fill="currentColor" />
      </svg>

      <div className="relative z-10 px-6 py-8 md:px-9 md:py-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Country filing guide</p>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center md:gap-6">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/85 text-4xl shadow-sm md:h-20 md:w-20 md:text-5xl"
            aria-hidden="true"
          >
            {flag}
          </span>
          <div className="min-w-0">
            <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              US Expat Taxes in {name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="border-secondary/30 bg-background/85 text-secondary">
                {region}
              </Badge>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">U.S. filing route</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
