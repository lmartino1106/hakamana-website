import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { TEAM_MEMBERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nuestro Equipo",
  description:
    "Conoce al equipo directivo de Hakamana: abogados, ingenieros y profesionales con décadas de experiencia en litigación, arbitraje y finanzas.",
  alternates: { canonical: "/nuestro-equipo" },
};

export default function NuestroEquipoPage() {
  return (
    <>
      <PageHero
        title="Nuestro Equipo"
        subtitle="Abogados con experiencia considerable en litigación y un comité de inversiones diverso profesionalmente"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-text-light text-lg max-w-3xl mx-auto mb-16">
            El due diligence legal es clave y por esa razón abogados con experiencia considerable en litigación y un
            comité de inversiones diverso profesionalmente y conocedor de la realidad nacional toman las decisiones de
            inversión.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.slug}
                className="bg-bg-light rounded-xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <span className="text-2xl font-bold text-primary/40 font-heading group-hover:text-accent/60 transition-colors">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-text-dark font-heading">{member.name}</h3>
                  <p className="text-accent font-medium mt-1 mb-4">{member.role}</p>
                  <p className="text-text-light text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
