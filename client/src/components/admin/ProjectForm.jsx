import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { INDUSTRY_TAGS } from '../../utils/constants';
import { createProject, updateProject } from '../../services/api';
import { slugify } from '../../utils/helpers';

export function ProjectForm({ project, onSuccess, onCancel }) {
  const isEdit = !!project;
  const [form, setForm] = useState({
    title: '', slug: '', description: '', fullDescription: '', industry: '', tags: '',
    liveUrl: '', isCaseStudy: false, caseStudyProblem: '', caseStudySolution: '',
    caseStudyResult: '', isVisible: true, order: 0,
  });
  const [files, setFiles] = useState({ thumbnail: null, images: [], video: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '', slug: project.slug || '',
        description: project.description || '', fullDescription: project.fullDescription || '',
        industry: project.industry || '', tags: project.tags?.join(', ') || '',
        liveUrl: project.liveUrl || '', isCaseStudy: project.isCaseStudy || false,
        caseStudyProblem: project.caseStudy?.problem || '', caseStudySolution: project.caseStudy?.solution || '',
        caseStudyResult: project.caseStudy?.result || '', isVisible: project.isVisible !== false,
        order: project.order || 0,
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    if (name === 'title' && !isEdit) {
      setForm(prev => ({ ...prev, slug: slugify(value), [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val));
      if (files.thumbnail) fd.append('thumbnail', files.thumbnail);
      files.images.forEach((f) => fd.append('images', f));
      if (files.video) fd.append('video', files.video);

      if (isEdit) {
        await updateProject(project._id, fd);
      } else {
        await createProject(fd);
      }
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = 'w-full bg-brand border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-muted focus:border-accent focus:outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-surface border border-white/5">
      <h3 className="text-white font-heading font-semibold text-lg">{isEdit ? 'Edit Project' : 'Add New Project'}</h3>

      {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-xl">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title *" required className={inputClasses} />
        <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className={inputClasses} />
      </div>

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description *" required rows="2" className={`${inputClasses} resize-none`} />
      <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} placeholder="Full description (Markdown)" rows="4" className={`${inputClasses} resize-none`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="industry" value={form.industry} onChange={handleChange} required className={inputClasses}>
          <option value="">Industry *</option>
          {INDUSTRY_TAGS.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className={inputClasses} />
      </div>

      <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="Live URL" className={inputClasses} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-muted text-xs mb-1">Thumbnail {!isEdit && '*'}</label>
          <input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, thumbnail: e.target.files[0] })} className="text-sm text-muted" />
        </div>
        <div>
          <label className="block text-muted text-xs mb-1">Additional Images (max 10)</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setFiles({ ...files, images: Array.from(e.target.files) })} className="text-sm text-muted" />
        </div>
        <div>
          <label className="block text-muted text-xs mb-1">Video (optional)</label>
          <input type="file" accept="video/*" onChange={(e) => setFiles({ ...files, video: e.target.files[0] })} className="text-sm text-muted" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input type="checkbox" name="isCaseStudy" checked={form.isCaseStudy} onChange={handleChange} className="accent-accent" />
          Case Study
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input type="checkbox" name="isVisible" checked={form.isVisible} onChange={handleChange} className="accent-accent" />
          Visible
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted">Order:</label>
          <input type="number" name="order" value={form.order} onChange={handleChange} className="w-20 bg-brand border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm" />
        </div>
      </div>

      {form.isCaseStudy && (
        <div className="space-y-3 p-4 rounded-xl bg-brand/50 border border-accent/10">
          <textarea name="caseStudyProblem" value={form.caseStudyProblem} onChange={handleChange} placeholder="Problem" rows="2" className={`${inputClasses} resize-none`} />
          <textarea name="caseStudySolution" value={form.caseStudySolution} onChange={handleChange} placeholder="Solution" rows="2" className={`${inputClasses} resize-none`} />
          <textarea name="caseStudyResult" value={form.caseStudyResult} onChange={handleChange} placeholder="Result" rows="2" className={`${inputClasses} resize-none`} />
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : isEdit ? 'Update Project' : 'Create Project'}
        </Button>
        {onCancel && <Button variant="ghost" type="button" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}
