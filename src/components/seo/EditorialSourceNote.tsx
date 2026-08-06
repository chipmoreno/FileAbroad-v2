import Link from 'next/link';
import { ExternalLink } from '@/components/icons';
import editorialRegistry from '../../../content/editorial-registry.json';

interface Props {
  routePattern: string;
}

export default function EditorialSourceNote({ routePattern }: Props) {
  const record = editorialRegistry.items.find((item) => item.routePattern === routePattern);
  if (!record) return null;

  return (
    <aside className="mx-auto mt-12 max-w-4xl rounded-md border border-border bg-background px-6 py-5" aria-labelledby="editorial-source-note-heading">
      <p id="editorial-source-note-heading" className="font-bold text-foreground">Editorial review and primary sources</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Reviewed <time dateTime={record.lastReviewed}>{record.lastReviewed}</time>. Filing rules, forms, thresholds, and agency procedures can change; confirm the current official guidance before acting on this resource.
      </p>
      <dl className="mt-4 grid gap-3 border-y border-border py-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-foreground">Content owner</dt>
          <dd className="mt-1 text-muted-foreground">{record.owner}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Review standard</dt>
          <dd className="mt-1 text-muted-foreground">{record.reviewer}</dd>
        </div>
      </dl>
      <ul className="mt-3 space-y-2 text-sm">
        {record.primarySources.map((source) => (
          <li key={source}>
            <a href={source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-secondary hover:underline">
              {new URL(source).hostname.replace(/^www\./, '')}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        Need help applying the checklist to your facts?{' '}
        <Link href="/consultation" className="font-semibold text-secondary underline underline-offset-4">Book a consultation</Link>.
      </p>
    </aside>
  );
}
