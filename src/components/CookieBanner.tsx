"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("hakamana-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("hakamana-cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("hakamana-cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-t border-accent/20 p-4 sm:p-6 animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-white/80 text-sm leading-relaxed">
            Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Al continuar navegando, acepta nuestra{" "}
            <Link href="/politica-de-privacidad" className="text-accent underline hover:text-accent-light">
              Política de Privacidad
            </Link>{" "}
            conforme a la Ley N° 21.719 de Protección de Datos Personales.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 text-sm text-white/60 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="px-6 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent-light transition-colors font-medium"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
