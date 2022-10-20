import { AppError } from '../utils/AppError.js';

const handleErrorMiddleware = (err, req, res, next) => {
  if (err instanceof AppError) {
    if (err.isOperational) {
      //here are actions specific for different types of error's
      if (err.name === 'invalidRefreshToken') {
        res.clearCookie('jwt');
      }
      console.log(err);
      res.status(err.status);
      return res.json({ description: err.description });
    }
  } else {
    res.status(500).json({ description: 'Something went wrong' });
    console.error("Handle Error middleware\n programmer's error:\n", err);
  }
};

// ========================================================
// Exports
// ========================================================
export default handleErrorMiddleware;
