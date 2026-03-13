import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { PRESS_ARTICLES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Prensa",
  description:
    "Noticias y artículos sobre Hakamana en los principales medios de comunicación: El Mercurio, La Tercera, Capital, Pulso y Chambers and Partners.",
  alternates: { canonical: "/prensa" },
};

export default function PrensaPage() {
  return (
    <>
      <PageHero
        title="Prensa"
        subtitle="Hakamana en los medios de comunicación"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {PRESS_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="bg-bg-light rounded-xl p-8 sm:p-10 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-accent text-sm font-semibold">{article.source}</span>
                      <span className="text-text-muted text-sm">
                        {new Date(article.date).toLocaleDateString("es-CL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-text-dark font-heading mb-3 leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-text-light leading-relaxed">{article.excerpt}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
