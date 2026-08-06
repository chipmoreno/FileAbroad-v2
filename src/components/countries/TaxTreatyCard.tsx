import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle, XCircle } from '@/components/icons';

interface TaxTreatyCardProps {
  exists: boolean;
  yearSigned: number | null;
  keyProvisions: string[];
  countryName: string;
}

export default function TaxTreatyCard({
  exists,
  yearSigned,
  keyProvisions,
  countryName,
}: TaxTreatyCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {exists ? (
            <CheckCircle className="h-6 w-6 text-success" aria-hidden="true" />
          ) : (
            <XCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
          )}
          <h2 className="text-xl font-bold font-sans text-foreground">
            US-{countryName} Tax Treaty
          </h2>
        </div>

        {exists ? (
          <>
            {yearSigned && (
              <p className="text-sm text-muted-foreground mb-3">
                Treaty signed: {yearSigned}
              </p>
            )}
            {keyProvisions.length > 0 && (
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Key Provisions:</p>
                <ul className="space-y-1.5">
                  {keyProvisions.map((provision, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" aria-hidden="true" />
                      {provision}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link
              href="/forms/8833-treaty-benefits"
              className="mt-4 inline-flex text-sm font-semibold text-secondary hover:underline"
            >
              Review Form 8833 treaty disclosure
            </Link>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            The US does not currently have an income tax treaty with {countryName}.
            This means you may not be able to use treaty benefits to reduce your tax liability,
            but the FEIE and Foreign Tax Credit are still available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
