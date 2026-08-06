'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, CalendarDays, AlertTriangle, Info } from '@/components/icons';

interface Deadline {
  date: string;
  title: string;
  description: string;
  category: 'filing' | 'fbar' | 'extension' | 'estimated';
  important: boolean;
}

const deadlines: Deadline[] = [
  {
    date: 'January 15, 2026',
    title: 'Q4 2025 Estimated Tax Payment Due',
    description: 'Fourth quarter estimated tax payment for 2025 tax year is due. This applies if you are self-employed or have income not subject to withholding.',
    category: 'estimated',
    important: false,
  },
  {
    date: 'April 15, 2026',
    title: 'US Tax Return Due (Domestic)',
    description: 'Standard deadline for US taxpayers. Expats get an automatic 2-month extension to June 15. You can also file for a further extension to October 15.',
    category: 'filing',
    important: true,
  },
  {
    date: 'April 15, 2026',
    title: 'FBAR (FinCEN 114) Due',
    description: 'Report of Foreign Bank and Financial Accounts is due. There is an automatic extension to October 15 if you miss this date.',
    category: 'fbar',
    important: true,
  },
  {
    date: 'June 15, 2026',
    title: 'Expat Automatic Extension Deadline',
    description: 'US citizens and residents living abroad get an automatic 2-month extension. No form needed, but interest on unpaid tax accrues from April 15.',
    category: 'filing',
    important: true,
  },
  {
    date: 'June 15, 2026',
    title: 'Q2 2026 Estimated Tax Payment Due',
    description: 'Second quarter estimated tax payment for 2026 tax year.',
    category: 'estimated',
    important: false,
  },
  {
    date: 'September 15, 2026',
    title: 'Q3 2026 Estimated Tax Payment Due',
    description: 'Third quarter estimated tax payment for 2026 tax year.',
    category: 'estimated',
    important: false,
  },
  {
    date: 'October 15, 2026',
    title: 'Extended Tax Return Deadline',
    description: 'Final deadline for filing your 2025 tax return if you requested an extension (Form 4868). Also the automatic FBAR extension deadline.',
    category: 'extension',
    important: true,
  },
  {
    date: 'October 15, 2026',
    title: 'FBAR Automatic Extension Deadline',
    description: 'If you missed the April 15 FBAR deadline, this is the automatic extension date. No additional form needed.',
    category: 'fbar',
    important: true,
  },
  {
    date: 'December 15, 2026',
    title: 'Additional Expat Extension Deadline',
    description: 'Expats who filed Form 4868 and need extra time can request a further extension to December 15 by writing to the IRS.',
    category: 'extension',
    important: false,
  },
];

const categoryConfig: Record<string, { color: string; label: string }> = {
  filing: { color: 'bg-blue-50 text-blue-700', label: 'Tax Filing' },
  fbar: { color: 'bg-amber-50 text-amber-700', label: 'FBAR' },
  extension: { color: 'bg-purple-50 text-purple-700', label: 'Extension' },
  estimated: { color: 'bg-green-50 text-green-700', label: 'Estimated Tax' },
};

export default function DeadlineCalendar() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? deadlines : deadlines.filter((d) => d.category === filter);

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'All Deadlines' },
          { value: 'filing', label: 'Tax Filing' },
          { value: 'fbar', label: 'FBAR' },
          { value: 'extension', label: 'Extensions' },
          { value: 'estimated', label: 'Estimated Tax' },
        ].map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-secondary text-white'
                : 'bg-surface-elevated text-foreground hover:bg-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4">
          {filtered.map((deadline, i) => {
            const config = categoryConfig[deadline.category];
            const isExpanded = expandedIndex === i;

            return (
              <div key={i} className="relative pl-10">
                <div className={`absolute left-2.5 top-5 w-3 h-3 rounded-full border-2 ${
                  deadline.important ? 'bg-secondary border-secondary' : 'bg-background border-border'
                }`} />

                <Card className={`border-border ${deadline.important ? 'border-l-4 border-l-secondary' : ''}`}>
                  <CardContent className="p-4">
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      aria-expanded={isExpanded}
                      aria-controls={`deadline-${i}`}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${config.color} border-0 text-xs`}>
                              {config.label}
                            </Badge>
                            {deadline.important && (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarDays className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-secondary">
                              {deadline.date}
                            </span>
                          </div>
                          <h3 className="font-semibold text-foreground">
                            {deadline.title}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 mt-2 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>
                    {isExpanded && (
                      <div id={`deadline-${i}`} className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            {deadline.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
