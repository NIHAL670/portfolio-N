import { useParams } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Spinner } from '../components/ui/Spinner';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { ProjectModal } from '../components/portfolio/ProjectModal';
import { FaqSection } from '../components/home/FaqSection';
import { GetQuoteCTA } from '../components/home/GetQuoteCTA';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { useProjects } from '../hooks/useProjects';
import { INDUSTRY_DATA } from '../utils/constants';
import { useState } from 'react';

export default function IndustryLanding() {
  const { industry } = useParams();
  const industryKey = industry?.replace('-websites', '');
  const data = INDUSTRY_DATA[industryKey];
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects, loading } = useProjects({ industry: data?.name });

  if (!data) {
    return (
      <PageWrapper title="Not Found">
        <div className="py-40 text-center text-muted">
          <p>Industry page not found.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={`${data.name} Website Design`}
      description={data.sub}
    >
      {/* Hero */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-brand-dark to-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">{data.hero}</h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">{data.sub}</p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 md:py-24 bg-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Sound Familiar?"
            subtitle={`Common challenges for ${data.name.toLowerCase()} businesses without a professional website.`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.painPoints.map((point, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-surface border border-white/5">
                <span className="text-danger text-lg flex-shrink-0">❌</span>
                <p className="text-gray-300 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={`Our ${data.name} Websites`} subtitle={`See what we've built for ${data.name.toLowerCase()} businesses.`} />
          {loading ? (
            <Spinner size="lg" className="py-12" />
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => <ProjectCard key={p._id} project={p} onClick={() => setSelectedProject(p)} />)}
            </div>
          ) : (
            <p className="text-center text-muted py-12">More projects coming soon!</p>
          )}
        </div>
      </section>

      <TestimonialsSection />
      <FaqSection />
      <GetQuoteCTA />

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </PageWrapper>
  );
}
