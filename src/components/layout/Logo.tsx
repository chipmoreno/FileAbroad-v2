'use client';

import Link from 'next/link';
import { useLocale } from '@/components/i18n/LocaleProvider';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dark';
}

export default function Logo({ className = '', size = 'md', variant = 'default' }: LogoProps) {
  const { localizeHref } = useLocale();
  const sizes = {
    sm: { container: 'h-8', text: 'text-xl', icon: 32 },
    md: { container: 'h-10', text: 'text-2xl', icon: 40 },
    lg: { container: 'h-14', text: 'text-3xl', icon: 56 },
  };

  const s = sizes[size];

  return (
    <div className="transition-transform hover:scale-[1.02]">
      <Link href={localizeHref('/')} className={`flex items-center gap-3 ${className}`}>
        <div className={`${s.container} aspect-square relative`}>
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M4 14C4 11.7909 5.79086 10 8 10H18L22 14H40C42.2091 14 44 15.7909 44 18V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V14Z"
              className="fill-primary"
            />
            <path
              d="M4 18C4 15.7909 5.79086 14 8 14H40C42.2091 14 44 15.7909 44 18V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V18Z"
              className="fill-foreground"
            />
            <circle cx="24" cy="28" r="10" className="fill-background stroke-secondary" strokeWidth="2" />
            <ellipse cx="24" cy="28" rx="10" ry="4" className="stroke-secondary" strokeWidth="1.5" fill="none" />
            <ellipse cx="24" cy="28" rx="4" ry="10" className="stroke-secondary" strokeWidth="1.5" fill="none" />
            <line x1="14" y1="28" x2="34" y2="28" className="stroke-secondary" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="flex flex-col leading-tight">
          <span className={`${s.text} font-bold tracking-tight font-sans ${variant === 'dark' ? 'text-white' : 'text-foreground'}`}>
            File<span className="text-secondary">Abroad</span>
          </span>
          <span className={`text-xs tracking-widest uppercase font-sans ${variant === 'dark' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
            Expat Tax Services
          </span>
        </div>
      </Link>
    </div>
  );
}
