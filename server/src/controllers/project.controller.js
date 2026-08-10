import Project from '../models/Project.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getProjects = async (req, res, next) => {
  try {
    const { industry, featured, isCaseStudy, limit } = req.query;
    const filter = { isVisible: true };
    if (industry) filter.industry = industry;
    if (isCaseStudy === 'true') filter.isCaseStudy = true;

    let query = Project.find(filter).sort({ order: 1, createdAt: -1 });

    if (limit) query = query.limit(Number(limit));

    const projects = await query;
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const data = req.body;
    data.slug = data.slug || slugify(data.title);
    data.tags = data.tags ? (typeof data.tags === 'string' ? data.tags.split(',').map(t => t.trim()) : data.tags) : [];
    data.isCaseStudy = data.isCaseStudy === 'true' || data.isCaseStudy === true;
    data.isVisible = data.isVisible !== 'false' && data.isVisible !== false;
    data.order = Number(data.order) || 0;

    if (data.isCaseStudy) {
      data.caseStudy = {
        problem: data.caseStudyProblem || '',
        solution: data.caseStudySolution || '',
        result: data.caseStudyResult || '',
      };
    }

    if (req.files) {
      const thumbnail = req.files.thumbnail?.[0];
      if (thumbnail) data.thumbnail = `/uploads/projects/images/${thumbnail.filename}`;

      const images = req.files.images || [];
      data.images = images.map((f) => `/uploads/projects/images/${f.filename}`);

      const video = req.files.video?.[0];
      if (video) data.video = `/uploads/projects/videos/${video.filename}`;
    }

    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const data = req.body;
    if (data.tags && typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(t => t.trim());
    }
    data.isCaseStudy = data.isCaseStudy === 'true' || data.isCaseStudy === true;
    data.isVisible = data.isVisible !== 'false' && data.isVisible !== false;
    data.order = Number(data.order) || 0;

    if (data.isCaseStudy) {
      data.caseStudy = {
        problem: data.caseStudyProblem || '',
        solution: data.caseStudySolution || '',
        result: data.caseStudyResult || '',
      };
    }

    if (req.files) {
      const thumbnail = req.files.thumbnail?.[0];
      if (thumbnail) data.thumbnail = `/uploads/projects/images/${thumbnail.filename}`;

      const images = req.files.images;
      if (images?.length) data.images = images.map((f) => `/uploads/projects/images/${f.filename}`);

      const video = req.files.video?.[0];
      if (video) data.video = `/uploads/projects/videos/${video.filename}`;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const deleteUploadedFile = (filePath) => {
  if (!filePath) return;
  const fullPath = path.join(__dirname, '../../', filePath);
  fs.unlink(fullPath, () => {});
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    deleteUploadedFile(project.thumbnail);
    project.images?.forEach(deleteUploadedFile);
    deleteUploadedFile(project.video);

    res.json({ message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};

export const toggleVisibility = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.isVisible = !project.isVisible;
    await project.save();
    res.json(project);
  } catch (error) {
    next(error);
  }
};
