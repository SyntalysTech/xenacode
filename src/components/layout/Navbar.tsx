'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo, ThemeSwitch, Button } from '@/components/ui';
import { navItems } from '@/data/navigation';
import { cn } from '@/lib/cn';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detectar si estamos sobre la sección Syntalys
      const syntalysSection = document.getElementById('syntalys');
      if (syntalysSection) {
        const rect = syntalysSection.getBoundingClientRect();
        const navbarHeight = 80;
        // El navbar está sobre Syntalys si la sección está en el viewport y el navbar la intersecta
        const isOver = rect.top <= navbarHeight && rect.bottom >= 0;
        setIsOverLightSection(isOver);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Determinar colores basados en si estamos sobre sección clara
  const textColor = isOverLightSection && !isScrolled
    ? 'text-[#172140]'
    : 'text-[var(--foreground)]';

  const menuIconColor = isOverLightSection && !isScrolled
    ? 'text-[#172140] hover:bg-white/20'
    : 'text-[var(--foreground)] hover:bg-[var(--background-secondary)]';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'bg-[var(--background)]/95 backdrop-blur-md shadow-lg shadow-[var(--card-shadow)]'
            : 'bg-transparent'
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo
              variant="horizontal"
              width={150}
              height={40}
              forceDark={isOverLightSection && !isScrolled}
            />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-medium',
                    'animated-underline',
                    'transition-colors',
                    textColor,
                    isOverLightSection && !isScrolled
                      ? 'hover:text-[#1d2c5e]'
                      : 'hover:text-[var(--primary)]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeSwitch forceDark={isOverLightSection && !isScrolled} />
              <Button
                size="sm"
                onClick={() => window.location.href = '#contacto'}
                className={cn(
                  isOverLightSection && !isScrolled && 'bg-[#172140] text-white hover:bg-[#1d2c5e]'
                )}
              >
                Contactar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-4">
              <ThemeSwitch forceDark={isOverLightSection && !isScrolled} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'p-2 rounded-lg',
                  'transition-colors',
                  menuIconColor
                )}
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          'bg-[var(--background)]',
          'transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-2xl font-semibold text-[var(--foreground)]',
                'transition-all duration-300',
                'hover:text-[var(--primary)]',
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Button
            size="lg"
            className={cn(
              'mt-4',
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: `${navItems.length * 50}ms` }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.location.href = '#contacto';
            }}
          >
            Contactar
          </Button>
        </div>
      </div>
    </>
  );
}
