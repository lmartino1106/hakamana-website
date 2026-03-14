import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const t = useTranslations("common");
  const tf = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Logo className="h-12 w-auto mb-4" variant="white" />
            <p className="text-gray-300 text-sm leading-relaxed mt-4">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-playfair)] font-semibold mb-4">
              {t("navegacion")}
            </h3>
            <ul className="space-y-2">
              <li><Link href="/quienes-somos" className="text-gray-300 hover:text-crimson-light transition-colors text-sm">{tn("quienesSomos")}</Link></li>
              <li><Link href="/nuestro-equipo" className="text-gray-300 hover:text-crimson-light transition-colors text-sm">{tn("nuestroEquipo")}</Link></li>
              <li><Link href="/que-hacemos" className="text-gray-300 hover:text-crimson-light transition-colors text-sm">{tn("queHacemos")}</Link></li>
              <li><Link href="/preguntas-frecuentes" className="text-gray-300 hover:text-crimson-light transition-colors text-sm">{tn("preguntasFrecuentes")}</Link></li>
              <li><Link href="/contacto" className="text-gray-300 hover:text-crimson-light transition-colors text-sm">{tn("contacto")}</Link></li>
              <li><Link href="/prensa" className="text-gray-300 hover:text-crimson-light transition-colors text-sm">{tn("prensa")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-playfair)] font-semibold mb-4">
              {tn("contacto")}
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 flex-shrink-0 text-crimson-light" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                </svg>
                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-crimson-light transition-colors"
                >
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.region}, {SITE_CONFIG.address.country}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-crimson-light" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-crimson-light transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-crimson-light" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-crimson-light transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-playfair)] font-semibold mb-4">
              {t("legal")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/politica-de-privacidad" className="text-gray-300 hover:text-crimson-light transition-colors text-sm">
                  {tf("privacidad")}
                </Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones" className="text-gray-300 hover:text-crimson-light transition-colors text-sm">
                  {tf("terminos")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Hakamana - Fondo de Litigacion. {tf("derechos")}
          </p>
          <p className="text-gray-500 text-xs">
            Santiago, Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
