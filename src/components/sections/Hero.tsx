'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Code2, Brain, Shield, Smartphone, Cpu } from 'lucide-react';
import { Button, KeyboardKey, AnimatedSection, Badge } from '@/components/ui';
import { cn } from '@/lib/cn';
import gsap from 'gsap';

export function Hero() {
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!floatingElementsRef.current) return;

    const elements = floatingElementsRef.current.querySelectorAll('.floating-icon');

    elements.forEach((el, index) => {
      gsap.to(el, {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      });
    });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating Icons Background */}
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="floating-icon absolute top-[15%] left-[10%] opacity-10">
          <Code2 className="w-16 h-16 text-[var(--primary)]" />
        </div>
        <div className="floating-icon absolute top-[25%] right-[15%] opacity-10">
          <Brain className="w-12 h-12 text-[var(--primary)]" />
        </div>
        <div className="floating-icon absolute bottom-[30%] left-[20%] opacity-10">
          <Shield className="w-14 h-14 text-[var(--primary)]" />
        </div>
        <div className="floating-icon absolute bottom-[20%] right-[10%] opacity-10">
          <Smartphone className="w-10 h-10 text-[var(--primary)]" />
        </div>
        <div className="floating-icon absolute top-[40%] left-[5%] opacity-10">
          <Cpu className="w-12 h-12 text-[var(--primary)]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <AnimatedSection animation="fade-up" delay={0}>
              <Badge variant="outline" className="mb-6">
                Full Stack Senior + 12 años de experiencia
              </Badge>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                Desarrollo de software
                <span className="block gradient-text">que transforma ideas</span>
                en soluciones reales
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-lg md:text-xl text-[var(--foreground-muted)] mb-8 max-w-xl mx-auto lg:mx-0">
                Webs, inteligencia artificial, ciberseguridad, apps y software a medida.
                Proyectos serios, código limpio, resultados medibles.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('proyectos')}
                  className="group"
                >
                  Ver proyectos
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => scrollToSection('contacto')}
                >
                  Contactar
                </Button>
              </div>
            </AnimatedSection>

            {/* SYNTALYS Badge */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-3">
                <span className="text-sm text-[var(--foreground-muted)]">Empresa asociada:</span>
                <a
                  href="https://syntalys.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                    'bg-[var(--background-secondary)] border border-[var(--border)]',
                    'text-[var(--foreground)] font-medium text-sm',
                    'hover:border-[var(--primary)] hover:shadow-md',
                    'transition-all duration-300'
                  )}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  SYNTALYS TECH
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Interactive Keyboard Key */}
          <AnimatedSection
            animation="scale"
            delay={500}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative">
              {/* Glow effect behind key */}
              <div
                className={cn(
                  'absolute inset-0 blur-3xl opacity-20 rounded-full',
                  'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]',
                  'scale-150 animate-pulse-slow'
                )}
              />

              {/* Keyboard Key */}
              <KeyboardKey size="xl" className="relative z-10" />
            </div>

            <p className="mt-6 text-sm text-[var(--foreground-muted)] animate-fade-in-up">
              Pulsa la tecla para probar
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">12+</div>
                <div className="text-sm text-[var(--foreground-muted)]">Años</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">100+</div>
                <div className="text-sm text-[var(--foreground-muted)]">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">50+</div>
                <div className="text-sm text-[var(--foreground-muted)]">Clientes</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

    </section>
  );
}
