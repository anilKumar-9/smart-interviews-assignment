const User = require('../models/User');
const Task = require('../models/Task');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    One-click Demo User Login (Populates starter tasks if brand new)
// @route   POST /api/auth/demo
// @access  Public
const demoLogin = async (req, res, next) => {
  try {
    const demoEmail = 'demo@example.com';
    let user = await User.findOne({ email: demoEmail });

    if (!user) {
      user = await User.create({
        name: 'Alex Demo',
        email: demoEmail,
        password: 'Password123!',
      });

      // Populate initial demo tasks
      const sampleTasks = [
        {
          title: 'Review System Architecture & API Endpoints',
          description: 'Ensure JWT tokens, compound indexes, and validation middleware are fully tested.',
          status: 'Done',
          priority: 'High',
          dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
          user: user._id,
        },
        {
          title: 'Implement Dark & Light Theme Switcher',
          description: 'Persist user color preference in LocalStorage and add smooth CSS transitions.',
          status: 'Done',
          priority: 'Medium',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
          user: user._id,
        },
        {
          title: 'Optimize MongoDB Queries & Indexing',
          description: 'Verify compound indexes on user + status, user + priority, and user + dueDate.',
          status: 'In Progress',
          priority: 'High',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // In 2 days
          user: user._id,
        },
        {
          title: 'Complete Analytics Dashboard View',
          description: 'Visualize completion percentage, status breakdown, and priority metrics with charts.',
          status: 'In Progress',
          priority: 'Medium',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          user: user._id,
        },
        {
          title: 'Prepare Project Documentation & README',
          description: 'Document design decisions, API specifications, and quickstart commands.',
          status: 'Todo',
          priority: 'Low',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          user: user._id,
        },
      ];

      await Task.insertMany(sampleTasks);
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in as Demo User',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  demoLogin,
};
