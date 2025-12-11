'use client';

import Image from 'next/image';
import { Building2, Globe, Users, Award, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';
import { AnimatedSection, Button } from '@/components/ui';
import { cn } from '@/lib/cn';

export function Syntalys() {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Empresa en Suiza',
      description: 'Sede legal en Bure, Suiza.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Equipo Senior',
      description: 'Profesionales con experiencia.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Alcance Global',
      description: 'Proyectos internacionales.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Calidad Suiza',
      description: 'Estandares de primer nivel.',
    },
  ];

  return (
    <section 
      id="syntalys" 
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--background-accent)' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground-on-accent) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header con badge y título centrado */}
        <div className="text-center mb-12">
          <AnimatedSection animation="fade-up">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--foreground-on-accent)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              Empresa Asociada en Suiza
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--foreground-on-accent)' }}
            >
              SYNTALYS TECH
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--foreground-on-accent)', opacity: 0.9 }}
            >
              Empresa suiza especializada en desarrollo de soluciones de inteligencia artificial,
              automatización y ciberseguridad a medida.
            </p>
          </AnimatedSection>
        </div>

        {/* Layout principal: Imagen a la izquierda, info a la derecha */}
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Imagen grande - 3 columnas */}
          <AnimatedSection animation="slide-left" className="lg:col-span-3">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Image
                src="/assets/images/syntalys-office.png"
                alt="Syntalys Tech Office"
                width={900}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </AnimatedSection>

          {/* Info y CTA - 2 columnas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contacto */}
            <AnimatedSection animation="slide-right" delay={100}>
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div className="flex flex-col gap-4" style={{ color: 'var(--foreground-on-accent)' }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span>2915 Bure, Suiza</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                      <Phone className="w-5 h-5" />
                    </div>
                    <span>+41 76 436 24 26</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>hello@syntalys.ch</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Botón CTA */}
            <AnimatedSection animation="slide-right" delay={200}>
              <Button
                size="lg"
                onClick={() => window.open('https://syntalys.ch', '_blank')}
                className="group w-full justify-center"
                style={{
                  background: 'var(--foreground-on-accent)',
                  color: 'var(--background-accent)'
                }}
              >
                Visitar syntalys.ch
                <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </AnimatedSection>
          </div>
        </div>

        {/* Features Grid - 4 columnas abajo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {features.map((feature, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div
                className={cn(
                  'p-5 rounded-xl text-center',
                  'transition-all duration-300 hover:-translate-y-1'
                )}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{
                    background: 'var(--foreground-on-accent)',
                    color: 'var(--background-accent)'
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="font-semibold text-sm mb-1"
                  style={{ color: 'var(--foreground-on-accent)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: 'var(--foreground-on-accent)', opacity: 0.7 }}
                >
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
