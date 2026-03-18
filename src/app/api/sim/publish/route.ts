/**
 * POST /api/sim/publish
 *
 * Endpoint llamado directamente por el workflow de SIM.
 * SIM envía los datos del artículo → se inserta en Supabase → live en hakamana.cl
 *
 * Auth: header x-api-key = SIM_API_KEY (env var)
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

export async function POST(req: NextRequest) {
  try {
    // Auth via x-api-key header (SIM envía esto automáticamente)
    const apiKey = req.headers.get("x-api-key") || req.headers.get("authorization")?.replace("Bearer ", "");
    const validKey = process.env.SIM_API_KEY || process.env.ADMIN_PASSWORD;

    if (!validKey || apiKey !== validKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // SIM puede enviar los datos directamente o dentro de un campo "article"
    const article = body.article || body;

    const { title, source, date, excerpt } = article;

    if (!title || !source || !date || !excerpt) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: title, source, date, excerpt" },
        { status: 400 }
      );
    }

    // Normalizar fecha (acepta YYYY-MM-DD o DD/MM/YYYY o texto)
    let dateStr = date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const months: Record<string, string> = {
        enero: "01", febrero: "02", marzo: "03", abril: "04",
        mayo: "05", junio: "06", julio: "07", agosto: "08",
        septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12",
        january: "01", february: "02", march: "03", april: "04",
        may: "05", june: "06", july: "07", august: "08",
        september: "09", october: "10", november: "11", december: "12",
      };
      const matchEs = date.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
      if (matchEs) {
        const [, d, m, y] = matchEs;
        dateStr = `${y}-${months[m.toLowerCase()] || "01"}-${d.padStart(2, "0")}`;
      }
      const matchDmy = date.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (matchDmy) {
        const [, d, m, y] = matchDmy;
        dateStr = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      }
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const slug = article.slug || generateSlug(title);
    const { data: existing } = await supabase.from("prensa").select("slug").eq("slug", slug).single();
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const newArticle = {
      slug: finalSlug,
      title: title.trim(),
      title_en: article.title_en?.trim() || "",
      source: source.trim(),
      date: dateStr,
      excerpt: excerpt.trim(),
      excerpt_en: article.excerpt_en?.trim() || "",
      image: article.image || "/images/hakamana-fondo-de-litigacion-01.png",
      external_url: article.external_url || null,
      published: true,
    };

    const { data, error } = await supabase.from("prensa").insert(newArticle).select().single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Artículo "${title}" publicado en hakamana.cl/es/prensa`,
      article: data,
      url: `https://www.hakamana.cl/es/prensa`,
    });

  } catch (err) {
    console.error("SIM publish error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// GET para que SIM pueda verificar que el endpoint está activo
export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  const validKey = process.env.SIM_API_KEY || process.env.ADMIN_PASSWORD;
  if (!validKey || apiKey !== validKey) {
    return NextResponse.json({ status: "online", auth: "required" });
  }
  return NextResponse.json({
    status: "online",
    endpoint: "POST /api/sim/publish",
    required: ["title", "source", "date", "excerpt"],
    optional: ["title_en", "excerpt_en", "external_url", "image", "slug"],
  });
}
