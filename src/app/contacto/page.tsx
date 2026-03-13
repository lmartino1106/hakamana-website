import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import {
  ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  GOOGLE_MAPS_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctenos para una consulta confidencial sobre financiamiento de litigios y arbitrajes. Hakamana, Fondo de Litigación.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        title="Contacto"
        subtitle="Contáctenos para una consulta confidencial y sin compromiso"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-text-dark mb-4">Información de contacto</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-light hover:text-accent transition-colors text-sm"
                    >
                      {ADDRESS}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-text-light hover:text-accent transition-colors text-sm">
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-text-light hover:text-accent transition-colors text-sm">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-bg-light rounded-xl p-6">
                <h3 className="font-bold text-text-dark mb-2">Confidencialidad</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Toda la información compartida a través de este formulario es tratada de forma estrictamente
                  confidencial, conforme a la Ley N° 21.719 de Protección de Datos Personales.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-bg-light rounded-xl p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-text-dark font-heading mb-6">Envíenos su consulta</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
