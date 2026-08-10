import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-surface">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(108,99,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Content — 60% */}
          <div className="lg:col-span-3 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-mono mb-6">
              🚀 Web Design for Local Businesses
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight mb-6">
              We Build Websites That{' '}
              <span className="text-accent">Win Customers</span>{' '}
              for Your Business
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Codex crafts fast, mobile-first websites for cafes, gyms, salons, and more — designed to convert visitors into loyal customers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/contact">
                <Button className="w-full sm:w-auto text-base px-8 py-4">Get a Free Quote</Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="secondary" className="w-full sm:w-auto text-base px-8 py-4">View Our Work</Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>✅ 50+ websites built</span>
              <span>✅ 4.9★ avg rating</span>
              <span>✅ Delivered in 2 weeks</span>
            </div>
          </div>

          {/* Right — Floating Mockup */}
          <div className="lg:col-span-2 hidden lg:flex justify-center">
            <div className="animate-float relative">
              <div className="w-80 rounded-2xl bg-surface border border-white/10 shadow-2xl shadow-accent/10 overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-brand-dark border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-2 bg-brand rounded-md px-3 py-1 text-xs text-muted font-mono text-center">
                    clientwebsite.com
                  </div>
                </div>
                {/* Mock Content */}
                <div className="p-6 space-y-4">
                  <div className="h-3 bg-accent/20 rounded-full w-3/4" />
                  <div className="h-3 bg-white/10 rounded-full w-full" />
                  <div className="h-3 bg-white/10 rounded-full w-5/6" />
                  <div className="h-24 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl mt-4" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-8 bg-accent rounded-full flex-1" />
                    <div className="h-8 border border-white/10 rounded-full flex-1" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="h-16 bg-white/5 rounded-lg" />
                    <div className="h-16 bg-white/5 rounded-lg" />
                    <div className="h-16 bg-white/5 rounded-lg" />
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce">
                ⚡ Fast
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
