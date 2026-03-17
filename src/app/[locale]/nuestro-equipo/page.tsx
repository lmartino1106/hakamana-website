import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/sections/AnimatedSection";
import TeamGrid from "@/components/sections/TeamGrid";
import { JsonLdBreadcrumb } from "@/components/seo/JsonLd";
import { getTeamMembers } from "@/lib/locale-content";
import type { Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "Our Team" : "Nuestro Equipo",
    description: isEn
      ? "Meet the Hakamana team: lawyers with litigation experience and a diverse investment committee."
      : "Conoce al equipo de Hakamana: abogados con experiencia en litigación y un comité de inversiones diverso.",
    openGraph: {
      title: isEn ? "Our Team | Hakamana - Litigation Fund" : "Nuestro Equipo | Hakamana - Fondo de Litigación",
      description: isEn ? "Team of professionals with extensive litigation and finance experience." : "Equipo de profesionales con amplia experiencia en litigación y finanzas.",
      images: ["/images/hakamana-quienes-somos-1.jpg"],
    },
  };
}

export default async function NuestroEquipo({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");
  const members = getTeamMembers(locale as Locale);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Inicio", href: "/" },
          { name: t("heroTitle"), href: "/nuestro-equipo" },
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

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeamGrid members={members} />
        </div>
      </section>
    </>
  );
}
