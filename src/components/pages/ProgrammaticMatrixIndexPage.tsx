import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

interface MatrixIndexSection {
  heading: string;
  links: { label: string; href: string }[];
}

interface Props {
  title: string;
  description: string;
  sections: MatrixIndexSection[];
}

export default function ProgrammaticMatrixIndexPage({ title, description, sections }: Props) {
  return (
    <PageShell>
      <article className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ label: 'Programmatic guides', href: '/countries/form-matrix' }, { label: title, href: '#' }]} />
        <header className="mb-10 max-w-3xl">
          <h1 className="font-sans text-3xl font-bold text-foreground md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
        </header>
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">{section.heading}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {section.links.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded border border-border bg-background p-4 text-sm font-semibold text-secondary hover:bg-surface-elevated">
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
