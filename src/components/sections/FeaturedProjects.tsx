'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Lock, ExternalLink, Globe, Smartphone, Brain, Shield, Code, Database, Play, X } from 'lucide-react';
import { SectionTitle, AnimatedSection } from '@/components/ui';
import { getAllProjects } from '@/data/projects';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';

const typeIcons: Record<Project['type'], React.ReactNode> = {
  web: <Globe className="w-3.5 h-3.5" />,
  app: <Smartphone className="w-3.5 h-3.5" />,
  ia: <Brain className="w-3.5 h-3.5" />,
  saas: <Database className="w-3.5 h-3.5" />,
  software: <Code className="w-3.5 h-3.5" />,
  ciberseguridad: <Shield className="w-3.5 h-3.5" />,
};

const typeLabels: Record<Project['type'], string> = {
  web: 'Web',
  app: 'App',
  ia: 'IA',
  saas: 'SaaS',
  software: 'Software',
  ciberseguridad: 'Seguridad',
};

// Tarjeta de proyecto con estilo unificado
function ProjectCard({
  project,
  onImageClick,
}: {
  project: Project;
  onImageClick: (image: string, title: string) => void;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col h-full',
        'bg-[var(--card-bg)] rounded-2xl overflow-hidden',
        'border border-[var(--border)]',
        'shadow-lg shadow-[var(--card-shadow)]',
        'hover:shadow-xl hover:shadow-[var(--card-shadow)]',
        'hover:border-[var(--primary)]/50',
        'transition-all duration-300'
      )}
    >
      {/* Imagen - ocupa todo sin bordes */}
      <div className="relative w-full overflow-hidden">
        {project.confidential ? (
          <div className="aspect-video w-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
            <Lock className="w-12 h-12 text-[var(--background)] opacity-50" />
          </div>
        ) : project.image ? (
          <button
            onClick={() => onImageClick(project.image!, project.title)}
            className="w-full cursor-zoom-in block"
          >
            <div className="relative aspect-[1920/940] w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            {/* Overlay en hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
        ) : (
          <div className="aspect-video w-full bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background)] flex items-center justify-center">
            <Globe className="w-12 h-12 text-[var(--foreground-muted)] opacity-20" />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5">
        {/* Título y tipo en la misma línea */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-[var(--foreground)] line-clamp-1 flex-1">
            {project.title}
          </h3>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] shrink-0">
            {typeIcons[project.type]}
            {typeLabels[project.type]}
          </span>
        </div>

        <p className="text-sm text-[var(--foreground-muted)] mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={cn(
                'px-2 py-0.5 text-xs rounded-full',
                'bg-[var(--background-secondary)] text-[var(--foreground-muted)]',
                'border border-[var(--border)]'
              )}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-[var(--foreground-muted)]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-2 mt-auto">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg',
                'bg-[var(--primary)] text-[var(--background)]',
                'text-sm font-medium',
                'hover:opacity-90 transition-opacity'
              )}
            >
              Ver web
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg',
                'bg-[var(--background-secondary)] text-[var(--foreground)]',
                'border border-[var(--border)]',
                'text-sm font-medium',
                'hover:border-[var(--primary)] transition-colors'
              )}
            >
              Demo
              <Play className="w-3.5 h-3.5" />
            </a>
          )}
          {!project.url && !project.demoUrl && (
            <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--background-secondary)] text-[var(--foreground-muted)] text-sm">
              Proyecto privado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const projects = getAllProjects();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');

  const openLightbox = (image: string, title: string) => {
    setLightboxImage(image);
    setLightboxTitle(title);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    setLightboxTitle('');
    document.body.style.overflow = '';
  }, []);

  // Cerrar con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, closeLightbox]);

  return (
    <section id="proyectos" className="section-padding bg-[var(--background-secondary)]">
      <div className="container-custom">
        <SectionTitle
          title="Proyectos"
          subtitle="Una selección de trabajos que demuestran mi experiencia y versatilidad"
        />

        {/* Grid de proyectos - 2 columnas para que queden parejos */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.id}
              animation="fade-up"
              delay={index * 50}
            >
              <ProjectCard
                project={project}
                onImageClick={openLightbox}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Botón cerrar */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Título */}
          <div className="absolute top-4 left-4 text-white text-xl font-semibold">
            {lightboxTitle}
          </div>

          {/* Imagen */}
          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt={lightboxTitle}
              width={1920}
              height={1080}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            />
          </div>

          {/* Instrucción */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Pulsa fuera o ESC para cerrar
          </div>
        </div>
      )}
    </section>
  );
}
