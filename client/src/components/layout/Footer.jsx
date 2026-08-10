import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-heading font-bold">C</div>
              <span className="text-lg font-heading font-bold text-white">Codex</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-4">
              We build fast, beautiful websites for local businesses — designed to convert visitors into loyal customers.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors" aria-label="WhatsApp">
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'About', path: '/about' },
                { label: 'Blog', path: '/blog' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted text-sm hover:text-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {['Business Websites', 'E-Commerce', 'Landing Pages', 'Redesigns', 'SEO & Analytics'].map((s) => (
                <li key={s}>
                  <span className="text-muted text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>📧 hello@codexagency.in</li>
              <li>📞 +91 98765 43210</li>
              <li>💬 WhatsApp Available</li>
              <li>📍 Bengaluru, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 text-center">
          <p className="text-muted text-sm">© 2025 Codex. All rights reserved.</p>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={26} className="text-white" />
      </a>
    </footer>
  );
}
