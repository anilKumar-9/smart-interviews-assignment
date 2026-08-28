import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  demoLogin,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  validateSignup,
  validateLogin,
} from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/demo', demoLogin);
router.get('/me', protect, getMe);

export default router;
