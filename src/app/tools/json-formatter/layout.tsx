import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter | Formatea y Valida JSON Online Gratis',
  description:
    'Herramienta gratuita para formatear, validar y minificar JSON online. Sin registro, sin límites. Formatea tu JSON con indentación legible al instante.',
  keywords: [
    'json formatter',
    'formatear json',
    'validar json',
    'json online',
    'minificar json',
    'json beautifier',
    'json gratis',
  ],
  openGraph: {
    title: 'JSON Formatter | Herramienta Gratuita',
    description: 'Formatea, valida y minifica tu JSON al instante. 100% gratis.',
    url: 'https://xenacode.com/tools/json-formatter',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
