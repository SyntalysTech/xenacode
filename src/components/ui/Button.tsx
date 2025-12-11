'use client';

import { forwardRef, useCallback } from 'react';
import { useKeySound } from '@/hooks';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  enableSound?: boolean;
}

function ButtonInner(
  { className, variant = 'primary', size = 'md', isLoading, children, disabled, onClick, enableSound = true, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { playKeySound } = useKeySound();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableSound) {
        playKeySound();
      }
      onClick?.(e);
    },
    [enableSound, playKeySound, onClick]
  );

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-lg',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Variants
        variant === 'primary' && [
          'bg-[var(--primary)] text-[var(--background)]',
          'hover:bg-[var(--primary-light)] hover:-translate-y-0.5',
          'hover:shadow-lg hover:shadow-[var(--card-shadow)]',
        ],
        variant === 'secondary' && [
          'bg-transparent text-[var(--primary)]',
          'border-2 border-[var(--primary)]',
          'hover:bg-[var(--primary)] hover:text-[var(--background)]',
          'hover:-translate-y-0.5',
        ],
        variant === 'ghost' && [
          'bg-transparent text-[var(--foreground)]',
          'hover:bg-[var(--background-secondary)]',
        ],
        // Sizes
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonInner);

Button.displayName = 'Button';
