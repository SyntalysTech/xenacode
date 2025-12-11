'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  Copy,
  Check,
  RefreshCw,
  ArrowLeft,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  ambiguous: 'il1Lo0O',
};

function generatePassword(options: PasswordOptions): string {
  let chars = '';

  if (options.uppercase) chars += CHARS.uppercase;
  if (options.lowercase) chars += CHARS.lowercase;
  if (options.numbers) chars += CHARS.numbers;
  if (options.symbols) chars += CHARS.symbols;

  if (options.excludeAmbiguous) {
    chars = chars.split('').filter(c => !CHARS.ambiguous.includes(c)).join('');
  }

  if (!chars) return '';

  let password = '';
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  for (let i = 0; i < options.length; i++) {
    password += chars[array[i] % chars.length];
  }

  return password;
}

function calculateStrength(password: string, options: PasswordOptions): number {
  if (!password) return 0;

  let score = 0;
  const length = password.length;

  // Length score
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (length >= 24) score += 1;

  // Character variety
  if (options.uppercase && options.lowercase) score += 1;
  if (options.numbers) score += 1;
  if (options.symbols) score += 2;

  return Math.min(score, 8);
}

function getStrengthInfo(strength: number): { label: string; color: string; icon: typeof Shield } {
  if (strength <= 2) return { label: 'Muy débil', color: 'text-red-500', icon: ShieldAlert };
  if (strength <= 4) return { label: 'Débil', color: 'text-orange-500', icon: ShieldAlert };
  if (strength <= 6) return { label: 'Buena', color: 'text-yellow-500', icon: Shield };
  return { label: 'Muy fuerte', color: 'text-green-500', icon: ShieldCheck };
}

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });

  const generate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  }, [options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateOption = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const strength = calculateStrength(password, options);
  const strengthInfo = getStrengthInfo(strength);
  const StrengthIcon = strengthInfo.icon;

  // Check if at least one character type is selected
  const hasValidOptions = options.uppercase || options.lowercase || options.numbers || options.symbols;

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
              <KeyRound className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                Password Generator
              </h1>
              <p className="text-[var(--foreground-muted)]">
                Crea contraseñas seguras e imposibles de hackear
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          {/* Password Display */}
          <div className="mb-8 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  'flex-1 p-4 rounded-xl',
                  'bg-[var(--background-secondary)]',
                  'font-mono text-lg md:text-xl',
                  'overflow-x-auto whitespace-nowrap',
                  'text-[var(--foreground)]'
                )}
              >
                {showPassword ? password || 'Selecciona al menos una opción' : '••••••••••••••••'}
              </div>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-3 rounded-lg bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                title={showPassword ? 'Ocultar' : 'Mostrar'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                disabled={!password}
                className={cn(
                  'flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl',
                  'font-medium transition-all',
                  password
                    ? 'bg-[var(--primary)] text-[var(--background)] hover:opacity-90'
                    : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] cursor-not-allowed'
                )}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
              <button
                onClick={generate}
                disabled={!hasValidOptions}
                className={cn(
                  'px-4 py-3 rounded-xl font-medium transition-all',
                  hasValidOptions
                    ? 'bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]'
                    : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] cursor-not-allowed'
                )}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Strength Indicator */}
            {password && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={cn('flex items-center gap-2', strengthInfo.color)}>
                    <StrengthIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{strengthInfo.label}</span>
                  </div>
                  <span className="text-sm text-[var(--foreground-muted)]">
                    {strength}/8
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[var(--background-secondary)] overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-300',
                      strength <= 2 && 'bg-red-500',
                      strength > 2 && strength <= 4 && 'bg-orange-500',
                      strength > 4 && strength <= 6 && 'bg-yellow-500',
                      strength > 6 && 'bg-green-500'
                    )}
                    style={{ width: `${(strength / 8) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">
              Opciones
            </h2>

            {/* Length Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[var(--foreground)]">
                  Longitud
                </label>
                <span className="text-sm font-mono text-[var(--primary)]">
                  {options.length} caracteres
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={64}
                value={options.length}
                onChange={(e) => updateOption('length', Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[var(--background-secondary)] accent-[var(--primary)]"
              />
              <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={(e) => updateOption('uppercase', e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  Mayúsculas (A-Z)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => updateOption('lowercase', e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  Minúsculas (a-z)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={(e) => updateOption('numbers', e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  Números (0-9)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={(e) => updateOption('symbols', e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  Símbolos (!@#$%^&*)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={options.excludeAmbiguous}
                  onChange={(e) => updateOption('excludeAmbiguous', e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  Excluir caracteres ambiguos (i, l, 1, L, o, 0, O)
                </span>
              </label>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Tips de seguridad
            </h2>
            <ul className="space-y-2 text-[var(--foreground-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Usa <strong>al menos 16 caracteres</strong> para máxima seguridad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Combina <strong>mayúsculas, minúsculas, números y símbolos</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Usa una <strong>contraseña única</strong> para cada cuenta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Considera usar un <strong>gestor de contraseñas</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Evita información personal como fechas o nombres</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
