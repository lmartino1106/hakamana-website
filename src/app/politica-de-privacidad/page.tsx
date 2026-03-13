import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Política de privacidad y protección de datos personales de ${SITE_NAME}, conforme a la Ley N° 21.719 de Protección de Datos Personales de Chile.`,
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <>
      <PageHero title="Política de Privacidad" subtitle="Protección de datos personales conforme a la Ley N° 21.719" />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-text-light">
            <p className="text-sm text-text-muted">Última actualización: Marzo 2026</p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">1. Responsable del tratamiento</h2>
            <p>
              <strong>{SITE_NAME}</strong>, con domicilio en Raúl Labbé N° 12.613, Oficina 310, Lo Barnechea, Santiago,
              Chile, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.
            </p>
            <p>
              Correo de contacto para asuntos de privacidad:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent">
                {CONTACT_EMAIL}
              </a>
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos personales cuando usted los proporciona voluntariamente:</p>
            <ul>
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Nombre de la empresa (opcional)</li>
              <li>Contenido de su mensaje o consulta</li>
            </ul>
            <p>
              Adicionalmente, podemos recopilar datos de navegación de forma automatizada, como dirección IP, tipo de
              navegador, páginas visitadas y tiempo de permanencia, mediante cookies y tecnologías similares.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">3. Finalidad del tratamiento</h2>
            <p>Sus datos personales serán tratados para las siguientes finalidades:</p>
            <ul>
              <li>Responder a sus consultas y solicitudes de información</li>
              <li>Evaluar preliminarmente casos para potencial financiamiento</li>
              <li>Enviar comunicaciones relacionadas con nuestros servicios (solo con su consentimiento)</li>
              <li>Mejorar nuestro sitio web y la experiencia del usuario</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">4. Base legal del tratamiento</h2>
            <p>
              El tratamiento de sus datos se basa en: (a) su consentimiento expreso otorgado al enviar el formulario de
              contacto; (b) el interés legítimo de {SITE_NAME} en evaluar potenciales casos de financiamiento; (c) el
              cumplimiento de obligaciones legales aplicables; todo ello conforme a la Ley N° 21.719 sobre Protección de
              Datos Personales.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">5. Derechos del titular</h2>
            <p>
              De conformidad con la Ley N° 21.719, usted tiene derecho a:
            </p>
            <ul>
              <li><strong>Acceso:</strong> Conocer qué datos personales suyos están siendo tratados</li>
              <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos</li>
              <li><strong>Cancelación/Supresión:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios</li>
              <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en determinadas circunstancias</li>
              <li><strong>Portabilidad:</strong> Solicitar la entrega de sus datos en un formato estructurado y de uso común</li>
              <li><strong>Bloqueo:</strong> Solicitar la suspensión temporal del tratamiento</li>
            </ul>
            <p>
              Para ejercer estos derechos, puede contactarnos a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent">
                {CONTACT_EMAIL}
              </a>
              . Responderemos su solicitud dentro del plazo legal establecido.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">6. Cookies</h2>
            <p>
              Este sitio web utiliza cookies funcionales y analíticas. Las cookies funcionales son necesarias para el
              correcto funcionamiento del sitio. Las cookies analíticas nos ayudan a entender cómo los visitantes
              interactúan con el sitio. Puede gestionar sus preferencias de cookies a través del banner de cookies al
              ingresar al sitio.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">7. Transferencia de datos</h2>
            <p>
              Sus datos personales no serán transferidos a terceros sin su consentimiento, salvo que sea requerido por
              ley o por orden de autoridad competente. En caso de transferencia internacional de datos, se asegurarán
              las garantías adecuadas conforme a la legislación vigente.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">8. Seguridad de los datos</h2>
            <p>
              Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos personales contra acceso
              no autorizado, pérdida, alteración o destrucción, incluyendo cifrado de datos en tránsito y protocolos
              de seguridad en nuestros servidores.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">9. Período de conservación</h2>
            <p>
              Sus datos personales serán conservados por el tiempo necesario para cumplir con las finalidades descritas
              en esta política, y en todo caso, durante los plazos legales aplicables. Una vez cumplidas las finalidades,
              los datos serán eliminados de forma segura.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">10. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier modificación será publicada
              en esta página con la fecha de última actualización. Le recomendamos revisarla periódicamente.
            </p>

            <h2 className="text-xl font-bold text-text-dark font-heading mt-8">11. Contacto</h2>
            <p>
              Para consultas relacionadas con esta política de privacidad o el tratamiento de sus datos personales,
              puede contactarnos en:{" "}
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
