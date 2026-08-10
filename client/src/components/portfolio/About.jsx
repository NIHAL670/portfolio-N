import { useScrollReveal } from './useScrollReveal';
import { bio, stats, education, personalInfo } from './data';
import { FiBookOpen, FiActivity, FiMapPin, FiTerminal, FiAward, FiGlobe } from 'react-icons/fi';
import { Badge } from '../ui/Badge';

export function About() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="about" className="py-20 md:py-28 bg-brand relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading (Untitled UI Style) */}
        <div className="text-center mb-16">
          <Badge dot={true} dotColor="bg-accent" className="mb-3">ABOUT_SYSTEM</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Technical Profile</h2>
          <p className="text-muted max-w-2xl mx-auto font-light">Get to know the engineering foundation, stats, and background.</p>
        </div>

        {/* Bento Grid layout */}
        <div 
          ref={ref}
          className={`bento-grid transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Card 1: Bio & Mission Statement (col-span-2) */}
          <div className="bento-card md:col-span-2 p-6 md:p-8 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FiTerminal className="text-accent" size={18} />
                <span className="text-xs font-mono text-muted uppercase tracking-wider">executive_summary</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 leading-snug">
                I build ML pipelines end-to-end: from feature engineering to wrapping everything in a clean REST API.
              </h3>
              <div className="space-y-4 text-slate-300 text-sm md:text-base font-light leading-relaxed">
                <p>{bio[0]}</p>
                <p>{bio[1]}</p>
                <p>{bio[2]}</p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted font-mono">
              <span>LOCATION: Ghaziabad, India</span>
              <span className="text-cyan">STATUS: ACTIVE_DISPATCH</span>
            </div>
          </div>

          {/* Card 2: Interactive Statistics (col-span-1) */}
          <div className="bento-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FiActivity className="text-cyan" size={18} />
                <span className="text-xs font-mono text-muted uppercase tracking-wider">telemetry_metrics</span>
              </div>
              <div className="space-y-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-1.5">
                      {stat.value}
                      <span className="text-xs text-accent font-mono font-normal">v1.0</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Academic Blueprint (col-span-2) */}
          <div className="bento-card md:col-span-2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FiBookOpen className="text-accent" size={18} />
                <span className="text-xs font-mono text-muted uppercase tracking-wider">academic_blueprint</span>
              </div>
              
              <div className="bg-brand-dark/40 border border-white/5 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{education.school}</h4>
                    <p className="text-slate-300 text-sm mt-1 font-light">{education.degree}</p>
                  </div>
                  <Badge dot={true} dotColor="bg-cyan" className="flex-shrink-0">CGPA {education.gpa.split(' ')[0]}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5 text-xs font-mono text-muted">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Period</div>
                    <div className="text-slate-300 mt-0.5">{education.period}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Location</div>
                    <div className="text-slate-300 mt-0.5">{education.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2.5 text-xs text-muted font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan"></span>
              <span>Core: Data Structures, OOP, Competitive Programming</span>
            </div>
          </div>

          {/* Card 4: Quick Details / Availability (col-span-1) */}
          <div className="bento-card p-6 md:p-8 flex flex-col justify-between border-beam-container">
            <div className="border-beam" />
            <div>
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <FiGlobe className="text-cyan animate-spin-slow" size={18} />
                <span className="text-xs font-mono text-muted uppercase tracking-wider">network_status</span>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="text-sm text-slate-300 leading-relaxed font-light">
                  {personalInfo.availability}
                </div>
                
                <div className="bg-brand-dark/40 border border-white/5 rounded-lg p-3 text-xs font-mono">
                  <div className="text-slate-500">EMAIL</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-accent hover:underline block truncate mt-1">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center relative z-10">
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>PEAK RATING // 1500</span>
                <span>SECURE LINK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
