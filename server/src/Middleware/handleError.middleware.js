import AppError from '../utils/AppError.js';

const handleErrorMiddleware = (err, req, res, next) => {
  //AppError has errorType property
  // which include status code and isOperational boolean
  console.log(err);
  if (err instanceof AppError && err.errorType.isOperational) {
    return res
      .status(err.errorType.status)
      .json({ description: err.errorType.description });
  } else {
    res.status(500).json({ description: 'Something went wrong' });
  }
};

// ========================================================
// Exports
// ========================================================
export default handleErrorMiddleware;
