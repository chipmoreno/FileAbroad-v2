import Link from 'next/link';
import { ChevronRight, Home } from '@/components/icons';
import JsonLd from './JsonLd';
import { buildBreadcrumbSchema } from '@/lib/structured-data';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];
  const schemaItems = allItems.map((item) => ({
    name: item.label,
    href: item.href,
  }));

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                )}
                {isLast ? (
                  <span className="text-foreground font-medium">
                    {index === 0 ? <><Home className="w-3.5 h-3.5" aria-hidden="true" /><span className="sr-only">Home</span></> : item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {index === 0 ? <><Home className="w-3.5 h-3.5" aria-hidden="true" /><span className="sr-only">Home</span></> : item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={buildBreadcrumbSchema(schemaItems)} />
    </>
  );
}
