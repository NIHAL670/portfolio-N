export function TrustBadgesSection() {
  const badges = [
    { icon: '🏆', text: '5+ Years of Experience' },
    { icon: '🌐', text: '50+ Websites Built' },
    { icon: '⭐', text: '4.9/5 Client Rating' },
    { icon: '🔒', text: 'Secure & GDPR-Friendly' },
  ];

  return (
    <section className="py-8 bg-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted">
              <span className="text-lg">{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
