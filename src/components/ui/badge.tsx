import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
const variants: Record<BadgeVariant, string> = {
  default: 'border-transparent bg-foreground text-background',
  secondary: 'border-transparent bg-accent text-white',
  destructive: 'border-transparent bg-destructive text-white',
  outline: 'border-muted text-foreground',
  ghost: 'border-transparent text-foreground',
  link: 'border-transparent text-accent underline-offset-4 hover:underline',
};

export function badgeVariants({ variant = 'default', className }: { variant?: BadgeVariant; className?: string } = {}) {
  return cn('inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium', variants[variant], className);
}

export function Badge({ className, variant = 'default', ...props }: React.ComponentProps<'span'> & { variant?: BadgeVariant }) {
  return <span data-slot="badge" className={badgeVariants({ variant, className })} {...props} />;
}
