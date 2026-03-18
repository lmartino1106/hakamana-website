import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/sections/AnimatedSection";
import PressGrid from "@/components/sections/PressGrid";
import { JsonLdBreadcrumb, JsonLdNewsArticle, JsonLdSpeakable } from "@/components/seo/JsonLd";
import { getAllPressArticles } from "@/lib/press-service";
import { SITE_CONFIG } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "Press" : "Prensa",
    description: isEn
      ? "Hakamana in the media: news, recognitions and articles about the first Chilean litigation fund."
      : "Hakamana en los medios: noticias, reconocimientos y artículos sobre el primer fondo de litigación chileno.",
    openGraph: {
      title: isEn ? "Press | Hakamana - Litigation Fund" : "Prensa | Hakamana - Fondo de Litigación",
      description: isEn ? "Hakamana in the media." : "Hakamana en los medios de comunicación.",
    },
  };
}

export default async function Prensa({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("press");
  const isEn = locale === "en";

  const allArticles = await getAllPressArticles();

  const articles = allArticles.map((article) => ({
    ...article,
    title: isEn ? article.titleEn : article.title,
    excerpt: isEn ? article.excerptEn : article.excerpt,
  }));

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: isEn ? "Home" : "Inicio", href: "/" },
          { name: t("heroTitle"), href: "/prensa" },
        ]}
      />
      <JsonLdSpeakable
        name={isEn ? "Press - Hakamana" : "Prensa - Hakamana"}
        url={`${SITE_CONFIG.url}/${locale}/prensa`}
        cssSelectors={["h1", "h3", ".press-excerpt"]}
      />
      {allArticles.map((article) => (
        <JsonLdNewsArticle key={article.slug} article={article} locale={locale} />
      ))}

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-navy">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/hakamana.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white mb-4">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {t("heroDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* All Press */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PressGrid articles={articles} />
        </div>
      </section>
    </>
  );
}
