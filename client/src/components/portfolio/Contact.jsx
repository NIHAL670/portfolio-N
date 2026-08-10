import { useState } from 'react';
import { useScrollReveal } from './useScrollReveal';
import { personalInfo } from './data';
import { FiMail, FiLinkedin, FiGithub, FiBox, FiSend, FiCheckCircle, FiAlertCircle, FiPhone, FiCompass } from 'react-icons/fi';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const socialLinks = [
  { key: 'linkedin', Icon: FiLinkedin, label: 'LinkedIn', colorClass: 'hover:text-[#0077b5] hover:border-[#0077b5]/30' },
  { key: 'github', Icon: FiGithub, label: 'GitHub', colorClass: 'hover:text-white hover:border-white/30' },
  { key: 'huggingface', Icon: FiBox, label: 'HuggingFace', colorClass: 'hover:text-[#ffd21e] hover:border-[#ffd21e]/30' },
];

export function Contact() {
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Freelance Project',
    message: ''
  });

  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('ERROR');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setStatus('SENDING');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio] ${formData.subject} - ${formData.name}`,
          message: formData.message
        })
      });

      const result = await response.json();
      if (result.success === "true" || response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', subject: 'Freelance Project', message: '' });
      } else {
        setStatus('ERROR');
        setErrorMsg('Failed to send message. Please try again.');
      }
    } catch {
      setStatus('ERROR');
      setErrorMsg('Failed to send message. Please check your network connection.');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-brand-dark relative overflow-hidden">
      {/* Background glowing blob */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[140px] pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Heading (Untitled UI Style) */}
        <div className="text-center mb-16">
          <Badge dot={true} dotColor="bg-cyan" className="mb-3">DISPATCH_SYS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Let&apos;s Connect</h2>
          <p className="text-muted max-w-2xl mx-auto font-light">Have an opening, a freelance project, or just want to chat about ML pipelines?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-4">Contact Info</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                {personalInfo.valueProposition}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3.5 bg-brand/30 border border-white/5 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">EMAIL ME</div>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm text-white hover:text-cyan transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {personalInfo.phone && (
                  <div className="flex items-center gap-3.5 bg-brand/30 border border-white/5 p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan">
                      <FiPhone size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">CALL ME</div>
                      <span className="text-sm text-white font-mono">
                        {personalInfo.phone}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3.5 bg-brand/30 border border-white/5 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <FiCompass size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">LOCATION</div>
                    <span className="text-sm text-white">
                      Ghaziabad, Uttar Pradesh, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h4 className="text-xs font-semibold text-white tracking-widest font-mono mb-4 uppercase">FIND ME ON</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ key, Icon, label, colorClass }) => (
                  <a
                    key={key}
                    href={personalInfo.socials?.[key] || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-11 h-11 rounded-xl glass border border-white/5 flex items-center justify-center text-slate-400 hover:scale-105 transition-all cursor-pointer ${colorClass}`}
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side with Glowing Border Beam */}
          <div className="lg:col-span-3 border-beam-container">
            <div className="border-beam" />
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5 border border-white/5 relative z-10">
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">Send a Message</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="untitled-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="untitled-input"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="untitled-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="untitled-input"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="untitled-label">Inquiry Type</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="untitled-input font-mono"
                >
                  <option value="Freelance Project">Freelance Project / Contract</option>
                  <option value="Full-time Job">Full-time Job Opportunity</option>
                  <option value="Technical Collaboration">Technical Collaboration</option>
                  <option value="Other">Other / Questions</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="untitled-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="untitled-input"
                  placeholder="Tell me about your project or job opening..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={status === 'SENDING'}
                className="w-full py-3 justify-center text-xs tracking-wider uppercase font-semibold"
              >
                {status === 'SENDING' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </Button>

              {/* Status Feedbacks */}
              {status === 'SUCCESS' && (
                <div className="absolute inset-0 bg-brand/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fade-in z-20">
                  <FiCheckCircle className="text-cyan mb-4 animate-scale-in" size={52} />
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-slate-300 text-sm max-w-xs font-light">
                    Thank you for reaching out. I will review your message and reply within 24 hours.
                  </p>
                  <button 
                    onClick={() => setStatus('IDLE')}
                    className="mt-6 text-xs text-accent hover:underline font-mono cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}

              {status === 'ERROR' && (
                <div className="flex items-center gap-2 text-danger text-xs font-mono mt-2 animate-slide-up">
                  <FiAlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
