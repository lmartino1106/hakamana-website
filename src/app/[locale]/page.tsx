import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/sections/Hero";
import TeamGrid from "@/components/sections/TeamGrid";
import PressGrid from "@/components/sections/PressGrid";
import AnimatedSection from "@/components/sections/AnimatedSection";
import { getAboutContent, getTeamMembers, getPressArticles } from "@/lib/locale-content";
import type { Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const about = getAboutContent(locale as Locale);
  const teamMembers = getTeamMembers(locale as Locale);
  const pressArticles = getPressArticles(locale as Locale);

  return (
    <>
      <Hero />

      {/* About Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-6">
                  {t("quienesSomosTitle")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  {about.description}
                </p>
                <p className="text-gray-500 leading-relaxed mb-8 italic">
                  {t("rapaNui")}
                </p>
                <Link
                  href="/quienes-somos"
                  className="inline-flex items-center text-crimson font-semibold hover:text-crimson-dark transition-colors group"
                >
                  {tc("conocerMas")}
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hakamana-quienes-somos-1.jpg"
                  alt="Equipo Hakamana"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Recognitions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy">
                {t("reconocimientos")}
              </h2>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              <Image src="/images/chambers_blue-400x250-1.png" alt="Chambers & Partners" width={160} height={100} className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <Image src="/images/Ranked-Firm-2022.png" alt="Leaders League - Ranked Firm 2022" width={120} height={120} className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <Image src="/images/RANKED_FIRM_2023_LEADERS.png" alt="Leaders League - Ranked Firm 2023" width={120} height={120} className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-4">
                {t("equipoTitle")}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                {t("equipoDesc")}
              </p>
            </div>
          </AnimatedSection>
          <TeamGrid members={teamMembers} />
        </div>
      </section>

      {/* What We Do Preview */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
                <Image
                  src="/images/que-hacemos.jpg"
                  alt="Que Hacemos - Hakamana"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-6">
                  {t("queHacemosTitle")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                  {t("queHacemosDesc")}
                </p>
                <p className="text-gray-500 leading-relaxed mb-8">
                  {t("queHacemosOutcome")}
                </p>
                <Link
                  href="/que-hacemos"
                  className="inline-flex items-center px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark transition-colors"
                >
                  {tc("comoFunciona")}
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Press Preview */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-4">
                {t("prensaTitle")}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                {t("prensaDesc")}
              </p>
            </div>
          </AnimatedSection>
          <PressGrid articles={pressArticles} limit={6} />
          <AnimatedSection className="text-center mt-10">
            <Link
              href="/prensa"
              className="inline-flex items-center text-crimson font-semibold hover:text-crimson-dark transition-colors group"
            >
              {tc("verTodas")}
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/hakamana.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-white mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {t("ctaDesc")}
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-crimson text-white font-semibold rounded-lg hover:bg-crimson-dark transition-colors text-lg"
            >
              {tc("contactarAhora")}
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
