import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/quienes-somos": {
      es: "/quienes-somos",
      en: "/about-us",
    },
    "/nuestro-equipo": {
      es: "/nuestro-equipo",
      en: "/our-team",
    },
    "/nuestro-equipo/[slug]": {
      es: "/nuestro-equipo/[slug]",
      en: "/our-team/[slug]",
    },
    "/que-hacemos": {
      es: "/que-hacemos",
      en: "/what-we-do",
    },
    "/preguntas-frecuentes": {
      es: "/preguntas-frecuentes",
      en: "/faq",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
    },
    "/prensa": {
      es: "/prensa",
      en: "/press",
    },
    "/politica-de-privacidad": {
      es: "/politica-de-privacidad",
      en: "/privacy-policy",
    },
    "/terminos-y-condiciones": {
      es: "/terminos-y-condiciones",
      en: "/terms-and-conditions",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
