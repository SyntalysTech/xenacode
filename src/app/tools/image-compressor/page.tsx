'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ImageDown,
  Upload,
  Download,
  ArrowLeft,
  Trash2,
  FileImage,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface ImageFile {
  id: string;
  file: File;
  originalUrl: string;
  compressedUrl: string | null;
  originalSize: number;
  compressedSize: number | null;
  status: 'pending' | 'compressing' | 'done' | 'error';
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function compressImage(
  file: File,
  quality: number,
  maxWidth: number
): Promise<{ blob: Blob; url: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Resize if larger than maxWidth
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Could not compress image'));
            return;
          }
          resolve({
            blob,
            url: URL.createObjectURL(blob),
          });
        },
        outputType,
        quality / 100
      );
    };
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageCompressorPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith('image/')
    );

    const newImages: ImageFile[] = imageFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      originalUrl: URL.createObjectURL(file),
      compressedUrl: null,
      originalSize: file.size,
      compressedSize: null,
      status: 'pending',
    }));

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const compressAll = async () => {
    for (const image of images) {
      if (image.status !== 'pending') continue;

      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, status: 'compressing' } : img
        )
      );

      try {
        const result = await compressImage(image.file, quality, maxWidth);
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? {
                  ...img,
                  compressedUrl: result.url,
                  compressedSize: result.blob.size,
                  status: 'done',
                }
              : img
          )
        );
      } catch {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, status: 'error' } : img
          )
        );
      }
    }
  };

  const downloadImage = (image: ImageFile) => {
    if (!image.compressedUrl) return;
    const link = document.createElement('a');
    link.href = image.compressedUrl;
    link.download = `compressed_${image.file.name}`;
    link.click();
  };

  const downloadAll = () => {
    images.forEach((img) => {
      if (img.compressedUrl) {
        downloadImage(img);
      }
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.originalUrl);
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.originalUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
  };

  const totalOriginal = images.reduce((acc, img) => acc + img.originalSize, 0);
  const totalCompressed = images.reduce(
    (acc, img) => acc + (img.compressedSize || 0),
    0
  );
  const savedPercentage =
    totalOriginal > 0
      ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)
      : 0;

  const pendingCount = images.filter((i) => i.status === 'pending').length;
  const doneCount = images.filter((i) => i.status === 'done').length;

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
              <ImageDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                Image Compressor
              </h1>
              <p className="text-[var(--foreground-muted)]">
                Comprime imágenes sin perder calidad visible
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'mb-8 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all',
            'flex flex-col items-center justify-center text-center',
            isDragging
              ? 'border-[var(--primary)] bg-[var(--primary)]/10'
              : 'border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--primary)]'
          )}
        >
          <Upload
            className={cn(
              'w-12 h-12 mb-4',
              isDragging ? 'text-[var(--primary)]' : 'text-[var(--foreground-muted)]'
            )}
          />
          <p className="text-lg font-medium text-[var(--foreground)] mb-1">
            Arrastra tus imágenes aquí
          </p>
          <p className="text-sm text-[var(--foreground-muted)]">
            o haz click para seleccionar archivos
          </p>
          <p className="text-xs text-[var(--foreground-muted)] mt-2">
            Soporta: JPG, PNG, WebP
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {images.length > 0 && (
          <>
            {/* Controls */}
            <div className="mb-6 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {/* Quality */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">
                      Calidad
                    </label>
                    <span className="text-sm font-mono text-[var(--primary)]">
                      {quality}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[var(--background-secondary)] accent-[var(--primary)]"
                  />
                  <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
                    <span>Más compresión</span>
                    <span>Más calidad</span>
                  </div>
                </div>

                {/* Max Width */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">
                      Ancho máximo
                    </label>
                    <span className="text-sm font-mono text-[var(--primary)]">
                      {maxWidth}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={640}
                    max={3840}
                    step={320}
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[var(--background-secondary)] accent-[var(--primary)]"
                  />
                  <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
                    <span>640px</span>
                    <span>4K</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={compressAll}
                  disabled={pendingCount === 0}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
                    pendingCount > 0
                      ? 'bg-[var(--primary)] text-[var(--background)] hover:opacity-90'
                      : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] cursor-not-allowed'
                  )}
                >
                  <Sparkles className="w-4 h-4" />
                  Comprimir {pendingCount > 0 && `(${pendingCount})`}
                </button>
                {doneCount > 0 && (
                  <button
                    onClick={downloadAll}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    Descargar todo
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-red-500 hover:text-red-500 transition-colors ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpiar
                </button>
              </div>
            </div>

            {/* Stats */}
            {doneCount > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--foreground)]">
                    <strong>{formatFileSize(totalOriginal)}</strong>
                    <ArrowRight className="w-4 h-4 inline mx-2" />
                    <strong className="text-green-500">
                      {formatFileSize(totalCompressed)}
                    </strong>
                  </span>
                  <span className="text-green-500 font-bold">
                    -{savedPercentage}% ahorrado
                  </span>
                </div>
              </div>
            )}

            {/* Image List */}
            <div className="space-y-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] flex items-center gap-4"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--background-secondary)] flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.compressedUrl || image.originalUrl}
                      alt={image.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">
                      {image.file.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                      <span>{formatFileSize(image.originalSize)}</span>
                      {image.compressedSize && (
                        <>
                          <ArrowRight className="w-3 h-3" />
                          <span className="text-green-500">
                            {formatFileSize(image.compressedSize)}
                          </span>
                          <span className="text-green-500 text-xs">
                            (-
                            {Math.round(
                              ((image.originalSize - image.compressedSize) /
                                image.originalSize) *
                                100
                            )}
                            %)
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status/Actions */}
                  <div className="flex items-center gap-2">
                    {image.status === 'compressing' && (
                      <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                    )}
                    {image.status === 'done' && (
                      <button
                        onClick={() => downloadImage(image)}
                        className="p-2 rounded-lg bg-green-500 text-white hover:opacity-90 transition-opacity"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    {image.status === 'pending' && (
                      <FileImage className="w-5 h-5 text-[var(--foreground-muted)]" />
                    )}
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--foreground-muted)] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            ¿Por qué comprimir imágenes?
          </h2>
          <ul className="space-y-2 text-[var(--foreground-muted)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span>
                <strong>Carga más rápida:</strong> Las imágenes más ligeras cargan
                más rápido en tu web
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span>
                <strong>Ahorra espacio:</strong> Reduce el uso de almacenamiento
                sin perder calidad visible
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span>
                <strong>Mejor SEO:</strong> Google favorece las páginas que cargan
                rápido
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)]">•</span>
              <span>
                <strong>100% local:</strong> Tus imágenes se procesan en tu
                navegador, nunca salen de tu dispositivo
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
