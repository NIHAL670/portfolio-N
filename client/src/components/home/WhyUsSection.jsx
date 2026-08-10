import { SectionHeading } from '../ui/SectionHeading';

export function WhyUsSection() {
  const stats = [
    { value: '50+', label: 'Websites Delivered' },
    { value: '2 Weeks', label: 'Average Delivery Time' },
    { value: '100%', label: 'Mobile-First Builds' },
    { value: '4.9★', label: 'Client Satisfaction' },
  ];

  const features = [
    { icon: '⚡', title: 'Fast Turnaround', desc: 'From brief to launch in 2 weeks' },
    { icon: '📍', title: 'Local Expertise', desc: 'We understand your market' },
    { icon: '🛠️', title: 'Post-Launch Support', desc: "We don't disappear after delivery" },
    { icon: '💰', title: 'Transparent Pricing', desc: 'No surprises, no hidden fees' },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Businesses Choose Codex"
          subtitle="We're not just developers — we're partners in your digital growth."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl md:text-4xl font-heading font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-muted text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl bg-surface/50 border border-white/5">
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <h4 className="text-white font-heading font-semibold mb-1">{f.title}</h4>
                <p className="text-muted text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
