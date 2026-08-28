import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateTask } from '../middleware/validateMiddleware.js';

const router = express.Router();

// All task routes require authentication
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(validateTask, createTask);

router.route('/:id')
  .get(getTaskById)
  .put(validateTask, updateTask)
  .delete(deleteTask);

router.patch('/:id/status', updateTaskStatus);

export default router;
