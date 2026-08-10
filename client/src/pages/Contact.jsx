import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ContactForm } from '../components/contact/ContactForm';
import { QuoteForm } from '../components/contact/QuoteForm';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Contact() {
  const { toast, showToast, hideToast } = useToast();

  return (
    <PageWrapper title="Contact Us" description="Get in touch with Codex. We'd love to hear about your project and help bring your vision to life.">
      <section className="py-16 md:py-24 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Let's Talk Business"
            subtitle="Have a project in mind? Reach out and let's discuss how we can help."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-surface border border-white/5">
                <h3 className="text-white font-heading font-semibold text-lg mb-4">Get in Touch</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3"><span className="text-lg">📧</span><span className="text-gray-300">hello@codexagency.in</span></div>
                  <div className="flex items-center gap-3"><span className="text-lg">📞</span><span className="text-gray-300">+91 98765 43210</span></div>
                  <div className="flex items-center gap-3"><span className="text-lg">📍</span><span className="text-gray-300">Bengaluru, Karnataka, India</span></div>
                  <div className="flex items-center gap-3"><span className="text-lg">🕑</span><span className="text-gray-300">Mon–Sat, 10:00 AM – 7:00 PM IST</span></div>
                </div>
              </div>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
              >
                <FaWhatsapp size={24} />
                <div>
                  <p className="font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-xs text-green-400/70">Quick responses, usually within minutes</p>
                </div>
              </a>

              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-accent transition-colors" aria-label="Instagram">
                  <FaInstagram size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-accent transition-colors" aria-label="LinkedIn">
                  <FaLinkedinIn size={18} />
                </a>
              </div>

              {/* Quote Form */}
              <div className="p-6 rounded-2xl bg-surface border border-white/5">
                <h3 className="text-white font-heading font-semibold text-lg mb-4">Request a Quote</h3>
                <QuoteForm
                  onSuccess={(msg) => showToast(msg, 'success')}
                  onError={(msg) => showToast(msg, 'error')}
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 md:p-8 rounded-2xl bg-surface border border-white/5">
              <h3 className="text-white font-heading font-semibold text-lg mb-6">Send a Message</h3>
              <ContactForm
                onSuccess={(msg) => showToast(msg, 'success')}
                onError={(msg) => showToast(msg, 'error')}
              />
            </div>
          </div>
        </div>
      </section>

      <Toast toast={toast} onClose={hideToast} />
    </PageWrapper>
  );
}
