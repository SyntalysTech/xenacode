'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks';
import { cn } from '@/lib/cn';

export function ThemeSwitch() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Evitar flash de contenido incorrecto
  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full bg-[var(--border)] animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-14 h-8 rounded-full transition-all duration-300',
        'bg-[var(--border)] hover:bg-[var(--accent)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2',
        'group overflow-hidden'
      )}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {/* Track background animation */}
      <span
        className={cn(
          'absolute inset-0 rounded-full transition-opacity duration-300',
          theme === 'dark' ? 'opacity-100' : 'opacity-0',
          'bg-gradient-to-r from-[#1d2c5e] to-[#2a3f7a]'
        )}
      />

      {/* Thumb */}
      <span
        className={cn(
          'absolute top-1 w-6 h-6 rounded-full',
          'bg-[var(--background)] shadow-md',
          'transition-all duration-300 ease-out',
          'flex items-center justify-center',
          theme === 'dark' ? 'left-7' : 'left-1'
        )}
      >
        {/* Sun icon */}
        <Sun
          className={cn(
            'absolute w-4 h-4 text-amber-500',
            'transition-all duration-300',
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
          )}
        />
        {/* Moon icon */}
        <Moon
          className={cn(
            'absolute w-4 h-4 text-blue-300',
            'transition-all duration-300',
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          )}
        />
      </span>

      {/* Stars animation (dark mode) */}
      <span
        className={cn(
          'absolute top-2 left-2 w-1 h-1 rounded-full bg-white',
          'transition-all duration-500',
          theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        )}
        style={{ transitionDelay: '100ms' }}
      />
      <span
        className={cn(
          'absolute top-4 left-3.5 w-0.5 h-0.5 rounded-full bg-white',
          'transition-all duration-500',
          theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        )}
        style={{ transitionDelay: '200ms' }}
      />
    </button>
  );
}
