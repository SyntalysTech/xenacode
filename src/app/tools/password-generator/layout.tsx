import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Generador de Contraseñas Seguras Online Gratis - Password Generator',
  description:
    'Generador de contraseñas seguras y aleatorias. Crea contraseñas imposibles de hackear con opciones personalizables: longitud, mayúsculas, números, símbolos. 100% local en tu navegador, privado y seguro. Sin registro, sin límites.',
  keywords: [
    'password generator',
    'generador de contraseñas',
    'contraseña segura',
    'random password',
    'contraseña aleatoria',
    'strong password',
    'contraseñas gratis',
    'crear contraseña',
    'contraseña fuerte',
    'generador password',
    'contraseña random',
    'secure password',
    'password maker',
    'generar clave',
    'contraseña robusta',
    'password strength',
  ],
  openGraph: {
    title: 'Generador de Contraseñas Seguras Online Gratis',
    description: 'Crea contraseñas seguras e imposibles de hackear. Personalizable y 100% privado.',
    url: 'https://xenacode.com/tools/password-generator',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://xenacode.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Password Generator - XenaCode Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Contraseñas Seguras Gratis',
    description: 'Crea contraseñas imposibles de hackear. 100% privado.',
  },
  alternates: {
    canonical: 'https://xenacode.com/tools/password-generator',
  },
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
