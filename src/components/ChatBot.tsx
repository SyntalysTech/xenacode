'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { X, Send, Mail } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useThemeContext } from '@/context/ThemeContext';

// Información sobre XenaCode para el chatbot
const XENACODE_INFO = {
  nombre: 'XenaCode',
  experiencia: '12 años',
  ubicacion: 'Suiza (SYNTALYS TECH)',
  email: 'hello@xenacode.com',
  servicios: [
    {
      nombre: 'Desarrollo Web',
      descripcion: 'Sitios web y aplicaciones web modernas con Next.js, React, TypeScript. Landing pages, e-commerce, dashboards, APIs RESTful y GraphQL.',
    },
    {
      nombre: 'Inteligencia Artificial',
      descripcion: 'Chatbots con GPT, análisis predictivo, machine learning, procesamiento de lenguaje natural, visión por computadora, automatización inteligente.',
    },
    {
      nombre: 'Ciberseguridad',
      descripcion: 'Auditorías de seguridad, pentesting, arquitecturas seguras, gestión de vulnerabilidades, respuesta a incidentes.',
    },
    {
      nombre: 'Apps Móviles',
      descripcion: 'Aplicaciones iOS y Android nativas, apps multiplataforma con React Native/Flutter, integración con APIs.',
    },
    {
      nombre: 'Software a Medida',
      descripcion: 'Sistemas ERP, CRM personalizados, automatización de procesos, integraciones con sistemas legacy.',
    },
  ],
  empresa: {
    nombre: 'SYNTALYS TECH',
    ubicacion: '2915 Bure, Suiza',
    descripcion: 'Empresa suiza especializada en IA, automatización y ciberseguridad.',
  },
};

// Respuestas predefinidas del chatbot
function getBotResponse(message: string): string {
  const msg = message.toLowerCase();

  // Saludos
  if (msg.match(/^(hola|hey|buenas|saludos|hi|hello)/)) {
    return '¡Hola! Soy el asistente virtual de XenaCode. ¿En qué puedo ayudarte? Puedo informarte sobre nuestros servicios de desarrollo web, IA, ciberseguridad, apps móviles o software a medida.';
  }

  // Precios
  if (msg.match(/(precio|costo|cuanto|tarifa|presupuesto|cobr)/)) {
    return 'Los precios varían según el proyecto, ya que cada caso es único. Te recomiendo contactar directamente para obtener un presupuesto personalizado. Puedes escribir a hello@xenacode.com o usar el formulario de contacto en la web.';
  }

  // Servicios generales
  if (msg.match(/(servicio|ofrec|hac|trabaj)/)) {
    return `Ofrezco 5 servicios principales:\n\n• **Desarrollo Web** - Apps con Next.js, React, e-commerce, dashboards\n• **Inteligencia Artificial** - Chatbots, ML, automatización\n• **Ciberseguridad** - Auditorías, pentesting, protección\n• **Apps Móviles** - iOS, Android, React Native\n• **Software a Medida** - ERPs, CRMs, integraciones\n\n¿Sobre cuál te gustaría saber más?`;
  }

  // Desarrollo Web
  if (msg.match(/(web|pagina|sitio|landing|ecommerce|tienda online|next|react)/)) {
    return 'En **Desarrollo Web** creo aplicaciones modernas con Next.js y React. Incluye:\n\n• Landing pages y webs corporativas\n• E-commerce con pasarelas de pago\n• Dashboards y paneles admin\n• APIs RESTful y GraphQL\n• Optimización SEO\n\nPara un presupuesto, contacta en hello@xenacode.com';
  }

  // IA
  if (msg.match(/(ia|inteligencia artificial|chatbot|gpt|machine learning|ml|automatiz)/)) {
    return 'En **Inteligencia Artificial** implemento:\n\n• Chatbots y asistentes con GPT\n• Análisis predictivo y ML\n• Procesamiento de lenguaje natural\n• Visión por computadora\n• Automatización inteligente\n\nCada proyecto de IA es único. Contacta para discutir tu caso: hello@xenacode.com';
  }

  // Ciberseguridad
  if (msg.match(/(seguridad|ciber|hack|pentest|audit|vulnerab|proteg)/)) {
    return 'En **Ciberseguridad** ofrezco:\n\n• Auditorías de seguridad y pentesting\n• Arquitecturas seguras\n• Gestión de vulnerabilidades\n• Respuesta a incidentes\n• Formación para equipos\n\nLa seguridad es crítica. Contacta para una evaluación: hello@xenacode.com';
  }

  // Apps móviles
  if (msg.match(/(app|movil|android|ios|mobile|flutter|react native)/)) {
    return 'En **Apps Móviles** desarrollo:\n\n• Apps iOS y Android nativas\n• Apps multiplataforma (React Native/Flutter)\n• Integración con APIs\n• Push notifications\n• Publicación en stores\n\nPara un presupuesto de tu app: hello@xenacode.com';
  }

  // Software a medida
  if (msg.match(/(software|erp|crm|sistema|medida|personaliz|integra)/)) {
    return 'En **Software a Medida** creo:\n\n• Sistemas ERP empresariales\n• CRMs personalizados\n• Automatización de procesos\n• Integraciones con sistemas legacy\n• Modernización de sistemas\n\nCuéntame tu caso: hello@xenacode.com';
  }

  // Experiencia
  if (msg.match(/(experiencia|años|tiempo|trayectoria|portfolio|proyect)/)) {
    return 'Tengo **12 años de experiencia** como desarrollador Full Stack Senior. He trabajado en proyectos de todo tipo, desde startups hasta empresas consolidadas. Puedes ver algunos proyectos en la sección "Proyectos" de la web.';
  }

  // Contacto
  if (msg.match(/(contacto|contactar|email|correo|hablar|reunión|llamar)/)) {
    return 'Puedes contactarme de varias formas:\n\n• **Email:** hello@xenacode.com\n• **Formulario:** Sección Contacto en la web\n• **SYNTALYS TECH:** hello@syntalys.ch\n\nEstaré encantado de discutir tu proyecto.';
  }

  // Syntalys
  if (msg.match(/(syntalys|suiza|empresa|asociad)/)) {
    return '**SYNTALYS TECH** es mi empresa asociada en Suiza, ubicada en Bure. Está especializada en desarrollo de soluciones de IA, automatización y ciberseguridad para empresas europeas. Web: syntalys.ch';
  }

  // Tecnologías
  if (msg.match(/(tecnolog|stack|herramienta|lenguaje|framework)/)) {
    return 'Trabajo con tecnologías modernas:\n\n• **Frontend:** React, Next.js, TypeScript, Tailwind\n• **Backend:** Node.js, Python, Express, Bun\n• **DB:** PostgreSQL, MongoDB, Redis, Prisma\n• **Cloud:** Vercel, AWS, Docker, Supabase\n• **IA:** OpenAI, LangChain\n\nY muchas más según el proyecto.';
  }

  // Gracias / Despedida
  if (msg.match(/(gracias|adios|hasta luego|bye|chao)/)) {
    return '¡De nada! Si tienes más preguntas, aquí estaré. Para proyectos específicos, no dudes en contactar a hello@xenacode.com. ¡Hasta pronto!';
  }

  // Respuesta por defecto
  return 'No estoy seguro de entender tu pregunta. Puedo ayudarte con información sobre:\n\n• Servicios (web, IA, seguridad, apps, software)\n• Experiencia y proyectos\n• Contacto y presupuestos\n• Tecnologías que uso\n\n¿Qué te gustaría saber?';
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy el asistente de XenaCode. ¿En qué puedo ayudarte? Pregúntame sobre servicios, proyectos o cómo contactar.',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useThemeContext();

  // Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus en input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simular respuesta del bot con delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(userMessage.text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // No mostrar en la página de XenaCodeAI
  if (pathname?.startsWith('/ai')) {
    return null;
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'w-14 h-14 rounded-full',
          'flex items-center justify-center',
          'shadow-lg hover:shadow-xl',
          'transition-all duration-300',
          'hover:scale-110',
          isOpen && 'rotate-90'
        )}
        style={{
          background: 'var(--primary)',
        }}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" style={{ color: 'var(--background)' }} />
        ) : (
          <Image
            src={theme === 'dark' ? '/assets/logos/logo-isotope-light-mode.png' : '/assets/logos/logo-isotope-dark-mode.png'}
            alt="Chat"
            width={32}
            height={32}
            className="object-contain"
          />
        )}
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-24 right-6 z-50',
            'w-[350px] sm:w-[400px] h-[500px]',
            'rounded-2xl overflow-hidden',
            'shadow-2xl',
            'flex flex-col',
            'animate-fade-in-up'
          )}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center gap-3"
            style={{
              background: 'var(--primary)',
              color: 'var(--background)',
            }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Image
                src={theme === 'dark' ? '/assets/logos/logo-isotope-light-mode.png' : '/assets/logos/logo-isotope-dark-mode.png'}
                alt="XenaCode"
                width={24}
                height={24}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">XenaCode Asistente</h3>
              <p className="text-xs opacity-80">Respondo al instante</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ background: 'var(--background-secondary)' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.isBot ? 'justify-start' : 'justify-end'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] px-4 py-2.5 rounded-2xl',
                    message.isBot
                      ? 'rounded-tl-sm'
                      : 'rounded-tr-sm'
                  )}
                  style={{
                    background: message.isBot ? 'var(--card-bg)' : 'var(--primary)',
                    color: message.isBot ? 'var(--foreground)' : 'var(--background)',
                    border: message.isBot ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl rounded-tl-sm"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--foreground-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--foreground-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--foreground-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-3 flex gap-2"
            style={{
              background: 'var(--card-bg)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className={cn(
                'flex-1 px-4 py-2.5 rounded-xl',
                'text-sm outline-none',
                'transition-all'
              )}
              style={{
                background: 'var(--background-secondary)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={cn(
                'p-2.5 rounded-xl',
                'transition-all duration-200',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'hover:opacity-90'
              )}
              style={{
                background: 'var(--primary)',
                color: 'var(--background)',
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Footer hint */}
          <div
            className="px-4 py-2 text-center"
            style={{
              background: 'var(--card-bg)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="text-xs flex items-center justify-center gap-1 hover:underline"
              style={{ color: 'var(--foreground-muted)' }}
            >
              <Mail className="w-3 h-3" />
              Para proyectos, usa el formulario de contacto
            </a>
          </div>
        </div>
      )}
    </>
  );
}
