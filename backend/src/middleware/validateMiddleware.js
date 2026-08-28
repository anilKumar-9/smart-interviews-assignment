const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(', '),
      errors,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(', '),
      errors,
    });
  }

  next();
};

const validateTask = (req, res, next) => {
  const { title, status, priority, dueDate } = req.body;
  const errors = [];

  if (req.method === 'POST' && (!title || title.trim().length === 0)) {
    errors.push('Task title is required');
  }

  if (title && title.length > 150) {
    errors.push('Task title cannot exceed 150 characters');
  }

  if (status && !['Todo', 'In Progress', 'Done'].includes(status)) {
    errors.push('Status must be one of: Todo, In Progress, Done');
  }

  if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
    errors.push('Priority must be one of: Low, Medium, High');
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    errors.push('Invalid due date format');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(', '),
      errors,
    });
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateTask,
};
