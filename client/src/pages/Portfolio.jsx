import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Spinner } from '../components/ui/Spinner';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { ProjectFilter } from '../components/portfolio/ProjectFilter';
import { ProjectModal } from '../components/portfolio/ProjectModal';
import { CaseStudyCard } from '../components/portfolio/CaseStudyCard';
import { GetQuoteCTA } from '../components/home/GetQuoteCTA';
import { useProjects } from '../hooks/useProjects';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects, loading } = useProjects();

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.industry === filter);

  const caseStudies = projects.filter((p) => p.isCaseStudy);

  return (
    <PageWrapper title="Portfolio" description="Explore our portfolio of stunning websites built for local businesses.">
      <section className="py-16 md:py-24 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Work"
            subtitle="Browse our portfolio of websites crafted for businesses just like yours."
          />

          <ProjectFilter activeFilter={filter} onFilter={setFilter} />

          {loading ? (
            <Spinner size="lg" className="py-20" />
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p) => (
                <ProjectCard key={p._id} project={p} onClick={() => setSelectedProject(p)} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted py-20">No projects found for this category yet.</p>
          )}
        </div>
      </section>

      {caseStudies.length > 0 && (
        <section className="py-16 md:py-24 bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Deep Dives: Our Case Studies" subtitle="See how we solved real business challenges." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((p) => (
                <CaseStudyCard key={p._id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <GetQuoteCTA />

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </PageWrapper>
  );
}
