import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLdBreadcrumb } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "Terms and Conditions" : "Términos y Condiciones",
    description: isEn
      ? "Terms and conditions of use of the Hakamana - Litigation Fund website."
      : "Términos y condiciones de uso del sitio web de Hakamana - Fondo de Litigación.",
  };
}

export default async function TerminosCondiciones({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Inicio", href: "/" },
          { name: locale === "en" ? "Terms and Conditions" : "Términos y Condiciones", href: "/terminos-y-condiciones" },
        ]}
      />

      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-8">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-sm text-gray-400 mb-10">Última actualización: Marzo 2026</p>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de Hakamana - Fondo de Litigación (www.hakamana.cl),
                usted acepta quedar vinculado por estos términos y condiciones de uso. Si no está de acuerdo
                con alguno de estos términos, le solicitamos no utilizar este sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">2. Descripción del Servicio</h2>
              <p>
                Hakamana es un fondo de litigación que proporciona financiamiento para litigios y arbitrajes
                comerciales. Este sitio web tiene fines informativos y de contacto. La información presentada
                no constituye asesoría legal ni financiera.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos,
                imágenes, íconos, software y su compilación, es propiedad de Hakamana o de sus proveedores de
                contenido y está protegido por las leyes de propiedad intelectual de Chile y tratados internacionales.
              </p>
              <p>
                Queda prohibida la reproducción, distribución, modificación o uso no autorizado de cualquier
                contenido de este sitio sin el consentimiento previo y por escrito de Hakamana.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">4. Uso del Sitio Web</h2>
              <p>El usuario se compromete a:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Utilizar el sitio web de manera lícita y conforme a estos términos</li>
                <li>No intentar acceder a áreas restringidas del sitio</li>
                <li>No transmitir virus, malware o cualquier código de naturaleza destructiva</li>
                <li>No utilizar el sitio para enviar comunicaciones no solicitadas</li>
                <li>Proporcionar información veraz en los formularios de contacto</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">5. Limitación de Responsabilidad</h2>
              <p>
                Hakamana no garantiza que el sitio web esté libre de errores o que funcione de manera
                ininterrumpida. La información se proporciona &ldquo;tal cual&rdquo; sin garantías de ningún tipo.
              </p>
              <p>
                En ningún caso Hakamana será responsable por daños directos, indirectos, incidentales,
                especiales o consecuentes que resulten del uso o la imposibilidad de uso de este sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">6. Enlaces a Terceros</h2>
              <p>
                Este sitio puede contener enlaces a sitios web de terceros. Hakamana no tiene control sobre
                el contenido de dichos sitios y no asume responsabilidad alguna por ellos. La inclusión de
                enlaces no implica respaldo ni asociación con dichos sitios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">7. Protección de Datos</h2>
              <p>
                El tratamiento de datos personales se rige por nuestra{" "}
                <a href="/politica-de-privacidad" className="text-crimson hover:underline">Política de Privacidad</a>,
                en cumplimiento con la Ley N° 21.719 sobre Protección de Datos Personales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">8. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia
                derivada del uso de este sitio web será sometida a la jurisdicción de los tribunales
                ordinarios de la ciudad de Santiago, Chile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">9. Modificaciones</h2>
              <p>
                Hakamana se reserva el derecho de modificar estos términos en cualquier momento.
                Los cambios entrarán en vigor desde su publicación en este sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">10. Contacto</h2>
              <p>
                Para consultas sobre estos términos, contáctenos en{" "}
                <a href="mailto:contacto@hakamana.cl" className="text-crimson hover:underline">contacto@hakamana.cl</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
