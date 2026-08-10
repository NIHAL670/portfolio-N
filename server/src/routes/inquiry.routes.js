import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiry.controller.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  validateRequest,
  createInquiry
);

router.get('/', isAdmin, getInquiries);
router.patch('/:id/status', isAdmin, updateInquiryStatus);
router.delete('/:id', isAdmin, deleteInquiry);

export default router;
