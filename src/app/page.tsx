import Link from "next/link";
import { TEAM_MEMBERS, PRESS_ARTICLES, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/30 to-primary" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-6 animate-fade-in">
              Primer Fondo de Litigación de Chile
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-heading leading-tight animate-fade-in-up">
              Damos poder a quienes buscan justicia
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed animate-fade-in-up animate-delay-200">
              Hakamana financia litigios y arbitrajes con fundamentos jurídicos sólidos, permitiendo el acceso a la
              justicia sin barreras económicas.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors text-lg"
              >
                Consultar un caso
              </Link>
              <Link
                href="/que-hacemos"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-lg"
              >
                Cómo funciona
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent uppercase tracking-widest text-sm font-medium mb-4">Quiénes Somos</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-dark font-heading mb-6">
                El primer fondo de litigación chileno con presencia en Latinoamérica
              </h2>
              <p className="text-text-light leading-relaxed mb-6">
                <strong className="text-text-dark">Hakamana</strong> es una palabra Rapa Nui que significa &quot;dar
                poder&quot;. Financiamos los gastos del litigio, incluyendo honorarios legales, costos administrativos y
                peritajes, de forma non-recourse.
              </p>
              <p className="text-text-light leading-relaxed mb-8">
                Nuestra misión es evaluar cuidadosamente cada caso desde perspectivas legal y financiera para respaldar
                litigios con fundamento jurídico serio y probabilidades relevantes de éxito.
              </p>
              <Link
                href="/quienes-somos"
                className="inline-flex items-center text-accent font-medium hover:text-accent-dark transition-colors group"
              >
                Conocer más sobre nosotros
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-bg-light rounded-2xl p-10 sm:p-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-text-dark mb-2">Misión</h3>
                  <p className="text-text-light">
                    Financiar litigios con fundamentos jurídicos sólidos, democratizando el acceso a la justicia en
                    Chile y Latinoamérica.
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-bold text-text-dark mb-2">Visión</h3>
                  <p className="text-text-light">
                    Ser el referente en financiamiento de litigios en Latinoamérica, apoyando a empresas con disputas
                    legítimas que carecen de recursos para cubrir costos de defensa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-widest text-sm font-medium mb-4">Qué Hacemos</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark font-heading">Cómo funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Evaluación del caso",
                description:
                  "Analizamos cada caso desde perspectivas legal y financiera, realizando un riguroso due diligence para determinar sus fundamentos y probabilidades de éxito.",
              },
              {
                step: "02",
                title: "Financiamiento",
                description:
                  "Si el caso es aprobado por nuestro Comité de Inversiones, financiamos honorarios legales, costos administrativos y gastos de peritaje.",
              },
              {
                step: "03",
                title: "Resultado",
                description:
                  "Si ganamos, recuperamos nuestra inversión más una rentabilidad acordada. Si perdemos, asumimos la pérdida total. El cliente no debe devolver los fondos.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-5xl font-bold text-accent/20 font-heading">{item.step}</span>
                <h3 className="text-xl font-bold text-text-dark mt-4 mb-3">{item.title}</h3>
                <p className="text-text-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/que-hacemos"
              className="inline-flex items-center px-8 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
            >
              Más detalles
            </Link>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-widest text-sm font-medium mb-4">Nuestro Equipo</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark font-heading">
              Profesionales con experiencia
            </h2>
            <p className="mt-4 text-text-light max-w-2xl mx-auto">
              Abogados con experiencia considerable en litigación y un comité de inversiones diverso que toma las
              decisiones de inversión.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.slice(0, 4).map((member) => (
              <div key={member.slug} className="text-center group">
                <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <span className="text-3xl font-bold text-primary/40 font-heading group-hover:text-accent/60 transition-colors">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-bold text-text-dark">{member.name}</h3>
                <p className="text-sm text-accent mt-1">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/nuestro-equipo"
              className="inline-flex items-center text-accent font-medium hover:text-accent-dark transition-colors group"
            >
              Ver equipo completo
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-text-muted text-sm uppercase tracking-widest mb-8">Reconocimientos</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-60">
            {["Chambers & Partners 2023", "Chambers & Partners 2022", "Chambers & Partners 2021", "Leaders League", "Latin Lawyer"].map(
              (award) => (
                <div key={award} className="text-center">
                  <p className="text-sm font-medium text-text-dark">{award}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Press preview */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-widest text-sm font-medium mb-4">Prensa</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark font-heading">En los medios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRESS_ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.slug}
                className="bg-bg-light rounded-xl p-8 hover:shadow-md transition-shadow"
              >
                <p className="text-accent text-sm font-medium mb-2">{article.source}</p>
                <h3 className="text-lg font-bold text-text-dark mb-3 leading-snug">{article.title}</h3>
                <p className="text-text-light text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <p className="text-text-muted text-xs">
                  {new Date(article.date).toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/prensa"
              className="inline-flex items-center text-accent font-medium hover:text-accent-dark transition-colors group"
            >
              Ver todas las noticias
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-6">
            ¿Tiene un caso que necesita financiamiento?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Nuestro equipo evaluará su caso de forma confidencial. Contáctenos para una consulta inicial sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors text-lg"
            >
              Contactar ahora
            </Link>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
          <p className="mt-6 text-white/40 text-sm">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent transition-colors">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
