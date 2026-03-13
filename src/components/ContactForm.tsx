"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    privacy: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", company: "", message: "", privacy: false });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">Mensaje enviado correctamente</h3>
        <p className="text-green-600">Nos pondremos en contacto con usted a la brevedad.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            placeholder="Juan Pérez"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
            Correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            placeholder="juan@empresa.cl"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            placeholder="+56 9 1234 5678"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-text-dark mb-2">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            placeholder="Empresa S.A."
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
          placeholder="Describa brevemente su consulta o caso..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          required
          checked={form.privacy}
          onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
          className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
        />
        <label htmlFor="privacy" className="text-sm text-text-light">
          He leído y acepto la{" "}
          <a href="/politica-de-privacidad" className="text-accent underline hover:text-accent-dark">
            Política de Privacidad
          </a>{" "}
          y autorizo el tratamiento de mis datos personales conforme a la Ley N° 21.719. *
        </label>
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">Hubo un error al enviar el mensaje. Por favor intente nuevamente.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto px-8 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando..." : "Enviar Consulta"}
      </button>
    </form>
  );
}
