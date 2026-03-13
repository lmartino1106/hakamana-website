import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/sections/AnimatedSection";
import { JsonLdBreadcrumb } from "@/components/seo/JsonLd";
import { TEAM_MEMBERS } from "@/lib/constants";
import { getTeamMember } from "@/lib/locale-content";
import type { Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const member = getTeamMember(slug, locale as Locale);
  if (!member) return {};

  return {
    title: `${member.name} - ${member.role}`,
    description: member.bio,
    openGraph: {
      title: `${member.name} | Hakamana`,
      description: member.bio,
      images: [member.image],
    },
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const member = getTeamMember(slug, locale as Locale);
  const tc = await getTranslations("common");

  if (!member) notFound();

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Inicio", href: "/" },
          { name: locale === "en" ? "Our Team" : "Nuestro Equipo", href: "/nuestro-equipo" },
          { name: member.name, href: `/nuestro-equipo/${member.slug}` },
        ]}
      />

      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              href="/nuestro-equipo"
              className="inline-flex items-center text-sm text-gray-500 hover:text-crimson transition-colors mb-8"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {tc("volverEquipo")}
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            <AnimatedSection className="md:col-span-1">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="md:col-span-2">
              <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-2">
                {member.name}
              </h1>
              <p className="text-lg text-crimson font-medium mb-8">
                {member.role}
              </p>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {member.bio}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
