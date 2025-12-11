import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder | Codifica y Decodifica Base64 Gratis',
  description:
    'Herramienta gratuita para codificar y decodificar Base64. Convierte texto, imágenes y archivos a Base64 y viceversa. Sin registro.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'codificar base64',
    'decodificar base64',
    'imagen a base64',
    'base64 online',
    'base64 gratis',
  ],
  openGraph: {
    title: 'Base64 Encoder/Decoder | Herramienta Gratuita',
    description: 'Codifica y decodifica texto o archivos en Base64. 100% gratis.',
    url: 'https://xenacode.com/tools/base64',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
