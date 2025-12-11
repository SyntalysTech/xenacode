'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Braces,
  Copy,
  Check,
  Trash2,
  Download,
  ArrowLeft,
  Minimize2,
  Maximize2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/cn';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'JSON inválido');
      setOutput('');
    }
  }, [input, indentSize]);

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'JSON inválido');
      setOutput('');
    }
  }, [input]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const exampleJson = `{
  "name": "XenaCode",
  "type": "portfolio",
  "features": ["web", "ia", "apps"],
  "active": true
}`;

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Braces className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                JSON Formatter
              </h1>
              <p className="text-[var(--foreground-muted)]">
                Formatea, valida y minifica tu JSON al instante
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm text-[var(--foreground-muted)] whitespace-nowrap">Indentación:</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--primary)]"
            >
              <option value={2}>2 espacios</option>
              <option value={4}>4 espacios</option>
              <option value={8}>8 espacios</option>
            </select>
          </div>

          <div className="flex gap-2 sm:ml-auto w-full sm:w-auto">
            <button
              onClick={formatJson}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
            >
              <Maximize2 className="w-4 h-4" />
              Formatear
            </button>
            <button
              onClick={minifyJson}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--primary)] transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
              Minificar
            </button>
          </div>
        </div>

        {/* Editor Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Entrada JSON
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setInput(exampleJson)}
                  className="text-xs text-[var(--primary)] hover:underline"
                >
                  Cargar ejemplo
                </button>
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg hover:bg-[var(--background-secondary)] text-[var(--foreground-muted)] transition-colors"
                  title="Limpiar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pega tu JSON aquí..."
              className={cn(
                'w-full h-80 lg:h-[500px] p-4 rounded-xl',
                'bg-[var(--background-secondary)] border',
                'text-[var(--foreground)] font-mono text-sm',
                'placeholder:text-[var(--foreground-muted)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50',
                'resize-none',
                error ? 'border-red-500' : 'border-[var(--border)]'
              )}
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Resultado
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    output
                      ? 'hover:bg-[var(--background-secondary)] text-[var(--foreground-muted)]'
                      : 'opacity-50 cursor-not-allowed'
                  )}
                  title="Copiar"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!output}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    output
                      ? 'hover:bg-[var(--background-secondary)] text-[var(--foreground-muted)]'
                      : 'opacity-50 cursor-not-allowed'
                  )}
                  title="Descargar"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              className={cn(
                'w-full h-80 lg:h-[500px] p-4 rounded-xl overflow-auto',
                'bg-[var(--background-secondary)] border border-[var(--border)]',
                'font-mono text-sm'
              )}
            >
              {error ? (
                <div className="flex items-start gap-3 text-red-500">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Error de sintaxis</p>
                    <p className="text-sm opacity-80">{error}</p>
                  </div>
                </div>
              ) : output ? (
                <pre className="text-[var(--foreground)] whitespace-pre-wrap break-words">
                  {output}
                </pre>
              ) : (
                <p className="text-[var(--foreground-muted)]">
                  El resultado aparecerá aquí...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        {input && !error && (
          <div className="mt-4 flex items-center gap-2 text-sm text-green-500">
            <CheckCircle2 className="w-4 h-4" />
            <span>JSON válido</span>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            ¿Qué hace esta herramienta?
          </h2>
          <ul className="space-y-2 text-[var(--foreground-muted)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span><strong>Formatea</strong> tu JSON con indentación legible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span><strong>Valida</strong> la sintaxis y detecta errores</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span><strong>Minifica</strong> para reducir el tamaño del archivo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span><strong>Descarga</strong> el resultado como archivo .json</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
