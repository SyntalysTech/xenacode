'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useKeySound, useTheme } from '@/hooks';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import { Flame, AlertTriangle } from 'lucide-react';

const TECH_WORDS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'AI', 'API', 'Cloud',
  'Docker', 'Next.js', 'GraphQL', 'MongoDB', 'PostgreSQL', 'AWS',
  'Kubernetes', 'Redis', 'Git', 'CI/CD', 'REST', 'WebSocket', 'OAuth',
  'Tailwind', 'Prisma', 'Vercel', 'Linux', 'DevOps', 'Microservices',
  'Machine Learning', 'Blockchain', 'Rust', 'Go', 'Vue', 'Angular',
];

const SPAM_MESSAGES = [
  '¡Para, para, para! ¡Que me vas a quemar el servidor!',
  '¡Ey! ¿Qué te ha hecho mi pobre tecla?',
  '¡Cuidado! El servidor está echando humo...',
  '¡Tranquilo/a! No es un juego de clicker...',
  '¡AWS me va a cobrar un dineral como sigas así!',
];

interface FloatingWord {
  id: number;
  word: string;
  x: number;
  y: number;
  angle: number;
  scale: number;
}

interface KeyboardKeyProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLogo?: boolean;
}

export function KeyboardKey({ size = 'lg', className, showLogo = true }: KeyboardKeyProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);
  const [showSpamModal, setShowSpamModal] = useState(false);
  const [spamMessage, setSpamMessage] = useState('');
  const wordIdRef = useRef(0);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { playKeySound } = useKeySound();
  const { theme, mounted } = useTheme();

  // Limpiar timer al desmontar
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  const checkSpam = useCallback(() => {
    clickCountRef.current += 1;

    // Reset counter después de 2 segundos sin clicks
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);

    // Si hace más de 8 clicks en 2 segundos, mostrar modal
    if (clickCountRef.current >= 8) {
      const randomMessage = SPAM_MESSAGES[Math.floor(Math.random() * SPAM_MESSAGES.length)];
      setSpamMessage(randomMessage);
      setShowSpamModal(true);
      clickCountRef.current = 0;
      return true;
    }
    return false;
  }, []);

  const spawnWords = useCallback(() => {
    const numWords = 3; // Exactamente 3 palabras
    const newWords: FloatingWord[] = [];
    const usedWords: string[] = [];

    for (let i = 0; i < numWords; i++) {
      // Evitar palabras repetidas en el mismo click
      let randomWord: string;
      do {
        randomWord = TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)];
      } while (usedWords.includes(randomWord));
      usedWords.push(randomWord);

      // Distribuir en ángulos más separados (120° entre cada una)
      const baseAngle = (i * 120 + Math.random() * 40 - 20) * (Math.PI / 180);

      newWords.push({
        id: wordIdRef.current++,
        word: randomWord,
        x: Math.cos(baseAngle) * (100 + Math.random() * 50),
        y: Math.sin(baseAngle) * (100 + Math.random() * 50),
        angle: (Math.random() - 0.5) * 20,
        scale: 0.8 + Math.random() * 0.4,
      });
    }

    setFloatingWords(prev => [...prev, ...newWords]);

    // Eliminar palabras después de la animación (2s)
    setTimeout(() => {
      setFloatingWords(prev => prev.filter(w => !newWords.find(nw => nw.id === w.id)));
    }, 2000);
  }, []);

  const handleClick = useCallback(() => {
    if (showSpamModal) return;

    const isSpamming = checkSpam();
    if (isSpamming) return;

    setIsPressed(true);
    playKeySound();
    spawnWords();
    setTimeout(() => setIsPressed(false), 150);
  }, [playKeySound, spawnWords, checkSpam, showSpamModal]);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const logoSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  // Logo segun tema
  const logoSrc = mounted
    ? theme === 'dark'
      ? '/assets/logos/logo-isotope-dark-mode.png'
      : '/assets/logos/logo-isotope-light-mode.png'
    : '/assets/logos/logo-isotope-light-mode.png';

  return (
    <>
      <div className="relative">
        {/* Palabras flotantes */}
        {floatingWords.map((fw) => (
          <span
            key={fw.id}
            className="absolute left-1/2 top-1/2 pointer-events-none whitespace-nowrap font-mono font-semibold text-sm text-[var(--primary)] animate-float-word"
            style={{
              '--float-x': `${fw.x}px`,
              '--float-y': `${fw.y}px`,
              '--float-rotate': `${fw.angle}deg`,
              '--float-scale': fw.scale,
            } as React.CSSProperties}
          >
            {fw.word}
          </span>
        ))}

        <button
          onClick={handleClick}
          className={cn(
            'keyboard-key cursor-pointer select-none',
            'flex items-center justify-center',
            'active:scale-95',
            sizeClasses[size],
            isPressed && 'pressed',
            className
          )}
          aria-label="Tecla interactiva XenaCode"
        >
          {showLogo ? (
            <div className={cn('relative', logoSizeClasses[size])}>
              <Image
                key={`isotope-${theme}`}
                src={logoSrc}
                alt="XenaCode Isotope"
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <span className="text-[var(--foreground)] font-bold text-xl">X</span>
          )}
        </button>
      </div>

      {/* Modal de spam - Fullscreen con Portal */}
      {showSpamModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] animate-fade-in">
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/90" />

          {/* Contenido centrado */}
          <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
            <div className="animate-scale-in text-center max-w-sm w-full">
              {/* Icono animado */}
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center mx-auto animate-pulse">
                  <Flame className="w-12 h-12 sm:w-14 sm:h-14 text-orange-500 drop-shadow-lg" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-black" />
                </div>
              </div>

              {/* Texto */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                ¡Alerta de sobrecalentamiento!
              </h3>

              <p className="text-base sm:text-lg text-gray-300 mb-8 px-2">
                {spamMessage}
              </p>

              {/* Botón */}
              <button
                onClick={() => setShowSpamModal(false)}
                className={cn(
                  'px-8 py-4 rounded-2xl font-bold text-base sm:text-lg',
                  'bg-white text-gray-900',
                  'hover:bg-gray-100 active:scale-95',
                  'transition-all duration-200',
                  'shadow-xl hover:shadow-2xl'
                )}
              >
                Vale, me calmo 😅
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
