export function ClientLogosSection() {
  const logos = ['Bloom Cafe', 'Iron Forge Gym', 'Glow Studio', 'Spice Route', 'CareFirst', 'UrbanTrend', 'FitZone', 'The Brew House'];

  return (
    <section className="py-10 bg-brand-dark border-y border-white/5 overflow-hidden">
      <p className="text-center text-muted text-sm font-mono mb-6 tracking-wider uppercase">
        Trusted by local businesses across the city
      </p>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="mx-8 flex-shrink-0 px-6 py-3 bg-surface/50 rounded-lg border border-white/5 text-muted hover:text-white transition-colors font-mono text-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
