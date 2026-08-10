import { Router } from 'express';
import passport from '../config/passport.js';
import {
  googleAuth,
  googleCallback,
  googleCallbackRedirect,
  logout,
  getMe,
  login,
} from '../controllers/auth.controller.js';

const router = Router();

router.get('/google', googleAuth(passport));
router.get('/google/callback', googleCallback(passport), googleCallbackRedirect);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', getMe);

export default router;
