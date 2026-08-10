import { useState } from 'react';
import { FiExternalLink, FiGithub, FiX, FiAlertTriangle, FiBookOpen, FiCornerDownRight } from 'react-icons/fi';
import { useScrollReveal } from './useScrollReveal';
import { use3DTilt, useSpotlight } from './useInteractiveEffects';
import { projects } from './data';
import { CropPredictorPlayground, CryptoForecastPlayground } from './MlPlaygrounds';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

function ProjectCard({ project, isSelected, onCardClick }) {
  const tilt = use3DTilt(6, 1.015);
  const spotlight = useSpotlight();

  const handleMouseMove = (e) => {
    tilt.onMouseMove(e);
    spotlight.onMouseMove(e);
  };

  const handleMouseLeave = () => {
    tilt.onMouseLeave();
    spotlight.onMouseLeave();
  };

  const setRefs = (node) => {
    tilt.ref.current = node;
    spotlight.ref.current = node;
  };

  const combinedStyle = {
    ...tilt.style,
    ...spotlight.style
  };

  return (
    <div 
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
      style={combinedStyle}
      className={`glass spotlight-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? 'border-accent ring-2 ring-accent/20' : 'hover:border-white/10'
      }`}
    >
      <div className="h-36 bg-gradient-to-br from-accent/20 via-cyan/5 to-transparent flex items-end p-6 relative">
        <div className="absolute inset-0 hero-grid opacity-10 pointer-events-none"></div>
        <div className="absolute top-4 right-4">
          <Badge dot={true} dotColor={isSelected ? 'bg-cyan' : 'bg-accent'}>CASE_STUDY</Badge>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight relative z-10">{project.title}</h3>
      </div>
      
      <div className="p-6 flex flex-col h-[calc(100%-9rem)] relative z-10 justify-between">
        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">{project.summary}</p>
        
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 4).map((tech, i) => (
              <Badge key={i} className="bg-white/3 border-white/5 font-mono text-[11px] text-slate-300">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge className="bg-white/3 border-white/5 font-mono text-[11px] text-slate-400">
                +{project.tech.length - 4}
              </Badge>
            )}
          </div>
          
          <div className="text-accent text-sm font-semibold hover:text-accent-hover inline-flex items-center gap-1">
            {isSelected ? 'Close Case Study' : 'View Case Study'}
            <FiCornerDownRight size={14} className="mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [ref, isVisible] = useScrollReveal();
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <section id="projects" className="py-20 md:py-28 bg-brand relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Heading (Untitled UI Style) */}
          <div className="text-center mb-16">
            <Badge dot={true} dotColor="bg-accent" className="mb-3">PORTFOLIO_SYSTEM</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Featured Projects</h2>
            <p className="text-muted max-w-2xl mx-auto font-light">Explore some of my most impactful and complex technical implementations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const isSelected = selectedProjectId === project.id;
              return (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  isSelected={isSelected}
                  onCardClick={() => setSelectedProjectId(isSelected ? null : project.id)}
                />
              );
            })}
          </div>

          {/* CASE STUDY PANEL (Aceternity Border-Beam style wrapper + Untitled UI layout) */}
          {selectedProject && (
            <div className="mt-12 transition-all duration-500 ease-in-out opacity-100 translate-y-0 border-beam-container">
              <div className="border-beam" />
              <div className="glass rounded-2xl p-6 md:p-10 relative border border-accent/25">
                <button 
                  onClick={() => setSelectedProjectId(null)}
                  className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Case Study"
                >
                  <FiX size={20} />
                </button>

                <div className="pr-12 mb-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge dot={true} dotColor="bg-accent">CASE_STUDY</Badge>
                    {selectedProject.type && (
                      <Badge className="bg-accent/15 text-accent border-accent/20">
                        {selectedProject.type}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">{selectedProject.title}</h3>
                  {selectedProject.subtitle && (
                    <p className="text-lg text-cyan mt-1.5 font-light">{selectedProject.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-8">
                    {/* The Problem */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted font-bold font-mono mb-3">The Problem</h4>
                      <div className="flex gap-4 bg-brand-dark/40 p-4 border border-white/5 rounded-xl">
                        <div className="w-1 rounded-full bg-rose-500 flex-shrink-0"></div>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">{selectedProject.problem}</p>
                      </div>
                    </div>

                    {/* My Role & Solution */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted font-bold font-mono mb-3">My Role & Solution</h4>
                      <div className="flex gap-4 bg-brand-dark/40 p-4 border border-white/5 rounded-xl">
                        <div className="w-1 rounded-full bg-accent flex-shrink-0"></div>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">{selectedProject.role}</p>
                      </div>
                    </div>

                    {/* Key Technical Decision (Untitled UI Styled Callout) */}
                    {selectedProject.keyDecision && (
                      <div className="bg-surface-light/30 rounded-xl p-5 border border-white/10">
                        <div className="text-[10px] uppercase tracking-wider text-accent font-bold font-mono mb-2">Architectural Tradeoff</div>
                        <h4 className="text-white font-semibold text-base mb-2">{selectedProject.keyDecision.title}</h4>
                        <p className="text-slate-300 text-xs leading-relaxed font-light">{selectedProject.keyDecision.tradeoff}</p>
                      </div>
                    )}

                    {/* Interactive ML Simulator Playgrounds */}
                    {selectedProject.id === 'smart-agriculture' && <CropPredictorPlayground />}
                    {selectedProject.id === 'crypto-predictor' && <CryptoForecastPlayground />}
                  </div>

                  <div className="space-y-8">
                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted font-bold font-mono mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech, i) => (
                          <Badge key={i} className="bg-white/5 border-white/10 px-3 py-1.5 font-mono text-xs text-slate-200">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    {selectedProject.metrics && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-muted font-bold font-mono mb-3">Impact & Metrics</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedProject.metrics.map((metric, i) => (
                            <div key={i} className={`glass rounded-xl p-4 border border-white/5 flex flex-col justify-between ${metric.flag ? 'metric-flag bg-warning/5 border-warning/10' : ''}`}>
                              <div className="flex items-center gap-1.5 mb-2">
                                {metric.flag && <FiAlertTriangle className="text-warning flex-shrink-0" size={14} />}
                                <div className={`text-xl font-bold tracking-tight ${metric.flag ? 'text-warning font-mono text-sm' : 'text-cyan'}`}>
                                  {metric.value}
                                </div>
                              </div>
                              <div className="text-[10px] text-muted font-mono uppercase tracking-wide">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                      {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                        <a 
                          href={selectedProject.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full"
                        >
                          <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                            <FiExternalLink /> Live Demo
                          </Button>
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a 
                          href={selectedProject.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full"
                        >
                          <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                            <FiGithub /> Source Code
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
