import { Card, CardContent } from '@/components/ui/card';
import { Building2, AlertTriangle } from '@/components/icons';

interface BankingSectionProps {
  majorBanks: string[];
  fbarNotes: string;
  fatcaCompliance: string;
  currencyCode: string;
  countryName: string;
}

export default function BankingSection({
  majorBanks,
  fbarNotes,
  fatcaCompliance,
  currencyCode,
  countryName,
}: BankingSectionProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="w-6 h-6 text-secondary" />
          <h2 className="text-xl font-bold font-sans text-foreground">
            Banking & FBAR in {countryName}
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Major Banks ({currencyCode})
            </p>
            <div className="flex flex-wrap gap-2">
              {majorBanks.map((bank) => (
                <span
                  key={bank}
                  className="inline-block rounded-full bg-muted px-3 py-1 text-sm text-foreground"
                >
                  {bank}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-warning" aria-hidden="true" />
              <div>
                <p className="mb-1 text-sm font-medium text-foreground">FBAR Reminder</p>
                <p className="text-sm text-muted-foreground">{fbarNotes}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-1">FATCA Compliance</p>
            <p className="text-sm text-muted-foreground">{fatcaCompliance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
