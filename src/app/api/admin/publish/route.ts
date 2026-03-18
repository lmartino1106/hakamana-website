import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ArticleInput = {
  title: string;
  title_en?: string;
  source: string;
  date: string;
  excerpt: string;
  excerpt_en?: string;
  external_url?: string | null;
  image?: string | null;
  slug: string;
};

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
    const body = await req.json();
    const { password, article }: { password: string; article: ArticleInput } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase no configurado" }, { status: 500 });
    }

    if (!article.title || !article.source || !article.date || !article.excerpt) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(article.date)) {
      return NextResponse.json({ error: "Fecha inválida. Formato: YYYY-MM-DD" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const slug = article.slug || generateSlug(article.title);

    // Check for duplicate slug
    const { data: existing } = await supabase
      .from("prensa")
      .select("slug")
      .eq("slug", slug)
      .single();

    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const newArticle = {
      slug: finalSlug,
      title: article.title.trim(),
      title_en: article.title_en?.trim() || "",
      source: article.source.trim(),
      date: article.date.trim(),
      excerpt: article.excerpt.trim(),
      excerpt_en: article.excerpt_en?.trim() || "",
      image: article.image || "/images/hakamana-fondo-de-litigacion-01.png",
      external_url: article.external_url || null,
      published: true,
    };

    const { data, error } = await supabase.from("prensa").insert(newArticle).select().single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, article: data });
  } catch (error) {
    console.error("Publish API error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
