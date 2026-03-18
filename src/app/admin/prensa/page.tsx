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

export default function AdminPrensaPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPublish, setPendingPublish] = useState<ArticlePreview | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingPublish]);

  useEffect(() => {
    if (isAuth && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "¡Hola! Soy el asistente de prensa de Hakamana 🗞️\n\nPuedes publicar artículos en el sitio sin tocar ningún código. El artículo aparece de inmediato, sin esperas.\n\n📋 Necesito estos datos:\n• Título del artículo\n• Medio de comunicación (ej: El Mercurio, La Tercera, Forbes)\n• Fecha de publicación\n• Resumen en 2-3 oraciones\n• Link al artículo original (opcional)\n\n¿Qué artículo quieres publicar hoy?",
        },
      ]);
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
        setAuthError("Contraseña incorrecta. Intenta de nuevo.");
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
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setPendingPublish(null);

    const loadingId = "loading-" + Date.now();
    setMessages((prev) => [...prev, { id: loadingId, role: "assistant", content: "", isLoading: true }]);

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId ? { id: loadingId, role: "assistant", content: data.message || "Sin respuesta." } : m
        )
      );
      if (data.pendingPublish) setPendingPublish(data.pendingPublish);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? { id: loadingId, role: "assistant", content: "❌ Error de conexión. Intenta de nuevo." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handlePublish = async () => {
    if (!pendingPublish || isPublishing) return;
    setIsPublishing(true);
    const loadingId = "pub-" + Date.now();
    setMessages((prev) => [...prev, { id: loadingId, role: "assistant", content: "", isLoading: true }]);

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, article: pendingPublish }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingId
              ? {
                  id: loadingId,
                  role: "assistant",
                  content: `✅ ¡Artículo publicado!\n\n📰 **"${pendingPublish.title}"** ya está live en hakamana.cl/prensa\n\n¿Quieres publicar otro artículo?`,
                }
              : m
          )
        );
        setPendingPublish(null);
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingId
              ? { id: loadingId, role: "assistant", content: `❌ Error: ${data.error ?? "Error desconocido"}` }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? { id: loadingId, role: "assistant", content: "❌ Error de conexión al publicar." }
            : m
        )
      );
    } finally {
      setIsPublishing(false);
    }
  };

  /* ── Password gate ── */
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#1a2332] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#c8a45c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#c8a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Prensa</h1>
            <p className="text-gray-400 text-sm mt-1">Hakamana — Acceso restringido</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña de acceso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/40"
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <button
              type="submit"
              disabled={authLoading || !password.trim()}
              className="w-full bg-[#c8a45c] text-white font-semibold py-3 rounded-xl hover:bg-[#b8944c] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verificando...</>
              ) : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Chat interface ── */
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a2332] text-white px-6 py-4 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#c8a45c]/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[#c8a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-base leading-none">Panel de Prensa</h1>
            <p className="text-white/50 text-xs mt-0.5">Publicación instantánea sin tocar código</p>
          </div>
        </div>
        <a href="https://www.hakamana.cl/prensa" target="_blank" rel="noopener noreferrer"
          className="text-xs text-white/50 hover:text-[#c8a45c] transition-colors flex items-center gap-1">
          Ver en sitio
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#c8a45c]/10 border border-[#c8a45c]/20 flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#c8a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#c8a45c] text-white rounded-tr-sm shadow-sm"
                  : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
              }`}>
                {msg.isLoading ? (
                  <div className="flex items-center gap-1.5 py-0.5 px-1">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                ) : <p className="whitespace-pre-wrap">{msg.content}</p>}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {/* Article preview card */}
          {pendingPublish && (
            <div className="flex justify-start gap-3">
              <div className="w-8 h-8 shrink-0" />
              <div className="max-w-[80%] w-full bg-white rounded-2xl rounded-tl-sm shadow-md border border-[#c8a45c]/20 overflow-hidden">
                <div className="bg-[#c8a45c]/5 border-b border-[#c8a45c]/15 px-4 py-2.5 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#c8a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-xs font-semibold text-[#c8a45c] uppercase tracking-wide">Vista previa del artículo</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#c8a45c]/10 text-[#c8a45c] text-xs font-bold px-2 py-0.5 rounded-full">{pendingPublish.source}</span>
                    <span className="text-gray-400 text-xs">
                      {new Date(pendingPublish.date + "T12:00:00").toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{pendingPublish.title}</h3>
                  {pendingPublish.title_en && <p className="text-gray-400 text-xs italic">{pendingPublish.title_en}</p>}
                  <p className="text-gray-600 text-xs leading-relaxed">{pendingPublish.excerpt}</p>
                  {pendingPublish.external_url && (
                    <a href={pendingPublish.external_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#c8a45c] text-xs hover:underline">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Ver artículo original
                    </a>
                  )}
                </div>
                <div className="px-4 pb-4 flex gap-2">
                  <button onClick={() => setPendingPublish(null)} disabled={isPublishing}
                    className="flex-1 py-2 text-xs border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40 font-medium">
                    ✏️ Editar
                  </button>
                  <button onClick={handlePublish} disabled={isPublishing}
                    className="flex-1 py-2 text-xs bg-[#c8a45c] text-white rounded-xl hover:bg-[#b8944c] transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-1.5">
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

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-4 shrink-0">
        <form onSubmit={handleSend} className="max-w-2xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ej: Publicar artículo de El Mercurio del 17 de marzo sobre Hakamana..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isPublishing}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c8a45c]/30 disabled:opacity-50 bg-gray-50 focus:bg-white transition-all"
          />
          <button type="submit" disabled={isLoading || isPublishing || !input.trim()}
            className="bg-[#c8a45c] text-white px-5 py-3 rounded-xl hover:bg-[#b8944c] transition-colors disabled:opacity-40 font-semibold flex items-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-2">
          El artículo se publica instantáneamente en la base de datos — sin reconstruir el sitio
        </p>
      </div>
    </div>
  );
}
