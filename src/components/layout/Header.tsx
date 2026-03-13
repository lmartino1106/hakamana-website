"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/routing";

const NAV_ITEMS = [
  { href: "/quienes-somos" as const, key: "quienesSomos" },
  { href: "/nuestro-equipo" as const, key: "nuestroEquipo" },
  { href: "/que-hacemos" as const, key: "queHacemos" },
  { href: "/preguntas-frecuentes" as const, key: "preguntasFrecuentes" },
  { href: "/contacto" as const, key: "contacto" },
  { href: "/prensa" as const, key: "prensa" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: newLocale });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Hakamana - Inicio">
            <Image
              src="/images/logo.jpg"
              alt="Hakamana - Fondo de Litigacion"
              width={200}
              height={50}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-navy hover:text-crimson transition-colors duration-200 relative group"
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-crimson transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Language Selector - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 ml-4">
            <button
              onClick={() => switchLocale("es")}
              className={`text-xs font-semibold transition-colors px-2 py-1 border rounded ${
                locale === "es"
                  ? "text-navy border-navy/20"
                  : "text-gray-400 border-gray-200 hover:text-crimson"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => switchLocale("en")}
              className={`text-xs font-semibold transition-colors px-2 py-1 border rounded ${
                locale === "en"
                  ? "text-navy border-navy/20"
                  : "text-gray-400 border-gray-200 hover:text-crimson"
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-navy hover:text-crimson focus:outline-none focus:ring-2 focus:ring-crimson"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-navy hover:text-crimson hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <div className="flex items-center space-x-2 px-3 pt-2">
                  <button
                    onClick={() => { switchLocale("es"); setIsOpen(false); }}
                    className={`text-xs font-semibold px-2 py-1 border rounded ${
                      locale === "es" ? "text-navy border-navy/20" : "text-gray-400 border-gray-200"
                    }`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => { switchLocale("en"); setIsOpen(false); }}
                    className={`text-xs font-semibold px-2 py-1 border rounded ${
                      locale === "en" ? "text-navy border-navy/20" : "text-gray-400 border-gray-200"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
