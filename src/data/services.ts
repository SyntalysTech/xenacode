import type { Service } from '@/types';

// ============================================
// XENACODE - SERVICIOS
// ============================================

export const services: Service[] = [
  {
    id: 'desarrollo-web',
    title: 'Desarrollo Web',
    description: 'Creación de sitios web y aplicaciones web modernas, escalables y de alto rendimiento. Desde landing pages hasta plataformas complejas con arquitecturas robustas.',
    icon: 'Globe',
    features: [
      'Aplicaciones Next.js / React de alto rendimiento',
      'E-commerce con pasarelas de pago integradas',
      'Dashboards y paneles de administración',
      'APIs RESTful y GraphQL',
      'Optimización SEO técnico',
    ],
  },
  {
    id: 'inteligencia-artificial',
    title: 'Inteligencia Artificial',
    description: 'Implementación de soluciones de IA que transforman datos en decisiones inteligentes. Desde chatbots conversacionales hasta sistemas de análisis predictivo.',
    icon: 'Brain',
    features: [
      'Chatbots y asistentes virtuales con GPT',
      'Análisis predictivo y machine learning',
      'Procesamiento de lenguaje natural (NLP)',
      'Visión por computadora',
      'Automatización inteligente de procesos',
    ],
  },
  {
    id: 'ciberseguridad',
    title: 'Ciberseguridad',
    description: 'Protección integral de activos digitales con auditorías de seguridad, implementación de controles y respuesta a incidentes.',
    icon: 'Shield',
    features: [
      'Auditorías de seguridad y pentesting',
      'Implementación de arquitecturas seguras',
      'Gestión de vulnerabilidades',
      'Respuesta a incidentes',
      'Formación en seguridad para equipos',
    ],
  },
  {
    id: 'apps-moviles',
    title: 'Apps Móviles',
    description: 'Desarrollo de aplicaciones móviles nativas y multiplataforma con experiencias de usuario excepcionales.',
    icon: 'Smartphone',
    features: [
      'Apps iOS y Android nativas',
      'Apps multiplataforma con React Native / Flutter',
      'Integración con APIs y backends',
      'Push notifications y analytics',
      'Publicación en App Store y Google Play',
    ],
  },
  {
    id: 'software-medida',
    title: 'Software a Medida',
    description: 'Desarrollo de soluciones de software personalizadas que se adaptan perfectamente a los procesos y necesidades específicas de cada negocio.',
    icon: 'Code',
    features: [
      'Sistemas de gestión empresarial (ERP)',
      'CRM personalizados',
      'Automatización de procesos',
      'Integraciones con sistemas legacy',
      'Migración y modernización de sistemas',
    ],
  },
];

export const getServices = () => services;
export const getServiceById = (id: string) => services.find(s => s.id === id);
