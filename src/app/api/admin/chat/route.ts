import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const TODAY = new Date().toISOString().split("T")[0];

const SYSTEM_PROMPT = `Eres el Asistente de Prensa de Hakamana, el primer Fondo de Litigación de Chile.
Tu función es ayudar al equipo de prensa externo a publicar artículos en hakamana.cl sin tocar ningún código.

DATOS QUE DEBES RECOPILAR:
1. title (obligatorio): Título completo del artículo EN ESPAÑOL
2. source (obligatorio): Nombre del medio de comunicación (ej: "El Mercurio Legal", "La Tercera", "Forbes")
3. date (obligatorio): Fecha de publicación — siempre convertir a formato YYYY-MM-DD
4. excerpt (obligatorio): Resumen en español, 2-3 oraciones, tono profesional
5. external_url (opcional pero recomendado): Link directo al artículo original
6. image (opcional): URL de imagen (si no tienen, se usará imagen por defecto)
7. title_en (opcional): Título en inglés — pregunta si el artículo está en inglés o si tienen traducción
8. excerpt_en (opcional): Resumen en inglés — pregunta si tienen traducción
9. slug: auto-genera desde el título en español

FLUJO DE TRABAJO:
1. Saluda y pide los datos esenciales
2. Extrae toda la información del mensaje del usuario inteligentemente
3. Si faltan campos obligatorios, pregunta puntualmente (no más de 2 preguntas a la vez)
4. Cuando tengas todos los obligatorios, llama a publish_article
5. Para title_en y excerpt_en: pregunta solo si el artículo es de un medio internacional o está en inglés

GENERACIÓN DE SLUG:
- Minúsculas → sin acentos → espacios a guiones → sin caracteres especiales → máx 60 chars
- Ejemplos: "Hakamana en Forbes" → "hakamana-en-forbes"

REGLAS:
- Nunca inventes datos — solo usa lo que proporciona el usuario
- Si dan fecha relativa ("ayer", "el martes"), conviértela a YYYY-MM-DD (hoy es ${TODAY})
- Si dan fecha chilena (DD/MM/YYYY), conviértela a YYYY-MM-DD
- Excerpt en 2-3 oraciones concretas y profesionales
- Llama publish_article en cuanto tengas title + source + date + excerpt — la UI tiene botón de confirmar`;

const TOOLS: Anthropic.Tool[] = [
  {
    name: "publish_article",
    description:
      "Prepara el artículo para publicación. Llamar cuando se tengan los campos obligatorios: title, source, date, excerpt, slug.",
    input_schema: {
      type: "object" as const,
      properties: {
        title: { type: "string", description: "Título en español" },
        title_en: { type: "string", description: "Título en inglés (puede ser vacío)" },
        source: { type: "string", description: "Nombre del medio" },
        date: { type: "string", description: "Fecha YYYY-MM-DD" },
        excerpt: { type: "string", description: "Resumen en español, 2-3 oraciones" },
        excerpt_en: { type: "string", description: "Resumen en inglés (puede ser vacío)" },
        external_url: { type: "string", description: "URL del artículo original (puede ser null)" },
        image: { type: "string", description: "URL de imagen (puede ser null)" },
        slug: { type: "string", description: "Slug URL-friendly generado del título" },
      },
      required: ["title", "source", "date", "excerpt", "slug"],
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, messages, ping } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (ping) return NextResponse.json({ ok: true });

    if (!messages?.length) {
      return NextResponse.json({ error: "No messages" }, { status: 400 });
    }

    const apiMessages = messages
      .filter((m: { role: string }) => m.role === "user" || m.role === "assistant")
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      messages: apiMessages,
    });

    let messageText = "";
    let pendingPublish = null;

    for (const block of response.content) {
      if (block.type === "text") {
        messageText += block.text;
      } else if (block.type === "tool_use" && block.name === "publish_article") {
        pendingPublish = block.input;
        if (!messageText) {
          messageText = `✅ ¡Listo! Tengo todos los datos. Revisa la vista previa y confirma para publicar.`;
        }
      }
    }

    return NextResponse.json({ message: messageText, pendingPublish });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Error", message: "Error al procesar. Intenta de nuevo." }, { status: 500 });
  }
}
