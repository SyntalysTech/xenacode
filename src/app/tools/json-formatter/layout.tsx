import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter Online Gratis - Formatea, Valida y Minifica JSON',
  description:
    'Herramienta gratuita para formatear, validar y minificar JSON online. Editor JSON profesional con indentación personalizable, detección de errores en tiempo real y sintaxis coloreada. Sin registro, sin límites, 100% en tu navegador.',
  keywords: [
    'json formatter',
    'json formatter online',
    'formatear json',
    'validar json',
    'json online',
    'minificar json',
    'json beautifier',
    'json gratis',
    'json validator',
    'json editor online',
    'pretty print json',
    'json parser',
    'herramienta json',
    'json a texto',
  ],
  openGraph: {
    title: 'JSON Formatter Online Gratis - Formatea y Valida JSON',
    description: 'Formatea, valida y minifica tu JSON al instante. Editor profesional con indentación personalizable. 100% gratis y privado.',
    url: 'https://xenacode.com/tools/json-formatter',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://xenacode.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSON Formatter Online - XenaCode Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter Online Gratis',
    description: 'Formatea, valida y minifica JSON al instante. Sin registro.',
  },
  alternates: {
    canonical: 'https://xenacode.com/tools/json-formatter',
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
