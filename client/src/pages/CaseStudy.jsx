import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { GetQuoteCTA } from '../components/home/GetQuoteCTA';
import { CaseStudyCard } from '../components/portfolio/CaseStudyCard';
import { getProjectBySlug, getProjects } from '../services/api';
import { getApiImageUrl } from '../utils/helpers';
import { FiExternalLink, FiArrowLeft } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

export default function CaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getProjectBySlug(slug);
        setProject(data);
        const { data: allProjects } = await getProjects({ isCaseStudy: true });
        setRelated(allProjects.filter((p) => p.slug !== slug).slice(0, 2));
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <PageWrapper title="Loading..."><Spinner size="lg" className="py-40" /></PageWrapper>;
  if (!project) return <PageWrapper title="Not Found"><p className="text-center text-muted py-40">Case study not found.</p></PageWrapper>;

  return (
    <PageWrapper title={project.title} description={project.description}>
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[21/9] max-h-[500px] w-full overflow-hidden">
          <img src={getApiImageUrl(project.thumbnail)} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
          <Badge className="mb-3">{project.industry}</Badge>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white">{project.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-accent text-sm mb-8 hover:underline">
            <FiArrowLeft /> Back to Portfolio
          </Link>

          {project.caseStudy && (
            <div className="space-y-8 mb-12">
              {[
                { title: 'The Problem', content: project.caseStudy.problem, icon: '🔴', color: 'border-danger/30' },
                { title: 'Our Solution', content: project.caseStudy.solution, icon: '🟣', color: 'border-accent/30' },
                { title: 'The Result', content: project.caseStudy.result, icon: '🟢', color: 'border-success/30' },
              ].map((s) => s.content && (
                <div key={s.title} className={`p-6 md:p-8 rounded-2xl bg-surface border ${s.color}`}>
                  <h2 className="text-xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                    <span>{s.icon}</span> {s.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">{s.content}</p>
                </div>
              ))}
            </div>
          )}

          {project.fullDescription && (
            <div className="prose prose-invert max-w-none mb-12">
              <ReactMarkdown>{project.fullDescription}</ReactMarkdown>
            </div>
          )}

          {project.video && (
            <div className="mb-12">
              <video src={getApiImageUrl(project.video)} controls muted playsInline preload="metadata" className="w-full rounded-2xl" />
            </div>
          )}

          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">Visit Live Site <FiExternalLink /></Button>
            </a>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">Related Case Studies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {related.map((p) => <CaseStudyCard key={p._id} project={p} />)}
            </div>
          </div>
        </section>
      )}

      <GetQuoteCTA />
    </PageWrapper>
  );
}
