'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  Palette,
  Copy,
  Check,
  RefreshCw,
  ArrowLeft,
  Lock,
  Unlock,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface ColorInfo {
  hex: string;
  locked: boolean;
}

// Generate random hex color
function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Convert hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Generate harmonious palette
function generateHarmoniousPalette(baseColor: string): string[] {
  const { h, s, l } = hexToHsl(baseColor);
  const harmonies = [
    0,    // base
    30,   // analogous
    180,  // complementary
    210,  // split-complementary
    60,   // triadic hint
  ];

  return harmonies.map((offset, i) => {
    const newH = (h + offset) % 360;
    const newS = Math.min(100, Math.max(20, s + (i % 2 === 0 ? -10 : 10)));
    const newL = Math.min(85, Math.max(25, l + (i - 2) * 10));
    return hslToHex(newH, newS, newL);
  });
}

// Get contrast color for text
function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Convert hex to RGB
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ColorPalettePage() {
  const [colors, setColors] = useState<ColorInfo[]>(() =>
    generateHarmoniousPalette(randomColor()).map(hex => ({ hex, locked: false }))
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<'random' | 'harmonious'>('harmonious');

  const generatePalette = useCallback(() => {
    setColors(prev => {
      if (mode === 'harmonious') {
        // Find first unlocked color to use as base, or generate new one
        const unlockedIndex = prev.findIndex(c => !c.locked);
        const baseColor = unlockedIndex >= 0 ? randomColor() : prev[0].hex;
        const newPalette = generateHarmoniousPalette(baseColor);

        return prev.map((color, i) => ({
          hex: color.locked ? color.hex : newPalette[i],
          locked: color.locked,
        }));
      } else {
        return prev.map(color => ({
          hex: color.locked ? color.hex : randomColor(),
          locked: color.locked,
        }));
      }
    });
  }, [mode]);

  const toggleLock = (index: number) => {
    setColors(prev =>
      prev.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    );
  };

  const copyColor = async (hex: string, index: number) => {
    await navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAllColors = async () => {
    const allHex = colors.map(c => c.hex).join('\n');
    await navigator.clipboard.writeText(allHex);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card-bg)]">
        <div className="container-custom py-6">
          <Link
            href="/#tools"
            className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a herramientas</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                Color Palette Generator
              </h1>
              <p className="text-[var(--foreground-muted)]">
                Genera paletas de colores armónicas para tus diseños
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label className="text-sm text-[var(--foreground-muted)]">Modo:</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as 'random' | 'harmonious')}
              className="px-3 py-1.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="harmonious">Armónico</option>
              <option value="random">Aleatorio</option>
            </select>
          </div>

          <div className="flex gap-2 sm:ml-auto w-full sm:w-auto">
            <button
              onClick={copyAllColors}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--primary)] transition-colors"
            >
              {copiedIndex === -1 ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span className="hidden xs:inline">Copiar todo</span>
              <span className="xs:hidden">Copiar</span>
            </button>
            <button
              onClick={generatePalette}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Generar
            </button>
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="text-sm text-[var(--foreground-muted)] mb-6 text-center">
          Presiona <kbd className="px-2 py-1 rounded bg-[var(--background-secondary)] border border-[var(--border)] font-mono text-xs">Espacio</kbd> para generar una nueva paleta
        </p>

        {/* Color Palette */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
          {colors.map((color, index) => (
            <div
              key={index}
              className={cn(
                'relative group rounded-2xl overflow-hidden',
                'transition-all duration-300',
                'hover:scale-105 hover:shadow-2xl',
                'h-48 sm:h-80'
              )}
              style={{ backgroundColor: color.hex }}
            >
              {/* Lock button */}
              <button
                onClick={() => toggleLock(index)}
                className={cn(
                  'absolute top-4 right-4 p-2 rounded-lg',
                  'transition-all duration-200',
                  'opacity-0 group-hover:opacity-100',
                  color.locked
                    ? 'bg-white/30 text-white'
                    : 'bg-black/20 text-white hover:bg-black/30'
                )}
                title={color.locked ? 'Desbloquear' : 'Bloquear'}
              >
                {color.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>

              {/* Locked indicator */}
              {color.locked && (
                <div className="absolute top-4 left-4">
                  <Lock className="w-4 h-4 text-white/80" />
                </div>
              )}

              {/* Color info */}
              <div
                className="absolute inset-x-0 bottom-0 p-4"
                style={{ color: getContrastColor(color.hex) }}
              >
                <button
                  onClick={() => copyColor(color.hex, index)}
                  className="w-full text-left group/copy"
                >
                  <p className="font-mono font-bold text-lg mb-1 flex items-center gap-2">
                    {color.hex.toUpperCase()}
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                    )}
                  </p>
                  <p className="text-sm opacity-70 font-mono">
                    {hexToRgb(color.hex)}
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Export Section */}
        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] mb-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            Exportar Paleta
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* CSS Variables */}
            <div className="p-4 rounded-xl bg-[var(--background-secondary)] overflow-hidden">
              <p className="text-sm font-medium text-[var(--foreground)] mb-2">CSS Variables</p>
              <pre className="text-xs text-[var(--foreground-muted)] font-mono overflow-x-auto whitespace-pre-wrap break-all">
{colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join('\n')}
              </pre>
            </div>

            {/* Tailwind */}
            <div className="p-4 rounded-xl bg-[var(--background-secondary)] overflow-hidden">
              <p className="text-sm font-medium text-[var(--foreground)] mb-2">Tailwind Config</p>
              <pre className="text-xs text-[var(--foreground-muted)] font-mono overflow-x-auto whitespace-pre-wrap break-all">
{`colors: {
${colors.map((c, i) => `  'custom-${i + 1}': '${c.hex}'`).join(',\n')}
}`}
              </pre>
            </div>

            {/* Array */}
            <div className="p-4 rounded-xl bg-[var(--background-secondary)] overflow-hidden">
              <p className="text-sm font-medium text-[var(--foreground)] mb-2">Array</p>
              <pre className="text-xs text-[var(--foreground-muted)] font-mono overflow-x-auto whitespace-pre-wrap break-all">
{`[${colors.map(c => `'${c.hex}'`).join(', ')}]`}
              </pre>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            ¿Cómo funciona?
          </h2>
          <ul className="space-y-2 text-[var(--foreground-muted)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span><strong>Modo Armónico:</strong> Genera colores que combinan usando teoría del color</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span><strong>Modo Aleatorio:</strong> Genera colores completamente al azar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span><strong>Bloquear:</strong> Mantén los colores que te gusten mientras generas nuevos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span><strong>Copiar:</strong> Click en cualquier color para copiarlo</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Keyboard listener */}
      <KeyboardListener onSpace={generatePalette} />
    </div>
  );
}

// Keyboard listener component
function KeyboardListener({ onSpace }: { onSpace: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        onSpace();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSpace]);

  return null;
}
