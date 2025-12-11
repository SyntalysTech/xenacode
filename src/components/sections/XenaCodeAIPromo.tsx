'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bot, ArrowRight, MessageSquare, Image as ImageIcon, Zap } from 'lucide-react';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <section id="xenacode-ai" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-[var(--gradient-start)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-[500px] h-[500px] bg-[var(--gradient-end)]/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <AnimatedSection animation="slide-right">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-6">
                <Bot className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--primary)]">IA Gratis</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6">
                XenaCode
                <span className="gradient-text">AI</span>
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
                      'bg-[var(--primary)]/10'
                    )}>
                      <feature.icon className="w-5 h-5 text-[var(--primary)]" />
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
                <Button size="lg" className="group">
                  Probar XenaCodeAI
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Image with 3D Tilt Effect */}
          <AnimatedSection animation="slide-left" delay={200}>
            <div className="relative" style={{ perspective: '1000px' }}>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--gradient-start)]/20 to-[var(--gradient-end)]/20 rounded-3xl blur-2xl" />

              {/* Screenshot with 3D tilt */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transform, transformStyle: 'preserve-3d' }}
                className={cn(
                  'relative rounded-2xl overflow-hidden',
                  'border border-[var(--border)]',
                  'shadow-2xl shadow-[var(--primary)]/10',
                  'transition-transform duration-200 ease-out',
                  'cursor-pointer'
                )}
              >
                <Image
                  src="/assets/images/proyectos/XenaCodeAI.png"
                  alt="XenaCodeAI - Chat con Inteligencia Artificial"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />

                {/* Glare effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                  }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
