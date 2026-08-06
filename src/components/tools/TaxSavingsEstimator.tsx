'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, ArrowRight } from '@/components/icons';
import { FEIE_LIMIT_2025 } from '@/lib/constants/tax';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';

const FEIE_LIMIT = FEIE_LIMIT_2025;

export default function TaxSavingsEstimator() {
  const [foreignIncome, setForeignIncome] = useState('');
  const [foreignTaxPaid, setForeignTaxPaid] = useState('');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [showResults, setShowResults] = useState(false);

  const income = parseFloat(foreignIncome) || 0;
  const taxPaid = parseFloat(foreignTaxPaid) || 0;

  // FEIE path
  const feieExclusion = Math.min(income, FEIE_LIMIT);
  const taxableWithFEIE = Math.max(0, income - feieExclusion);

  // Simplified tax brackets (2025)
  const calcTax = (taxable: number): number => {
    if (filingStatus === 'single') {
      if (taxable <= 11925) return taxable * 0.10;
      if (taxable <= 48475) return 1192.5 + (taxable - 11925) * 0.12;
      if (taxable <= 103350) return 5577.5 + (taxable - 48475) * 0.22;
      if (taxable <= 197300) return 17647.5 + (taxable - 103350) * 0.24;
      if (taxable <= 250525) return 40200.5 + (taxable - 197300) * 0.32;
      return 57250.5 + (taxable - 250525) * 0.35;
    }
    if (taxable <= 23850) return taxable * 0.10;
    if (taxable <= 96950) return 2385 + (taxable - 23850) * 0.12;
    if (taxable <= 206700) return 11157 + (taxable - 96950) * 0.22;
    if (taxable <= 394600) return 35302 + (taxable - 206700) * 0.24;
    return 80398 + (taxable - 394600) * 0.32;
  };

  const fullTax = calcTax(income);

  // FEIE: tax on remaining income (stacking method — tax at rates as if full income)
  const feieTax = calcTax(taxableWithFEIE);
  const feieNetOwe = Math.max(0, feieTax);

  // FTC: full tax minus credit (limited to US tax on foreign income)
  const ftcCredit = Math.min(taxPaid, fullTax);
  const ftcNetOwe = Math.max(0, fullTax - ftcCredit);
  const ftcCarryover = Math.max(0, taxPaid - fullTax);

  const feieSavings = fullTax - feieNetOwe;
  const ftcSavings = fullTax - ftcNetOwe;

  const feieIsBetter = feieNetOwe <= ftcNetOwe;

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="savings-income" className="block text-sm font-medium text-foreground mb-1">
                Total Foreign Earned Income (2025)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="savings-income"
                  type="number"
                  value={foreignIncome}
                  onChange={(e) => { setForeignIncome(e.target.value); setShowResults(false); }}
                  placeholder="e.g. 85000"
                  className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="savings-tax-paid" className="block text-sm font-medium text-foreground mb-1">
                Foreign Taxes Paid (annual)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="savings-tax-paid"
                  type="number"
                  value={foreignTaxPaid}
                  onChange={(e) => { setForeignTaxPaid(e.target.value); setShowResults(false); }}
                  placeholder="e.g. 15000"
                  className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Income taxes paid to your country of residence
              </p>
            </div>

            <div>
              <label htmlFor="savings-status" className="block text-sm font-medium text-foreground mb-1">
                Filing Status
              </label>
              <select
                id="savings-status"
                value={filingStatus}
                onChange={(e) => { setFilingStatus(e.target.value as 'single' | 'married'); setShowResults(false); }}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                <option value="single">Single / Head of Household</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                if (income > 0) {
                  trackConversionEvent('tool_complete', { tool: 'tax_savings_estimator' });
                  setShowResults(true);
                }
              }}
              data-analytics-event="tool_start"
              data-tool="tax_savings_estimator"
              className="w-full bg-primary hover:bg-foreground text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Compare FEIE vs FTC
            </button>
          </div>
        </CardContent>
      </Card>

      {showResults && income > 0 && (
        <div className="grid gap-4 md:grid-cols-2" role="region" aria-live="polite" aria-label="Illustrative FEIE versus foreign tax credit comparison">
          {/* FEIE Column */}
          <Card className={`border-2 ${feieIsBetter ? 'border-green-300 bg-green-50' : 'border-border'}`}>
            <CardContent className="p-6">
              {feieIsBetter && (
                <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                  LOWER IN THIS ILLUSTRATION
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-4">
                Foreign Earned Income Exclusion
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Income Excluded</span>
                  <span className="font-medium">{fmt(feieExclusion)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxable Income</span>
                  <span className="font-medium">{fmt(taxableWithFEIE)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-foreground">Est. Tax Owed</span>
                  <span className="text-lg font-bold text-foreground">{fmt(feieNetOwe)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Savings vs Full Tax</span>
                  <span className="font-medium text-green-700">{fmt(feieSavings)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FTC Column */}
          <Card className={`border-2 ${!feieIsBetter ? 'border-green-300 bg-green-50' : 'border-border'}`}>
            <CardContent className="p-6">
              {!feieIsBetter && (
                <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                  LOWER IN THIS ILLUSTRATION
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-4">
                Foreign Tax Credit
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax Credit Applied</span>
                  <span className="font-medium">{fmt(ftcCredit)}</span>
                </div>
                {ftcCarryover > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Excess Credit (carryover)</span>
                    <span className="font-medium">{fmt(ftcCarryover)}</span>
                  </div>
                )}
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-foreground">Est. Tax Owed</span>
                  <span className="text-lg font-bold text-foreground">{fmt(ftcNetOwe)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Savings vs Full Tax</span>
                  <span className="font-medium text-green-700">{fmt(ftcSavings)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showResults && income > 0 && (
        <Card className="border-border bg-background">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">How to read this illustration</p>
                <p className="text-sm text-muted-foreground">
                  {feieIsBetter
                    ? `With only these inputs, the simplified FEIE column is lower (${fmt(feieNetOwe)} vs ${fmt(ftcNetOwe)}).`
                    : `With only these inputs, the simplified FTC column is lower (${fmt(ftcNetOwe)} vs ${fmt(feieNetOwe)}).`}
                  {' '}This is not a recommendation. The model omits the FEIE stacking calculation, deductions, income categories, credit-limitation baskets, carryovers, self-employment tax, and other return items. A preparer must compare the complete facts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
