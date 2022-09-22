import { AppError } from '../utils/AppError.js';

const handleErrorMiddleware = (err, req, res, next) => {
  if (err instanceof AppError) {
    if (err.isOperational) {
      return res.status(err.status).json({ description: err.description });
    }
  } else {
    res.status(500).json({ description: 'Something went wrong' });
    console.error(err);
  }
};

// ========================================================
// Exports
// ========================================================
export default handleErrorMiddleware;
