'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search } from '@/components/icons';
import type { BlogPostMeta } from '@/lib/blog';
import type { Locale } from '@/lib/i18n/config';
import type { BlogDiscoveryLabels } from '@/lib/i18n/blog-discovery';

const PAGE_SIZE = 9;

function formatDate(dateString: string, locale: Locale) {
  return new Date(dateString).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogDiscovery({
  posts,
  initialPage = 1,
  locale,
  labels,
}: {
  posts: BlogPostMeta[];
  initialPage?: number;
  locale: Locale;
  labels: BlogDiscoveryLabels;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('__all__');
  const [page, setPage] = useState(initialPage);
  const categories = useMemo(
    () => ['__all__', ...Array.from(new Set(posts.map((post) => post.category))).sort()],
    [posts]
  );
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === '__all__' || post.category === category;
      const searchable = `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });
  }, [category, posts, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const nextUrl = page === 1 ? `${prefix}/blog` : `${prefix}/blog/page/${page}`;
    window.history.replaceState({}, '', nextUrl);
  }, [locale, page]);

  const localize = (path: string) => locale === 'en' ? path : `/${locale}${path}`;

  function resetPage() {
    setPage(1);
  }

  return (
    <div>
      <div className="mb-10 grid gap-4 border-y border-border py-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <label htmlFor="article-search" className="mb-2 block text-sm font-bold text-foreground">{labels.searchLabel}</label>
          <div className="relative">
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="article-search"
              type="search"
              value={query}
              onChange={(event) => { setQuery(event.target.value); resetPage(); }}
              placeholder={labels.searchPlaceholder}
              className="w-full rounded-md border border-border bg-white py-3 pl-12 pr-4 text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
            />
          </div>
        </div>
        <div role="group" aria-label={labels.filterLabel} className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:max-w-xl">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => { setCategory(item); resetPage(); }}
              aria-pressed={category === item}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === item ? 'border-primary bg-primary text-white' : 'border-border bg-background text-muted-foreground hover:border-secondary hover:text-foreground'}`}
            >
              {item === '__all__' ? labels.all : item}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? labels.resultOne : labels.resultMany}
      </p>

      {visible.length ? (
        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <article key={post.slug} className="flex flex-col bg-background p-6 lg:p-7">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-secondary">{post.category}</p>
              <h2 className="mb-3 font-sans text-xl font-bold leading-snug text-foreground">
                <Link href={localize(`/blog/${post.slug}`)} className="hover:text-secondary">{post.title}</Link>
              </h2>
              <p className="mb-6 line-clamp-3 text-base text-muted-foreground">{post.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(post.date, locale)}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readingTime}</span>
              </div>
              <Link href={localize(`/blog/${post.slug}`)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline">
                {labels.readArticle} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-border bg-surface-elevated p-10 text-center">
          <h2 className="font-sans text-2xl font-bold text-foreground">{labels.noMatch}</h2>
          <p className="mt-2 text-muted-foreground">{labels.noMatchDescription}</p>
          <button type="button" onClick={() => { setQuery(''); setCategory('__all__'); resetPage(); }} className="mt-5 font-bold text-secondary underline">{labels.showAll}</button>
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label={labels.pagination} className="mt-8 flex items-center justify-center gap-3">
          {page > 1 ? (
            <a
              href={localize(page === 2 ? '/blog' : `/blog/page/${page - 1}`)}
              onClick={(event) => { event.preventDefault(); setPage((value) => Math.max(1, value - 1)); }}
              rel="prev"
              className="rounded-md border border-border px-4 py-2 font-semibold hover:border-secondary"
            >
              {labels.previous}
            </a>
          ) : (
            <span aria-disabled="true" className="rounded-md border border-border px-4 py-2 font-semibold opacity-40">{labels.previous}</span>
          )}
          <span className="text-sm text-muted-foreground">{labels.page} {page} {labels.of} {totalPages}</span>
          {page < totalPages ? (
            <a
              href={localize(`/blog/page/${page + 1}`)}
              onClick={(event) => { event.preventDefault(); setPage((value) => Math.min(totalPages, value + 1)); }}
              rel="next"
              className="rounded-md border border-border px-4 py-2 font-semibold hover:border-secondary"
            >
              {labels.next}
            </a>
          ) : (
            <span aria-disabled="true" className="rounded-md border border-border px-4 py-2 font-semibold opacity-40">{labels.next}</span>
          )}
        </nav>
      )}
    </div>
  );
}
