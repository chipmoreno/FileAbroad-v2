'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ArrowRight } from '@/components/icons';
import Link from 'next/link';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';

type StateOption = 'CA' | 'NY' | 'VA' | 'NJ' | 'MA' | 'CT' | 'IL' | 'MD' | 'OR' | 'other';
type YesNo = 'yes' | 'no';
type DaysOption = '0' | '1-30' | '31-90' | '90+';

const STICKY_STATES: StateOption[] = ['CA', 'NY', 'VA', 'NJ', 'MA', 'CT', 'IL', 'MD', 'OR'];

export default function StateTaxResidencyAnalyzer() {
  const [state, setState] = useState<StateOption>('CA');
  const [property, setProperty] = useState<YesNo>('no');
  const [license, setLicense] = useState<YesNo>('no');
  const [voter, setVoter] = useState<YesNo>('no');
  const [bank, setBank] = useState<YesNo>('no');
  const [days, setDays] = useState<DaysOption>('0');
  const [showResults, setShowResults] = useState(false);

  const calculateRisk = () => {
    let score = 0;
    const factors: string[] = [];

    if (property === 'yes') { score += 3; factors.push('Owns property in state'); }
    if (license === 'yes') { score += 2; factors.push('Holds state driver\'s license'); }
    if (voter === 'yes') { score += 3; factors.push('Registered to vote in state'); }
    if (bank === 'yes') { score += 1; factors.push('Maintains bank accounts in state'); }

    switch (days) {
      case '1-30': score += 1; factors.push('Spent 1–30 days in state last year'); break;
      case '31-90': score += 3; factors.push('Spent 31–90 days in state last year'); break;
      case '90+': score += 5; factors.push('Spent 90+ days in state last year'); break;
    }

    const isSticky = STICKY_STATES.includes(state);
    if (isSticky && score >= 3) score += 1;

    let level: 'Low' | 'Medium' | 'High' | 'Extreme';
    if (score <= 2) level = 'Low';
    else if (score <= 5) level = 'Medium';
    else if (score <= 8) level = 'High';
    else level = 'Extreme';

    return { score, level, factors, isSticky };
  };

  const risk = calculateRisk();

  const handleAnalyze = () => {
    trackConversionEvent('tool_complete', { tool: 'state_tax_residency_analyzer' });
    setShowResults(true);
  };

  const getStateGuidance = () => {
    switch (state) {
      case 'CA':
        return 'California is one of the most aggressive states. Even if you left years ago, CA may assert residency if you maintain property, a driver\'s license, or voter registration. Consider filing a nonresident return or a residency termination statement.';
      case 'NY':
        return 'New York uses a 183-day rule plus a "domicile" test. If you spent 90+ days there and have a permanent place of abode, you may be deemed a statutory resident. Document your departure carefully.';
      case 'VA':
        return 'Virginia is notoriously sticky. Many expats discover years later that VA still claims them. Close bank accounts, surrender your license, and unregister to vote. Consider filing a final return marked "final".';
      case 'NJ':
        return 'New Jersey closely tracks domicile intent. Maintaining a home or spending significant time there can trigger residency claims. Keep a detailed departure record.';
      case 'MA':
        return 'Massachusetts has broad residency rules. If you maintain any domicile ties, the state may assert jurisdiction. Document your foreign tax home clearly.';
      case 'CT':
        return 'Connecticut examines domicile intent holistically. Even brief visits combined with property ownership can trigger audits. Keep thorough records of your foreign residence.';
      case 'IL':
        return 'Illinois uses both domicile and statutory residency tests. If you maintain a residence in Illinois and spend time there, you may be at risk. File a final return if you have not already.';
      case 'MD':
        return 'Maryland aggressively pursues expats for unpaid state taxes. Close all ties including bank accounts and voter registration to reduce risk.';
      case 'OR':
        return 'Oregon is increasingly aggressive with non-filing expats. If you own property or have a license there, the state may claim you as a resident.';
      default:
        return 'Most states use a combination of domicile and statutory residency rules. Check your specific state\'s department of revenue guidance for exact thresholds.';
    }
  };

  const getColor = () => {
    switch (risk.level) {
      case 'Low': return 'text-green-700 bg-green-50 border-green-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'High': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Extreme': return 'text-red-700 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="space-y-5">
            {/* Question 1 */}
            <div>
              <label htmlFor="state-tax-state" className="block text-sm font-medium text-foreground mb-2">
                1. Which state did you last live in?
              </label>
              <select
                id="state-tax-state"
                value={state}
                onChange={(e) => { setState(e.target.value as StateOption); setShowResults(false); }}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="VA">Virginia</option>
                <option value="NJ">New Jersey</option>
                <option value="MA">Massachusetts</option>
                <option value="CT">Connecticut</option>
                <option value="IL">Illinois</option>
                <option value="MD">Maryland</option>
                <option value="OR">Oregon</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                2. Do you still own property there?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['yes', 'no'] as YesNo[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={property === opt}
                    onClick={() => { setProperty(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      property === opt
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt === 'yes' ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                3. Do you still have a driver&apos;s license there?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['yes', 'no'] as YesNo[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={license === opt}
                    onClick={() => { setLicense(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      license === opt
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt === 'yes' ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                4. Are you registered to vote there?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['yes', 'no'] as YesNo[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={voter === opt}
                    onClick={() => { setVoter(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      voter === opt
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt === 'yes' ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 5 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                5. Do you still have bank accounts there?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['yes', 'no'] as YesNo[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={bank === opt}
                    onClick={() => { setBank(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      bank === opt
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt === 'yes' ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 6 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                6. How many days did you spend there last year?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['0', '1-30', '31-90', '90+'] as DaysOption[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={days === opt}
                    onClick={() => { setDays(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      days === opt
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt === '0' ? '0 days' : opt === '1-30' ? '1–30 days' : opt === '31-90' ? '31–90 days' : '90+ days'}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              data-analytics-event="tool_start"
              data-tool="state_tax_residency_analyzer"
              className="w-full bg-primary hover:bg-foreground text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Analyze Residency Risk
            </button>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <Card className="border-secondary/50 bg-background" role="region" aria-live="polite" aria-label="Residency risk assessment">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-bold text-foreground">Residency Risk Assessment</h2>
            </div>

            <div className={`rounded-lg border p-6 text-center mb-4 ${getColor()}`}>
              <p className="text-sm mb-1">Risk Level</p>
              <p className="text-3xl font-bold">{risk.level}</p>
              <p className="text-sm mt-1">Score: {risk.score} / 14</p>
            </div>

            {risk.factors.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">Factors increasing your risk:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {risk.factors.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {risk.factors.length === 0 && (
              <p className="text-sm text-muted-foreground mb-4">
                You reported no significant ties. Your risk appears low, but always confirm with a tax professional, especially if you previously lived in a high-tax state.
              </p>
            )}

            <div className="bg-background rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-foreground mb-1">State-specific guidance</p>
              <p className="text-sm text-muted-foreground">{getStateGuidance()}</p>
            </div>

            <Link
              href="/intake"
              className="inline-flex items-center justify-center gap-2 w-full bg-secondary text-white font-semibold py-3 rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Discuss Your State Tax Situation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      )}

      {showResults && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          This tool provides a general risk assessment based on common state residency factors. Each state has unique rules and case law. For definitive advice, consult a tax professional licensed in your former state.
        </p>
      )}
    </div>
  );
}
