import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ClientLogosSection } from '../components/home/ClientLogosSection';
import { GetQuoteCTA } from '../components/home/GetQuoteCTA';
import { TEAM_MEMBERS, MILESTONES } from '../utils/constants';

export default function AboutUs() {
  const values = [
    { icon: '⚡', title: 'Speed', desc: 'We move fast without cutting corners.' },
    { icon: '💎', title: 'Quality', desc: 'Pixel-perfect designs and clean, maintainable code.' },
    { icon: '🤝', title: 'Transparency', desc: 'Honest communication at every step.' },
    { icon: '🌱', title: 'Partnership', desc: 'We grow alongside your business.' },
  ];

  return (
    <PageWrapper title="About Us" description="Learn about the Codex team and our mission to build stunning websites for local businesses.">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-dark to-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">We Are Codex</h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We&apos;re a small but mighty team of designers, developers, and marketers who believe every local business deserves a stunning online presence. From cafes to clinics, we build websites that drive real results.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Meet the Team" subtitle="The people behind every pixel." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-surface border border-white/5 hover:border-accent/30 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center text-accent font-heading font-bold text-2xl mx-auto mb-4">
                  {member.name[0]}
                </div>
                <h3 className="text-white font-heading font-semibold mb-1">{member.name}</h3>
                <p className="text-accent text-xs font-mono mb-2">{member.role}</p>
                <p className="text-muted text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Story" subtitle="Key milestones on our journey." />
          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-accent font-heading font-bold text-sm flex-shrink-0">
                    {m.year}
                  </div>
                  {i < MILESTONES.length - 1 && (
                    <div className="w-0.5 h-10 bg-accent/20 mt-2" />
                  )}
                </div>
                <div className="pt-2">
                  <h4 className="text-white font-heading font-semibold mb-1">{m.title}</h4>
                  <p className="text-muted text-sm">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Values" subtitle="What drives everything we do." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-surface border border-white/5">
                <span className="text-3xl mb-3 block">{v.icon}</span>
                <h3 className="text-white font-heading font-semibold mb-2">{v.title}</h3>
                <p className="text-muted text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClientLogosSection />
      <GetQuoteCTA />
    </PageWrapper>
  );
}
