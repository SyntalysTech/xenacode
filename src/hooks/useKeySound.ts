'use client';

import { useCallback, useRef } from 'react';

export function useKeySound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playKeySound = useCallback(() => {
    // Crear o reutilizar elemento de audio
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/key-sound.wav');
      audioRef.current.volume = 0.5;
    }
    
    // Reiniciar y reproducir
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Silenciar error si el usuario no ha interactuado aún
      console.log('Audio play prevented by browser policy');
    });
  }, []);

  return { playKeySound };
}
