import type { Project } from '@/types';

// ============================================
// XENACODE - PROYECTOS (ordenados por importancia)
// ============================================

export const projects: Project[] = [
  // === TIER 1: Proyectos propios y más importantes ===

  {
    id: 'proyecto-syntalys',
    title: 'SYNTALYS TECH',
    description: 'Web corporativa de mi empresa en Suiza. IA, desarrollo a medida y ciberseguridad.',
    type: 'web',
    url: 'https://syntalys.ch',
    image: '/assets/images/proyectos/syntalys.png',
    tags: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    featured: true,
  },

  {
    id: 'proyecto-m2protocol',
    title: 'M2 Protocol',
    description: 'Infraestructura blockchain M2M. Arquitectura distribuida, tokens y gobernanza descentralizada.',
    type: 'web',
    url: 'https://m2protocol.net',
    image: '/assets/images/proyectos/m2protocol.png',
    tags: ['Next.js', 'Blockchain', 'Web3', 'IoT'],
    featured: true,
  },

  {
    id: 'proyecto-equitia',
    title: 'EQUITIA',
    description: 'Socio tecnológico de startups españolas. Desarrollo MVPs a cambio de equity.',
    type: 'saas',
    url: 'https://equitia.es',
    image: '/assets/images/proyectos/equitia.png',
    tags: ['Next.js', 'React', 'TypeScript', 'Startup'],
    featured: true,
  },

  {
    id: 'proyecto-peluditos',
    title: 'Peluditos CRM',
    description: 'CRM para clínicas veterinarias. Gestión de pacientes, citas y facturación.',
    type: 'saas',
    url: 'https://peluditos.eu',
    demoUrl: 'https://peluditos.eu/demo',
    image: '/assets/images/proyectos/peluditos.png',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'SaaS'],
    featured: true,
  },

  // === TIER 2: Proyectos de clientes importantes ===

  {
    id: 'proyecto-cerecilla',
    title: 'Cerecilla',
    description: 'Comparador de energía, telefonía y seguros. +20 compañías colaboradoras.',
    type: 'web',
    url: 'https://cerecilla.com',
    image: '/assets/images/proyectos/cerecilla.png',
    tags: ['Next.js', 'React', 'TypeScript', 'Comparador'],
    featured: true,
  },

  {
    id: 'proyecto-finybuddy',
    title: 'FinyBuddy',
    description: 'Asistente de finanzas personales. Regla 50/30/20 y metas de ahorro.',
    type: 'saas',
    image: '/assets/images/proyectos/finybuddy.png',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Fintech'],
    featured: true,
  },

  // === TIER 3: Webs para clientes ===

  {
    id: 'proyecto-aucoeurduqi',
    title: 'Au Coeur du Qi',
    description: 'Plataforma de Qi-Gong. Cursos, horarios e inscripciones online.',
    type: 'web',
    url: 'https://aucoeurduqi.ch',
    image: '/assets/images/proyectos/aucoeurduqi.png',
    tags: ['Next.js', 'React', 'TypeScript'],
    featured: true,
  },

  {
    id: 'proyecto-mariellegoffinet',
    title: "L'Essentiel",
    description: 'Web de bienestar. Sistema de reservas y tienda de productos naturales.',
    type: 'web',
    url: 'https://marielleessentiel.ch',
    image: '/assets/images/proyectos/mariellegoffinet.png',
    tags: ['Next.js', 'React', 'E-commerce'],
    featured: true,
  },

  {
    id: 'proyecto-valeriesylvestre',
    title: 'Valérie Sylvestre',
    description: 'Web de servicios energéticos. Blog, contacto y donaciones.',
    type: 'web',
    url: 'https://valeriesylvestre.com',
    image: '/assets/images/proyectos/valeriesylvestre.png',
    tags: ['Next.js', 'React', 'Blog'],
    featured: true,
  },

  {
    id: 'proyecto-martin-inmobiliaria',
    title: 'Martin Inmobiliaria',
    description: 'Landings para agencia inmobiliaria. Galería y formularios de visita.',
    type: 'web',
    image: '/assets/images/proyectos/martin-inmobiliaria.png',
    tags: ['Next.js', 'React', 'Inmobiliaria'],
    featured: true,
  },
];

// Obtener todos los proyectos
export const getAllProjects = () => projects.filter(p => p.featured);

// Obtener proyecto por ID
export const getProjectById = (id: string) => projects.find(p => p.id === id);
