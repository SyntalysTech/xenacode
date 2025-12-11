import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar, Footer } from '@/components/layout';
import { ClientProviders } from '@/components/providers';
import { ChatBot } from '@/components/ChatBot';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ============================================
// XENACODE - METADATA SEO
// ============================================
// [ACTUALIZA CON TU INFORMACION REAL]
// ============================================

export const metadata: Metadata = {
  title: {
    default: 'XenaCode | Programador Full Stack Senior',
    template: '%s | XenaCode',
  },
  description:
    'Desarrollo de webs, inteligencia artificial, ciberseguridad, apps y software a medida. 12 años de experiencia como Full Stack Senior en España. Empresa asociada SYNTALYS TECH en Suiza.',
  keywords: [
    'programador full stack',
    'desarrollo web',
    'inteligencia artificial',
    'ciberseguridad',
    'apps moviles',
    'software a medida',
    'desarrollador senior',
    'Next.js',
    'React',
    'TypeScript',
    'España',
    'Suiza',
  ],
  authors: [{ name: 'XenaCode' }],
  creator: 'XenaCode',
  publisher: 'XenaCode',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://xenacode.com',
    siteName: 'XenaCode',
    title: 'XenaCode | Programador Full Stack Senior',
    description:
      'Desarrollo de webs, IA, ciberseguridad, apps y software a medida. 12 años de experiencia.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XenaCode - Full Stack Senior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XenaCode | Programador Full Stack Senior',
    description:
      'Desarrollo de webs, IA, ciberseguridad, apps y software a medida.',
    images: ['/og-image.png'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('xenacode-theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatBot />
        </ClientProviders>
      </body>
    </html>
  );
}
