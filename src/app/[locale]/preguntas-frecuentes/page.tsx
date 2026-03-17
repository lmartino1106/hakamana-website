import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/sections/AnimatedSection";
import Accordion from "@/components/ui/Accordion";
import { JsonLdBreadcrumb, JsonLdFAQ } from "@/components/seo/JsonLd";
import { getFaqs } from "@/lib/locale-content";
import type { Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "FAQ" : "Preguntas Frecuentes",
    description: isEn
      ? "Answers to common questions about litigation funds, commercial arbitration and non-recourse financing."
      : "Resuelve tus dudas sobre fondos de litigación, arbitraje comercial y financiamiento sin recurso.",
    openGraph: {
      title: isEn ? "FAQ | Hakamana - Litigation Fund" : "Preguntas Frecuentes | Hakamana - Fondo de Litigación",
      description: isEn ? "FAQ about litigation funds and arbitration financing." : "FAQ sobre fondos de litigación y financiamiento de arbitrajes.",
    },
  };
}

export default async function PreguntasFrecuentes({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const faqs = getFaqs(locale as Locale);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Inicio", href: "/" },
          { name: t("heroTitle"), href: "/preguntas-frecuentes" },
        ]}
      />
      <JsonLdFAQ />

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

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
