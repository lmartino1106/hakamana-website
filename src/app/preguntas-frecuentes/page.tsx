import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas a las preguntas más comunes sobre financiamiento de litigios, fondos de litigación y el modelo de Hakamana.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

export default function PreguntasFrecuentesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        title="Preguntas Frecuentes"
        subtitle="Todo lo que necesita saber sobre el financiamiento de litigios"
      />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-bg-light rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 sm:p-8 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-bold text-text-dark pr-4 font-heading">{faq.question}</h3>
                  <svg
                    className="w-5 h-5 text-accent shrink-0 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <p className="text-text-light leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 bg-primary rounded-xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-white font-heading mb-4">¿Tiene más preguntas?</h2>
            <p className="text-white/70 mb-8">
              Nuestro equipo está disponible para resolver todas sus dudas de forma confidencial.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
            >
              Contactar ahora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
