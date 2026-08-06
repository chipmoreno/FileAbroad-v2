'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, ArrowRight } from '@/components/icons';
import Link from 'next/link';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';

type YearsUnfiled = '0' | '1-2' | '3+';
type IncomeType = 'w2' | 'self-employed' | 'investments' | 'pension' | 'business';
type ForeignAccounts = 'yes' | 'no' | 'unsure';
type ForeignCorp = 'yes' | 'no';
type StateIssues = 'yes' | 'no';

interface Estimate {
  low: number;
  high: number;
  label: string;
}

export default function FeeEstimator() {
  const [yearsUnfiled, setYearsUnfiled] = useState<YearsUnfiled>('0');
  const [incomeType, setIncomeType] = useState<IncomeType>('w2');
  const [foreignAccounts, setForeignAccounts] = useState<ForeignAccounts>('no');
  const [foreignCorp, setForeignCorp] = useState<ForeignCorp>('no');
  const [stateIssues, setStateIssues] = useState<StateIssues>('no');
  const [showResults, setShowResults] = useState(false);

  const calculateEstimate = (): Estimate => {
    let low = 575;
    let high = 800;

    // Years unfiled
    if (yearsUnfiled === '1-2') {
      low += 300;
      high += 500;
    } else if (yearsUnfiled === '3+') {
      low += 800;
      high += 1500;
    }

    // Income type
    switch (incomeType) {
      case 'self-employed':
        low += 300;
        high += 500;
        break;
      case 'investments':
        low += 200;
        high += 400;
        break;
      case 'pension':
        low += 250;
        high += 450;
        break;
      case 'business':
        low += 600;
        high += 1200;
        break;
    }

    // Foreign accounts
    if (foreignAccounts === 'yes') {
      low += 200;
      high += 400;
    } else if (foreignAccounts === 'unsure') {
      low += 100;
      high += 200;
    }

    // Foreign corp/trust
    if (foreignCorp === 'yes') {
      low += 400;
      high += 800;
    }

    // State tax issues
    if (stateIssues === 'yes') {
      low += 300;
      high += 500;
    }

    let label = 'Standard Range';
    if (high <= 1000) label = 'Straightforward Return';
    else if (high <= 2000) label = 'Moderate Complexity';
    else if (high <= 3500) label = 'High Complexity';
    else label = 'Very High Complexity';

    return { low, high, label };
  };

  const estimate = calculateEstimate();

  const handleCalculate = () => {
    trackConversionEvent('tool_complete', { tool: 'fee_estimator' });
    setShowResults(true);
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="space-y-5">
            {/* Question 1 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                1. How many years are unfiled?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['0', '1-2', '3+'] as YearsUnfiled[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={yearsUnfiled === opt}
                    onClick={() => { setYearsUnfiled(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      yearsUnfiled === opt
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt === '0' ? 'None (current year only)' : opt === '1-2' ? '1–2 years' : '3+ years'}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label htmlFor="fee-income-type" className="block text-sm font-medium text-foreground mb-2">
                2. What type of income do you have?
              </label>
              <select
                id="fee-income-type"
                value={incomeType}
                onChange={(e) => { setIncomeType(e.target.value as IncomeType); setShowResults(false); }}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                <option value="w2">W-2 only (employment wages)</option>
                <option value="self-employed">Self-employed / 1099</option>
                <option value="investments">Investments (dividends, capital gains)</option>
                <option value="pension">Foreign pension or social security</option>
                <option value="business">Business or partnership income</option>
              </select>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                3. Do you have foreign financial accounts with over $10,000 aggregate?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['yes', 'no', 'unsure'] as ForeignAccounts[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={foreignAccounts === opt}
                    onClick={() => { setForeignAccounts(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      foreignAccounts === opt
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : 'Unsure'}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                4. Do you have a foreign corporation or trust?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['yes', 'no'] as ForeignCorp[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={foreignCorp === opt}
                    onClick={() => { setForeignCorp(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      foreignCorp === opt
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
                5. Do you have unresolved state tax issues (e.g., sticky-state residency)?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['yes', 'no'] as StateIssues[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={stateIssues === opt}
                    onClick={() => { setStateIssues(opt); setShowResults(false); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      stateIssues === opt
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt === 'yes' ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              data-analytics-event="tool_start"
              data-tool="fee_estimator"
              className="w-full bg-primary hover:bg-foreground text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Estimate My Fee
            </button>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <Card className="border-secondary/50 bg-background" role="region" aria-live="polite" aria-label="Estimated preparation fee">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-bold text-foreground">Estimated Preparation Fee</h2>
            </div>

            <div className="bg-background rounded-lg p-6 text-center mb-4">
              <p className="text-sm text-muted-foreground mb-1">{estimate.label}</p>
              <p className="text-3xl font-bold text-foreground">
                {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
              </p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <p>This range assumes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Federal return preparation for a US expat</li>
                <li>Standard schedules and forms for your selected income type</li>
                <li>FBAR filing if foreign accounts apply</li>
                <li>State return if state issues apply</li>
              </ul>
              <p>
                Actual fees may vary based on document quality, currency conversion complexity,
                treaty positions, and whether amendments or Streamlined filings are needed.
              </p>
            </div>

            <Link
              href="/intake"
              className="inline-flex items-center justify-center gap-2 w-full bg-secondary text-white font-semibold py-3 rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Start Your Filing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      )}

      {showResults && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          This estimate is for planning purposes only. It is not a binding quote. Final fees are determined after reviewing your actual documents and tax situation during intake.
        </p>
      )}
    </div>
  );
}
