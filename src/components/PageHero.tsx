export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-primary pt-32 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading animate-fade-in-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/60 max-w-2xl animate-fade-in-up animate-delay-200">{subtitle}</p>
        )}
        <div className="mt-6 w-20 h-1 bg-accent animate-fade-in-up animate-delay-300" />
      </div>
    </section>
  );
}
