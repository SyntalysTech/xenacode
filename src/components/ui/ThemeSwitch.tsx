'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme, useKeySound } from '@/hooks';
import { cn } from '@/lib/cn';

interface ThemeSwitchProps {
  forceDark?: boolean; // Forzar estilo oscuro (para fondos claros)
}

export function ThemeSwitch({ forceDark = false }: ThemeSwitchProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const { playKeySound } = useKeySound();

  const handleClick = () => {
    playKeySound();
    toggleTheme();
  };

  // Evitar flash de contenido incorrecto
  if (!mounted) {
    return (
      <div className={cn(
        'w-14 h-8 rounded-full animate-pulse',
        forceDark ? 'bg-[#172140]/20' : 'bg-[var(--border)]'
      )} />
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative w-14 h-8 rounded-full transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'group overflow-hidden',
        forceDark
          ? 'bg-[#172140]/20 hover:bg-[#172140]/30 focus:ring-[#172140]'
          : 'bg-[var(--border)] hover:bg-[var(--accent)] focus:ring-[var(--primary)]'
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
