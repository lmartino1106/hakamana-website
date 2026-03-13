import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: `Términos y condiciones de uso del sitio web de ${SITE_NAME}, Fondo de Litigación.`,
  alternates: { canonical: "/terminos-y-condiciones" },
};

export default function TerminosYCondicionesPage() {
  return (
    <>
      <PageHero title="Términos y Condiciones" subtitle="Condiciones de uso del sitio web" />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-text-light">
            <p className="text-sm text-text-muted">Última actualización: Marzo 2026</p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar el sitio web de {SITE_NAME} (en adelante, &quot;el Sitio&quot;), usted acepta estos
              términos y condiciones en su totalidad. Si no está de acuerdo con alguno de estos términos, le rogamos
              no utilizar el Sitio.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">2. Descripción del servicio</h2>
            <p>
              {SITE_NAME} es un fondo de litigación que financia gastos de procedimientos arbitrales y litigiosos. El
              Sitio tiene carácter informativo y no constituye asesoría legal, financiera ni de ningún otro tipo. La
              información contenida no debe ser interpretada como una oferta de servicios ni como consejo profesional.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">3. Propiedad intelectual</h2>
            <p>
              Todo el contenido del Sitio, incluyendo textos, gráficos, logotipos, imágenes, diseño y código fuente,
              es propiedad de {SITE_NAME} o de sus respectivos titulares y está protegido por las leyes de propiedad
              intelectual vigentes en Chile. Queda prohibida su reproducción, distribución o uso no autorizado.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">4. Uso del sitio web</h2>
            <p>El usuario se compromete a:</p>
            <ul>
              <li>Utilizar el Sitio de conformidad con la ley y estos términos</li>
              <li>No intentar acceder a áreas restringidas del Sitio</li>
              <li>No utilizar el Sitio para fines ilegales o no autorizados</li>
              <li>No interferir con el funcionamiento normal del Sitio</li>
              <li>Proporcionar información veraz y actualizada en los formularios</li>
            </ul>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">5. Formulario de contacto</h2>
            <p>
              La información enviada a través del formulario de contacto será tratada conforme a nuestra{" "}
              <a href="/politica-de-privacidad" className="text-accent">
                Política de Privacidad
              </a>
              . El envío de una consulta no genera relación contractual ni compromiso de financiamiento por parte de{" "}
              {SITE_NAME}.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">6. Confidencialidad</h2>
            <p>
              {SITE_NAME} tratará toda información recibida a través del Sitio de forma confidencial. Sin embargo, el
              envío de información a través de internet no garantiza seguridad absoluta, por lo que recomendamos no
              enviar información sensible o privilegiada a través del formulario de contacto.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">7. Limitación de responsabilidad</h2>
            <p>
              {SITE_NAME} no garantiza la disponibilidad continua del Sitio ni la ausencia de errores en su contenido.
              La información publicada tiene carácter meramente informativo y puede ser modificada sin previo aviso.
              {SITE_NAME} no será responsable por daños directos o indirectos derivados del uso del Sitio.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">8. Enlaces a terceros</h2>
            <p>
              El Sitio puede contener enlaces a sitios web de terceros. {SITE_NAME} no se responsabiliza del contenido,
              políticas de privacidad o prácticas de dichos sitios. Le recomendamos revisar los términos y políticas de
              cualquier sitio que visite.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">9. Ley aplicable y jurisdicción</h2>
            <p>
              Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia será sometida a
              los tribunales ordinarios de justicia de Santiago de Chile, renunciando las partes a cualquier otro fuero
              que pudiere corresponderles.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">10. Modificaciones</h2>
            <p>
              {SITE_NAME} se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones
              entrarán en vigor desde su publicación en el Sitio. El uso continuado del Sitio después de cualquier
              modificación constituye la aceptación de los nuevos términos.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">11. Contacto</h2>
            <p>
              Para consultas sobre estos términos y condiciones, puede contactarnos en:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
