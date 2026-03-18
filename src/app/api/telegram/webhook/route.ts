import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID; // Tu chat ID personal

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

async function sendMessage(chatId: number | string, text: string, parseMode = "HTML") {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: parseMode }),
  });
}

// Estado temporal por sesión (en memoria — simple para un solo admin)
const sessions: Record<string, { step: string; data: Record<string, string> }> = {};

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    const message = update.message || update.edited_message;
    if (!message?.text) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const text = message.text.trim();
    const userId = String(chatId);

    // Seguridad: solo el admin puede usar el bot
    if (ADMIN_CHAT_ID && String(chatId) !== ADMIN_CHAT_ID) {
      await sendMessage(chatId, "⛔ Acceso no autorizado.");
      return NextResponse.json({ ok: true });
    }

    const session = sessions[userId] || { step: "idle", data: {} };

    /* ── COMANDOS ── */

    if (text === "/start" || text === "/ayuda") {
      sessions[userId] = { step: "idle", data: {} };
      await sendMessage(chatId,
        `🗞️ <b>Panel de Prensa Hakamana</b>\n\nComandos disponibles:\n\n` +
        `/publicar — Publicar nuevo artículo\n` +
        `/prensa — Ver últimos artículos publicados\n` +
        `/cancelar — Cancelar operación actual\n` +
        `/ayuda — Ver este mensaje`
      );
      return NextResponse.json({ ok: true });
    }

    if (text === "/cancelar") {
      sessions[userId] = { step: "idle", data: {} };
      await sendMessage(chatId, "❌ Operación cancelada.");
      return NextResponse.json({ ok: true });
    }

    if (text === "/prensa") {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { data } = await supabase
        .from("prensa")
        .select("title, source, date")
        .order("date", { ascending: false })
        .limit(5);

      if (!data?.length) {
        await sendMessage(chatId, "No hay artículos publicados aún.");
      } else {
        const list = data.map((a, i) =>
          `${i + 1}. <b>${a.title}</b>\n   ${a.source} · ${a.date}`
        ).join("\n\n");
        await sendMessage(chatId, `📰 <b>Últimos artículos:</b>\n\n${list}`);
      }
      return NextResponse.json({ ok: true });
    }

    if (text === "/publicar") {
      sessions[userId] = { step: "titulo", data: {} };
      await sendMessage(chatId,
        `📝 Vamos a publicar un artículo.\n\n<b>Paso 1/4 — Título</b>\n\nEscribe el título completo del artículo:`
      );
      return NextResponse.json({ ok: true });
    }

    /* ── FLUJO PASO A PASO ── */

    if (session.step === "titulo") {
      session.data.title = text;
      session.step = "fuente";
      sessions[userId] = session;
      await sendMessage(chatId,
        `✅ Título guardado.\n\n<b>Paso 2/4 — Medio</b>\n\nEscribe el nombre del medio de comunicación:\n(ej: El Mercurio Legal, La Tercera, Forbes)`
      );
      return NextResponse.json({ ok: true });
    }

    if (session.step === "fuente") {
      session.data.source = text;
      session.step = "fecha";
      sessions[userId] = session;
      await sendMessage(chatId,
        `✅ Medio: <b>${text}</b>\n\n<b>Paso 3/4 — Fecha</b>\n\nEscribe la fecha de publicación:\n(ej: 17 de marzo de 2026, o 2026-03-17)`
      );
      return NextResponse.json({ ok: true });
    }

    if (session.step === "fecha") {
      // Parsear fecha
      let dateStr = text;
      // Si viene como YYYY-MM-DD ya está bien
      if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
        // Intentar parsear fecha en español
        const months: Record<string, string> = {
          enero: "01", febrero: "02", marzo: "03", abril: "04",
          mayo: "05", junio: "06", julio: "07", agosto: "08",
          septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12"
        };
        const match = text.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
        if (match) {
          const [, day, month, year] = match;
          const monthNum = months[month.toLowerCase()];
          if (monthNum) {
            dateStr = `${year}-${monthNum}-${day.padStart(2, "0")}`;
          }
        }
        // DD/MM/YYYY
        const dmyMatch = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (dmyMatch) {
          const [, day, month, year] = dmyMatch;
          dateStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        await sendMessage(chatId, "⚠️ No pude entender la fecha. Escríbela así: <b>2026-03-17</b>");
        return NextResponse.json({ ok: true });
      }

      session.data.date = dateStr;
      session.step = "resumen";
      sessions[userId] = session;
      await sendMessage(chatId,
        `✅ Fecha: <b>${dateStr}</b>\n\n<b>Paso 4/4 — Resumen</b>\n\nEscribe un resumen del artículo en 2-3 oraciones:`
      );
      return NextResponse.json({ ok: true });
    }

    if (session.step === "resumen") {
      session.data.excerpt = text;
      session.step = "url";
      sessions[userId] = session;
      await sendMessage(chatId,
        `✅ Resumen guardado.\n\n<b>Opcional — Link al artículo</b>\n\nPega la URL del artículo original, o escribe <b>no</b> para omitir:`
      );
      return NextResponse.json({ ok: true });
    }

    if (session.step === "url") {
      const url = text.toLowerCase() === "no" ? null : text;
      session.data.external_url = url || "";
      session.step = "confirmar";
      sessions[userId] = session;

      const preview =
        `📋 <b>Vista previa del artículo:</b>\n\n` +
        `<b>Título:</b> ${session.data.title}\n` +
        `<b>Medio:</b> ${session.data.source}\n` +
        `<b>Fecha:</b> ${session.data.date}\n` +
        `<b>Resumen:</b> ${session.data.excerpt}\n` +
        (url ? `<b>Link:</b> ${url}\n` : "") +
        `\n¿Publicar? Escribe <b>sí</b> para confirmar o <b>no</b> para cancelar.`;

      await sendMessage(chatId, preview);
      return NextResponse.json({ ok: true });
    }

    if (session.step === "confirmar") {
      if (text.toLowerCase() === "sí" || text.toLowerCase() === "si" || text === "✅") {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const slug = generateSlug(session.data.title);
        const { data: existing } = await supabase
          .from("prensa").select("slug").eq("slug", slug).single();
        const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

        const { error } = await supabase.from("prensa").insert({
          slug: finalSlug,
          title: session.data.title,
          title_en: "",
          source: session.data.source,
          date: session.data.date,
          excerpt: session.data.excerpt,
          excerpt_en: "",
          image: "/images/hakamana-fondo-de-litigacion-01.png",
          external_url: session.data.external_url || null,
          published: true,
        });

        sessions[userId] = { step: "idle", data: {} };

        if (error) {
          await sendMessage(chatId, `❌ Error al publicar: ${error.message}`);
        } else {
          await sendMessage(chatId,
            `✅ <b>¡Artículo publicado!</b>\n\n"${session.data.title}" ya está en hakamana.cl/es/prensa\n\nUsa /publicar para agregar otro.`
          );
        }
      } else {
        sessions[userId] = { step: "idle", data: {} };
        await sendMessage(chatId, "❌ Cancelado. Usa /publicar para comenzar de nuevo.");
      }
      return NextResponse.json({ ok: true });
    }

    // Default
    await sendMessage(chatId, `Usa /ayuda para ver los comandos disponibles.`);
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true }); // Siempre 200 para Telegram
  }
}
