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
    title: isEn ? "Terms and Conditions" : "Terminos y Condiciones",
    description: isEn
      ? "Terms and conditions of use of the Hakamana - Litigation Fund website."
      : "Terminos y condiciones de uso del sitio web de Hakamana - Fondo de Litigacion.",
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
          { name: locale === "en" ? "Terms and Conditions" : "Terminos y Condiciones", href: "/terminos-y-condiciones" },
        ]}
      />

      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-8">
            Terminos y Condiciones de Uso
          </h1>
          <p className="text-sm text-gray-400 mb-10">Ultima actualizacion: Marzo 2026</p>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">1. Aceptacion de los Terminos</h2>
              <p>
                Al acceder y utilizar el sitio web de Hakamana - Fondo de Litigacion (www.hakamana.cl),
                usted acepta quedar vinculado por estos terminos y condiciones de uso. Si no esta de acuerdo
                con alguno de estos terminos, le solicitamos no utilizar este sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">2. Descripcion del Servicio</h2>
              <p>
                Hakamana es un fondo de litigacion que proporciona financiamiento para litigios y arbitrajes
                comerciales. Este sitio web tiene fines informativos y de contacto. La informacion presentada
                no constituye asesoria legal ni financiera.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de este sitio web, incluyendo pero no limitado a textos, graficos, logotipos,
                imagenes, iconos, software y su compilacion, es propiedad de Hakamana o de sus proveedores de
                contenido y esta protegido por las leyes de propiedad intelectual de Chile y tratados internacionales.
              </p>
              <p>
                Queda prohibida la reproduccion, distribucion, modificacion o uso no autorizado de cualquier
                contenido de este sitio sin el consentimiento previo y por escrito de Hakamana.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">4. Uso del Sitio Web</h2>
              <p>El usuario se compromete a:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Utilizar el sitio web de manera licita y conforme a estos terminos</li>
                <li>No intentar acceder a areas restringidas del sitio</li>
                <li>No transmitir virus, malware o cualquier codigo de naturaleza destructiva</li>
                <li>No utilizar el sitio para enviar comunicaciones no solicitadas</li>
                <li>Proporcionar informacion veraz en los formularios de contacto</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">5. Limitacion de Responsabilidad</h2>
              <p>
                Hakamana no garantiza que el sitio web este libre de errores o que funcione de manera
                ininterrumpida. La informacion se proporciona &ldquo;tal cual&rdquo; sin garantias de ningun tipo.
              </p>
              <p>
                En ningun caso Hakamana sera responsable por danos directos, indirectos, incidentales,
                especiales o consecuentes que resulten del uso o la imposibilidad de uso de este sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">6. Enlaces a Terceros</h2>
              <p>
                Este sitio puede contener enlaces a sitios web de terceros. Hakamana no tiene control sobre
                el contenido de dichos sitios y no asume responsabilidad alguna por ellos. La inclusion de
                enlaces no implica respaldo ni asociacion con dichos sitios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">7. Proteccion de Datos</h2>
              <p>
                El tratamiento de datos personales se rige por nuestra{" "}
                <a href="/politica-de-privacidad" className="text-crimson hover:underline">Politica de Privacidad</a>,
                en cumplimiento con la Ley N° 21.719 sobre Proteccion de Datos Personales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">8. Ley Aplicable y Jurisdiccion</h2>
              <p>
                Estos terminos se rigen por las leyes de la Republica de Chile. Cualquier controversia
                derivada del uso de este sitio web sera sometida a la jurisdiccion de los tribunales
                ordinarios de la ciudad de Santiago, Chile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">9. Modificaciones</h2>
              <p>
                Hakamana se reserva el derecho de modificar estos terminos en cualquier momento.
                Los cambios entraran en vigor desde su publicacion en este sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">10. Contacto</h2>
              <p>
                Para consultas sobre estos terminos, contactenos en{" "}
                <a href="mailto:contacto@hakamana.cl" className="text-crimson hover:underline">contacto@hakamana.cl</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
