import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder Online Gratis - Codifica y Decodifica Base64',
  description:
    'Herramienta gratuita para codificar y decodificar Base64. Convierte texto, imágenes y archivos a Base64 y viceversa. Soporta UTF-8, descarga de archivos y preview de imágenes. Sin registro, sin límites, 100% en tu navegador.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'codificar base64',
    'decodificar base64',
    'imagen a base64',
    'base64 online',
    'base64 gratis',
    'convertir base64',
    'base64 converter',
    'texto a base64',
    'archivo a base64',
    'base64 to image',
    'decode base64',
    'encode base64',
    'base64 string',
    'data uri base64',
  ],
  openGraph: {
    title: 'Base64 Encoder/Decoder Online Gratis',
    description: 'Codifica y decodifica texto, imágenes y archivos en Base64. Soporta UTF-8. 100% gratis.',
    url: 'https://xenacode.com/tools/base64',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://xenacode.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Base64 Encoder/Decoder - XenaCode Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder/Decoder Gratis',
    description: 'Codifica y decodifica Base64 al instante. Sin registro.',
  },
  alternates: {
    canonical: 'https://xenacode.com/tools/base64',
  },
};

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
