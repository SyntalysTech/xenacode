import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Compressor | Comprime Imágenes Online Gratis',
  description:
    'Compresor de imágenes gratuito. Reduce el tamaño de tus fotos sin perder calidad visible. Procesamiento 100% local en tu navegador. Sin registro.',
  keywords: [
    'image compressor',
    'comprimir imagenes',
    'reducir tamaño fotos',
    'optimizar imagenes',
    'compress jpg png',
    'imagen mas ligera',
    'compressor gratis',
  ],
  openGraph: {
    title: 'Image Compressor | Herramienta Gratuita',
    description: 'Comprime imágenes sin perder calidad visible. 100% gratis y local.',
    url: 'https://xenacode.com/tools/image-compressor',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
