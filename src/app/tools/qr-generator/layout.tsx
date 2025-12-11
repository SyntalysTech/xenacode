import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Generator | Genera Códigos QR Gratis',
  description:
    'Generador de códigos QR gratuito. Crea QR para URLs, WiFi, contactos, teléfonos y más. Personaliza colores y descarga en PNG o SVG. Sin registro.',
  keywords: [
    'qr code generator',
    'generador de qr',
    'crear qr',
    'qr wifi',
    'qr vcard',
    'qr gratis',
    'codigo qr online',
  ],
  openGraph: {
    title: 'QR Code Generator | Herramienta Gratuita',
    description: 'Genera códigos QR personalizados en segundos. 100% gratis.',
    url: 'https://xenacode.com/tools/qr-generator',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function QRGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
