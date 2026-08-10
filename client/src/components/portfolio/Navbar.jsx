import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload, FiLayers } from 'react-icons/fi';
import { personalInfo, navLinks } from './data';
import { useActiveSection } from './useScrollReveal';
import { Button } from '../ui/Button';

export function Navbar({ cycleTheme, activeTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const activeSection = useActiveSection(['about', 'skills', 'projects', 'experience', 'contact']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      {/* Scroll Progress Indicator */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-accent via-cyan to-accent transition-all duration-75"
        style={{ width: `${scrollPercent}%` }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" onClick={() => window.scrollTo(0, 0)} className="text-xl font-heading font-bold text-white tracking-wide cursor-pointer">
            {personalInfo?.name || "Nihal Yadav"}
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === link.id ? 'text-white' : 'text-muted hover:text-accent'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              {cycleTheme && (
                <button
                  onClick={cycleTheme}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-white flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all border border-white/5"
                  title="Cycle Accent Theme"
                  aria-label="Cycle Accent Theme"
                >
                  <FiLayers size={15} className="animate-spin-slow text-accent" />
                </button>
              )}

              {personalInfo.resumeUrl && (
                <a href={personalInfo.resumeUrl} download target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="py-1.5 px-4 text-xs flex items-center gap-1.5 border-white/10 hover:border-accent hover:text-accent">
                    <FiDownload size={13} /> Resume
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-accent transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 bg-brand/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-6">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-4 sm:right-6 text-white hover:text-accent transition-colors cursor-pointer"
          >
            <FiX size={32} />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={closeMenu}
              className={`text-2xl font-medium transition-colors cursor-pointer ${
                activeSection === link.id ? 'text-white' : 'text-muted hover:text-accent'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/5 w-48">
            {cycleTheme && (
              <button
                onClick={cycleTheme}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm hover:text-white cursor-pointer"
              >
                <FiLayers size={16} className="animate-spin-slow text-accent" /> Cycle Theme
              </button>
            )}

            {personalInfo.resumeUrl && (
              <a href={personalInfo.resumeUrl} download target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="primary" className="w-full py-2.5 px-6 text-sm flex items-center justify-center gap-2">
                  <FiDownload size={16} /> Download Resume
                </Button>
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
