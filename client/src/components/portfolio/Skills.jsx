import { useState } from 'react';
import { useScrollReveal } from './useScrollReveal';
import { skills } from './data';
import { Badge } from '../ui/Badge';
import { FiCode, FiCpu, FiDatabase, FiCloud, FiServer } from 'react-icons/fi';

const iconMap = {
  "Languages": FiCode,
  "ML & Data": FiCpu,
  "Backend & APIs": FiServer,
  "Cloud & DevOps": FiCloud,
  "Databases": FiDatabase
};

function SkillCard({ category, index, isHovered, onMouseEnter, onMouseLeave, isVisible }) {
  const Icon = iconMap[category.name] || FiCode;
  
  const delayClasses = ["delay-0", "delay-100", "delay-200", "delay-300", "delay-500"];
  const delayClass = delayClasses[index % delayClasses.length];

  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative group bento-card p-6 md:p-8 transition-all duration-700 ${delayClass} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Dynamic Hover Glow (Aceternity Hover Effect) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-accent/15 via-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
      />
      {isHovered && (
        <div className="absolute inset-0 border border-accent/40 rounded-2xl shadow-[0_0_20px_rgba(108,99,255,0.15)] pointer-events-none transition-all duration-300" />
      )}
      
      <div className="relative z-10 flex items-center justify-between mb-6 pb-3 border-b border-white/5">
        <h3 className="text-lg font-semibold text-white tracking-tight">{category.name}</h3>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${index % 2 === 0 ? 'bg-accent/10 text-accent' : 'bg-cyan/10 text-cyan'}`}>
          <Icon size={18} />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2.5 relative z-10">
        {category.items.map((item, itemIdx) => (
          <Badge 
            key={itemIdx} 
            dot={true} 
            dotColor={index % 2 === 0 ? 'bg-accent' : 'bg-cyan'}
            className="hover:scale-102 transition-transform duration-200"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const [ref, isVisible] = useScrollReveal();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="skills" className="py-20 md:py-28 bg-brand-dark relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading (Untitled UI Style) */}
        <div className="text-center mb-16">
          <Badge dot={true} dotColor="bg-cyan" className="mb-3">SKILL_ENGINE</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Technical Stack</h2>
          <p className="text-muted max-w-2xl mx-auto font-light">Engineered to deploy intelligent systems with standard, production-ready architecture.</p>
        </div>

        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((category, index) => (
            <SkillCard
              key={index}
              category={category}
              index={index}
              isHovered={hoveredIdx === index}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
