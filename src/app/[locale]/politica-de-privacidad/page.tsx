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
    title: isEn ? "Privacy Policy" : "Politica de Privacidad",
    description: isEn
      ? "Privacy and personal data protection policy of Hakamana, in compliance with Law 21.719."
      : "Politica de privacidad y proteccion de datos personales de Hakamana, en cumplimiento con la Ley 21.719.",
  };
}

export default async function PoliticaPrivacidad({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Inicio", href: "/" },
          { name: locale === "en" ? "Privacy Policy" : "Politica de Privacidad", href: "/politica-de-privacidad" },
        ]}
      />

      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] font-bold text-navy mb-8">
            Politica de Privacidad y Proteccion de Datos Personales
          </h1>
          <p className="text-sm text-gray-400 mb-10">Ultima actualizacion: Marzo 2026</p>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">1. Responsable del Tratamiento</h2>
              <p>
                Hakamana - Fondo de Litigacion (en adelante, &ldquo;Hakamana&rdquo;), con domicilio en Raul Labbe N° 12.613,
                oficina 310, Lo Barnechea, Santiago, Chile, es el responsable del tratamiento de los datos personales
                recopilados a traves de este sitio web, en conformidad con la Ley N° 21.719 sobre Proteccion de Datos Personales
                y su reglamento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">2. Datos Personales Recopilados</h2>
              <p>Recopilamos los siguientes datos personales:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nombre completo</li>
                <li>Correo electronico</li>
                <li>Numero de telefono (opcional)</li>
                <li>Nombre de empresa (opcional)</li>
                <li>Contenido del mensaje o consulta</li>
                <li>Datos de navegacion (cookies, direccion IP, tipo de navegador)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">3. Finalidad del Tratamiento</h2>
              <p>Los datos personales recopilados seran utilizados para:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Responder consultas y solicitudes de evaluacion de casos</li>
                <li>Gestionar la relacion comercial con potenciales clientes</li>
                <li>Enviar informacion relevante sobre nuestros servicios (con consentimiento previo)</li>
                <li>Mejorar la experiencia de navegacion en nuestro sitio web</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">4. Base Juridica del Tratamiento</h2>
              <p>
                El tratamiento de datos se realiza bajo las siguientes bases juridicas conforme a la Ley 21.719:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Consentimiento:</strong> Otorgado al completar el formulario de contacto y aceptar esta politica</li>
                <li><strong>Interes legitimo:</strong> Para la gestion de consultas y evaluacion de potenciales casos</li>
                <li><strong>Cumplimiento legal:</strong> Para satisfacer obligaciones legales aplicables</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">5. Derechos ARCO del Titular</h2>
              <p>
                De acuerdo con la Ley 21.719, usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Acceso:</strong> Conocer que datos personales suyos estan siendo tratados</li>
                <li><strong>Rectificacion:</strong> Solicitar la correccion de datos inexactos o incompletos</li>
                <li><strong>Cancelacion/Supresion:</strong> Solicitar la eliminacion de sus datos personales</li>
                <li><strong>Oposicion:</strong> Oponerse al tratamiento de sus datos en ciertos casos</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado y de uso comun</li>
              </ul>
              <p>
                Para ejercer estos derechos, puede contactarnos a traves de <a href="mailto:contacto@hakamana.cl" className="text-crimson hover:underline">contacto@hakamana.cl</a>.
                Responderemos su solicitud dentro de los plazos establecidos por la ley.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">6. Transferencia Internacional de Datos</h2>
              <p>
                Sus datos podrian ser transferidos a proveedores de servicios tecnologicos ubicados fuera de Chile
                (por ejemplo, servicios de alojamiento web y correo electronico). En tales casos, nos aseguramos
                de que dichos proveedores cumplan con estandares de proteccion de datos equivalentes a los
                establecidos por la legislacion chilena.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">7. Periodo de Conservacion</h2>
              <p>
                Los datos personales seran conservados durante el tiempo necesario para cumplir con las finalidades
                para las que fueron recopilados, y en todo caso, durante los plazos legales que correspondan.
                Los datos de contacto seran eliminados a solicitud del titular o cuando ya no sean necesarios
                para la finalidad para la cual fueron recopilados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">8. Uso de Cookies</h2>
              <p>
                Este sitio web utiliza cookies para mejorar la experiencia de navegacion. Las cookies esenciales
                son necesarias para el funcionamiento del sitio. Las cookies analiticas y de marketing requieren
                su consentimiento previo, el cual puede otorgar o rechazar a traves del banner de cookies.
              </p>
              <p>
                Puede configurar su navegador para rechazar cookies, aunque esto podria afectar la funcionalidad
                del sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">9. Seguridad de los Datos</h2>
              <p>
                Hakamana implementa medidas de seguridad tecnicas y organizativas apropiadas para proteger
                los datos personales contra el acceso no autorizado, la alteracion, divulgacion o destruccion,
                incluyendo cifrado de datos en transito y en reposo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">10. Modificaciones</h2>
              <p>
                Hakamana se reserva el derecho de modificar esta politica de privacidad. Cualquier cambio
                sera publicado en esta pagina con la fecha de ultima actualizacion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-navy">11. Contacto</h2>
              <p>
                Para consultas relacionadas con la proteccion de datos personales, puede contactarnos en:
              </p>
              <ul className="list-none space-y-1">
                <li><strong>Email:</strong> <a href="mailto:contacto@hakamana.cl" className="text-crimson hover:underline">contacto@hakamana.cl</a></li>
                <li><strong>Telefono:</strong> +56 9 7799 7077</li>
                <li><strong>Direccion:</strong> Raul Labbe N° 12.613, oficina 310, Lo Barnechea, Santiago, Chile</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
