// ============================================
// XENACODE - TIPOS TYPESCRIPT
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'web' | 'app' | 'ia' | 'saas' | 'software' | 'ciberseguridad';
  // URL externa del proyecto (opcional - algunos proyectos son confidenciales)
  url?: string;
  // URL secundaria (ej: demo, documentación, etc.)
  demoUrl?: string;
  // Imagen/screenshot del proyecto (ruta desde /public/)
  image?: string;
  // Video del proyecto (ruta relativa o URL de embed)
  video?: string;
  // Tags/tecnologías usadas
  tags: string[];
  // Si el proyecto es destacado (aparece en home)
  featured?: boolean;
  // Si el proyecto es confidencial (no tiene URL ni imagen pública)
  confidential?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  // Empresa o rol del cliente
  company?: string;
  // Rating de 1 a 5 estrellas
  rating: 1 | 2 | 3 | 4 | 5;
  // Texto de la opinión
  text: string;
  // Avatar del cliente (opcional)
  avatar?: string;
  // Fecha de la opinión
  date?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  // Icono del servicio (nombre de Lucide icon)
  icon: string;
  // Features destacadas del servicio
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export type Theme = 'light' | 'dark';
