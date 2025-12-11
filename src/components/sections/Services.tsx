'use client';

import { useState } from 'react';
import { Globe, Brain, Shield, Smartphone, Code, ChevronRight, Check } from 'lucide-react';
import { SectionTitle, AnimatedSection, Card } from '@/components/ui';
import { services } from '@/data/services';
import { cn } from '@/lib/cn';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8" />,
  Brain: <Brain className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Smartphone: <Smartphone className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
};

export function Services() {
  const [activeService, setActiveService] = useState(services[0].id);

  const activeServiceData = services.find((s) => s.id === activeService);

  return (
    <section id="servicios" className="section-padding bg-[var(--background-secondary)]">
      <div className="container-custom">
        <SectionTitle
          title="Servicios"
          subtitle="Soluciones tecnológicas completas para cada desafío de tu negocio"
        />

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8">
          {/* Service Navigation */}
          <div className="lg:col-span-2 space-y-3">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} animation="slide-left" delay={index * 100}>
                <button
                  onClick={() => setActiveService(service.id)}
                  className={cn(
                    'w-full p-5 rounded-xl text-left',
                    'border-2 transition-all duration-300',
                    'group flex items-center gap-4',
                    activeService === service.id
                      ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--background)]'
                      : 'border-[var(--border)] bg-[var(--card-bg)] text-[var(--foreground)] hover:border-[var(--primary)]'
                  )}
                >
                  <div
                    className={cn(
                      'p-3 rounded-lg transition-colors',
                      activeService === service.id
                        ? 'bg-[var(--background)]/20'
                        : 'bg-[var(--background-secondary)]'
                    )}
                  >
                    {iconMap[service.icon]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                  </div>
                  <ChevronRight
                    className={cn(
                      'w-5 h-5 transition-transform',
                      activeService === service.id && 'rotate-90'
                    )}
                  />
                </button>
              </AnimatedSection>
            ))}
          </div>

          {/* Service Details */}
          <div className="lg:col-span-3">
            <AnimatedSection animation="fade-in" key={activeService}>
              <Card hover={false} className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[var(--background-secondary)]">
                    {iconMap[activeServiceData?.icon || 'Code']}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)]">
                    {activeServiceData?.title}
                  </h3>
                </div>

                <p className="text-[var(--foreground-muted)] text-lg mb-8">
                  {activeServiceData?.description}
                </p>

                <h4 className="font-semibold text-[var(--foreground)] mb-4">
                  Incluye:
                </h4>
                <ul className="space-y-3">
                  {activeServiceData?.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[var(--background)]" />
                      </div>
                      <span className="text-[var(--foreground-muted)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>

        {/* Mobile Layout - Cards Grid */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} animation="fade-up" delay={index * 100}>
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-[var(--background-secondary)]">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="font-semibold text-lg text-[var(--foreground)]">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm text-[var(--foreground-muted)] mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--foreground-muted)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
