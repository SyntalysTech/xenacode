import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Palette Generator | Genera Paletas de Colores Gratis',
  description:
    'Generador de paletas de colores gratuito. Crea combinaciones armónicas para diseño web, branding y UI/UX. Sin registro, sin límites.',
  keywords: [
    'color palette generator',
    'generador de paletas',
    'paleta de colores',
    'combinación de colores',
    'diseño web colores',
    'color scheme',
    'colores gratis',
  ],
  openGraph: {
    title: 'Color Palette Generator | Herramienta Gratuita',
    description: 'Genera paletas de colores armónicas para tus diseños. 100% gratis.',
    url: 'https://xenacode.com/tools/color-palette',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function ColorPaletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
