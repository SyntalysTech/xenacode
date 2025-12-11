'use client';

import { ThemeProvider } from '@/context';
import type { ReactNode } from 'react';

export function ClientProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
