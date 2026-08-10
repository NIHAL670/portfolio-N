import { SectionHeading } from '../ui/SectionHeading';
import { SERVICES } from '../../utils/constants';

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What We Build For You"
          subtitle="From sleek business websites to full e-commerce stores — we craft digital experiences that drive results."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-surface border border-white/5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
