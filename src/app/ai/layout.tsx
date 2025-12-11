import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XenaCodeAI | Chat IA Gratuito + Generación de Imágenes',
  description:
    'Chat de inteligencia artificial gratuito con generación de imágenes profesionales. Crea logos, diseños y obtén respuestas inteligentes. Powered by XenaCode.',
  keywords: [
    'chat ia gratis',
    'inteligencia artificial',
    'generador de imagenes',
    'crear logos',
    'chatgpt gratis',
    'dall-e',
    'ai chat',
    'generador de logos',
    'diseño con ia',
  ],
  openGraph: {
    title: 'XenaCodeAI | Chat IA Gratuito + Generación de Imágenes',
    description:
      'Chat de inteligencia artificial gratuito con generación de imágenes profesionales.',
    url: 'https://xenacode.com/ai',
    siteName: 'XenaCodeAI',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XenaCodeAI | Chat IA Gratis',
    description: 'Chat IA gratuito con generación de imágenes profesionales.',
  },
};

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
