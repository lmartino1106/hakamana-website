import Link from "next/link";
import {
  SITE_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  ADDRESS,
  NAV_LINKS,
  GOOGLE_MAPS_URL,
} from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold font-heading text-accent mb-4">{SITE_NAME}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              El primer Fondo de Litigación chileno con presencia en Latinoamérica. Hakamana significa
              &quot;dar poder&quot; en lengua Rapa Nui.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Navegación</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-accent text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {ADDRESS}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_PHONE}`} className="hover:text-accent transition-colors">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Protegido bajo la Ley N° 21.719 de Protección de Datos Personales de Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
