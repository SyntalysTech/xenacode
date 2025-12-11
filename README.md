# XenaCode - Web Oficial

Web oficial de XenaCode, Programador Full Stack Senior con 12 años de experiencia.

## Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Estilos**: TailwindCSS 4
- **Lenguaje**: TypeScript
- **Animaciones**: GSAP, Framer Motion
- **APIs**: OpenAI GPT-4o-mini
- **Email**: Nodemailer

## Inicio Rápido

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

\`\`\`
src/
├── app/                    # Rutas y páginas (App Router)
│   ├── api/               # API Routes
│   │   ├── contact/       # API de contacto (emails)
│   │   └── ai-suggest/    # API de sugerencias con IA
│   ├── proyectos/         # Página de todos los proyectos
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Home
│   └── globals.css        # Estilos globales
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Hero, Services, Projects, etc.
│   └── ui/                # Componentes reutilizables
├── data/                  # Datos estáticos (proyectos, testimonios)
├── hooks/                 # Custom hooks (useTheme, useKeySound)
├── lib/                   # Utilidades
└── types/                 # Tipos TypeScript

public/
├── assets/
│   ├── logos/             # Logos XenaCode (4 variantes)
│   └── images/            # Imágenes de proyectos
└── sounds/
    └── key-click.mp3      # Sonido de tecla (PENDIENTE)
\`\`\`

## Configuración

### Variables de Entorno

Crea un archivo \`.env.local\` con:

\`\`\`env
# OpenAI API Key
OPENAI_API_KEY=tu-api-key

# SMTP para emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
EMAIL_TO=destino@email.com

# URL del sitio
NEXT_PUBLIC_SITE_URL=https://xenacode.com
\`\`\`

### Logos

Coloca tus 4 logos en \`public/assets/logos/\`:
- \`logo-horizontal-light-mode.png\`
- \`logo-horizontal-dark-mode.png\`
- \`logo-isotope-light-mode.png\`
- \`logo-isotope-dark-mode.png\`

### Sonido de Tecla

Añade el archivo de audio en:
- \`public/sounds/key-click.mp3\`

## Personalización

### Proyectos

Edita \`src/data/projects.ts\` para añadir tus proyectos reales.

### Testimonios

Edita \`src/data/testimonials.ts\` con opiniones reales de Trustpilot.

### Colores

La paleta está definida en \`src/app/globals.css\`:
- Light Mode: Fondo #ffffff, Texto #1d2c5e
- Dark Mode: Fondo #172140, Texto #ffffff

## Despliegue en Vercel

1. Sube el código a GitHub
2. Importa el repositorio en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Listo! Vercel desplegará automáticamente

## Características

- Diseño responsive (mobile-first)
- Tema claro/oscuro con switch animado
- Tecla isotope interactiva con sonido
- Animaciones suaves con GSAP
- Formulario de contacto con validación
- Sugerencias de IA con OpenAI
- SEO optimizado
- Carrusel de testimonios
- Filtro de proyectos por tipo
- Soporte para proyectos confidenciales

## Licencia

Código propietario de XenaCode.
