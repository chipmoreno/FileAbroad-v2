import Link from 'next/link';
import { ArrowRight } from '@/components/icons';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  microcopy?: string;
  children?: React.ReactNode;
}

export default function CTASection({
  title,
  description,
  buttonText = 'Start the 3-Minute Intake',
  buttonHref = '/intake',
  microcopy,
  children,
}: CTASectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 lg:py-20">
      <div className="relative isolate overflow-hidden rounded-3xl border border-primary-foreground/10 bg-primary p-8 shadow-[0_32px_90px_rgba(15,29,50,0.18)] sm:p-12 md:p-16">
        <div aria-hidden="true" className="absolute -right-24 -top-28 -z-10 h-72 w-72 rounded-full border border-accent/20" />
        <div aria-hidden="true" className="absolute -right-8 -top-12 -z-10 h-48 w-48 rounded-full border border-accent/10" />
        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">Consultation first · Written scope</p>
        <h2 className="mb-4 font-sans text-4xl font-normal leading-tight tracking-[-0.03em] text-white md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
          {description}
        </p>
        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Link
            href={buttonHref}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-accent px-8 py-4 text-lg font-bold text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          {children}
        </div>
        {microcopy && <p className="mt-5 text-sm text-primary-foreground/60">{microcopy}</p>}
      </div>
    </section>
  );
}
