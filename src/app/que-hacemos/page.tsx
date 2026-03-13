import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Qué Hacemos",
  description:
    "Hakamana financia litigios y arbitrajes evaluando cada caso desde perspectivas legal y financiera. Modelo non-recourse: si el caso se pierde, asumimos la pérdida.",
  alternates: { canonical: "/que-hacemos" },
};

export default function QueHacemosPage() {
  return (
    <>
      <PageHero
        title="Qué Hacemos"
        subtitle="Financiamiento de litigios y arbitrajes con fundamentos jurídicos sólidos"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-text-light leading-relaxed mb-16">
            Hakamana analiza cada caso cuidadosamente desde perspectivas legal y financiera para financiar aquellos
            litigios arbitrales que presenten un fundamento jurídico serio y probabilidades relevantes de éxito.
          </p>

          {/* Process */}
          <div className="space-y-12 mb-20">
            {[
              {
                step: "01",
                title: "Recepción y análisis preliminar",
                description:
                  "Recibimos su consulta y realizamos un análisis preliminar del caso para determinar si cumple con los criterios básicos de financiamiento. Esta evaluación inicial es confidencial y sin costo.",
              },
              {
                step: "02",
                title: "Due Diligence legal y financiero",
                description:
                  "Nuestro equipo de abogados especializados realiza un riguroso due diligence legal, evaluando los fundamentos jurídicos, la jurisprudencia relevante y las probabilidades de éxito. Paralelamente, se realiza un análisis financiero del caso.",
              },
              {
                step: "03",
                title: "Comité de Inversiones",
                description:
                  "El caso es presentado ante nuestro Comité de Inversiones, compuesto por profesionales diversos que evalúan los antecedentes y toman la decisión de financiamiento de manera colegiada.",
              },
              {
                step: "04",
                title: "Financiamiento",
                description:
                  "Una vez aprobado, Hakamana financia los gastos del litigio: honorarios legales, costos administrativos del procedimiento arbitral y gastos de peritajes. El financiamiento se estructura de acuerdo a las necesidades específicas del caso.",
              },
              {
                step: "05",
                title: "Seguimiento y resultado",
                description:
                  "Realizamos un seguimiento continuo del caso financiado. Si el resultado es favorable, recuperamos nuestra inversión más la rentabilidad acordada. Si el resultado es desfavorable, asumimos la pérdida total.",
              },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-6 sm:gap-10">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent font-heading">{item.step}</span>
                  </div>
                  {i < 4 && <div className="w-px h-12 bg-accent/20 mx-auto mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-text-dark font-heading mb-3">{item.title}</h3>
                  <p className="text-text-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-green-50 border border-green-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Si ganamos</h3>
              <p className="text-green-700">
                El fondo recupera su inversión inicial más una rentabilidad previamente acordada con el cliente.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Si perdemos</h3>
              <p className="text-red-700">
                El fondo asume la pérdida total de la inversión realizada. El cliente no debe devolver los fondos
                invertidos (non-recourse).
              </p>
            </div>
          </div>

          {/* What we finance */}
          <h2 className="text-2xl font-bold text-text-dark font-heading mb-6">¿Qué financiamos?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Honorarios legales", desc: "Costos de representación legal especializada" },
              { title: "Costos administrativos", desc: "Gastos del procedimiento arbitral" },
              { title: "Peritajes", desc: "Informes periciales y evaluaciones técnicas" },
            ].map((item) => (
              <div key={item.title} className="bg-bg-light rounded-xl p-6 text-center">
                <h4 className="font-bold text-text-dark mb-2">{item.title}</h4>
                <p className="text-text-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors text-lg"
            >
              Consultar un caso
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
