'use client';

import { Moon, Sun } from '@/components/icons';

const STORAGE_KEY = 'fileabroad-theme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  function toggle() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light'); } catch {}
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggle}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground ${className}`}
    >
      <Moon className="h-4 w-4 dark:hidden" />
      <Sun className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
