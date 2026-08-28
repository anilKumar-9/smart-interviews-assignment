const express = require('express');
const router = express.Router();
const { getTaskAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

// Analytics routes require authentication
router.use(protect);

router.get('/', getTaskAnalytics);

module.exports = router;
