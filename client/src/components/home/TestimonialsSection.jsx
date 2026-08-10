import { useState, useEffect, useCallback } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../utils/constants';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-20 md:py-28 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Don't take our word for it — hear from businesses we've helped grow."
        />

        <div className="max-w-3xl mx-auto relative">
          <div className="bg-surface rounded-2xl border border-white/5 p-8 md:p-12 text-center animate-fade-in" key={current}>
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-xl ${i < t.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
              ))}
            </div>

            <blockquote className="text-lg md:text-xl text-gray-300 italic leading-relaxed mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center text-accent font-heading font-bold text-lg">
                {t.name[0]}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-muted text-xs">{t.business} · {t.industry}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-accent transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-accent transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
