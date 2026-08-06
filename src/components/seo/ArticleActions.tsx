'use client';

import { Check, Printer, Share2 } from '@/components/icons';
import { useState } from 'react';

interface ArticleActionsProps {
  title: string;
}

export default function ArticleActions({ title }: ArticleActionsProps) {
  const [status, setStatus] = useState('');

  async function shareArticle() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setStatus('Shared');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setStatus('Link copied');
      } else {
        setStatus('Copy the page address to share this article');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('Copy the page address to share this article');
    }
  }

  return (
    <div className="not-prose mb-8 flex flex-wrap items-center gap-2" aria-label="Article tools">
      <button
        type="button"
        onClick={shareArticle}
        data-analytics-event="article_share_click"
        data-cta-location="article-utilities"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        {status === 'Link copied' || status === 'Shared' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
        {status === 'Link copied' ? 'Link copied' : 'Share'}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        data-analytics-event="article_print_click"
        data-cta-location="article-utilities"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <Printer className="h-4 w-4" aria-hidden="true" />
        Print / Save PDF
      </button>
      <span className="sr-only" aria-live="polite">{status}</span>
    </div>
  );
}
