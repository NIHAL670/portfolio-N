import { useScrollReveal } from './useScrollReveal';
import { use3DTilt, useSpotlight } from './useInteractiveEffects';
import { achievements } from './data';
import { FiAward, FiFileText, FiMail, FiCpu, FiExternalLink } from 'react-icons/fi';

const iconMap = {
  trophy: { Icon: FiAward, colorClass: 'text-warning', bgClass: 'bg-warning/10' },
  certificate: { Icon: FiFileText, colorClass: 'text-accent', bgClass: 'bg-accent/10' },
  letter: { Icon: FiMail, colorClass: 'text-cyan', bgClass: 'bg-cyan/10' },
  brain: { Icon: FiCpu, colorClass: 'text-success', bgClass: 'bg-success/10' },
};

function AchievementCard({ item, index, isVisible }) {
  const tilt = use3DTilt(10, 1.02);
  const spotlight = useSpotlight();
  const { Icon, colorClass, bgClass } = iconMap[item.icon] || iconMap.trophy;

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

  const delayClasses = ["delay-0", "delay-100", "delay-200", "delay-300"];
  const delayClass = delayClasses[index % delayClasses.length];

  return (
    <div 
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tilt.style,
        ...spotlight.style,
      }}
      className={`glass spotlight-card rounded-2xl p-6 border border-white/5 transition-all duration-700 ${delayClass} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${bgClass}`}>
        <Icon size={24} className={colorClass} />
      </div>
      
      <h3 className="text-white font-semibold text-lg mb-2 relative z-10">{item.title}</h3>
      <p className="text-slate-300 text-sm mb-4 relative z-10">{item.detail}</p>
      
      {item.link && (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:underline cursor-pointer relative z-10"
        >
          View Details <FiExternalLink size={14} />
        </a>
      )}
    </div>
  );
}

export function Achievements() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="achievements" className="py-20 md:py-28 bg-brand relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Achievements</h2>
          <p className="text-muted max-w-2xl mx-auto">Awards, certifications, and recognitions.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, index) => (
            <AchievementCard 
              key={index}
              item={item}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
