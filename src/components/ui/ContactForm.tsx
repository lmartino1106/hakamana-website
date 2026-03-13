"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const contactSchema = z.object({
  nombre: z.string().min(2, "nombre_error"),
  email: z.string().email("email_error"),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  mensaje: z.string().min(10, "mensaje_error"),
  privacidad: z.boolean().refine((val) => val === true, {
    message: "privacidad_error",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("form");
  const tc = useTranslations("common");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const getErrorMessage = (fieldError: { message?: string } | undefined) => {
    if (!fieldError?.message) return null;
    const errorMap: Record<string, string> = {
      nombre_error: t("nombreError"),
      email_error: t("emailError"),
      mensaje_error: t("mensajeError"),
      privacidad_error: t("privacidadError"),
    };
    return errorMap[fieldError.message] || fieldError.message;
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-200 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson transition-colors text-sm";
  const labelClasses = "block text-sm font-medium text-navy mb-1.5";
  const errorClasses = "text-xs text-crimson mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nombre" className={labelClasses}>
            {t("nombre")} *
          </label>
          <input
            id="nombre"
            type="text"
            placeholder={t("nombrePlaceholder")}
            className={inputClasses}
            {...register("nombre")}
          />
          {errors.nombre && <p className={errorClasses}>{getErrorMessage(errors.nombre)}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            {t("emailLabel")} *
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className={inputClasses}
            {...register("email")}
          />
          {errors.email && <p className={errorClasses}>{getErrorMessage(errors.email)}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="telefono" className={labelClasses}>
            {t("telefonoLabel")}
          </label>
          <input
            id="telefono"
            type="tel"
            placeholder={t("telefonoPlaceholder")}
            className={inputClasses}
            {...register("telefono")}
          />
        </div>

        <div>
          <label htmlFor="empresa" className={labelClasses}>
            {t("empresaLabel")}
          </label>
          <input
            id="empresa"
            type="text"
            placeholder={t("empresaPlaceholder")}
            className={inputClasses}
            {...register("empresa")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClasses}>
          {t("mensajeLabel")} *
        </label>
        <textarea
          id="mensaje"
          rows={5}
          placeholder={t("mensajePlaceholder")}
          className={inputClasses + " resize-none"}
          {...register("mensaje")}
        />
        {errors.mensaje && <p className={errorClasses}>{getErrorMessage(errors.mensaje)}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 text-crimson border-gray-300 rounded focus:ring-crimson"
            {...register("privacidad")}
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            {t("privacidad")}{" "}
            <a href="/politica-de-privacidad" target="_blank" className="text-crimson hover:underline font-medium">
              {t("politicaPrivacidad")}
            </a>{" "}
            {t("privacidadSuffix")}
          </span>
        </label>
        {errors.privacidad && <p className={errorClasses}>{getErrorMessage(errors.privacidad)}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-3.5 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {tc("enviando")}
          </span>
        ) : (
          tc("enviarConsulta")
        )}
      </motion.button>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center"
        >
          {t("successMessage")}
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center"
        >
          {t("errorMessage")}
        </motion.div>
      )}
    </form>
  );
}
