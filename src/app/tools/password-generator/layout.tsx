import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator | Generador de Contraseñas Seguras Gratis',
  description:
    'Generador de contraseñas seguras y aleatorias. Crea contraseñas imposibles de hackear con opciones personalizables. Sin registro, sin límites.',
  keywords: [
    'password generator',
    'generador de contraseñas',
    'contraseña segura',
    'random password',
    'contraseña aleatoria',
    'strong password',
    'contraseñas gratis',
  ],
  openGraph: {
    title: 'Password Generator | Herramienta Gratuita',
    description: 'Genera contraseñas seguras e imposibles de hackear. 100% gratis.',
    url: 'https://xenacode.com/tools/password-generator',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
