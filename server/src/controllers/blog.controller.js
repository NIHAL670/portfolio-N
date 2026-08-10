import BlogPost from '../models/BlogPost.model.js';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getPublishedPosts = async (_req, res, next) => {
  try {
    const posts = await BlogPost.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (_req, res, next) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const data = req.body;
    data.slug = data.slug || slugify(data.title);
    const post = await BlogPost.create(data);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
};
