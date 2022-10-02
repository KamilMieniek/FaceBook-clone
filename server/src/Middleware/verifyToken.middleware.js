// ========================================================
// Imports
// ========================================================
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import { AppError, commonErrors } from '../utils/AppError.js';

// ========================================================
// Middleware
// ========================================================

const verifyRefreshToken = (req, res, next) => {
  const authHeader = req.authHeader['authorization'];
  if (!authHeader?.startsWith('Bearer '))
    return next(new AppError(commonErrors.unauthorized));
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) return next(new AppError(commonErrors.invalidToken));
    req.user = {
      username: decoded.username,
      _id: decoded._id,
    };
    next();
  });
};

// ========================================================
// Exports
// ========================================================
