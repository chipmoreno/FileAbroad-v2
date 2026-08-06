import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

const variants: Record<ButtonVariant, string> = {
  default: 'bg-foreground text-background hover:opacity-90',
  destructive: 'bg-destructive text-white hover:opacity-90',
  outline: 'border border-muted bg-surface text-foreground hover:border-foreground/25',
  secondary: 'bg-accent text-white hover:opacity-90',
  ghost: 'text-foreground hover:bg-surface-elevated',
  link: 'text-accent underline-offset-4 hover:underline',
};
const sizes: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2', xs: 'h-7 px-2 text-xs', sm: 'h-9 px-3', lg: 'h-11 px-6',
  icon: 'h-10 w-10', 'icon-xs': 'h-7 w-7', 'icon-sm': 'h-9 w-9', 'icon-lg': 'h-11 w-11',
};

export function buttonVariants({ variant = 'default', size = 'default', className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn('inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-opacity disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className);
}

export function Button({ className, variant = 'default', size = 'default', ...props }: React.ComponentProps<'button'> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button data-slot="button" className={buttonVariants({ variant, size, className })} {...props} />;
}
