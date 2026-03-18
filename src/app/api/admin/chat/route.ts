import { NextRequest, NextResponse } from "next/server";

const SIM_WORKFLOW_URL =
  process.env.SIM_WORKFLOW_URL ||
  "https://api.sim.so/api/workflows/8973b978-6536-4784-bb0a-02ba3365356d/run";

const TODAY = new Date().toISOString().split("T")[0];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

// Intenta extraer un bloque JSON de artículo desde el texto de respuesta de SIM
// El workflow SIM puede devolver el artículo como JSON en la respuesta
function extractArticleFromText(text: string) {
  // Busca JSON dentro de ```json ... ``` o directamente en el texto
  const jsonMatch = text.match(/```json\s*([\s\S]*?)```/) ||
                    text.match(/\{[\s\S]*"title"[\s\S]*"source"[\s\S]*"date"[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const raw = jsonMatch[1] || jsonMatch[0];
    const parsed = JSON.parse(raw.trim());
    if (parsed.title && parsed.source && parsed.date && parsed.excerpt) {
      return {
        title: parsed.title,
        title_en: parsed.title_en || "",
        source: parsed.source,
        date: parsed.date,
        excerpt: parsed.excerpt,
        excerpt_en: parsed.excerpt_en || "",
        external_url: parsed.external_url || null,
        image: parsed.image || null,
        slug: parsed.slug || generateSlug(parsed.title),
      };
    }
  } catch {
    // no es JSON válido
  }
  return null;
}

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

    const apiKey = process.env.SIM_API_KEY || process.env.ANTHROPIC_API_KEY;

    // Llama al workflow de SIM
    const simResponse = await fetch(SIM_WORKFLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey || "",
      },
      body: JSON.stringify({
        // Enviamos el historial completo + contexto de hoy
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
        input: messages[messages.length - 1]?.content || "",
        today: TODAY,
      }),
    });

    if (!simResponse.ok) {
      const errText = await simResponse.text();
      console.error("SIM API error:", simResponse.status, errText);
      return NextResponse.json(
        { error: "SIM error", message: "Error al conectar con el asistente. Intenta de nuevo." },
        { status: 500 }
      );
    }

    const simData = await simResponse.json();

    // SIM puede devolver la respuesta en distintos formatos — manejamos todos
    let messageText = "";
    let pendingPublish = null;

    // Formato 1: { output: { message: "...", article: {...} } }
    // Formato 2: { output: "texto plano" }
    // Formato 3: { result: "...", ... }
    // Formato 4: { outputs: [{ value: "..." }] }

    const output = simData?.output ?? simData?.result ?? simData?.response ?? simData;

    if (typeof output === "string") {
      messageText = output;
      pendingPublish = extractArticleFromText(output);
    } else if (typeof output === "object" && output !== null) {
      // Busca el texto del mensaje
      messageText =
        output.message ||
        output.text ||
        output.content ||
        output.response ||
        (Array.isArray(output.outputs)
          ? output.outputs.map((o: { value?: string }) => o.value || "").join(" ")
          : "") ||
        "";

      // Busca el artículo estructurado
      const articleData = output.article || output.publish_article || output.pendingPublish;
      if (articleData?.title && articleData?.source) {
        pendingPublish = {
          title: articleData.title,
          title_en: articleData.title_en || "",
          source: articleData.source,
          date: articleData.date,
          excerpt: articleData.excerpt,
          excerpt_en: articleData.excerpt_en || "",
          external_url: articleData.external_url || null,
          image: articleData.image || null,
          slug: articleData.slug || generateSlug(articleData.title),
        };
      }

      // Si no encontró artículo estructurado, busca en el texto
      if (!pendingPublish && messageText) {
        pendingPublish = extractArticleFromText(messageText);
      }
    }

    if (!messageText && pendingPublish) {
      messageText = "✅ Tengo todos los datos. Revisa la vista previa y confirma para publicar.";
    }

    if (!messageText) {
      messageText = "Sin respuesta del asistente. Intenta de nuevo.";
    }

    return NextResponse.json({ message: messageText, pendingPublish });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error", message: "Error al procesar. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
