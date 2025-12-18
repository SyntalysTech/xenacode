import type { Metadata, Viewport } from 'next';
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
// XENACODE - METADATA SEO COMPLETO
// ============================================

const siteConfig = {
  name: 'XenaCode',
  url: 'https://xenacode.com',
  ogImage: 'https://xenacode.com/og-image.png',
  description:
    'Programador Full Stack Senior con 12+ años de experiencia. Desarrollo web, aplicaciones móviles, inteligencia artificial, ciberseguridad y software a medida. Especialista en React, Next.js, TypeScript, Python y más. Disponible para proyectos freelance en España e internacional.',
  author: 'XenaCode',
  email: 'contacto@xenacode.com',
  location: 'España',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'XenaCode | Programador Full Stack Senior - Desarrollo Web, IA y Apps',
    template: '%s | XenaCode',
  },
  description: siteConfig.description,
  keywords: [
    // Servicios principales
    'programador full stack',
    'desarrollador web senior',
    'desarrollo web profesional',
    'desarrollo aplicaciones móviles',
    'desarrollo software a medida',
    'inteligencia artificial',
    'machine learning',
    'ciberseguridad',
    'consultoría tecnológica',
    // Tecnologías
    'React developer',
    'Next.js developer',
    'TypeScript',
    'Node.js',
    'Python',
    'JavaScript',
    'TailwindCSS',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'Docker',
    // Ubicación
    'programador España',
    'desarrollador freelance',
    'freelance developer Spain',
    'desarrollador remoto',
    // Especialidades
    'aplicaciones web',
    'e-commerce',
    'SaaS',
    'API REST',
    'GraphQL',
    'responsive design',
    'UI/UX',
    'landing pages',
    'SEO',
    // Long tail
    'contratar programador senior',
    'desarrollador web freelance España',
    'crear aplicación web',
    'desarrollo web moderno',
    'programador React España',
  ],
  authors: [
    { name: siteConfig.author, url: siteConfig.url },
  ],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'XenaCode | Programador Full Stack Senior - Desarrollo Web, IA y Apps',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'XenaCode - Programador Full Stack Senior | Desarrollo Web, IA, Apps y Software',
        type: 'image/png',
      },
      {
        url: '/og-image-square.png',
        width: 600,
        height: 600,
        alt: 'XenaCode Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@xenacode_dev',
    creator: '@xenacode_dev',
    title: 'XenaCode | Programador Full Stack Senior',
    description: 'Desarrollo web, IA, apps y software a medida. +12 años de experiencia. React, Next.js, TypeScript, Python.',
    images: {
      url: siteConfig.ogImage,
      alt: 'XenaCode - Full Stack Senior Developer',
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  verification: {
    // Añade tus códigos de verificación aquí
    // google: 'tu-codigo-google-search-console',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'es-ES': siteConfig.url,
      'en-US': `${siteConfig.url}/en`,
    },
  },
  category: 'technology',
  classification: 'Software Development, Web Development, IT Services',
  referrer: 'origin-when-cross-origin',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'XenaCode',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#172140',
    'msapplication-config': '/browserconfig.xml',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: {
        '@id': `${siteConfig.url}/#person`,
      },
      inLanguage: 'es-ES',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: 'XenaCode',
      url: siteConfig.url,
      image: {
        '@type': 'ImageObject',
        '@id': `${siteConfig.url}/#logo`,
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        caption: 'XenaCode - Programador Full Stack Senior',
      },
      description: siteConfig.description,
      sameAs: [
        'https://github.com/xenacode',
        'https://linkedin.com/in/xenacode',
        'https://twitter.com/xenacode_dev',
      ],
      jobTitle: 'Programador Full Stack Senior',
      worksFor: {
        '@type': 'Organization',
        name: 'Syntalys Tech',
        url: 'https://syntalys.com',
      },
      knowsAbout: [
        'Desarrollo Web',
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'Python',
        'Inteligencia Artificial',
        'Machine Learning',
        'Ciberseguridad',
        'Desarrollo de Apps',
        'AWS',
        'Docker',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ES',
        addressRegion: 'España',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/assets/logos/logo-horizontal-dark-mode.png`,
        width: 200,
        height: 60,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: siteConfig.email,
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English'],
      },
      sameAs: [
        'https://github.com/xenacode',
        'https://linkedin.com/in/xenacode',
        'https://twitter.com/xenacode_dev',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteConfig.url}/#service`,
      name: 'XenaCode - Servicios de Desarrollo',
      url: siteConfig.url,
      description: 'Servicios profesionales de desarrollo web, aplicaciones móviles, inteligencia artificial y software a medida.',
      provider: {
        '@id': `${siteConfig.url}/#person`,
      },
      areaServed: {
        '@type': 'Place',
        name: 'Mundial',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Desarrollo',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desarrollo Web',
              description: 'Desarrollo de sitios web y aplicaciones web modernas con React, Next.js y más.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desarrollo de Apps',
              description: 'Aplicaciones móviles nativas e híbridas para iOS y Android.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Inteligencia Artificial',
              description: 'Soluciones de IA, machine learning y automatización inteligente.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Ciberseguridad',
              description: 'Auditorías de seguridad, pentesting y protección de sistemas.',
            },
          },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteConfig.url}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteConfig.url,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Theme Script */}
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
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
