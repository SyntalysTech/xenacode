import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compresor de Imágenes Online Gratis - Image Compressor',
  description:
    'Compresor de imágenes profesional y gratuito. Reduce el tamaño de tus fotos JPG, PNG y WebP hasta un 80% sin perder calidad visible. Procesamiento 100% local en tu navegador, privado y seguro. Sin registro, sin límites.',
  keywords: [
    'image compressor',
    'comprimir imagenes',
    'reducir tamaño fotos',
    'optimizar imagenes',
    'compress jpg png',
    'imagen mas ligera',
    'compressor gratis',
    'comprimir fotos online',
    'reducir peso imagen',
    'optimizar imagenes web',
    'comprimir jpg',
    'comprimir png',
    'comprimir webp',
    'image optimizer',
    'foto compressor',
    'reducir kb imagen',
  ],
  openGraph: {
    title: 'Compresor de Imágenes Online Gratis',
    description: 'Reduce el tamaño de tus imágenes hasta 80% sin perder calidad. 100% local y privado.',
    url: 'https://xenacode.com/tools/image-compressor',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://xenacode.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Compressor - XenaCode Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compresor de Imágenes Gratis',
    description: 'Comprime imágenes sin perder calidad. 100% local y privado.',
  },
  alternates: {
    canonical: 'https://xenacode.com/tools/image-compressor',
  },
};

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
