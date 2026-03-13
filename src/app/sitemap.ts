import { MetadataRoute } from "next";
import { TEAM_MEMBERS } from "@/lib/constants";

const baseUrl = "https://www.hakamana.cl";

function createEntry(
  path: string,
  changeFrequency: "monthly" | "weekly" | "yearly",
  priority: number
) {
  return {
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        es: `${baseUrl}/es${path}`,
        en: `${baseUrl}/en${path}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    createEntry("", "monthly", 1),
    createEntry("/quienes-somos", "monthly", 0.8),
    createEntry("/nuestro-equipo", "monthly", 0.8),
    createEntry("/que-hacemos", "monthly", 0.8),
    createEntry("/preguntas-frecuentes", "monthly", 0.7),
    createEntry("/contacto", "monthly", 0.9),
    createEntry("/prensa", "weekly", 0.7),
    createEntry("/politica-de-privacidad", "yearly", 0.3),
    createEntry("/terminos-y-condiciones", "yearly", 0.3),
  ];

  const teamPages = TEAM_MEMBERS.map((member) =>
    createEntry(`/nuestro-equipo/${member.slug}`, "monthly", 0.6)
  );

  return [...staticPages, ...teamPages];
}
