import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description:
    "Hakamana es el primer Fondo de Litigación chileno con presencia en Latinoamérica. Conoce nuestra misión, visión y valores.",
  alternates: { canonical: "/quienes-somos" },
};

export default function QuienesSomosPage() {
  return (
    <>
      <PageHero title="Quiénes Somos" subtitle="El primer Fondo de Litigación chileno con presencia en Latinoamérica" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-text-light leading-relaxed mb-8">
              <strong className="text-text-dark">Hakamana</strong> es una palabra en lengua Rapa Nui que significa
              &quot;dar poder&quot;. Somos el primer fondo de litigación chileno, con presencia en Latinoamérica,
              dedicado al financiamiento de litigios y arbitrajes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
              <div className="bg-bg-light rounded-xl p-8">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3 font-heading">Nuestra Misión</h3>
                <p className="text-text-light leading-relaxed">
                  Evaluar cuidadosamente cada caso desde perspectivas legal y financiera para financiar litigios con
                  fundamento jurídico serio y probabilidades relevantes de éxito, democratizando el acceso a la justicia.
                </p>
              </div>

              <div className="bg-bg-light rounded-xl p-8">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3 font-heading">Nuestra Visión</h3>
                <p className="text-text-light leading-relaxed">
                  Ser el referente en financiamiento de litigios en Latinoamérica, apoyando a empresas que tienen
                  disputas legítimas pero carecen de los recursos para cubrir los costos de defensa, o que prefieren
                  externalizar el riesgo de la litigación.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-text-dark font-heading mb-6">Nuestro Modelo</h2>
            <p className="text-text-light leading-relaxed mb-6">
              Hakamana opera bajo el modelo internacionalmente conocido como <strong>Third Party Funding</strong>,
              nacido en el mundo anglosajón hace más de tres décadas. Este modelo permite a terceros financiar los
              costos de un litigio a cambio de una participación en los resultados positivos.
            </p>
            <p className="text-text-light leading-relaxed mb-6">
              Nuestro financiamiento es de tipo <strong>non-recourse</strong>: si el caso financiado no prospera, el
              fondo asume la totalidad de la pérdida. El cliente no tiene obligación de devolver los fondos invertidos.
            </p>

            <div className="bg-primary rounded-xl p-8 sm:p-12 my-12">
              <blockquote className="text-white/90 text-xl italic font-heading leading-relaxed">
                &quot;Hakamana permite democratizar el acceso a la justicia, nivelando la cancha para pequeñas y
                medianas empresas frente a grandes poderes económicos.&quot;
              </blockquote>
              <p className="text-accent mt-4 font-medium">— Carolina Plaza, Directora Ejecutiva</p>
            </div>

            <h2 className="text-2xl font-bold text-text-dark font-heading mb-6">Reconocimientos</h2>
            <p className="text-text-light leading-relaxed mb-6">
              Hakamana ha sido reconocido por las principales publicaciones internacionales del sector legal, incluyendo
              <strong> Chambers and Partners</strong>, <strong>Leaders League</strong> y{" "}
              <strong>Latin Lawyer</strong>, consolidándonos como referente regional en financiamiento de litigación.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/nuestro-equipo"
              className="inline-flex items-center px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
            >
              Conocer al equipo
            </Link>
            <Link
              href="/que-hacemos"
              className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Cómo funciona
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
