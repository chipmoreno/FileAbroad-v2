'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from '@/components/icons';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  variant: 'mobile' | 'desktop';
}

export default function TableOfContents({ items, variant }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const syncActiveItemFromHash = () => {
      const hash = window.location.hash.slice(1);

      if (items.some((item) => item.id === hash)) {
        setActiveId(hash);
      }
    };

    syncActiveItemFromHash();
    window.addEventListener('hashchange', syncActiveItemFromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener('hashchange', syncActiveItemFromHash);
      observer.disconnect();
    };
  }, [items]);

  const handleClick = (id: string) => {
    trackConversionEvent('article_toc_use', {
      page_path: window.location.pathname,
      heading_id: id,
    });
    setActiveId(id);
    setIsOpen(false);
  };

  if (items.length === 0) return null;

  if (variant === 'mobile') {
    return (
      <div className="mb-8 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-table-of-contents"
          className="flex items-center justify-between w-full bg-background border border-border rounded-lg px-4 py-3"
        >
          <span className="text-sm font-medium text-foreground">Table of Contents</span>
          <ChevronDown
            aria-hidden="true"
            className={`w-4 h-4 text-muted-foreground motion-safe:transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <nav
            id="mobile-table-of-contents"
            aria-label="Table of contents"
            className="mt-2 bg-background border border-border rounded-lg p-4"
          >
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => handleClick(item.id)}
                    aria-current={activeId === item.id ? 'location' : undefined}
                    className={`block w-full text-left text-sm hover:text-secondary motion-safe:transition-colors ${
                      activeId === item.id ? 'text-secondary font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  return (
    <nav aria-label="On this page" className="hidden lg:block sticky top-24">
      <p className="text-sm font-semibold text-foreground mb-3">On this page</p>
      <ul className="space-y-1.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}>
            <a
              href={`#${item.id}`}
              onClick={() => handleClick(item.id)}
              aria-current={activeId === item.id ? 'location' : undefined}
              className={`block w-full py-0.5 text-left text-sm hover:text-secondary motion-safe:transition-colors ${
                activeId === item.id
                  ? 'text-secondary font-medium border-l-2 border-secondary -ml-[1px] pl-[11px]'
                  : 'text-muted-foreground'
              }`}
              style={
                activeId === item.id
                  ? { paddingLeft: `${(item.level - 2) * 12 + 11}px`, marginLeft: '-1px' }
                  : undefined
              }
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
