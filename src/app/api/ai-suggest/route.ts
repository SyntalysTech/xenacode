import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// ============================================
// API DE SUGERENCIAS CON IA
// ============================================
//
// Esta API usa OpenAI para generar sugerencias
// personalizadas basadas en el tipo de proyecto.
//
// CONFIGURACIÓN:
// - OPENAI_API_KEY en .env.local
// ============================================

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SuggestRequest {
  projectType: string;
}

const projectSuggestions: Record<string, string> = {
  'Desarrollo Web': `Para un proyecto web exitoso, considera estos puntos clave:
- Define claramente el público objetivo y los objetivos de conversión
- Piensa en la escalabilidad desde el inicio
- Prioriza la velocidad de carga y el SEO
- Considera integraciones necesarias (pagos, CRM, analytics)`,

  'Aplicación Móvil': `Para tu app móvil, ten en cuenta:
- ¿Será nativa (iOS/Android) o multiplataforma?
- Define el MVP (producto mínimo viable) para lanzar rápido
- Considera la monetización desde el diseño
- Planifica el ciclo de actualizaciones`,

  'Inteligencia Artificial': `Para integrar IA en tu proyecto:
- Identifica qué procesos pueden automatizarse
- Evalúa si necesitas modelos personalizados o APIs existentes
- Considera la calidad y privacidad de los datos
- Planifica la validación humana de resultados`,

  'Ciberseguridad': `Para fortalecer tu seguridad:
- Realiza un análisis de riesgos inicial
- Prioriza la protección de datos sensibles
- Implementa autenticación robusta (MFA)
- Planifica auditorías periódicas y respuesta a incidentes`,

  'Software a Medida': `Para software personalizado:
- Documenta todos los procesos actuales a digitalizar
- Prioriza funcionalidades por impacto en el negocio
- Planifica la migración de datos existentes
- Considera la formación del equipo`,

  'Consultoría': `Para una consultoría efectiva:
- Prepara documentación de tu infraestructura actual
- Lista los principales pain points del negocio
- Define métricas de éxito claras
- Ten disponibilidad para sesiones de trabajo conjunto`,

  'Otro': `Para proyectos especiales:
- Describe el problema a resolver con el mayor detalle posible
- Indica referencias o ejemplos de soluciones similares
- Define el presupuesto y timeline aproximados
- Menciona cualquier restricción técnica o de negocio`,
};

export async function POST(request: Request) {
  try {
    const body: SuggestRequest = await request.json();
    const { projectType } = body;

    if (!projectType) {
      return NextResponse.json(
        { error: 'Tipo de proyecto requerido' },
        { status: 400 }
      );
    }

    // Si no hay API key, usar sugerencias estáticas
    if (!process.env.OPENAI_API_KEY) {
      const suggestion = projectSuggestions[projectType] || projectSuggestions['Otro'];
      return NextResponse.json({ suggestion });
    }

    // Usar OpenAI para generar sugerencia personalizada
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Eres un consultor senior de desarrollo de software con 12 años de experiencia.
Tu trabajo es dar una breve sugerencia (máximo 3-4 líneas) para ayudar a un cliente potencial a preparar mejor su proyecto de tipo "${projectType}".
Sé conciso, profesional y útil. No uses emojis. Responde en español.`,
        },
        {
          role: 'user',
          content: `Dame una sugerencia breve para alguien que quiere iniciar un proyecto de ${projectType}. ¿Qué debería tener en cuenta antes de contactarme?`,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const suggestion = completion.choices[0]?.message?.content || projectSuggestions[projectType] || projectSuggestions['Otro'];

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('Error with AI suggestion:', error);
    // Fallback a sugerencias estáticas
    const body = await request.json().catch(() => ({ projectType: 'Otro' }));
    const suggestion = projectSuggestions[body.projectType] || projectSuggestions['Otro'];
    return NextResponse.json({ suggestion });
  }
}
