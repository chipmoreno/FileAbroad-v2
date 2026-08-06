'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from '@/components/icons';
import LanguageSwitcher, { getLanguageLabel } from '@/components/i18n/LanguageSwitcher';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';

function Wordmark() {
  return (
    <span className="inline-flex items-end text-lg font-semibold tracking-tight text-foreground">
      FileAbroad<span aria-hidden="true" className="mb-1 ml-1 h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dict = useDictionary();
  const { locale, localizeHref } = useLocale();
  const navLinks = [
    { label: dict.nav.services, href: '/services' },
    { label: dict.nav.howItWorks, href: '/how-it-works' },
    { label: dict.nav.guides, href: '/guides' },
    { label: dict.nav.faq, href: '/faq' },
    { label: dict.nav.about, href: '/about' },
    { label: dict.nav.contact, href: '/contact' },
  ];

  useEffect(() => {
    const close = () => setOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuButtonRef.current?.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('resize', close);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('resize', close);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-muted bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href={localizeHref('/')} aria-label="FileAbroad home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={localizeHref(link.href)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href={localizeHref('/intake')} className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90">
            {locale === 'en' ? 'Get Started' : dict.home.aboutCtaIntake}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-surface-elevated"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="absolute left-0 right-0 top-16 border-b border-muted bg-surface p-6 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navLinks.map((link) => (
              <Link key={link.href} href={localizeHref(link.href)} onClick={() => setOpen(false)} className="border-b border-muted py-4 text-base font-medium text-foreground">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between py-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{getLanguageLabel(locale)}</span>
              <LanguageSwitcher />
            </div>
            <Link href={localizeHref('/intake')} onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-foreground px-4 py-3 text-center text-sm font-semibold text-background">
              {locale === 'en' ? 'Get Started' : dict.home.aboutCtaIntake}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
