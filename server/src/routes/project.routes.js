import { Router } from 'express';
import { isAdmin } from '../middlewares/isAdmin.js';
import { uploadProjectFiles } from '../config/multer.js';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  toggleVisibility,
} from '../controllers/project.controller.js';

const router = Router();

const projectUpload = uploadProjectFiles.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 10 },
  { name: 'video', maxCount: 1 },
]);

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', isAdmin, projectUpload, createProject);
router.put('/:id', isAdmin, projectUpload, updateProject);
router.delete('/:id', isAdmin, deleteProject);
router.patch('/:id/toggle', isAdmin, toggleVisibility);

export default router;
