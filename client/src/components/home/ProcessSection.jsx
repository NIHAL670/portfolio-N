import { SectionHeading } from '../ui/SectionHeading';
import { PROCESS_STEPS } from '../../utils/constants';

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How We Work"
          subtitle="A simple, transparent process from idea to launch."
        />

        {/* Desktop Stepper */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Connecting Line */}
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-accent/30" />

          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center relative z-10 w-1/5 px-2">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-2xl mb-4">
                {step.icon}
              </div>
              <div className="text-xs font-mono text-accent mb-1">Step {step.num}</div>
              <h4 className="text-white font-heading font-semibold text-sm mb-1">{step.title}</h4>
              <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile Stepper */}
        <div className="md:hidden space-y-6">
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-xl flex-shrink-0">
                  {step.icon}
                </div>
                {step.num < PROCESS_STEPS.length && (
                  <div className="w-0.5 h-8 border-l-2 border-dashed border-accent/30 mt-2" />
                )}
              </div>
              <div className="pt-2">
                <div className="text-xs font-mono text-accent mb-1">Step {step.num}</div>
                <h4 className="text-white font-heading font-semibold mb-1">{step.title}</h4>
                <p className="text-muted text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
