'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingDown } from '@/components/icons';
import {
  FEIE_LIMIT_2025,
  HOUSING_BASE_2025,
  HOUSING_MAX_GENERAL_2025,
} from '@/lib/constants/tax';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';

const HOUSING_BASE = HOUSING_BASE_2025;
const HOUSING_MAX = HOUSING_MAX_GENERAL_2025;

export default function FEIECalculator() {
  const [foreignIncome, setForeignIncome] = useState('');
  const [housingExpenses, setHousingExpenses] = useState('');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [showResults, setShowResults] = useState(false);

  const income = parseFloat(foreignIncome) || 0;
  const housing = parseFloat(housingExpenses) || 0;

  const feieExclusion = Math.min(income, FEIE_LIMIT_2025);
  const housingDeduction = Math.max(0, Math.min(housing - HOUSING_BASE, HOUSING_MAX - HOUSING_BASE));
  const totalExclusion = Math.min(income, feieExclusion + housingDeduction);
  const taxableAfterFEIE = Math.max(0, income - totalExclusion);

  // Simplified tax estimate (2025 rates)
  const estimateTax = (taxable: number): number => {
    if (filingStatus === 'single') {
      if (taxable <= 11925) return taxable * 0.10;
      if (taxable <= 48475) return 1192.5 + (taxable - 11925) * 0.12;
      if (taxable <= 103350) return 5577.5 + (taxable - 48475) * 0.22;
      if (taxable <= 197300) return 17647.5 + (taxable - 103350) * 0.24;
      if (taxable <= 250525) return 40200.5 + (taxable - 197300) * 0.32;
      if (taxable <= 626350) return 57250.5 + (taxable - 250525) * 0.35;
      return 188750.5 + (taxable - 626350) * 0.37;
    }
    // married filing jointly
    if (taxable <= 23850) return taxable * 0.10;
    if (taxable <= 96950) return 2385 + (taxable - 23850) * 0.12;
    if (taxable <= 206700) return 11157 + (taxable - 96950) * 0.22;
    if (taxable <= 394600) return 35302 + (taxable - 206700) * 0.24;
    if (taxable <= 501050) return 80398 + (taxable - 394600) * 0.32;
    if (taxable <= 751600) return 114462 + (taxable - 501050) * 0.35;
    return 202154.5 + (taxable - 751600) * 0.37;
  };

  const taxWithout = estimateTax(income);
  const taxWith = estimateTax(taxableAfterFEIE);
  const savings = taxWithout - taxWith;

  const handleCalculate = () => {
    if (income > 0) {
      trackConversionEvent('tool_complete', { tool: 'feie_calculator' });
      setShowResults(true);
    }
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="feie-income" className="block text-sm font-medium text-foreground mb-1">
                Total Foreign Earned Income (2025)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="feie-income"
                  type="number"
                  value={foreignIncome}
                  onChange={(e) => { setForeignIncome(e.target.value); setShowResults(false); }}
                  placeholder="e.g. 85000"
                  className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Wages, self-employment income, and other earned income from outside the US
              </p>
            </div>

            <div>
              <label htmlFor="feie-housing" className="block text-sm font-medium text-foreground mb-1">
                Foreign Housing Expenses (annual)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="feie-housing"
                  type="number"
                  value={housingExpenses}
                  onChange={(e) => { setHousingExpenses(e.target.value); setShowResults(false); }}
                  placeholder="e.g. 24000"
                  className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Rent, utilities, insurance (not mortgage, purchased furniture, or domestic help)
              </p>
            </div>

            <div>
              <label htmlFor="feie-status" className="block text-sm font-medium text-foreground mb-1">
                Filing Status
              </label>
              <select
                id="feie-status"
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
              onClick={handleCalculate}
              data-analytics-event="tool_start"
              data-tool="feie_calculator"
              className="w-full bg-primary hover:bg-foreground text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Calculate Savings
            </button>
          </div>
        </CardContent>
      </Card>

      {showResults && income > 0 && (
        <Card className="border-secondary/50 bg-background" role="region" aria-live="polite" aria-label="Illustrative FEIE comparison">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold text-foreground">Illustrative FEIE Comparison</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="bg-background rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">FEIE Exclusion</p>
                <p className="text-2xl font-bold text-secondary">{formatCurrency(feieExclusion)}</p>
              </div>
              {housingDeduction > 0 && (
                <div className="bg-background rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Housing Deduction</p>
                  <p className="text-2xl font-bold text-secondary">{formatCurrency(housingDeduction)}</p>
                </div>
              )}
              <div className="bg-background rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Est. Tax Without FEIE</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(taxWithout)}</p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Est. Tax With FEIE</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(taxWith)}</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm text-green-700 mb-1">Illustrative Difference Before Other Tax Rules</p>
              <p className="text-3xl font-bold text-green-700">{formatCurrency(savings)}</p>
            </div>

            {income > FEIE_LIMIT_2025 && (
              <p className="text-sm text-muted-foreground mt-4">
                Your income exceeds the {formatCurrency(FEIE_LIMIT_2025)} FEIE limit for 2025.
                You may benefit from combining FEIE with the Foreign Tax Credit for income above the exclusion.
              </p>
            )}
          </CardContent>
        </Card>
      )}
      {showResults && income > 0 && (
        <p className="text-xs leading-relaxed text-muted-foreground">This simplified illustration does not apply every return rule, including the FEIE stacking calculation, deductions, self-employment tax, credits, investment income, location-specific housing limits, or currency rules. It is not a return estimate or filing recommendation.</p>
      )}
    </div>
  );
}
