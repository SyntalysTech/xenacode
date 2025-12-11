'use client';

import { useState, useCallback } from 'react';
import { useKeySound, useTheme } from '@/hooks';
import { cn } from '@/lib/cn';
import Image from 'next/image';

interface KeyboardKeyProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLogo?: boolean;
}

export function KeyboardKey({ size = 'lg', className, showLogo = true }: KeyboardKeyProps) {
  const [isPressed, setIsPressed] = useState(false);
  const { playKeySound } = useKeySound();
  const { theme, mounted } = useTheme();

  const handleClick = useCallback(() => {
    setIsPressed(true);
    playKeySound();
    setTimeout(() => setIsPressed(false), 150);
  }, [playKeySound]);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const logoSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  // Logo segun tema
  const logoSrc = mounted
    ? theme === 'dark'
      ? '/assets/logos/logo-isotope-dark-mode.png'
      : '/assets/logos/logo-isotope-light-mode.png'
    : '/assets/logos/logo-isotope-light-mode.png';

  return (
    <button
      onClick={handleClick}
      className={cn(
        'keyboard-key cursor-pointer select-none',
        'flex items-center justify-center',
        'active:scale-95',
        sizeClasses[size],
        isPressed && 'pressed',
        className
      )}
      aria-label="Tecla interactiva XenaCode"
    >
      {showLogo ? (
        <div className={cn('relative', logoSizeClasses[size])}>
          <Image
            key={`isotope-${theme}`}
            src={logoSrc}
            alt="XenaCode Isotope"
            fill
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <span className="text-[var(--foreground)] font-bold text-xl">X</span>
      )}
    </button>
  );
}
