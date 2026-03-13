import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { JsonLdOrganization } from "@/components/seo/JsonLd";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hakamana.cl"),
  title: {
    default: "Hakamana - Fondo de Litigacion | Primer Fondo de Litigacion Chileno",
    template: "%s | Hakamana - Fondo de Litigacion",
  },
  description:
    "Hakamana es el primer Fondo de Litigacion chileno con presencia en LATAM. Financiamos litigios y arbitrajes comerciales. Financiamiento sin recurso.",
  keywords: [
    "fondo de litigacion",
    "financiamiento de litigios",
    "third party funding",
    "arbitraje comercial",
    "financiamiento arbitraje",
    "hakamana",
    "litigacion chile",
    "fondo litigacion latam",
    "financiamiento sin recurso",
    "litigation funding",
    "dispute financing",
  ],
  authors: [{ name: "Hakamana" }],
  creator: "Hakamana",
  publisher: "Hakamana - Fondo de Litigacion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    alternateLocale: "en_US",
    url: "https://www.hakamana.cl",
    siteName: "Hakamana - Fondo de Litigacion",
    title: "Hakamana - Primer Fondo de Litigacion Chileno",
    description:
      "Financiamos litigios y arbitrajes comerciales en Chile y LATAM. Financiamiento sin recurso para empresas.",
    images: [
      {
        url: "/images/hakamana-fondo-de-litigacion-01.png",
        width: 1200,
        height: 630,
        alt: "Hakamana - Fondo de Litigacion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakamana - Primer Fondo de Litigacion Chileno",
    description:
      "Financiamos litigios y arbitrajes comerciales en Chile y LATAM.",
    images: ["/images/hakamana-fondo-de-litigacion-01.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.hakamana.cl",
    languages: {
      "es-CL": "https://www.hakamana.cl",
      "en-US": "https://www.hakamana.cl/en",
    },
  },
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-[family-name:var(--font-inter)]`}
      >
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-to-content">
            {locale === "es" ? "Saltar al contenido" : "Skip to content"}
          </a>
          <JsonLdOrganization />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
