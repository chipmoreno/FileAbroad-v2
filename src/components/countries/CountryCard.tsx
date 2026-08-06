import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CountryCardProps {
  slug: string;
  name: string;
  flag: string;
  region: string;
  taxSystem: string;
  hasTreaty: boolean;
}

const taxSystemLabels: Record<string, string> = {
  territorial: 'Territorial Tax',
  worldwide: 'Worldwide Tax',
  remittance: 'Remittance-Based',
  none: 'No Income Tax',
};

export default function CountryCard({
  slug,
  name,
  flag,
  region,
  taxSystem,
  hasTreaty,
}: CountryCardProps) {
  return (
    <Link href={`/countries/${slug}`} className="group">
      <Card className="h-full border-border hover:border-secondary/50 transition-all hover:shadow-md">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl" aria-hidden="true">{flag}</span>
            {hasTreaty && (
              <Badge variant="outline" className="border-success/30 bg-success/10 text-xs text-foreground">
                Tax Treaty
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors mb-1">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{region}</p>
          <p className="text-xs text-muted-foreground">
            {taxSystemLabels[taxSystem] || taxSystem}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
