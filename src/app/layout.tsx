import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Fondo de Litigación | Financiamiento de Arbitrajes en Chile y Latinoamérica`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "fondo de litigación",
    "financiamiento de litigios",
    "arbitraje Chile",
    "third party funding",
    "financiamiento de arbitrajes",
    "Hakamana",
    "fondo de litigación Chile",
    "litigation funding",
    "financiamiento legal",
    "arbitraje comercial",
    "litigios complejos",
    "acceso a la justicia",
    "financiamiento de disputas",
    "Chambers and Partners",
    "fondo de litigación Latinoamérica",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Primer Fondo de Litigación de Chile`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE_NAME} - Fondo de Litigación` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Fondo de Litigación`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Raúl Labbé N° 12.613, Oficina 310",
      addressLocality: "Lo Barnechea",
      addressRegion: "Santiago",
      addressCountry: "CL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+56977997077",
      contactType: "customer service",
      email: "contacto@hakamana.cl",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [],
    foundingDate: "2019",
    areaServed: ["Chile", "Latin America"],
    knowsAbout: [
      "Litigation Funding",
      "Third Party Funding",
      "Arbitraje",
      "Financiamiento de Litigios",
    ],
  };

  return (
    <html lang="es-CL">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
