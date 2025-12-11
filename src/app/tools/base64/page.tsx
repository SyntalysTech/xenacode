'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Binary,
  Copy,
  Check,
  ArrowLeft,
  ArrowRightLeft,
  Upload,
  Download,
  FileText,
  Image,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type Mode = 'encode' | 'decode';
type InputType = 'text' | 'file';

export default function Base64Page() {
  const [mode, setMode] = useState<Mode>('encode');
  const [inputType, setInputType] = useState<InputType>('text');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const encodeText = (text: string): string => {
    try {
      // Handle UTF-8 characters
      return btoa(unescape(encodeURIComponent(text)));
    } catch {
      throw new Error('Error al codificar el texto');
    }
  };

  const decodeText = (base64: string): string => {
    try {
      return decodeURIComponent(escape(atob(base64.trim())));
    } catch {
      throw new Error('Base64 inválido');
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(encodeText(input));
      } else {
        setOutput(decodeText(input));
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
      setOutput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix to get just the base64
      const base64 = result.split(',')[1] || result;

      if (mode === 'encode') {
        setOutput(base64);
        // Show preview if it's an image
        if (file.type.startsWith('image/')) {
          setFilePreview(result);
        } else {
          setFilePreview(null);
        }
      } else {
        setInput(base64);
      }
      setError(null);
    };

    reader.onerror = () => {
      setError('Error al leer el archivo');
    };

    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;

    if (mode === 'decode') {
      // Try to decode and download as file
      try {
        const decoded = atob(input.trim());
        const bytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          bytes[i] = decoded.charCodeAt(i);
        }
        const blob = new Blob([bytes]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'decoded_file';
        link.click();
        URL.revokeObjectURL(url);
      } catch {
        // If it fails, download as text
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'decoded.txt';
        link.click();
        URL.revokeObjectURL(url);
      }
    } else {
      // Download base64 as text
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'encoded.txt';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setFileName(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const swapMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    // Swap input/output
    setInput(output);
    setOutput(input);
    setError(null);
    setFileName(null);
    setFilePreview(null);
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center">
              <Binary className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                Base64 Encoder/Decoder
              </h1>
              <p className="text-[var(--foreground-muted)]">
                Codifica y decodifica texto o archivos en Base64
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Mode Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="inline-flex rounded-xl bg-[var(--background-secondary)] p-1">
            <button
              onClick={() => {
                setMode('encode');
                handleClear();
              }}
              className={cn(
                'px-6 py-2 rounded-lg font-medium transition-all',
                mode === 'encode'
                  ? 'bg-[var(--primary)] text-[var(--background)]'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              )}
            >
              Codificar
            </button>
            <button
              onClick={() => {
                setMode('decode');
                handleClear();
              }}
              className={cn(
                'px-6 py-2 rounded-lg font-medium transition-all',
                mode === 'decode'
                  ? 'bg-[var(--primary)] text-[var(--background)]'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              )}
            >
              Decodificar
            </button>
          </div>

          <button
            onClick={swapMode}
            className="p-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
            title="Intercambiar"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Input Type Toggle (for encode mode) */}
        {mode === 'encode' && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => {
                setInputType('text');
                handleClear();
              }}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                inputType === 'text'
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]'
                  : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)]'
              )}
            >
              <FileText className="w-4 h-4" />
              Texto
            </button>
            <button
              onClick={() => {
                setInputType('file');
                handleClear();
              }}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                inputType === 'file'
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]'
                  : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)]'
              )}
            >
              <Image className="w-4 h-4" />
              Archivo
            </button>
          </div>
        )}

        {/* Editor Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--foreground)]">
                {mode === 'encode' ? 'Texto/Archivo Original' : 'Base64 Codificado'}
              </label>
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg hover:bg-[var(--background-secondary)] text-[var(--foreground-muted)] transition-colors"
                title="Limpiar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {mode === 'encode' && inputType === 'file' ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'h-80 lg:h-[400px] rounded-xl border-2 border-dashed',
                  'flex flex-col items-center justify-center cursor-pointer',
                  'transition-all',
                  fileName
                    ? 'border-green-500 bg-green-500/5'
                    : 'border-[var(--border)] bg-[var(--background-secondary)] hover:border-[var(--primary)]'
                )}
              >
                {filePreview ? (
                  <div className="p-4 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="max-h-48 max-w-full mx-auto rounded-lg mb-2"
                    />
                    <p className="text-sm text-[var(--foreground)]">{fileName}</p>
                  </div>
                ) : fileName ? (
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-2 text-green-500" />
                    <p className="text-sm text-[var(--foreground)]">{fileName}</p>
                    <p className="text-xs text-[var(--foreground-muted)] mt-1">
                      Click para cambiar
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 mb-4 text-[var(--foreground-muted)]" />
                    <p className="text-[var(--foreground)]">Click para subir archivo</p>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      Imágenes, documentos, cualquier archivo
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'encode'
                    ? 'Escribe o pega tu texto aquí...'
                    : 'Pega tu Base64 aquí...'
                }
                className={cn(
                  'w-full h-80 lg:h-[400px] p-4 rounded-xl',
                  'bg-[var(--background-secondary)] border',
                  'text-[var(--foreground)] font-mono text-sm',
                  'placeholder:text-[var(--foreground-muted)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50',
                  'resize-none',
                  error ? 'border-red-500' : 'border-[var(--border)]'
                )}
                spellCheck={false}
              />
            )}

            {/* Convert button (for text input) */}
            {(mode === 'decode' || inputType === 'text') && (
              <button
                onClick={handleConvert}
                className="w-full py-3 rounded-xl bg-[var(--primary)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
              >
                {mode === 'encode' ? 'Codificar a Base64' : 'Decodificar Base64'}
              </button>
            )}
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--foreground)]">
                {mode === 'encode' ? 'Base64 Codificado' : 'Texto Decodificado'}
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
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
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
                'w-full h-80 lg:h-[400px] p-4 rounded-xl overflow-auto',
                'bg-[var(--background-secondary)] border border-[var(--border)]',
                'font-mono text-sm'
              )}
            >
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : output ? (
                <pre className="text-[var(--foreground)] whitespace-pre-wrap break-all">
                  {output}
                </pre>
              ) : (
                <p className="text-[var(--foreground-muted)]">
                  El resultado aparecerá aquí...
                </p>
              )}
            </div>

            {/* Output stats */}
            {output && (
              <p className="text-sm text-[var(--foreground-muted)]">
                {output.length.toLocaleString()} caracteres
              </p>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            ¿Qué es Base64?
          </h2>
          <ul className="space-y-2 text-[var(--foreground-muted)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span>
                Base64 es un esquema de codificación que convierte datos binarios
                en texto ASCII
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span>
                Se usa para transmitir datos de forma segura en medios que solo
                soportan texto
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span>
                Muy útil para embeber imágenes en CSS/HTML o enviar archivos por
                email
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span>
                Los datos codificados son aproximadamente un 33% más grandes que
                el original
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
