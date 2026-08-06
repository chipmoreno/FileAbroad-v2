'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from '@/components/icons';
import Link from 'next/link';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';
import { SE_TAX_RATE, STANDARD_DEDUCTION_SINGLE_2025, STANDARD_DEDUCTION_MFJ_2025, FEIE_LIMIT_2025 } from '@/lib/constants/tax';

type FilingStatus = 'single' | 'married';
type FeieEligible = 'yes' | 'no';

export default function QuarterlyTaxCalculator() {
  const [income, setIncome] = useState('');
  const [foreignTax, setForeignTax] = useState('');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [feieEligible, setFeieEligible] = useState<FeieEligible>('yes');
  const [showResults, setShowResults] = useState(false);

  const netIncome = parseFloat(income) || 0;
  const foreignTaxPaid = parseFloat(foreignTax) || 0;

  // SE tax calculation: 92.35% of net income * 15.3%
  const seTaxable = netIncome * 0.9235;
  const seTax = seTaxable * SE_TAX_RATE;

  // Income tax estimate (2025 rates, simplified)
  const estimateIncomeTax = (taxable: number): number => {
    const standardDeduction = filingStatus === 'single' ? STANDARD_DEDUCTION_SINGLE_2025 : STANDARD_DEDUCTION_MFJ_2025;
    const ti = Math.max(0, taxable - standardDeduction);

    if (filingStatus === 'single') {
      if (ti <= 11925) return ti * 0.10;
      if (ti <= 48475) return 1192.5 + (ti - 11925) * 0.12;
      if (ti <= 103350) return 5577.5 + (ti - 48475) * 0.22;
      if (ti <= 197300) return 17647.5 + (ti - 103350) * 0.24;
      if (ti <= 250525) return 40200.5 + (ti - 197300) * 0.32;
      if (ti <= 626350) return 57250.5 + (ti - 250525) * 0.35;
      return 188750.5 + (ti - 626350) * 0.37;
    }
    // married filing jointly
    if (ti <= 23850) return ti * 0.10;
    if (ti <= 96950) return 2385 + (ti - 23850) * 0.12;
    if (ti <= 206700) return 11157 + (ti - 96950) * 0.22;
    if (ti <= 394600) return 35302 + (ti - 206700) * 0.24;
    if (ti <= 501050) return 80398 + (ti - 394600) * 0.32;
    if (ti <= 751600) return 114462 + (ti - 501050) * 0.35;
    return 202154.5 + (ti - 751600) * 0.37;
  };

  // Deductible portion of SE tax (roughly half)
  const seTaxDeduction = seTax * 0.5;

  // Taxable income after FEIE and SE deduction
  let taxableIncome = Math.max(0, netIncome - seTaxDeduction);
  if (feieEligible === 'yes') {
    taxableIncome = Math.max(0, taxableIncome - Math.min(netIncome, FEIE_LIMIT_2025));
  }

  const incomeTax = estimateIncomeTax(taxableIncome);
  const totalTax = seTax + incomeTax;

  // Foreign tax credit (simplified cap at total tax)
  const ftc = Math.min(foreignTaxPaid, totalTax);
  const netTax = totalTax - ftc;

  const quarterly = netTax > 0 ? netTax / 4 : 0;

  const handleCalculate = () => {
    if (netIncome > 0) {
      trackConversionEvent('tool_complete', { tool: 'quarterly_tax_calculator' });
      setShowResults(true);
    }
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  const dueDates = [
    { label: 'Q1 (Jan–Mar)', date: 'April 15' },
    { label: 'Q2 (Apr–May)', date: 'June 15' },
    { label: 'Q3 (Jun–Aug)', date: 'September 15' },
    { label: 'Q4 (Sep–Dec)', date: 'January 15 (following year)' },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="qt-income" className="block text-sm font-medium text-foreground mb-1">
                Estimated Annual Net Self-Employment Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  id="qt-income"
                  type="number"
                  value={income}
                  onChange={(e) => { setIncome(e.target.value); setShowResults(false); }}
                  placeholder="e.g. 60000"
                  className="w-full pl-7 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your expected net profit from self-employment for the full year.
              </p>
            </div>

            <div>
              <label htmlFor="qt-foreign-tax" className="block text-sm font-medium text-foreground mb-1">
                Estimated Foreign Tax Paid (annual)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  id="qt-foreign-tax"
                  type="number"
                  value={foreignTax}
                  onChange={(e) => { setForeignTax(e.target.value); setShowResults(false); }}
                  placeholder="e.g. 12000"
                  className="w-full pl-7 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total income tax you expect to pay to your host country this year.
              </p>
            </div>

            <div>
              <label htmlFor="qt-status" className="block text-sm font-medium text-foreground mb-1">
                Filing Status
              </label>
              <select
                id="qt-status"
                value={filingStatus}
                onChange={(e) => { setFilingStatus(e.target.value as FilingStatus); setShowResults(false); }}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                <option value="single">Single / Head of Household</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                FEIE Eligible? (Physical Presence or Bona Fide Residence)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['yes', 'no'] as FeieEligible[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setFeieEligible(opt); setShowResults(false); }}
                    aria-pressed={feieEligible === opt}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      feieEligible === opt
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
              data-tool="quarterly_tax_calculator"
              className="w-full bg-primary hover:bg-foreground text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Calculate Quarterly Payments
            </button>
          </div>
        </CardContent>
      </Card>

      {showResults && netIncome > 0 && (
        <Card className="border-secondary/50 bg-background" role="region" aria-live="polite" aria-label="Estimated quarterly tax payments">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-bold text-foreground">Estimated Quarterly Tax Payments</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="bg-background rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Self-Employment Tax</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(seTax)}</p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Est. Income Tax</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(incomeTax)}</p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Foreign Tax Credit</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(ftc)}</p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Net Estimated Tax</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(netTax)}</p>
              </div>
            </div>

            <div className="bg-secondary/10 rounded-lg p-6 text-center mb-6">
              <p className="text-sm text-secondary mb-1">Estimated Quarterly Payment</p>
              <p className="text-3xl font-bold text-secondary">{formatCurrency(quarterly)}</p>
              <p className="text-xs text-muted-foreground mt-1">Paid in 4 equal installments</p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-foreground">Due Dates (2026 Filing Season)</p>
              {dueDates.map((d) => (
                <div key={d.label} className="flex justify-between text-sm bg-background rounded-lg p-3">
                  <span className="text-foreground">{d.label}</span>
                  <span className="font-medium text-secondary">{d.date}</span>
                </div>
              ))}
            </div>

            <div className="text-sm text-muted-foreground space-y-2 mb-6">
              <p>
                <strong>How this works:</strong> Self-employed expats must pay both income tax and self-employment tax (Social Security + Medicare) to the IRS. The FEIE excludes earned income from income tax but does <em>not</em> reduce self-employment tax.
              </p>
              <p>
                Foreign tax credits reduce your US liability dollar-for-dollar for tax paid to your host country. If your foreign tax exceeds your US tax, you may owe little or nothing to the IRS (but may still need to file).
              </p>
            </div>

            <Link
              href="/intake"
              className="inline-flex items-center justify-center gap-2 w-full bg-secondary text-white font-semibold py-3 rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Get a Personalized Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      )}

      {showResults && netIncome > 0 && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          This simplified estimate does not include every return rule, including additional deductions, credits, the FEIE stacking rule, net operating losses, or state tax obligations. It is not a filing recommendation. Use Form 1040-ES for official vouchers.
        </p>
      )}
    </div>
  );
}
