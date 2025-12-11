'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Logo } from '@/components/ui';
import { navItems } from '@/data/navigation';
import { cn } from '@/lib/cn';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background-secondary)] border-t border-[var(--border)]">
      <div className="container-custom section-padding pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo variant="horizontal" width={160} height={45} linkToHome={false} />
            <p className="mt-4 text-[var(--foreground-muted)] max-w-md">
              Programador Full Stack Senior con 12 años de experiencia.
              Desarrollo de webs, IA, ciberseguridad, apps y software a medida
              para proyectos serios y complejos.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/SyntalysTech"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'bg-[var(--border)] text-[var(--foreground)]',
                  'hover:bg-[var(--primary)] hover:text-[var(--background)]',
                  'transition-all duration-300'
                )}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/adrian-serrano-53353736a/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'bg-[var(--border)] text-[var(--foreground)]',
                  'hover:bg-[var(--primary)] hover:text-[var(--background)]',
                  'transition-all duration-300'
                )}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/xenacode_com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'bg-[var(--border)] text-[var(--foreground)]',
                  'hover:bg-[var(--primary)] hover:text-[var(--background)]',
                  'transition-all duration-300'
                )}
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Navegación</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-[var(--foreground-muted)]',
                      'hover:text-[var(--primary)]',
                      'transition-colors'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contacto@xenacode.com"
                  className={cn(
                    'flex items-center gap-2',
                    'text-[var(--foreground-muted)]',
                    'hover:text-[var(--primary)]',
                    'transition-colors'
                  )}
                >
                  <Mail className="w-4 h-4" />
                  {/* [ACTUALIZA CON TU EMAIL REAL] */}
                  contacto@xenacode.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-[var(--foreground-muted)]">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Suiza (remoto mundial)</span>
              </li>
              <li className="pt-2">
                <a
                  href="https://syntalys.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2',
                    'text-[var(--foreground-muted)]',
                    'hover:text-[var(--primary)]',
                    'transition-colors'
                  )}
                >
                  <ExternalLink className="w-4 h-4" />
                  SYNTALYS TECH
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--foreground-muted)]">
              &copy; {currentYear} XenaCode. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-[var(--foreground-muted)]">
              <Link href="/privacidad" className="hover:text-[var(--primary)] transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-[var(--primary)] transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
