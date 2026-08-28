import express from 'express';
import { getTaskAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Analytics routes require authentication
router.use(protect);

router.get('/', getTaskAnalytics);

export default router;
