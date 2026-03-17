import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/sections/AnimatedSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import { JsonLdBreadcrumb } from "@/components/seo/JsonLd";
import { getWhatWeDo } from "@/lib/locale-content";
import type { Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "What We Do" : "Qué Hacemos",
    description: isEn
      ? "We finance commercial litigation and arbitration. Learn about our evaluation process and non-recourse financing."
      : "Financiamos litigios y arbitrajes comerciales. Conoce nuestro proceso de evaluación y financiamiento sin recurso.",
    openGraph: {
      title: isEn ? "What We Do | Hakamana - Litigation Fund" : "Qué Hacemos | Hakamana - Fondo de Litigación",
      description: isEn ? "Evaluation process and litigation financing." : "Proceso de evaluación y financiamiento de litigios.",
      images: ["/images/que-hacemos.jpg"],
    },
  };
}

export default async function QueHacemos({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("whatWeDo");
  const whatWeDo = getWhatWeDo(locale as Locale);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Inicio", href: "/" },
          { name: t("heroTitle"), href: "/que-hacemos" },
        ]}
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
          <div className="max-w-3xl mx-auto text-center mb-16">
            <AnimatedSection>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {whatWeDo.intro}
              </p>
              <p className="text-base text-gray-500 leading-relaxed">
                {whatWeDo.dueDiligence}
              </p>
            </AnimatedSection>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <AnimatedSection>
              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-navy mb-2">{t("sinRecurso")}</h3>
                <p className="text-gray-500 text-sm">{t("sinRecursoDesc")}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-crimson" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-navy mb-2">{t("confidencial")}</h3>
                <p className="text-gray-500 text-sm">{t("confidencialDesc")}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-navy mb-2">{t("expertos")}</h3>
                <p className="text-gray-500 text-sm">{t("expertosDesc")}</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Process Steps */}
          <AnimatedSection>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-10 text-center">
              {t("proceso")}
            </h2>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto">
            <ProcessSteps steps={whatWeDo.steps} />
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-6">
                {t("resultado")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {whatWeDo.outcome}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
