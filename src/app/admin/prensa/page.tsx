"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
};

type ArticlePreview = {
  title: string;
  title_en?: string;
  source: string;
  date: string;
  excerpt: string;
  excerpt_en?: string;
  external_url?: string | null;
  image?: string | null;
  slug: string;
};

type Tab = "chat" | "form";

const STEPS = [
  { icon: "📰", label: "Título", desc: "Título completo del artículo en español" },
  { icon: "🏢", label: "Medio", desc: "Ej: El Mercurio, La Tercera, Forbes" },
  { icon: "📅", label: "Fecha", desc: "Ej: 17 de marzo de 2026" },
  { icon: "✍️", label: "Resumen", desc: "2-3 oraciones del artículo" },
  { icon: "🔗", label: "Link", desc: "URL al artículo original (opcional)" },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export default function AdminPrensaPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("chat");

  /* ─── Chat state ─── */
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPublish, setPendingPublish] = useState<ArticlePreview | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─── Form state ─── */
  const [form, setForm] = useState({
    title: "", title_en: "", source: "", date: "", excerpt: "",
    excerpt_en: "", external_url: "", image: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingPublish]);

  useEffect(() => {
    if (isAuth && messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: "¡Hola! Soy el asistente de prensa de Hakamana 🗞️\n\nPuedo publicar artículos directamente en el sitio. Solo dime qué artículo quieres publicar con los datos del lado izquierdo.\n\n💡 Ejemplo:\n\"Publicar artículo de El Mercurio del 17 de marzo: Hakamana lanza nuevo fondo... [pega el texto o dame los datos]\"",
      }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isAuth, messages.length]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, messages: [], ping: true }),
      });
      if (res.ok) {
        setIsAuth(true);
      } else {
        setAuthError("Contraseña incorrecta.");
      }
    } catch {
      setAuthError("Error de conexión.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isPublishing) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);
    setPendingPublish(null);
    const lid = "loading-" + Date.now();
    setMessages((p) => [...p, { id: lid, role: "assistant", content: "", isLoading: true }]);
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, messages: updated.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages((p) => p.map((m) => m.id === lid
        ? { id: lid, role: "assistant", content: data.message || "Sin respuesta." } : m));
      if (data.pendingPublish) setPendingPublish(data.pendingPublish);
    } catch {
      setMessages((p) => p.map((m) => m.id === lid
        ? { id: lid, role: "assistant", content: "❌ Error de conexión. Si el problema persiste, usa el formulario directo →" } : m));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handlePublish = async (article: ArticlePreview) => {
    setIsPublishing(true);
    const lid = "pub-" + Date.now();
    setMessages((p) => [...p, { id: lid, role: "assistant", content: "", isLoading: true }]);
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, article }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((p) => p.map((m) => m.id === lid
          ? { id: lid, role: "assistant", content: `✅ ¡Publicado! "${article.title}" ya está en hakamana.cl/es/prensa\n\n¿Quieres publicar otro artículo?` } : m));
        setPendingPublish(null);
      } else {
        setMessages((p) => p.map((m) => m.id === lid
          ? { id: lid, role: "assistant", content: `❌ Error al publicar: ${data.error ?? "Error desconocido"}` } : m));
      }
    } catch {
      setMessages((p) => p.map((m) => m.id === lid
        ? { id: lid, role: "assistant", content: "❌ Error de conexión al publicar." } : m));
    } finally {
      setIsPublishing(false);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!form.title || !form.source || !form.date || !form.excerpt) {
      setFormError("Título, medio, fecha y resumen son obligatorios.");
      return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(form.date)) {
      setFormError("La fecha debe estar en formato YYYY-MM-DD (ej: 2026-03-17)");
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          article: {
            title: form.title,
            title_en: form.title_en || "",
            source: form.source,
            date: form.date,
            excerpt: form.excerpt,
            excerpt_en: form.excerpt_en || "",
            external_url: form.external_url || null,
            image: form.image || null,
            slug: generateSlug(form.title),
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormSuccess(`✅ ¡"${form.title}" publicado en hakamana.cl/es/prensa!`);
        setForm({ title: "", title_en: "", source: "", date: "", excerpt: "", excerpt_en: "", external_url: "", image: "" });
      } else {
        setFormError(data.error ?? "Error al publicar.");
      }
    } catch {
      setFormError("Error de conexión.");
    } finally {
      setFormLoading(false);
    }
  };

  /* ────────────────────────────────────────────────
     LOGIN SCREEN
  ──────────────────────────────────────────────── */
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#0f1923] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-[#1a2332] rounded-3xl p-8 shadow-2xl border border-white/5">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c8a45c]/10 border border-[#c8a45c]/20 mb-5">
                <svg className="w-8 h-8 text-[#c8a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Panel de Prensa</h1>
              <p className="text-white/40 text-sm mt-1.5">Hakamana · Publicación instantánea</p>
            </div>

            {/* Badges */}
            <div className="flex gap-2 justify-center mb-8">
              {["Sin código", "Instantáneo", "IA asistida"].map((b) => (
                <span key={b} className="text-xs px-3 py-1 rounded-full bg-[#c8a45c]/10 text-[#c8a45c] border border-[#c8a45c]/20 font-medium">{b}</span>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  placeholder="Contraseña de acceso"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/40 focus:border-[#c8a45c]/40 transition-all"
                  autoFocus
                />
              </div>
              {authError && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {authError}
                </div>
              )}
              <button type="submit" disabled={authLoading || !password.trim()}
                className="w-full bg-[#c8a45c] text-white font-semibold py-3.5 rounded-xl hover:bg-[#b8944c] active:scale-[0.98] transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg shadow-[#c8a45c]/20">
                {authLoading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verificando...</>
                ) : <>Ingresar al panel</>}
              </button>
            </form>
          </div>

          <p className="text-center text-white/20 text-xs mt-6">
            ¿No tienes la contraseña? Contacta al equipo de Hakamana.
          </p>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────
     MAIN PANEL
  ──────────────────────────────────────────────── */
  return (
    <div className="flex h-screen bg-[#0f1923] overflow-hidden">

      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-72 shrink-0 bg-[#1a2332] border-r border-white/5 flex flex-col">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c8a45c]/15 border border-[#c8a45c]/20 flex items-center justify-center shrink-0">
              <svg className="w-4.5 h-4.5 text-[#c8a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Panel de Prensa</p>
              <p className="text-white/40 text-xs mt-0.5">Hakamana</p>
            </div>
          </div>
        </div>

        {/* Guide */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Datos necesarios</p>
          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-3 items-start group">
                <div className="w-8 h-8 rounded-lg bg-[#c8a45c]/10 border border-[#c8a45c]/20 flex items-center justify-center shrink-0 text-sm">{s.icon}</div>
                <div>
                  <p className="text-white/80 text-sm font-semibold leading-none">{s.label}</p>
                  <p className="text-white/35 text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tip box */}
          <div className="mt-6 bg-[#c8a45c]/5 border border-[#c8a45c]/15 rounded-xl p-4">
            <p className="text-[#c8a45c] text-xs font-semibold mb-1.5">💡 Consejo rápido</p>
            <p className="text-white/40 text-xs leading-relaxed">
              Puedes pegar el texto completo del artículo y el asistente extrae los datos solo. O usa el formulario directo si prefieres.
            </p>
          </div>

          {/* Example */}
          <div className="mt-4 bg-white/3 border border-white/8 rounded-xl p-4">
            <p className="text-white/30 text-xs font-semibold mb-1.5">Ejemplo de mensaje</p>
            <p className="text-white/25 text-xs leading-relaxed italic">
              &quot;Artículo de La Tercera del 15 marzo: Hakamana cierra ronda de financiamiento. El fondo anunció...&quot;
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/5">
          <a href="https://www.hakamana.cl/es/prensa" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/30 text-xs hover:text-[#c8a45c] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Ver página de prensa
          </a>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Tabs header */}
        <header className="bg-[#1a2332]/80 backdrop-blur border-b border-white/5 px-6 py-3 shrink-0 flex items-center justify-between">
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            <button onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "chat"
                ? "bg-[#c8a45c] text-white shadow-sm"
                : "text-white/40 hover:text-white/70"}`}>
              💬 Chat con IA
            </button>
            <button onClick={() => setActiveTab("form")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "form"
                ? "bg-[#c8a45c] text-white shadow-sm"
                : "text-white/40 hover:text-white/70"}`}>
              📋 Formulario directo
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/30 text-xs">Conectado</span>
          </div>
        </header>

        {/* ── CHAT TAB ── */}
        {activeTab === "chat" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="max-w-2xl mx-auto space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-[#c8a45c]/10 border border-[#c8a45c]/20 flex items-center justify-center shrink-0 mt-1 text-sm">🤖</div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                      ? "bg-[#c8a45c] text-white rounded-tr-sm"
                      : "bg-[#1a2332] text-white/80 border border-white/8 rounded-tl-sm"}`}>
                      {msg.isLoading ? (
                        <div className="flex items-center gap-1.5 py-0.5">
                          {[0, 150, 300].map((d) => (
                            <span key={d} className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                          ))}
                        </div>
                      ) : <p className="whitespace-pre-wrap">{msg.content}</p>}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1 text-sm">👤</div>
                    )}
                  </div>
                ))}

                {/* Article preview */}
                {pendingPublish && (
                  <div className="flex justify-start gap-3">
                    <div className="w-8 h-8 shrink-0" />
                    <div className="max-w-[80%] w-full bg-[#1a2332] rounded-2xl rounded-tl-sm border border-[#c8a45c]/30 overflow-hidden shadow-xl">
                      <div className="bg-[#c8a45c]/8 border-b border-[#c8a45c]/20 px-4 py-2.5 flex items-center gap-2">
                        <span className="text-xs font-bold text-[#c8a45c] uppercase tracking-widest">Vista previa</span>
                      </div>
                      <div className="p-4 space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-[#c8a45c]/15 text-[#c8a45c] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#c8a45c]/20">{pendingPublish.source}</span>
                          <span className="text-white/30 text-xs">
                            {new Date(pendingPublish.date + "T12:00:00").toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-sm leading-snug">{pendingPublish.title}</h3>
                        {pendingPublish.title_en && <p className="text-white/30 text-xs italic">{pendingPublish.title_en}</p>}
                        <p className="text-white/55 text-xs leading-relaxed">{pendingPublish.excerpt}</p>
                        {pendingPublish.external_url && (
                          <a href={pendingPublish.external_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#c8a45c] text-xs hover:underline">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            Ver original
                          </a>
                        )}
                      </div>
                      <div className="px-4 pb-4 flex gap-2">
                        <button onClick={() => setPendingPublish(null)} disabled={isPublishing}
                          className="flex-1 py-2.5 text-xs border border-white/10 rounded-xl text-white/40 hover:bg-white/5 transition-colors disabled:opacity-40 font-medium">
                          Editar
                        </button>
                        <button onClick={() => handlePublish(pendingPublish)} disabled={isPublishing}
                          className="flex-1 py-2.5 text-xs bg-[#c8a45c] text-white rounded-xl hover:bg-[#b8944c] transition-colors font-bold disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg shadow-[#c8a45c]/20">
                          {isPublishing ? (
                            <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />Publicando...</>
                          ) : "🚀 Publicar ahora"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* Chat input */}
            <div className="bg-[#1a2332]/60 border-t border-white/5 px-6 py-4 shrink-0">
              <form onSubmit={handleSend} className="max-w-2xl mx-auto flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Describe el artículo o pega su contenido aquí..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading || isPublishing}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 disabled:opacity-40 transition-all"
                />
                <button type="submit" disabled={isLoading || isPublishing || !input.trim()}
                  className="bg-[#c8a45c] text-white px-5 py-3 rounded-xl hover:bg-[#b8944c] transition-all disabled:opacity-30 shadow-lg shadow-[#c8a45c]/20 active:scale-95">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <p className="text-center text-white/20 text-xs mt-2">
                Si el chat da error, usa la pestaña <strong className="text-white/30">Formulario directo</strong> →
              </p>
            </div>
          </>
        )}

        {/* ── FORM TAB ── */}
        {activeTab === "form" && (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-white font-bold text-lg">Publicación directa</h2>
                <p className="text-white/40 text-sm mt-1">Rellena los campos y publica sin pasar por el chat.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Título */}
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Título * <span className="text-white/30 normal-case font-normal">(español)</span></label>
                  <input type="text" placeholder="Hakamana lanza nuevo fondo de litigación..."
                    value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 transition-all" />
                </div>

                {/* Título EN */}
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Título <span className="text-white/30 normal-case font-normal">(inglés, opcional)</span></label>
                  <input type="text" placeholder="Hakamana launches new litigation fund..."
                    value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Medio */}
                  <div className="space-y-1.5">
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Medio *</label>
                    <input type="text" placeholder="El Mercurio Legal"
                      value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 transition-all" />
                  </div>
                  {/* Fecha */}
                  <div className="space-y-1.5">
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Fecha * <span className="text-white/30 normal-case font-normal">YYYY-MM-DD</span></label>
                    <input type="date"
                      value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 transition-all [color-scheme:dark]" />
                  </div>
                </div>

                {/* Resumen ES */}
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Resumen * <span className="text-white/30 normal-case font-normal">(2-3 oraciones en español)</span></label>
                  <textarea rows={3} placeholder="Hakamana fue reconocida como el primer fondo de litigación chileno..."
                    value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 transition-all resize-none" />
                </div>

                {/* Resumen EN */}
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Resumen <span className="text-white/30 normal-case font-normal">(inglés, opcional)</span></label>
                  <textarea rows={2} placeholder="Hakamana was recognized as the first Chilean litigation fund..."
                    value={form.excerpt_en} onChange={(e) => setForm({ ...form, excerpt_en: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 transition-all resize-none" />
                </div>

                {/* Link */}
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Link al artículo <span className="text-white/30 normal-case font-normal">(opcional)</span></label>
                  <input type="url" placeholder="https://www.elmercurio.com/..."
                    value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 transition-all" />
                </div>

                {/* Image URL */}
                <div className="space-y-1.5">
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">URL imagen <span className="text-white/30 normal-case font-normal">(opcional, se usa imagen por defecto)</span></label>
                  <input type="url" placeholder="https://..."
                    value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 focus:border-[#c8a45c]/30 transition-all" />
                </div>

                {/* Error / Success */}
                {formError && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formError}
                  </div>
                )}
                {formSuccess && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formSuccess}
                  </div>
                )}

                <button type="submit" disabled={formLoading}
                  className="w-full bg-[#c8a45c] text-white font-bold py-3.5 rounded-xl hover:bg-[#b8944c] transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg shadow-[#c8a45c]/20 active:scale-[0.98]">
                  {formLoading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Publicando...</>
                  ) : <><span>🚀</span> Publicar artículo</>}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
