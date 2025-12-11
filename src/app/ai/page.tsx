'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Send,
  ImageIcon,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Download,
  Copy,
  Check,
  Loader2,
  Trash2,
  Menu,
  X,
  Wand2,
  Bot,
  User,
  Zap,
  Code,
  FileText,
  Lightbulb,
  Palette,
  Layout,
  Smartphone,
  Globe,
} from 'lucide-react';
import { Logo, ThemeSwitch, Button } from '@/components/ui';
import { cn } from '@/lib/cn';

// ============================================
// TYPES
// ============================================
type MessageRole = 'user' | 'assistant';
type Mode = 'chat' | 'image';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  isLoading?: boolean;
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function XenaCodeAIPage() {
  const [mode, setMode] = useState<Mode>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom within the messages container
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    // Small delay to ensure content is rendered
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, scrollToBottom]);

  // Handle scroll for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Generate unique ID
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Copy to clipboard
  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download image
  const downloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `xenacode-ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, '_blank');
    }
  };

  // Clear chat
  const clearChat = () => {
    setMessages([]);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: mode === 'chat' ? 'Pensando...' : 'Generando imagen...',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (mode === 'chat') {
        // Chat API
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error en el chat');
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMessage.id
              ? { ...m, content: data.message, isLoading: false }
              : m
          )
        );
      } else {
        // Image Generation API
        const response = await fetch('/api/ai/image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input.trim() }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error generando imagen');
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMessage.id
              ? {
                  ...m,
                  content: `Imagen generada: "${userMessage.content}"`,
                  imageUrl: data.imageUrl,
                  isLoading: false,
                }
              : m
          )
        );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessage.id
            ? { ...m, content: `Error: ${errorMessage}`, isLoading: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          'bg-[var(--background)]',
          isScrolled && 'shadow-lg shadow-[var(--card-shadow)]'
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + Back */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link
                href="/"
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-lg',
                  'text-[var(--foreground-muted)] hover:text-[var(--foreground)]',
                  'hover:bg-[var(--background-secondary)]',
                  'transition-all duration-200'
                )}
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline text-sm font-medium">Volver</span>
              </Link>
              <div className="h-6 w-px bg-[var(--border)]" />
              <div className="flex items-center gap-2">
                <Logo variant="isotope" width={32} height={32} linkToHome={false} />
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-bold text-[var(--foreground)]">
                    XenaCode<span className="text-[var(--accent)]">AI</span>
                  </span>
                  <span className="text-[10px] md:text-xs text-[var(--foreground-muted)] -mt-1 hidden sm:block">
                    Chat IA Gratuito
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Mode Switcher */}
              <div className="flex items-center bg-[var(--background-secondary)] rounded-xl p-1">
                <button
                  onClick={() => setMode('chat')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    mode === 'chat'
                      ? 'bg-[var(--primary)] text-[var(--background)] shadow-md'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  )}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>
                <button
                  onClick={() => setMode('image')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    mode === 'image'
                      ? 'bg-[var(--primary)] text-[var(--background)] shadow-md'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  )}
                >
                  <ImageIcon className="w-4 h-4" />
                  Imágenes
                </button>
              </div>
              <ThemeSwitch />
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-[var(--foreground-muted)]"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeSwitch />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'p-2 rounded-lg',
                  'text-[var(--foreground)]',
                  'hover:bg-[var(--background-secondary)]',
                  'transition-colors'
                )}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)]">
            <div className="container-custom py-4 space-y-4">
              {/* Mode Switcher Mobile */}
              <div className="flex items-center bg-[var(--background-secondary)] rounded-xl p-1">
                <button
                  onClick={() => {
                    setMode('chat');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                    mode === 'chat'
                      ? 'bg-[var(--primary)] text-[var(--background)] shadow-md'
                      : 'text-[var(--foreground-muted)]'
                  )}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>
                <button
                  onClick={() => {
                    setMode('image');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                    mode === 'image'
                      ? 'bg-[var(--primary)] text-[var(--background)] shadow-md'
                      : 'text-[var(--foreground-muted)]'
                  )}
                >
                  <ImageIcon className="w-4 h-4" />
                  Imágenes
                </button>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    clearChat();
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg',
                    'text-[var(--foreground-muted)] hover:text-[var(--foreground)]',
                    'hover:bg-[var(--background-secondary)]',
                    'transition-colors'
                  )}
                >
                  <Trash2 className="w-4 h-4" />
                  Limpiar conversación
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-20 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="h-full flex flex-col items-center justify-center px-4 py-8 md:py-16">
              <div className="max-w-2xl text-center space-y-6 md:space-y-8">
                {/* Icon */}
                <div
                  className={cn(
                    'w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl',
                    'bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]',
                    'flex items-center justify-center',
                    'shadow-xl shadow-[var(--card-shadow)]'
                  )}
                >
                  {mode === 'chat' ? (
                    <Bot className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  ) : (
                    <Wand2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  )}
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-[var(--foreground)] mb-2 md:mb-3">
                    {mode === 'chat' ? (
                      <>
                        Chat con <span className="gradient-text">Inteligencia Artificial</span>
                      </>
                    ) : (
                      <>
                        Genera <span className="gradient-text">Imágenes Profesionales</span>
                      </>
                    )}
                  </h1>
                  <p className="text-base md:text-lg text-[var(--foreground-muted)] max-w-lg mx-auto">
                    {mode === 'chat'
                      ? 'Pregunta lo que quieras. Programación, ideas, textos, traducciones...'
                      : 'Crea logos, ilustraciones, diseños y arte con IA. Describe lo que imaginas.'}
                  </p>
                </div>

                {/* Suggestions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-left">
                  {mode === 'chat' ? (
                    <>
                      <SuggestionCard
                        icon={<Code className="w-5 h-5" />}
                        title="Programación"
                        description="Ayúdame a crear una función en JavaScript"
                        onClick={() => setInput('Ayúdame a crear una función en JavaScript que valide emails')}
                      />
                      <SuggestionCard
                        icon={<FileText className="w-5 h-5" />}
                        title="Redacción"
                        description="Escríbeme un email profesional"
                        onClick={() => setInput('Escríbeme un email profesional para solicitar una reunión')}
                      />
                      <SuggestionCard
                        icon={<Lightbulb className="w-5 h-5" />}
                        title="Ideas"
                        description="Dame ideas para un proyecto web"
                        onClick={() => setInput('Dame 5 ideas creativas para un proyecto web innovador')}
                      />
                      <SuggestionCard
                        icon={<Zap className="w-5 h-5" />}
                        title="Explicación"
                        description="Explícame qué es React"
                        onClick={() => setInput('Explícame qué es React y por qué es popular')}
                      />
                    </>
                  ) : (
                    <>
                      <SuggestionCard
                        icon={<Globe className="w-5 h-5" />}
                        title="Logo minimalista"
                        description="Logo tech moderno y limpio"
                        onClick={() => setInput('Logo minimalista para una empresa de tecnología, colores azul y blanco, estilo moderno y profesional')}
                      />
                      <SuggestionCard
                        icon={<Palette className="w-5 h-5" />}
                        title="Ilustración"
                        description="Ilustración para app móvil"
                        onClick={() => setInput('Ilustración colorida de un astronauta programando en el espacio, estilo cartoon moderno')}
                      />
                      <SuggestionCard
                        icon={<Layout className="w-5 h-5" />}
                        title="Banner web"
                        description="Banner para redes sociales"
                        onClick={() => setInput('Banner profesional para empresa de software, gradiente azul oscuro, estilo corporativo premium')}
                      />
                      <SuggestionCard
                        icon={<Smartphone className="w-5 h-5" />}
                        title="Icono app"
                        description="Icono para aplicación"
                        onClick={() => setInput('Icono de aplicación para fitness, estilo 3D moderno, colores vibrantes, fondo degradado')}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Messages List
            <div className="container-custom py-4 md:py-6 space-y-4 md:space-y-6">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onCopy={(content) => copyToClipboard(content, message.id)}
                  onDownload={downloadImage}
                  isCopied={copiedId === message.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-[var(--background)] border-t border-[var(--border)]">
          <div className="container-custom py-3 md:py-4">
            <form onSubmit={handleSubmit} className="relative">
              <div
                className={cn(
                  'flex items-end gap-2 md:gap-3 p-2 md:p-3 rounded-2xl',
                  'bg-[var(--background-secondary)]',
                  'border border-[var(--border)]',
                  'focus-within:border-[var(--primary)]',
                  'transition-colors'
                )}
              >
                {/* Mode indicator mobile */}
                <div
                  className={cn(
                    'hidden sm:flex items-center justify-center w-10 h-10 rounded-xl',
                    'bg-[var(--primary)] text-[var(--background)]'
                  )}
                >
                  {mode === 'chat' ? (
                    <MessageSquare className="w-5 h-5" />
                  ) : (
                    <ImageIcon className="w-5 h-5" />
                  )}
                </div>

                {/* Textarea */}
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    mode === 'chat'
                      ? 'Escribe tu mensaje...'
                      : 'Describe la imagen que quieres crear...'
                  }
                  rows={1}
                  className={cn(
                    'flex-1 bg-transparent border-none outline-none resize-none',
                    'text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]',
                    'text-sm md:text-base py-2 md:py-2.5',
                    'max-h-[200px]'
                  )}
                  disabled={isLoading}
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    'flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl',
                    'bg-[var(--primary)] text-[var(--background)]',
                    'hover:bg-[var(--primary-light)]',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transition-all duration-200'
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Helper text */}
              <p className="text-xs text-[var(--foreground-muted)] text-center mt-2">
                {mode === 'chat'
                  ? 'Presiona Enter para enviar, Shift+Enter para nueva línea'
                  : 'Describe con detalle para mejores resultados'}
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

interface SuggestionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function SuggestionCard({ icon, title, description, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-start gap-3 p-3 md:p-4 rounded-xl text-left',
        'bg-[var(--background-secondary)]',
        'border border-[var(--border)]',
        'hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--card-shadow)]',
        'transition-all duration-200',
        'group'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg',
          'bg-[var(--background-tertiary)]',
          'flex items-center justify-center',
          'text-[var(--foreground-muted)]',
          'group-hover:bg-[var(--primary)] group-hover:text-[var(--background)]',
          'transition-colors'
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[var(--foreground)] text-sm md:text-base">{title}</h3>
        <p className="text-xs md:text-sm text-[var(--foreground-muted)] truncate">{description}</p>
      </div>
    </button>
  );
}

interface MessageBubbleProps {
  message: Message;
  onCopy: (content: string) => void;
  onDownload: (url: string) => void;
  isCopied: boolean;
}

// Format inline markdown (bold, italic, inline code)
function formatInlineMarkdown(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  // Match bold (**text** or __text__), italic (*text* or _text_), and inline code (`code`)
  const regex = /(\*\*|__)(.+?)\1|(\*|_)(.+?)\3|`([^`]+)`/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold
      result.push(<strong key={key++} className="font-semibold">{match[2]}</strong>);
    } else if (match[3]) {
      // Italic
      result.push(<em key={key++} className="italic">{match[4]}</em>);
    } else if (match[5]) {
      // Inline code
      result.push(
        <code key={key++} className="px-1.5 py-0.5 bg-[var(--background-tertiary)] rounded text-sm font-mono">
          {match[5]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result.length > 0 ? result : [text];
}

// Parse markdown text into formatted elements
function parseMarkdownText(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const ListTag = listType === 'ol' ? 'ol' : 'ul';
      elements.push(
        <ListTag key={key++} className={cn(
          'my-2 space-y-1',
          listType === 'ol' ? 'list-decimal list-inside' : 'list-disc list-inside'
        )}>
          {listItems.map((item, i) => (
            <li key={i} className="text-sm md:text-base">
              {formatInlineMarkdown(item)}
            </li>
          ))}
        </ListTag>
      );
      listItems = [];
      listType = null;
    }
  };

  for (const line of lines) {
    // Check for numbered list (1. item, 2. item, etc.)
    const olMatch = line.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(olMatch[1]);
      continue;
    }

    // Check for bullet list (- item, * item)
    const ulMatch = line.match(/^[-*]\s+(.+)/);
    if (ulMatch) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(ulMatch[1]);
      continue;
    }

    // Not a list item, flush any pending list
    flushList();

    // Empty line
    if (line.trim() === '') {
      elements.push(<br key={key++} />);
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-sm md:text-base">
        {formatInlineMarkdown(line)}
      </p>
    );
  }

  // Flush any remaining list
  flushList();

  return <div className="space-y-1">{elements}</div>;
}

function MessageBubble({ message, onCopy, onDownload, isCopied }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  // Parse content for code blocks and markdown
  const formattedContent = useMemo(() => {
    if (isUser || message.isLoading) return null;

    const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message.content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: message.content.slice(lastIndex, match.index) });
      }
      // Add code block
      parts.push({ type: 'code', content: match[2].trim(), language: match[1] || 'code' });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < message.content.length) {
      parts.push({ type: 'text', content: message.content.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : null;
  }, [message.content, isUser, message.isLoading]);

  return (
    <div
      className={cn(
        'flex gap-3 md:gap-4 animate-fade-in-up',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl',
          'flex items-center justify-center',
          'shadow-md',
          isUser
            ? 'bg-[var(--primary)] text-[var(--background)]'
            : 'bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] text-white'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 md:w-5 md:h-5" />
        ) : (
          <Bot className="w-4 h-4 md:w-5 md:h-5" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex-1 max-w-[85%] md:max-w-[75%]',
          isUser ? 'text-right' : 'text-left'
        )}
      >
        <div
          className={cn(
            'inline-block p-3 md:p-4 rounded-2xl text-left',
            'shadow-sm',
            isUser
              ? 'bg-[var(--primary)] text-[var(--background)] rounded-tr-sm'
              : 'bg-[var(--background-secondary)] text-[var(--foreground)] rounded-tl-sm border border-[var(--border)]'
          )}
        >
          {message.isLoading ? (
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm md:text-base opacity-70">{message.content}</span>
            </div>
          ) : (
            <>
              {/* Image if present */}
              {message.imageUrl && (
                <div className="mb-3 relative group rounded-xl overflow-hidden">
                  <Image
                    src={message.imageUrl}
                    alt="Imagen generada"
                    width={512}
                    height={512}
                    className="w-full max-w-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => onDownload(message.imageUrl!)}
                    className={cn(
                      'absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-lg',
                      'bg-white/90 text-gray-900 font-medium text-sm',
                      'opacity-0 group-hover:opacity-100',
                      'hover:bg-white',
                      'transition-all transform translate-y-2 group-hover:translate-y-0',
                      'shadow-lg'
                    )}
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              )}

              {/* Text content with code blocks and markdown */}
              {formattedContent ? (
                <div className="space-y-3">
                  {formattedContent.map((part, index) =>
                    part.type === 'code' ? (
                      <div key={index} className="relative group/code">
                        <div className="flex items-center justify-between px-3 py-2 bg-[var(--background-tertiary)] rounded-t-lg border-b border-[var(--border)]">
                          <span className="text-xs font-mono text-[var(--foreground-muted)]">
                            {part.language}
                          </span>
                          <button
                            onClick={() => onCopy(part.content)}
                            className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <pre className="p-3 bg-[var(--background-tertiary)] rounded-b-lg overflow-x-auto">
                          <code className="text-xs md:text-sm font-mono text-[var(--foreground)]">
                            {part.content}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <div key={index}>
                        {parseMarkdownText(part.content)}
                      </div>
                    )
                  )}
                </div>
              ) : (
                parseMarkdownText(message.content)
              )}
            </>
          )}
        </div>

        {/* Actions */}
        {!isUser && !message.isLoading && (
          <div className="flex items-center gap-2 mt-1.5 md:mt-2">
            <button
              onClick={() => onCopy(message.content)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium',
                'text-[var(--foreground-muted)] hover:text-[var(--foreground)]',
                'hover:bg-[var(--background-secondary)]',
                'transition-all duration-200'
              )}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
