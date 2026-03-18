import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/sections/AnimatedSection";
import { JsonLdBreadcrumb, JsonLdSpeakable } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { getAboutContent } from "@/lib/locale-content";
import type { Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "About Us" : "Quiénes Somos",
    description: isEn
      ? "Hakamana is the first Chilean Litigation Fund with presence in LATAM. Learn about our mission, vision and trajectory."
      : "Hakamana es el primer Fondo de Litigación chileno con presencia en LATAM. Conoce nuestra misión, visión y trayectoria en financiamiento de litigios.",
    openGraph: {
      title: isEn ? "About Us | Hakamana - Litigation Fund" : "Quiénes Somos | Hakamana - Fondo de Litigación",
      description: isEn ? "First Chilean Litigation Fund with presence in LATAM." : "Primer Fondo de Litigación chileno con presencia en LATAM.",
      images: ["/images/hakamana-quienes-somos-1.jpg"],
    },
  };
}

export default async function QuienesSomos({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const about = getAboutContent(locale as Locale);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: t("heroTitle") === "About Us" ? "Home" : "Inicio", href: "/" },
          { name: t("heroTitle"), href: "/quienes-somos" },
        ]}
      />
      <JsonLdSpeakable
        name={locale === "en" ? "About Us - Hakamana" : "Quiénes Somos - Hakamana"}
        url={`${SITE_CONFIG.url}/${locale}/quienes-somos`}
        cssSelectors={["h1", "h2", "p"]}
      />

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

      {/* Description */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {about.description}
              </p>
              <p className="text-base text-gray-500 leading-relaxed italic border-l-4 border-crimson pl-4">
                {t("rapaNui")}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative h-80 sm:h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hakamana-quienes-somos-1.jpg"
                  alt="Equipo Hakamana"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 h-full">
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-navy" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-4">
                  {t("mision")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {about.mission}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 h-full">
                <div className="w-14 h-14 bg-crimson/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-crimson" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-4">
                  {t("vision")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {about.vision}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Recognitions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-10">
              {t("reconocimientos")}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
              <Image src="/images/chambers_blue-400x250-1.png" alt="Chambers & Partners" width={180} height={120} className="h-20 w-auto" />
              <Image src="/images/Ranked-Firm-2022.png" alt="Ranked Firm 2022" width={140} height={140} className="h-24 w-auto" />
              <Image src="/images/RANKED_FIRM_2023_LEADERS.png" alt="Ranked Firm 2023" width={140} height={140} className="h-24 w-auto" />
              <Image src="/images/leaders-league.jpg" alt="Leaders League" width={180} height={80} className="h-12 w-auto" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Photo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/que-hacemos.jpg"
                alt="Equipo Hakamana en reunion"
                fill
                className="object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
