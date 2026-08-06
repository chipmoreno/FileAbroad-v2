import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from '@/components/icons';

interface TaxSystemOverviewProps {
  system: 'territorial' | 'worldwide' | 'remittance' | 'none';
  rates: string;
  totalizationAgreement: boolean;
  countryName: string;
}

const systemDescriptions: Record<string, { label: string; tone: string; description: string }> = {
  territorial: {
    label: 'Territorial',
    tone: 'border-success/30 bg-success/10 text-foreground',
    description: 'Only taxes income earned within its borders. Foreign-sourced income is generally not taxed.',
  },
  worldwide: {
    label: 'Worldwide',
    tone: 'border-warning/30 bg-warning/10 text-foreground',
    description: 'Taxes residents on their worldwide income, regardless of where it is earned.',
  },
  remittance: {
    label: 'Remittance-Based',
    tone: 'border-info/30 bg-info/10 text-foreground',
    description: 'Only taxes foreign income when it is brought (remitted) into the country.',
  },
  none: {
    label: 'No Income Tax',
    tone: 'border-success/30 bg-success/10 text-foreground',
    description: 'Does not levy a personal income tax on residents.',
  },
};

export default function TaxSystemOverview({
  system,
  rates,
  totalizationAgreement,
  countryName,
}: TaxSystemOverviewProps) {
  const info = systemDescriptions[system];

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold font-sans text-foreground mb-4">
          {countryName} Tax System
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={info.tone}>{info.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{info.description}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-1">Tax Rates</p>
            <p className="text-sm text-muted-foreground">{rates}</p>
          </div>

          <div className="flex items-center gap-2">
            {totalizationAgreement ? (
              <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" aria-hidden="true" />
            )}
            <p className="text-sm text-muted-foreground">
              {totalizationAgreement
                ? `A U.S.–${countryName} Social Security agreement is listed as in force. Coverage depends on where and how you work.`
                : `No U.S.–${countryName} Social Security agreement is listed as in force. Confirm which system covers your work.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
