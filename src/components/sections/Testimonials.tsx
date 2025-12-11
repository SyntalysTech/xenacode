'use client';

import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { SectionTitle, AnimatedSection, StarRating } from '@/components/ui';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/cn';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.offsetWidth;
        const nextIndex = (currentIndex + 1) % testimonials.length;
        carouselRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const goTo = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Handle scroll snap detection
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < testimonials.length) {
        setCurrentIndex(newIndex);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
      }
    }
  };

  // Calculate average rating
  const avgRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section id="opiniones" className="section-padding bg-[var(--background)] relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          title="Opiniones de Clientes"
          subtitle="Lo que dicen quienes han trabajado conmigo"
        />

        {/* Trustpilot Badge */}
        <AnimatedSection animation="fade-up" className="text-center mb-8 sm:mb-12">
          <a
            href="https://es.trustpilot.com/review/syntalys.ch"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full',
              'bg-[var(--background-secondary)] border border-[var(--border)]',
              'hover:border-[var(--primary)] transition-all',
              'group text-sm sm:text-base'
            )}
          >
            <div className="flex items-center gap-0.5 sm:gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-green-500 text-green-500"
                />
              ))}
            </div>
            <span className="text-[var(--foreground)] font-semibold">{avgRating}/5</span>
            <span className="text-[var(--foreground-muted)] hidden sm:inline">en Trustpilot</span>
            <span className="text-[var(--foreground-muted)] sm:hidden text-xs">Trustpilot</span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--foreground-muted)] group-hover:text-[var(--primary)] transition-colors" />
          </a>
        </AnimatedSection>

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className={cn(
              'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide',
              'scroll-smooth'
            )}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 snap-center px-2 sm:px-4"
              >
                {/* Card with fixed height */}
                <div
                  className={cn(
                    'h-[320px] sm:h-[300px]',
                    'flex flex-col justify-between',
                    'p-6 sm:p-8 rounded-2xl',
                    'bg-[var(--card-bg)] border border-[var(--border)]',
                    'text-center'
                  )}
                >
                  <div>
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary)] opacity-20 mx-auto mb-4" />

                    {/* Text with line clamp */}
                    <p className="text-sm sm:text-base md:text-lg text-[var(--foreground)] leading-relaxed line-clamp-4">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-center mb-3">
                      <StarRating rating={testimonial.rating} size="lg" />
                    </div>

                    <h4 className="font-semibold text-[var(--foreground)] text-sm sm:text-base">
                      {testimonial.name}
                    </h4>
                    {testimonial.company && (
                      <p className="text-xs sm:text-sm text-[var(--foreground-muted)]">
                        {testimonial.company}
                      </p>
                    )}
                    {testimonial.date && (
                      <p className="text-xs text-[var(--primary)] mt-1">
                        {testimonial.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  'h-2 sm:h-3 rounded-full transition-all',
                  index === currentIndex
                    ? 'bg-[var(--primary)] w-6 sm:w-8'
                    : 'bg-[var(--border)] hover:bg-[var(--primary-light)] w-2 sm:w-3'
                )}
                aria-label={`Ir a opinión ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile swipe hint */}
        <p className="text-center text-xs text-[var(--foreground-muted)] mt-4 md:hidden">
          Desliza para ver más opiniones
        </p>
      </div>
    </section>
  );
}
