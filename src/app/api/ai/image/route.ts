import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mejorar el prompt para obtener mejores resultados
function enhancePrompt(userPrompt: string): string {
  const baseEnhancements = [
    'high quality',
    'professional',
    'detailed',
    '4k resolution',
  ];

  // Detectar si es un logo
  const isLogo = /logo|logotipo|marca|brand|icono|icon/i.test(userPrompt);

  // Detectar si es ilustración
  const isIllustration = /ilustraci[oó]n|dibujo|cartoon|arte|art/i.test(userPrompt);

  // Detectar si es banner/diseño
  const isBanner = /banner|diseño|design|poster|cartel/i.test(userPrompt);

  let enhancedPrompt = userPrompt;

  if (isLogo) {
    enhancedPrompt += ', vector style, clean design, scalable, modern logo design, white background, professional branding';
  } else if (isIllustration) {
    enhancedPrompt += ', vibrant colors, artistic style, creative composition';
  } else if (isBanner) {
    enhancedPrompt += ', marketing material, eye-catching design, professional layout';
  }

  // Añadir mejoras base si no están presentes
  const promptLower = enhancedPrompt.toLowerCase();
  const enhancements = baseEnhancements.filter(e => !promptLower.includes(e.toLowerCase()));

  if (enhancements.length > 0) {
    enhancedPrompt += ', ' + enhancements.join(', ');
  }

  return enhancedPrompt;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body as { prompt: string };

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Se requiere una descripción de la imagen' },
        { status: 400 }
      );
    }

    // Validar longitud del prompt
    if (prompt.length > 1000) {
      return NextResponse.json(
        { error: 'La descripción es demasiado larga. Máximo 1000 caracteres.' },
        { status: 400 }
      );
    }

    // Mejorar el prompt
    const enhancedPrompt = enhancePrompt(prompt.trim());

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: enhancedPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'vivid',
    });

    const imageData = response.data?.[0];
    const imageUrl = imageData?.url;

    if (!imageUrl) {
      throw new Error('No se generó ninguna imagen');
    }

    return NextResponse.json({
      imageUrl,
      revisedPrompt: imageData?.revised_prompt
    });
  } catch (error) {
    console.error('Error en image API:', error);

    // Manejar errores específicos de OpenAI
    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'Demasiadas solicitudes. Por favor, espera un momento.' },
          { status: 429 }
        );
      }
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Error de configuración del servicio.' },
          { status: 500 }
        );
      }
      if (error.status === 400) {
        // Contenido rechazado por políticas de seguridad
        return NextResponse.json(
          { error: 'Tu descripción fue rechazada. Intenta con otra descripción.' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Error al generar la imagen. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
