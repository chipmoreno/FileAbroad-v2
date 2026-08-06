'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Check } from '@/components/icons';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { locales, languages, Locale } from '@/lib/i18n/config';
import { useState, useRef, useEffect } from 'react';

const languageLabels: Record<Locale, string> = {
  en: 'Language',
  es: 'Idioma',
  pt: 'Idioma',
  fr: 'Langue',
  de: 'Sprache',
  it: 'Lingua',
  nl: 'Taal',
  ja: '言語',
  zh: '语言',
};

export function getLanguageLabel(locale: Locale): string {
  return languageLabels[locale];
}

export default function LanguageSwitcher() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && buttonRef.current?.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Get current path without locale prefix
  function getBasePath(): string {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] && locales.includes(segments[0] as Locale)) {
      return '/' + segments.slice(1).join('/');
    }
    return pathname;
  }

  const basePath = getBasePath();

  function localizedPath(path: string, nextLocale: Locale) {
    if (nextLocale === 'en') return path || '/';
    return path === '/' ? `/${nextLocale}` : `/${nextLocale}${path}`;
  }

  function selectLocale(nextLocale: Locale) {
    document.cookie = `NEXT_LOCALE=${nextLocale}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`${languageLabels[locale]}: ${languages[locale].nativeName}`}
        aria-expanded={open}
        aria-controls="language-options"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{languages[locale].nativeName}</span>
        <span className="sm:hidden">{languages[locale].flag}</span>
      </button>

      {open && (
        <div
          id="language-options"
          className="absolute right-0 z-50 mt-3 w-48 rounded-xl border border-muted bg-surface p-1"
        >
          {locales.map((loc) => {
            const href = localizedPath(basePath, loc);
            const isActive = loc === locale;
            return (
              <Link
                key={loc}
                href={href}
                onClick={() => selectLocale(loc)}
                className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-surface-elevated font-semibold text-foreground'
                    : 'text-muted-foreground hover:bg-surface-elevated hover:text-foreground'
                }`}
                aria-current={isActive ? 'page' : undefined}
                hrefLang={languages[loc].htmlLang}
              >
                <span className="flex items-center gap-2">
                  <span>{languages[loc].flag}</span>
                  <span>{languages[loc].nativeName}</span>
                </span>
                {isActive && <Check className="w-4 h-4" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
