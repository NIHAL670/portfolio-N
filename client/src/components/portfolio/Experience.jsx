import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';
import { experience } from './data';
import { Badge } from '../ui/Badge';

export function Experience() {
  const [ref, isVisible] = useScrollReveal();
  const containerRef = useRef(null);
  const [beamLength, setBeamLength] = useState(0);

  useEffect(() => {
    const updateBeam = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const containerHeight = rect.height;
      const startOffset = windowHeight * 0.45; // Start tracing when card enters center view
      const scrollStart = rect.top - startOffset;
      
      let progress = -scrollStart / (containerHeight - 120);
      progress = Math.max(0, Math.min(1, progress));
      setBeamLength(progress * (containerHeight - 120));
    };
    
    window.addEventListener('scroll', updateBeam);
    window.addEventListener('resize', updateBeam);
    updateBeam();
    
    return () => {
      window.removeEventListener('scroll', updateBeam);
      window.removeEventListener('resize', updateBeam);
    };
  }, []);

  return (
    <section ref={ref} id="experience" className="py-20 md:py-28 bg-brand-dark relative overflow-hidden">
      {/* Background glowing blob */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading (Untitled UI Style) */}
        <div className="text-center mb-20">
          <Badge dot={true} dotColor="bg-accent" className="mb-3">HISTORY_SYS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Professional Journey</h2>
          <p className="text-muted max-w-2xl mx-auto font-light">My career path, technical roles, and internships.</p>
        </div>

        <div ref={containerRef} className="relative">
          {/* SVG Tracing Beam Timeline (Aceternity style) */}
          <svg className="hidden md:block absolute left-8 top-8 w-1 pointer-events-none" style={{ height: 'calc(100% - 90px)' }}>
            <line x1="2" y1="0" x2="2" y2="100%" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="2" />
            <line 
              x1="2" 
              y1="0" 
              x2="2" 
              y2={beamLength} 
              stroke="url(#beam-gradient)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              className="tracing-beam-glow transition-all duration-75"
            />
            <defs>
              <linearGradient id="beam-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6c63ff" />
                <stop offset="80%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-12">
            {experience.map((job, index) => {
              const delayClasses = ["delay-0", "delay-100", "delay-200", "delay-300"];
              const delayClass = delayClasses[index % delayClasses.length];
              
              // Dynamic status dots for job types
              const dotColor = job.type.toLowerCase() === 'remote' ? 'bg-cyan' :
                               job.type.toLowerCase() === 'leadership' ? 'bg-accent' :
                               'bg-slate-400';

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 transition-all duration-700 ${delayClass} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {/* Timeline dot that links to SVG line */}
                  <div className="hidden md:flex flex-col items-center mt-7">
                    <div className={`w-4.5 h-4.5 rounded-full border-4 border-brand-dark z-10 transition-all duration-300 ${
                      beamLength > (index * 190) ? 'bg-cyan shadow-[0_0_12px_var(--color-cyan)]' : 'bg-white/10'
                    }`} />
                  </div>

                  {/* Card (Untitled UI Layout & Precise Margins) */}
                  <div className="bento-card p-6 md:p-8 flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{job.title}</h3>
                        <div className="text-accent text-sm font-semibold mt-1">{job.company}</div>
                      </div>

                      <div className="flex flex-col items-end gap-2 text-right">
                        <span className="text-muted text-xs font-mono bg-white/5 border border-white/5 rounded px-2 py-0.5">{job.period}</span>
                        {job.type && (
                          <Badge dot={true} dotColor={dotColor}>
                            {job.type}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3.5">
                      {job.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed font-light">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/60 flex-shrink-0"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
