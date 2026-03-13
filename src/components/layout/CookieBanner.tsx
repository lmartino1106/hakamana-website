"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations("cookies");
  const tf = useTranslations("footer");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: true, marketing: true, timestamp: Date.now() }));
    setShowBanner(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: false, marketing: false, timestamp: Date.now() }));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
          role="dialog"
          aria-label="Consentimiento de cookies"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t("message")}{" "}
                  <strong>{t("law")}</strong>, {t("consent")}{" "}
                  <Link href="/politica-de-privacidad" className="text-crimson hover:underline font-medium">
                    {tf("privacidad")}
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={acceptEssential}
                  className="px-4 py-2 text-sm font-medium text-navy border border-navy/20 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t("essential")}
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-dark transition-colors"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
