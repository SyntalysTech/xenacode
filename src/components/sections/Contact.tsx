'use client';

import { useState } from 'react';
import { Send, Mail, MapPin, MessageSquare, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { SectionTitle, AnimatedSection, Button, Card } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { ContactFormData } from '@/types';

const projectTypes = [
  'Desarrollo Web',
  'Aplicación Móvil',
  'Inteligencia Artificial',
  'Ciberseguridad',
  'Software a Medida',
  'Consultoría',
  'Otro',
];

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isGettingAiHelp, setIsGettingAiHelp] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAiHelp = async () => {
    if (!formData.projectType) return;

    setIsGettingAiHelp(true);
    setAiResponse(null);

    try {
      const response = await fetch('/api/ai-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectType: formData.projectType }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiResponse(data.suggestion);
      }
    } catch {
      // Silently fail - AI help is optional
    } finally {
      setIsGettingAiHelp(false);
    }
  };

  return (
    <section id="contacto" className="section-padding bg-[var(--background-secondary)]">
      <div className="container-custom">
        <SectionTitle
          title="Contacto"
          subtitle="Cuéntame sobre tu proyecto y trabajemos juntos"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <AnimatedSection animation="slide-left">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Hablemos de tu proyecto
              </h3>
              <p className="text-[var(--foreground-muted)] mb-8">
                Ya sea que tengas una idea clara o necesites ayuda para definir el alcance,
                estoy aquí para escucharte. Cada proyecto es único y merece una solución a medida.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={100}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                      'bg-[var(--primary)] text-[var(--background)]'
                    )}
                  >
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)]">Email</h4>
                    {/* [ACTUALIZA CON TU EMAIL REAL] */}
                    <a
                      href="mailto:contacto@xenacode.com"
                      className="text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors"
                    >
                      contacto@xenacode.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                      'bg-[var(--primary)] text-[var(--background)]'
                    )}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)]">Ubicación</h4>
                    <p className="text-[var(--foreground-muted)]">
                      España (trabajo remoto mundial)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                      'bg-[var(--primary)] text-[var(--background)]'
                    )}
                  >
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)]">Respuesta</h4>
                    <p className="text-[var(--foreground-muted)]">
                      Normalmente respondo en menos de 24 horas
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection animation="slide-right">
            <Card hover={false}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg',
                      'bg-[var(--background)] border border-[var(--border)]',
                      'text-[var(--foreground)] placeholder-[var(--foreground-muted)]',
                      'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
                      'transition-all'
                    )}
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg',
                      'bg-[var(--background)] border border-[var(--border)]',
                      'text-[var(--foreground)] placeholder-[var(--foreground-muted)]',
                      'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
                      'transition-all'
                    )}
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                  >
                    Tipo de proyecto
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className={cn(
                        'flex-1 px-4 py-3 rounded-lg',
                        'bg-[var(--background)] border border-[var(--border)]',
                        'text-[var(--foreground)]',
                        'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
                        'transition-all'
                      )}
                    >
                      <option value="">Selecciona un tipo</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAiHelp}
                      disabled={!formData.projectType || isGettingAiHelp}
                      className={cn(
                        'px-4 py-3 rounded-lg',
                        'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]',
                        'text-[var(--background)]',
                        'hover:opacity-90 transition-opacity',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'flex items-center gap-2'
                      )}
                      title="Obtener sugerencia con IA"
                    >
                      <Sparkles className={cn('w-5 h-5', isGettingAiHelp && 'animate-spin')} />
                    </button>
                  </div>
                </div>

                {/* AI Suggestion */}
                {aiResponse && (
                  <div
                    className={cn(
                      'p-4 rounded-lg',
                      'bg-gradient-to-r from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10',
                      'border border-[var(--primary)]/20'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                          Sugerencia de IA:
                        </p>
                        <p className="text-sm text-[var(--foreground-muted)]">{aiResponse}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg resize-none',
                      'bg-[var(--background)] border border-[var(--border)]',
                      'text-[var(--foreground)] placeholder-[var(--foreground-muted)]',
                      'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
                      'transition-all'
                    )}
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>Mensaje enviado correctamente. Te responderé pronto.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <XCircle className="w-5 h-5" />
                    <span>Error al enviar. Por favor, intenta de nuevo.</span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      Enviar mensaje
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
