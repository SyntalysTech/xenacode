'use client';

import Link from 'next/link';
import {
  Braces,
  Palette,
  KeyRound,
  QrCode,
  ImageDown,
  Binary,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { SectionTitle, AnimatedSection } from '@/components/ui';
import { cn } from '@/lib/cn';

const tools = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Formatea, valida y embellece tu JSON al instante',
    icon: Braces,
    href: '/tools/json-formatter',
    gradient: 'from-blue-500 to-cyan-400',
    bgGlow: 'bg-blue-500/20',
  },
  {
    id: 'color-palette',
    name: 'Color Palette',
    description: 'Genera paletas de colores armónicas para tus diseños',
    icon: Palette,
    href: '/tools/color-palette',
    gradient: 'from-pink-500 to-rose-400',
    bgGlow: 'bg-pink-500/20',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Crea contraseñas seguras e imposibles de hackear',
    icon: KeyRound,
    href: '/tools/password-generator',
    gradient: 'from-green-500 to-emerald-400',
    bgGlow: 'bg-green-500/20',
  },
  {
    id: 'qr-generator',
    name: 'QR Generator',
    description: 'Genera códigos QR personalizados en segundos',
    icon: QrCode,
    href: '/tools/qr-generator',
    gradient: 'from-purple-500 to-violet-400',
    bgGlow: 'bg-purple-500/20',
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Comprime imágenes sin perder calidad visible',
    icon: ImageDown,
    href: '/tools/image-compressor',
    gradient: 'from-orange-500 to-amber-400',
    bgGlow: 'bg-orange-500/20',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder',
    description: 'Codifica y decodifica texto o archivos en Base64',
    icon: Binary,
    href: '/tools/base64',
    gradient: 'from-teal-500 to-cyan-400',
    bgGlow: 'bg-teal-500/20',
  },
];

export function FreeTools() {
  return (
    <section id="tools" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--gradient-start)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--gradient-end)]/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Header with special styling */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--primary)]">100% Gratis</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-4">
              Mis Tools para Ti
            </h2>
            <p className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-6">
              Herramientas que he creado yo mismo y que uso a diario. Ahora son tuyas.
              <span className="block mt-2 text-[var(--primary)] font-semibold">
                Sin registro. Sin límites. Sin publicidad. De mi parte.
              </span>
            </p>
            <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" />
          </div>
        </AnimatedSection>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, index) => (
            <AnimatedSection
              key={tool.id}
              animation="fade-up"
              delay={index * 100}
            >
              <Link href={tool.href} className="block group h-full">
                <div
                  className={cn(
                    'relative h-full p-6 md:p-8 rounded-2xl',
                    'bg-[var(--card-bg)] border border-[var(--border)]',
                    'transition-all duration-500',
                    'hover:border-transparent hover:shadow-2xl',
                    'hover:-translate-y-2'
                  )}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={cn(
                      'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500',
                      'group-hover:opacity-100',
                      tool.bgGlow,
                      'blur-xl -z-10'
                    )}
                  />

                  {/* Icon with gradient */}
                  <div
                    className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center mb-5',
                      'bg-gradient-to-br',
                      tool.gradient,
                      'shadow-lg',
                      'group-hover:scale-110 transition-transform duration-300'
                    )}
                  >
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[var(--foreground-muted)] mb-4">
                    {tool.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-[var(--primary)] font-medium">
                    <span className="text-sm">Usar herramienta</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>

                  {/* Corner decoration */}
                  <div
                    className={cn(
                      'absolute top-4 right-4 w-2 h-2 rounded-full',
                      'bg-gradient-to-br',
                      tool.gradient,
                      'opacity-50 group-hover:opacity-100 transition-opacity'
                    )}
                  />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="fade-up" delay={600}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--background-secondary)] border border-[var(--border)]">
              <Zap className="w-5 h-5 text-[var(--accent)]" />
              <span className="text-[var(--foreground-muted)]">
                Más herramientas en desarrollo...
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
