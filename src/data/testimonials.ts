import type { Testimonial } from '@/types';

// ============================================
// XENACODE - TESTIMONIOS / OPINIONES REALES
// ============================================
// Fuente: https://es.trustpilot.com/review/syntalys.ch
// TrustScore: 4.2/5 - 6 opiniones - 100% 5 estrellas
// ============================================

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Lorien Villuendas Portao',
    rating: 5,
    text: 'Sinceramente, todavia estoy alucinando con lo que ha hecho la gente de SYNTALYS TECH. Llegue con una idea que era un cacao importante: crear una IA con personalidad propia, casi como una persona, y montar alrededor todo un sistema para que un "enjambre" de otras IAs pudiera instalarse y trabajar en empresas. Pues no solo es que pillaron la idea a la primera, es que la mejoraron! Se meten en el barro contigo, el trato es de 10, y van como un tiro. Si estas pensando en montar algo gordo con IA, no le des mas vueltas. Son unos cracks.',
    date: 'Septiembre 2025',
  },
  {
    id: 'testimonial-2',
    name: 'Nafe Akel',
    rating: 5,
    text: 'He quedado muy satisfecho con el trabajo realizado. Me han ayudado a desarrollar un software de IA y el resultado ha superado mis expectativas. El desarrollador se ha esforzado al maximo para que el proyecto se llevara a cabo de forma rapida y eficiente. La comunicacion ha sido muy sencilla, ya que trataba directamente con una sola persona que se encargaba de todo. En general, lo recomiendo muchisimo. Sin duda, uno de los mejores profesionales con los que he trabajado.',
    date: 'Septiembre 2025',
  },
  {
    id: 'testimonial-3',
    name: 'Diego Caro Sesma',
    rating: 5,
    text: 'Syntalys me ayudo a desarrollar una pagina web moderna con integracion de inteligencia artificial. Lo que mas destaco es que no solo ofrecen soluciones tecnicas de gran calidad, sino que tambien te acompanan en todo el proceso, haciendote sentir que tu proyecto es parte de ellos. Muy profesionales y totalmente recomendables.',
    date: 'Septiembre 2025',
  },
  {
    id: 'testimonial-4',
    name: 'vakano beats',
    rating: 5,
    text: 'Me hicieron la web para vender mis producciones musicales, todo ok buena gente.',
    date: 'Noviembre 2024',
  },
  {
    id: 'testimonial-5',
    name: 'Fran Perez Ordinas',
    rating: 5,
    text: 'Esta empresa es una maravilla, el compromiso es total, super rapido todo y super eficiente, muy encantado, repetiria con ellos una y mil veces.',
    date: 'Agosto 2025',
  },
  {
    id: 'testimonial-6',
    name: 'V GR',
    rating: 5,
    text: 'Muy profesionales y serios!',
    date: 'Agosto 2025',
  },
];

export const getTestimonials = () => testimonials;

// Datos de Trustpilot
export const trustpilotData = {
  score: 4.2,
  totalReviews: 6,
  fiveStars: 100,
  url: 'https://es.trustpilot.com/review/syntalys.ch',
};
