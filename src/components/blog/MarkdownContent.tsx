import type { ReactNode } from 'react';
import { slugifyHeading } from '@/lib/headings';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary, localizePath } from '@/lib/i18n/utils';

import {
  FbarAggregateExample,
  RetirementTaxLayers,
  ServiceComparisonCriteria,
  TreatySnapshot,
} from '@/components/blog/EditorialVisuals';

function decodeEntities(text: string): string {
  return text.replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ({
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  })[entity] ?? entity);
}

function inline(text: string, locale: Locale, prefix: string): ReactNode[] {
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\*[^*\n]+\*)/g;
  const tokens = Array.from(text.matchAll(pattern));
  const nodes: ReactNode[] = [];
  let cursor = 0;
  tokens.forEach((token, index) => {
    const value = token[0];
    const start = token.index ?? 0;
    if (start > cursor) nodes.push(decodeEntities(text.slice(cursor, start)));
    const key = `${prefix}-${index}`;
    if (value.startsWith('`')) {
      nodes.push(<code key={key} className="rounded bg-surface-elevated px-1.5 py-0.5 text-[.9em] text-foreground">{value.slice(1, -1)}</code>);
    } else if (value.startsWith('**')) {
      nodes.push(<strong key={key} className="font-semibold text-foreground">{inline(value.slice(2, -2), locale, `${key}-strong`)}</strong>);
    } else if (value.startsWith('[')) {
      const match = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const external = /^https?:\/\//.test(match[2]);
        const href = !external && match[2].startsWith('/') ? localizePath(match[2], locale) : match[2];
        nodes.push(<a key={key} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="font-medium text-accent underline decoration-accent/35 underline-offset-2 hover:decoration-accent">{decodeEntities(match[1])}</a>);
      } else nodes.push(value);
    } else {
      nodes.push(<em key={key}>{value.slice(1, -1)}</em>);
    }
    cursor = start + value.length;
  });
  if (cursor < text.length) nodes.push(decodeEntities(text.slice(cursor)));
  return nodes;
}

function quotedProp(raw: string, name: string): string | undefined {
  return raw.match(new RegExp(`${name}=["']([^"']+)["']`))?.[1];
}

const INLINE_CTA_COPY: Partial<Record<Locale, { title: string; description: string; button: string }>> = {
  es: {
    title: '¿Necesitas ayuda con tus impuestos de expatriado?',
    description: 'Completa el formulario breve y Chip revisará tu situación.',
    button: 'Iniciar mi declaración',
  },
  pt: {
    title: 'Precisa de ajuda com os seus impostos de expatriado?',
    description: 'Preencha o formulário rápido e o Chip analisará a sua situação.',
    button: 'Iniciar o meu processo',
  },
};

function InlineCta({ raw, locale }: { raw: string; locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = INLINE_CTA_COPY[locale] ?? {
    title: 'Need Help With Your Expat Taxes?',
    description: 'Fill out the quick intake form and Chip will review your situation.',
    button: dictionary.nav.startFiling,
  };
  const href = quotedProp(raw, 'href') ?? '/intake';
  const title = quotedProp(raw, 'title') ?? copy.title;
  const description = quotedProp(raw, 'description') ?? copy.description;
  const button = quotedProp(raw, 'buttonText') ?? copy.button;
  return (
    <aside className="not-prose my-10 rounded-xl bg-foreground p-8 text-background">
      <p className="text-xl font-medium">{title}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-background/65">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={href.startsWith('/') ? localizePath(href, locale) : href} className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground">{button}</a>
      </div>
    </aside>
  );
}

function custom(raw: string, locale: Locale, key: string) {
  if (raw.startsWith('<InlineCTA')) return <InlineCta key={key} raw={raw} locale={locale} />;
  if (raw.includes('<FbarAggregateExample')) return <FbarAggregateExample key={key} />;
  if (raw.includes('<RetirementTaxLayers')) return <RetirementTaxLayers key={key} />;
  if (raw.includes('<ServiceComparisonCriteria')) return <ServiceComparisonCriteria key={key} />;
  if (raw.includes('<TreatySnapshot')) return <TreatySnapshot key={key} />;
  return null;
}

export default function MarkdownContent({ source, locale = defaultLocale }: { source: string; locale?: Locale }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const nodes: ReactNode[] = [];
  const headingCounts = new Map<string, number>();
  let index = 0;
  let key = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim() || line.trim().startsWith('<!--')) { index += 1; continue; }

    if (line.trim().startsWith('<')) {
      const collected = [line];
      const opening = line.trim();
      if (opening.startsWith('<InlineCTA') && !opening.endsWith('/>') && !opening.includes('</InlineCTA>')) {
        index += 1;
        while (index < lines.length) {
          collected.push(lines[index]);
          if (lines[index].includes('</InlineCTA>')) break;
          index += 1;
        }
      } else if (!opening.endsWith('/>') && !opening.includes('</')) {
        index += 1;
        while (index < lines.length) {
          collected.push(lines[index]);
          if (lines[index].includes('</') || lines[index].trim().endsWith('/>')) break;
          index += 1;
        }
      }
      const rendered = custom(collected.join('\n'), locale, `custom-${key++}`);
      if (rendered) nodes.push(rendered);
      index += 1;
      continue;
    }

    const fence = line.match(/^```(.*)$/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) code.push(lines[index++]);
      index += 1;
      nodes.push(<pre key={`code-${key++}`} className="overflow-x-auto rounded-xl bg-surface-elevated p-5 text-sm text-foreground"><code className={fence[1] ? `language-${fence[1].trim()}` : undefined}>{code.join('\n')}</code></pre>);
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const base = slugifyHeading(heading[2].replace(/[*_`]/g, ''));
      const count = (headingCounts.get(base) ?? 0) + 1;
      headingCounts.set(base, count);
      const id = count === 1 ? base : `${base}-${count}`;
      const children = inline(heading[2], locale, `heading-${key}`);
      const className = level === 1 ? 'mt-12 text-4xl font-medium tracking-tight' : level === 2 ? 'mt-12 text-3xl font-medium tracking-tight' : 'mt-9 text-2xl font-medium tracking-tight';
      if (level === 1) nodes.push(<h1 key={`h-${key++}`} id={id} className={className}>{children}</h1>);
      else if (level === 2) nodes.push(<h2 key={`h-${key++}`} id={id} className={className}>{children}</h2>);
      else if (level === 3) nodes.push(<h3 key={`h-${key++}`} id={id} className={className}>{children}</h3>);
      else nodes.push(<h4 key={`h-${key++}`} id={id} className={className}>{children}</h4>);
      index += 1;
      continue;
    }

    if (/^\s*([-*_])\1\1+\s*$/.test(line)) {
      nodes.push(<hr key={`hr-${key++}`} className="my-10 border-muted" />);
      index += 1;
      continue;
    }

    if (line.startsWith('>')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith('>')) quote.push(lines[index++].replace(/^>\s?/, ''));
      nodes.push(<blockquote key={`quote-${key++}`} className="my-8 border-l-2 border-accent pl-6 text-lg italic text-muted-foreground">{inline(quote.join(' '), locale, `quote-${key}`)}</blockquote>);
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      type BulletItem = { text: string; checked: boolean | null; children: BulletItem[] };
      const items: BulletItem[] = [];
      const baseIndent = line.match(/^(\s*)/)?.[1].length ?? 0;
      const parseBullet = (raw: string): BulletItem => {
        const task = raw.match(/^\[([ xX])\]\s+(.*)$/);
        return {
          text: task ? task[2] : raw,
          checked: task ? task[1].toLowerCase() === 'x' : null,
          children: [],
        };
      };
      while (index < lines.length) {
        const match = lines[index].match(/^(\s*)[-*+]\s+(.+)$/);
        if (!match) break;
        const item = parseBullet(match[2]);
        if (match[1].length > baseIndent && items.length) items[items.length - 1].children.push(item);
        else items.push(item);
        index += 1;
      }
      const renderBullet = (item: BulletItem, itemIndex: number, nested = false): ReactNode => (
        <li key={itemIndex} className={item.checked === null ? 'list-disc marker:text-accent' : 'list-none'}>
          <span className={item.checked === null ? undefined : 'flex items-start gap-3'}>
            {item.checked !== null && <input type="checkbox" checked={item.checked} disabled className="mt-1 h-4 w-4 accent-[var(--accent)]" />}
            <span>{inline(item.text, locale, `ul-${key}-${nested ? 'nested' : 'item'}-${itemIndex}`)}</span>
          </span>
          {item.children.length > 0 && <ul className="mt-2 space-y-2 pl-6">{item.children.map((child, childIndex) => renderBullet(child, childIndex, true))}</ul>}
        </li>
      );
      nodes.push(<ul key={`ul-${key++}`} className="my-6 space-y-2 pl-6">{items.map((item, itemIndex) => renderBullet(item, itemIndex))}</ul>);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      const firstNumber = Number.parseInt(line.match(/^\s*(\d+)\./)?.[1] ?? '1', 10);
      while (index < lines.length) {
        if (/^\s*\d+\.\s+/.test(lines[index])) {
          items.push(lines[index++].replace(/^\s*\d+\.\s+/, ''));
          continue;
        }
        if (!lines[index].trim()) {
          let next = index;
          while (next < lines.length && !lines[next].trim()) next += 1;
          if (next < lines.length && /^\s*\d+\.\s+/.test(lines[next])) {
            index = next;
            continue;
          }
          index = next;
        }
        break;
      }
      nodes.push(<ol key={`ol-${key++}`} start={firstNumber === 1 ? undefined : firstNumber} className="my-6 space-y-2 pl-6">{items.map((item, itemIndex) => <li key={itemIndex} className="list-decimal marker:font-semibold marker:text-accent">{inline(item, locale, `ol-${key}-${itemIndex}`)}</li>)}</ol>);
      continue;
    }

    if (line.includes('|') && index + 1 < lines.length && /^\s*\|?\s*:?-+/.test(lines[index + 1])) {
      const parseRow = (row: string) => row.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
      const headers = parseRow(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) rows.push(parseRow(lines[index++]));
      nodes.push(<div key={`table-${key++}`} className="my-8 overflow-x-auto rounded-xl border border-muted"><table className="min-w-full border-collapse text-sm"><thead className="bg-surface-elevated"><tr>{headers.map((cell, cellIndex) => <th key={cellIndex} className="border-b border-muted px-4 py-3 text-left font-semibold text-foreground">{inline(cell, locale, `th-${key}-${cellIndex}`)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-muted last:border-0">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 align-top text-muted-foreground">{inline(cell, locale, `td-${key}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,4})\s|^```|^>|^\s*[-*+]\s+|^\s*\d+\.\s+|^</.test(lines[index])) paragraph.push(lines[index++].trim());
    nodes.push(<p key={`p-${key++}`} className="my-5 leading-8 text-muted-foreground">{inline(paragraph.join(' '), locale, `p-${key}`)}</p>);
  }

  return <div className="content-auto">{nodes}</div>;
}
