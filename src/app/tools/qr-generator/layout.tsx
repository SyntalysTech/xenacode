import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Generador de Códigos QR Online Gratis - QR Code Generator',
  description:
    'Generador de códigos QR profesional y gratuito. Crea QR para URLs, WiFi, contactos vCard, teléfonos, emails y texto. Personaliza colores, tamaño y descarga en PNG o SVG. Sin registro, sin límites.',
  keywords: [
    'qr code generator',
    'generador de qr',
    'crear qr',
    'qr wifi',
    'qr vcard',
    'qr gratis',
    'codigo qr online',
    'qr personalizado',
    'qr png svg',
    'crear codigo qr',
    'qr contacto',
    'qr url',
    'qr email',
    'generar qr gratis',
    'qr code maker',
    'qr generator free',
  ],
  openGraph: {
    title: 'Generador de Códigos QR Online Gratis',
    description: 'Crea códigos QR personalizados para URLs, WiFi, contactos y más. Descarga en PNG/SVG. 100% gratis.',
    url: 'https://xenacode.com/tools/qr-generator',
    siteName: 'XenaCode Tools',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://xenacode.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator - XenaCode Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Códigos QR Gratis',
    description: 'Crea QR personalizados para URLs, WiFi, contactos. Sin registro.',
  },
  alternates: {
    canonical: 'https://xenacode.com/tools/qr-generator',
  },
};

export default function QRGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
