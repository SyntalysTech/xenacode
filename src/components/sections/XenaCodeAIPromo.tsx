'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bot, Sparkles, ArrowRight, MessageSquare, Image as ImageIcon, Zap } from 'lucide-react';
import { AnimatedSection, Button } from '@/components/ui';
import { cn } from '@/lib/cn';

const features = [
  {
    icon: MessageSquare,
    title: 'Chat Inteligente',
    description: 'Pregunta lo que quieras sobre programación, ideas o textos',
  },
  {
    icon: ImageIcon,
    title: 'Genera Imágenes',
    description: 'Crea imágenes únicas con inteligencia artificial',
  },
  {
    icon: Zap,
    title: 'Rápido y Gratis',
    description: 'Sin registro, sin límites, sin complicaciones',
  },
];

export function XenaCodeAIPromo() {
  return (
    <section id="xenacode-ai" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <AnimatedSection animation="slide-right">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Bot className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">IA Gratis</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6">
                XenaCode
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">AI</span>
              </h2>

              <p className="text-lg md:text-xl text-[var(--foreground-muted)] mb-8">
                Mi propia IA, creada para ti. Chat inteligente y generación de imágenes.
                <span className="block mt-2 font-semibold text-[var(--foreground)]">
                  100% gratis. Sin límites. Sin registro.
                </span>
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
                    )}>
                      <feature.icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)]">{feature.title}</h4>
                      <p className="text-sm text-[var(--foreground-muted)]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href="/ai">
                <Button size="lg" className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0">
                  Probar XenaCodeAI
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection animation="slide-left" delay={200}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl" />

              {/* Screenshot */}
              <div className={cn(
                'relative rounded-2xl overflow-hidden',
                'border border-[var(--border)]',
                'shadow-2xl shadow-purple-500/10'
              )}>
                <Image
                  src="/assets/images/proyectos/XenaCodeAI.png"
                  alt="XenaCodeAI - Chat con Inteligencia Artificial"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating badge */}
              <div className={cn(
                'absolute -bottom-4 -right-4 md:bottom-6 md:right-6',
                'px-4 py-2 rounded-full',
                'bg-gradient-to-r from-purple-600 to-blue-600',
                'text-white font-semibold text-sm',
                'shadow-lg shadow-purple-500/30',
                'flex items-center gap-2'
              )}>
                <Sparkles className="w-4 h-4" />
                Powered by AI
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
