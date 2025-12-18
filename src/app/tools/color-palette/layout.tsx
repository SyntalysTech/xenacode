import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Generador de Paletas de Colores Online Gratis - Color Palette Generator',
  description:
    'Generador de paletas de colores profesional y gratuito. Crea combinaciones armónicas, complementarias, análogas y triádicas para diseño web, branding y UI/UX. Exporta en CSS, SCSS, Tailwind y más. Sin registro.',
  keywords: [
    'color palette generator',
    'generador de paletas',
    'paleta de colores',
    'combinación de colores',
    'diseño web colores',
    'color scheme',
    'colores gratis',
    'paleta colores online',
    'color picker',
    'selector de colores',
    'colores complementarios',
    'colores armónicos',
    'hex colors',
    'rgb colors',
    'tailwind colors',
    'css colors',
  ],
  openGraph: {
    title: 'Generador de Paletas de Colores Online Gratis',
    description: 'Crea paletas de colores profesionales para diseño web y branding. Exporta en CSS, SCSS, Tailwind. 100% gratis.',
    url: 'https://xenacode.com/tools/color-palette',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://xenacode.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Color Palette Generator - XenaCode Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Paletas de Colores Gratis',
    description: 'Crea paletas de colores armónicas para tus proyectos. Sin registro.',
  },
  alternates: {
    canonical: 'https://xenacode.com/tools/color-palette',
  },
};

export default function ColorPaletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
