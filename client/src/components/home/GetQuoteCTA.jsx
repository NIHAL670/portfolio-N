import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function GetQuoteCTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-accent via-accent-hover to-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '30px 30px',
        }} />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
          Ready to grow your business online?
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
          Let&apos;s build something great together. Get a free, no-obligation quote today.
        </p>
        <Link to="/contact">
          <Button className="bg-white text-accent hover:bg-gray-100 shadow-xl text-base px-10 py-4 font-semibold">
            Get My Free Quote
          </Button>
        </Link>
      </div>
    </section>
  );
}
