import { Router } from 'express';
import { isAdmin } from '../middlewares/isAdmin.js';
import {
  getPublishedPosts,
  getPostBySlug,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/blog.controller.js';

const router = Router();

router.get('/', getPublishedPosts);
router.get('/all', isAdmin, getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', isAdmin, createPost);
router.put('/:id', isAdmin, updatePost);
router.delete('/:id', isAdmin, deletePost);

export default router;
