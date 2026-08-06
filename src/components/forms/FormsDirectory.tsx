'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Search, ArrowRight } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { FormPageMeta } from '@/lib/forms';
import type { Locale } from '@/lib/i18n/config';
import { localizePath } from '@/lib/i18n/utils';

interface FormsDirectoryProps {
  forms: FormPageMeta[];
  locale: Locale;
  readGuide: string;
}

const featuredFormSlugs = [
  '8621-pfic',
  '5471-foreign-corporation',
  '3520-foreign-gifts',
  '8854-expatriation',
  '8938-fatca',
];

export default function FormsDirectory({ forms, locale, readGuide }: FormsDirectoryProps) {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('All forms');

  const categories = ['All forms', ...Array.from(new Set(forms.map((form) => form.category)))];
  const normalizedQuery = query.trim().toLowerCase();
  const filteredForms = forms.filter((form) => {
    const matchesCategory = category === 'All forms' || form.category === category;
    const haystack = `${form.formNumber} ${form.formName} ${form.title} ${form.description}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  return (
    <div className="space-y-10">
      <section aria-labelledby="featured-forms-heading">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Start here</p>
            <h2 id="featured-forms-heading" className="mt-2 font-sans text-2xl font-bold text-foreground md:text-3xl">
              Forms that often need expert review
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            PFICs, foreign corporations, trusts, expatriation, and FATCA reporting can create overlapping obligations.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {featuredFormSlugs.map((slug) => {
            const form = forms.find((item) => item.slug === slug);
            if (!form) return null;
            return (
              <Link key={form.slug} href={localizePath(`/forms/${form.slug}`, locale)} className="group border border-secondary/30 bg-background p-5 transition hover:border-secondary hover:shadow-sm">
                <Badge variant="outline" className="border-secondary/40 text-secondary">Form {form.formNumber}</Badge>
                <h3 className="mt-4 font-sans text-lg font-bold leading-tight text-foreground group-hover:text-secondary">{form.formName}</h3>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary">{readGuide} <ArrowRight className="h-4 w-4" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="all-forms-heading">
        <div className="mb-5 flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="all-forms-heading" className="font-sans text-2xl font-bold text-foreground md:text-3xl">All form guides</h2>
            <p className="mt-2 text-sm text-muted-foreground">Search by form number, name, or reporting topic.</p>
          </div>
          <label className="relative block w-full md:max-w-sm">
            <span className="sr-only">Search tax forms</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search forms"
              className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-3 text-sm text-foreground outline-none ring-secondary/30 placeholder:text-muted-foreground focus:ring-2"
            />
          </label>
        </div>
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter tax forms">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${category === item ? 'border-primary bg-primary text-white' : 'border-border bg-background text-muted-foreground hover:border-secondary hover:text-foreground'}`}
            >
              {item}
            </button>
          ))}
        </div>
        {filteredForms.length === 0 ? (
          <p className="rounded-lg border border-border bg-background p-6 text-muted-foreground">No forms match that search. Try a form number or start a consultation review for help identifying what applies.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredForms.map((form) => (
              <Link key={form.slug} href={localizePath(`/forms/${form.slug}`, locale)} className="group">
                <Card className="h-full border-border transition-colors hover:border-secondary/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-elevated">
                        <FileText className="h-5 w-5 text-secondary" />
                      </div>
                      <Badge variant="outline" className="border-border text-muted-foreground">Form {form.formNumber}</Badge>
                    </div>
                    <h3 className="mb-2 font-sans text-xl font-bold text-foreground transition-colors group-hover:text-secondary">{form.formName}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{form.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">{readGuide} <ArrowRight className="h-4 w-4" /></span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
