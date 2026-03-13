import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-accent/30 font-heading mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white font-heading mb-4">Página no encontrada</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          La página que busca no existe o ha sido movida. Puede volver al inicio o contactarnos si necesita ayuda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  );
}
