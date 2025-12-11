'use client';

import { cn } from '@/lib/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'accent';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        'transition-colors duration-200',
        variant === 'default' && [
          'bg-[var(--background-secondary)] text-[var(--foreground-muted)]',
        ],
        variant === 'outline' && [
          'border border-[var(--border)] text-[var(--foreground-muted)]',
          'hover:bg-[var(--background-secondary)]',
        ],
        variant === 'accent' && [
          'bg-[var(--primary)] text-[var(--background)]',
        ],
        className
      )}
    >
      {children}
    </span>
  );
}
