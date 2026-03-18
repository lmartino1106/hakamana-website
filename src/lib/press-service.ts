import { getSupabaseClient } from "./supabase";
import { PRESS_ARTICLES, type PressArticle } from "./constants";

export interface SupabasePressArticle {
  id: number;
  slug: string;
  title: string;
  title_en: string;
  source: string;
  date: string;
  excerpt: string;
  excerpt_en: string;
  image: string;
  external_url: string | null;
  published: boolean;
  created_at: string;
}

function supabaseToPress(row: SupabasePressArticle): PressArticle {
  return {
    slug: row.slug,
    title: row.title,
    titleEn: row.title_en,
    source: row.source,
    date: row.date,
    excerpt: row.excerpt,
    excerptEn: row.excerpt_en,
    image: row.image,
    externalUrl: row.external_url || undefined,
  };
}

export async function getAllPressArticles(): Promise<PressArticle[]> {
  const supabase = getSupabaseClient();

  if (!supabase) return PRESS_ARTICLES;

  try {
    const { data, error } = await supabase
      .from("prensa")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });

    if (error || !data || data.length === 0) {
      return PRESS_ARTICLES;
    }

    return (data as SupabasePressArticle[]).map(supabaseToPress);
  } catch {
    return PRESS_ARTICLES;
  }
}
