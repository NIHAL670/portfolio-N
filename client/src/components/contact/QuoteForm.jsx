import { useState } from 'react';
import { submitInquiry } from '../../services/api';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { INDUSTRY_TAGS, BUDGET_OPTIONS } from '../../utils/constants';

export function QuoteForm({ onSuccess, onError }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', businessName: '', industry: '', budget: '', message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitInquiry({ ...form, source: 'quote_form' });
      onSuccess?.('Quote request submitted! We\'ll get back to you shortly.');
      setForm({ name: '', email: '', phone: '', businessName: '', industry: '', budget: '', message: '' });
    } catch (err) {
      onError?.(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = 'w-full bg-brand border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-muted focus:border-accent focus:outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name *" required className={inputClasses} />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required className={inputClasses} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" required className={inputClasses} />
        <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business Name" className={inputClasses} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="industry" value={form.industry} onChange={handleChange} className={inputClasses}>
          <option value="">Select Industry</option>
          {INDUSTRY_TAGS.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select name="budget" value={form.budget} onChange={handleChange} className={inputClasses}>
          <option value="">Budget Range</option>
          {BUDGET_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project *" required rows="4" className={`${inputClasses} resize-none`} />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Spinner size="sm" /> : 'Get My Free Quote'}
      </Button>
    </form>
  );
}
