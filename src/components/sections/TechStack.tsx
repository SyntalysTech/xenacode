'use client';

import { SectionTitle, AnimatedSection } from '@/components/ui';
import { cn } from '@/lib/cn';

// React Icons - Iconos oficiales perfectos
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiExpress,
  SiBun,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiRedis,
  SiSupabase,
  SiGit,
  SiDocker,
  SiVercel,
  SiGithub,
  SiLinux,
  SiAmazonwebservices,
  SiOpenai,
  SiFigma,
  SiNotion,
  SiVite,
  SiFirebase,
  SiGraphql,
  SiSass,
  SiTrpc,
  SiZod,
  SiStripe,
  SiFramer,
  SiCloudflare,
  SiNpm,
} from 'react-icons/si';

import { TbBrandVscode } from 'react-icons/tb';

// Tipos para las tecnologías
interface Tech {
  name: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface TechRow {
  direction: 'left' | 'right';
  duration: number;
  techs: Tech[];
}

// Definición de tecnologías con sus iconos y colores reales
const techRows: TechRow[] = [
  // Fila 1 - Frontend & Frameworks
  {
    direction: 'left',
    duration: 30,
    techs: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', Icon: SiCss3, color: '#1572B6' },
      { name: 'Vite', Icon: SiVite, color: '#646CFF' },
      { name: 'Sass', Icon: SiSass, color: '#CC6699' },
      { name: 'Framer', Icon: SiFramer, color: '#0055FF' },
    ],
  },
  // Fila 2 - Backend & Databases
  {
    direction: 'right',
    duration: 35,
    techs: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'Express', Icon: SiExpress, color: '#ffffff' },
      { name: 'Bun', Icon: SiBun, color: '#FBF0DF' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'Prisma', Icon: SiPrisma, color: '#2D3748' },
      { name: 'Redis', Icon: SiRedis, color: '#DC382D' },
      { name: 'GraphQL', Icon: SiGraphql, color: '#E10098' },
      { name: 'tRPC', Icon: SiTrpc, color: '#2596BE' },
      { name: 'Zod', Icon: SiZod, color: '#3E67B1' },
    ],
  },
  // Fila 3 - DevOps & Tools
  {
    direction: 'left',
    duration: 40,
    techs: [
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Vercel', Icon: SiVercel, color: '#ffffff' },
      { name: 'GitHub', Icon: SiGithub, color: '#ffffff' },
      { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
      { name: 'AWS', Icon: SiAmazonwebservices, color: '#FF9900' },
      { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
      { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
      { name: 'Cloudflare', Icon: SiCloudflare, color: '#F38020' },
      { name: 'OpenAI', Icon: SiOpenai, color: '#412991' },
      { name: 'VS Code', Icon: TbBrandVscode, color: '#007ACC' },
      { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
      { name: 'Notion', Icon: SiNotion, color: '#ffffff' },
      { name: 'Stripe', Icon: SiStripe, color: '#635BFF' },
      { name: 'npm', Icon: SiNpm, color: '#CB3837' },
    ],
  },
];

// Componente de tarjeta de tecnología
function TechCard({ tech }: { tech: Tech }) {
  const { name, Icon, color } = tech;

  return (
    <div
      className={cn(
        'group flex items-center gap-3',
        'px-5 py-3',
        'rounded-full',
        'bg-[var(--card-bg)] border border-[var(--border)]',
        'hover:border-[var(--primary)]',
        'transition-all duration-300',
        'cursor-default select-none',
        'hover:shadow-lg hover:shadow-[var(--card-shadow)]',
        'shrink-0'
      )}
    >
      <Icon
        className="w-6 h-6"
        style={{ color }}
      />
      <span className="text-sm font-medium text-[var(--foreground)] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

// Componente de fila con marquee infinito sin saltos
function MarqueeRow({
  techs,
  direction,
  duration
}: {
  techs: Tech[];
  direction: 'left' | 'right';
  duration: number;
}) {
  // Duplicamos el array para tener suficiente contenido
  const allTechs = [...techs, ...techs];

  return (
    <div className="relative overflow-hidden py-2 group/marquee">
      {/* Gradientes de fade en los bordes */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      {/* Contenedor del marquee - usamos dos divs animados en paralelo */}
      <div className="flex">
        {/* Primera tira */}
        <div
          className={cn(
            'flex shrink-0',
            'group-hover/marquee:[animation-play-state:paused]'
          )}
          style={{
            animation: `${direction === 'left' ? 'marquee-scroll' : 'marquee-scroll-reverse'} ${duration}s linear infinite`,
          }}
        >
          {allTechs.map((tech, index) => (
            <div key={`a-${tech.name}-${index}`} className="pl-4 first:pl-0">
              <TechCard tech={tech} />
            </div>
          ))}
        </div>
        {/* Segunda tira idéntica para continuidad perfecta */}
        <div
          className={cn(
            'flex shrink-0',
            'group-hover/marquee:[animation-play-state:paused]'
          )}
          style={{
            animation: `${direction === 'left' ? 'marquee-scroll' : 'marquee-scroll-reverse'} ${duration}s linear infinite`,
          }}
        >
          {allTechs.map((tech, index) => (
            <div key={`b-${tech.name}-${index}`} className="pl-4">
              <TechCard tech={tech} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="tecnologias" className="section-padding bg-[var(--background)] overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title="Stack Tecnológico"
          subtitle="Las herramientas y tecnologías que domino para construir soluciones de calidad"
        />
      </div>

      <AnimatedSection animation="fade-up" delay={100}>
        <div className="mt-12 space-y-4">
          {techRows.map((row, index) => (
            <MarqueeRow
              key={index}
              techs={row.techs}
              direction={row.direction}
              duration={row.duration}
            />
          ))}
        </div>
      </AnimatedSection>

      {/* Texto adicional */}
      <div className="container-custom mt-12">
        <AnimatedSection animation="fade-up" delay={200}>
          <p className="text-center text-[var(--foreground-muted)] text-sm max-w-2xl mx-auto">
            Siempre aprendiendo y adaptándome a las últimas tecnologías para ofrecer las mejores soluciones
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
