import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { FAQ_DATA } from '../../utils/constants';
import { FiChevronDown } from 'react-icons/fi';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 md:py-28 bg-brand">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Common Questions"
          subtitle="Everything you need to know about working with Codex."
        />

        <div className="space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 overflow-hidden bg-surface">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
                aria-expanded={openIndex === i}
              >
                <span className="text-white font-medium text-sm md:text-base pr-4 group-hover:text-accent transition-colors">
                  {faq.q}
                </span>
                <FiChevronDown
                  className={`flex-shrink-0 text-muted transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180 text-accent' : ''
                  }`}
                  size={18}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96 pb-5 px-5' : 'max-h-0'
                }`}
              >
                <p className="text-muted text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
