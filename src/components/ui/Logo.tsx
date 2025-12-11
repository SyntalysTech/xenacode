'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme, useKeySound } from '@/hooks';
import { cn } from '@/lib/cn';

interface LogoProps {
  variant?: 'horizontal' | 'isotope';
  className?: string;
  linkToHome?: boolean;
  width?: number;
  height?: number;
  forceDark?: boolean; // Forzar versión oscura del logo (para fondos claros)
}

export function Logo({
  variant = 'horizontal',
  className,
  linkToHome = true,
  width,
  height,
  forceDark = false,
}: LogoProps) {
  const { theme, mounted } = useTheme();
  const { playKeySound } = useKeySound();

  // Dimensiones por defecto segun variante
  const defaultDimensions = {
    horizontal: { width: 180, height: 50 },
    isotope: { width: 50, height: 50 },
  };

  const finalWidth = width || defaultDimensions[variant].width;
  const finalHeight = height || defaultDimensions[variant].height;

  // Determinar que logo usar segun tema
  // Si forceDark está activo, usar versión light-mode (logo oscuro para fondos claros)
  const effectiveTheme = forceDark ? 'light' : theme;

  const logoSrc = mounted
    ? variant === 'horizontal'
      ? effectiveTheme === 'dark'
        ? '/assets/logos/logo-horizontal-dark-mode.png'
        : '/assets/logos/logo-horizontal-light-mode.png'
      : effectiveTheme === 'dark'
        ? '/assets/logos/logo-isotope-dark-mode.png'
        : '/assets/logos/logo-isotope-light-mode.png'
    : variant === 'horizontal'
      ? '/assets/logos/logo-horizontal-light-mode.png'
      : '/assets/logos/logo-isotope-light-mode.png';

  const logoElement = (
    <div className={cn('relative', className)} style={{ width: finalWidth, height: finalHeight }}>
      <Image
        key={`${variant}-${theme}`}
        src={logoSrc}
        alt="XenaCode Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        className="inline-block hover:opacity-90 transition-opacity"
        onClick={playKeySound}
      >
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}
