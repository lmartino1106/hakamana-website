import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/sections/AnimatedSection";
import ContactForm from "@/components/ui/ContactForm";
import { JsonLdBreadcrumb, JsonLdLocalBusiness } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "Contact" : "Contacto",
    description: isEn
      ? "Contact Hakamana to evaluate your case confidentially. Litigation and arbitration financing in Chile and LATAM."
      : "Contacte a Hakamana para evaluar su caso de forma confidencial. Financiamiento de litigios y arbitrajes en Chile y LATAM.",
    openGraph: {
      title: isEn ? "Contact | Hakamana - Litigation Fund" : "Contacto | Hakamana - Fondo de Litigacion",
      description: isEn ? "Contact Hakamana to evaluate your case confidentially." : "Contacte a Hakamana para evaluar su caso de forma confidencial.",
    },
  };
}

export default async function Contacto({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Inicio", href: "/" },
          { name: t("heroTitle"), href: "/contacto" },
        ]}
      />
      <JsonLdLocalBusiness />

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

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-6">
                  {t("envieConsulta")}
                </h2>
                <ContactForm />
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2}>
                <div className="bg-gray-50 rounded-2xl p-8 sticky top-28">
                  <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-6">
                    {t("infoTitle")}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy text-sm">{t("direccion")}</h3>
                        <a
                          href={SITE_CONFIG.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 text-sm hover:text-crimson transition-colors"
                        >
                          {SITE_CONFIG.address.street}<br />
                          {SITE_CONFIG.address.city}, {SITE_CONFIG.address.region}<br />
                          {SITE_CONFIG.address.country}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy text-sm">{t("telefono")}</h3>
                        <a href={`tel:${SITE_CONFIG.phone}`} className="text-gray-500 text-sm hover:text-crimson transition-colors">
                          {SITE_CONFIG.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy text-sm">{t("email")}</h3>
                        <a href={`mailto:${SITE_CONFIG.email}`} className="text-gray-500 text-sm hover:text-crimson transition-colors">
                          {SITE_CONFIG.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="mt-8 rounded-xl overflow-hidden h-48">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.5!2d-70.5!3d-33.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIxJzAwLjAiUyA3MMKwMzAnMDAuMCJX!5e0!3m2!1ses!2scl!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicacion Hakamana"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
