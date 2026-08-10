import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import { Button } from '../ui/Button';
import { FiMenu, FiX } from 'react-icons/fi';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-white font-heading font-bold text-lg group-hover:scale-110 transition-transform">
            C
          </div>
          <span className="text-xl font-heading font-bold text-white">Codex</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors relative py-1 ${
                location.pathname === link.path
                  ? 'text-accent'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden md:block">
            <Button>Get a Quote</Button>
          </Link>
          <button
            className="md:hidden text-white p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-18 bg-brand-dark/98 backdrop-blur-lg transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center pt-12 gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-medium transition-colors ${
                location.pathname === link.path ? 'text-accent' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact">
            <Button className="mt-4">Get a Quote</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
