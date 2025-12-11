'use client';

import { cn } from '@/lib/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({ title, subtitle, centered = true, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-12 md:mb-16', centered && 'text-center', className)}>
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold',
          'text-[var(--foreground)]',
          'mb-4'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div
        className={cn(
          'mt-6 h-1 w-20 rounded-full',
          'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]',
          centered && 'mx-auto'
        )}
      />
    </div>
  );
}
