import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ============================================
// API DE CONTACTO - RESEND
// ============================================
// Envía emails usando Resend (gratis hasta 3000/mes)
// Dominio verificado: xenacode.com
// ============================================

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactRequest {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json();
    const { name, email, projectType, message } = body;

    // Validación básica
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      );
    }

    // Enviar email con Resend
    const { error } = await resend.emails.send({
      from: 'XenaCode <noreply@xenacode.com>',
      to: [process.env.EMAIL_TO || 'contacto@xenacode.com'],
      replyTo: email,
      subject: `[XenaCode] Nuevo contacto: ${projectType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #172140, #1d2c5e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fc; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #172140; margin-bottom: 5px; display: block; }
            .value { color: #4a5578; }
            .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #172140; margin-top: 8px; }
            a { color: #172140; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Nuevo Mensaje de Contacto</h1>
              <p style="margin: 10px 0 0; opacity: 0.9; font-size: 14px;">XenaCode Website</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Nombre</span>
                <span class="value">${name}</span>
              </div>
              <div class="field">
                <span class="label">Email</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              <div class="field">
                <span class="label">Tipo de Proyecto</span>
                <span class="value">${projectType}</span>
              </div>
              <div class="field">
                <span class="label">Mensaje</span>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nuevo mensaje de contacto - XenaCode

Nombre: ${name}
Email: ${email}
Tipo de proyecto: ${projectType}

Mensaje:
${message}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el email' },
      { status: 500 }
    );
  }
}
