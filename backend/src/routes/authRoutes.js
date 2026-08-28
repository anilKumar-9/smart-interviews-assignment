const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  demoLogin,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
  validateSignup,
  validateLogin,
} = require('../middleware/validateMiddleware');

router.post('/signup', validateSignup, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/demo', demoLogin);
router.get('/me', protect, getMe);

module.exports = router;
