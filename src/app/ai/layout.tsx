import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XenaCodeAI - Chat IA Gratuito con Generación de Imágenes | ChatGPT Alternativa',
  description:
    'Chat de inteligencia artificial gratuito con generación de imágenes profesionales. Crea logos, diseños, ilustraciones y obtén respuestas inteligentes al instante. Alternativa gratuita a ChatGPT y DALL-E. Sin registro, sin límites.',
  keywords: [
    'chat ia gratis',
    'inteligencia artificial gratis',
    'generador de imagenes ia',
    'crear logos gratis',
    'chatgpt gratis',
    'chatgpt alternativa',
    'dall-e gratis',
    'ai chat free',
    'generador de logos ia',
    'diseño con ia',
    'chat gpt español',
    'ia generativa',
    'crear imagenes con ia',
    'asistente ia',
    'chatbot gratis',
    'ai image generator',
    'text to image',
    'ia conversacional',
  ],
  openGraph: {
    title: 'XenaCodeAI - Chat IA Gratuito con Generación de Imágenes',
    description: 'Chat de inteligencia artificial gratuito con generación de imágenes. Alternativa a ChatGPT y DALL-E. Sin registro.',
    url: 'https://xenacode.com/ai',
    siteName: 'XenaCodeAI',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://xenacode.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XenaCodeAI - Chat IA Gratuito',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XenaCodeAI | Chat IA Gratis + Generación de Imágenes',
    description: 'Chat IA gratuito con generación de imágenes. Alternativa a ChatGPT. Sin registro.',
  },
  alternates: {
    canonical: 'https://xenacode.com/ai',
  },
};

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
