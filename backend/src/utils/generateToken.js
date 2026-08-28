import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'super_secret_jwt_key_task_tracker_2026', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export default generateToken;
