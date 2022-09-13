import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';
import AppError from './AppError';
import { commonErrors } from './errorTypes.js';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err)
      return next(new AppError(commonErrors.invalidToken, 'Token is invalid!'));
    req.user = user;
    return next();
  });
};

export const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(
      new AppError(commonErrors.accessDenied, 'You are not authorized!')
    );
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  } else {
    return next(
      new AppError(commonErrors.accessDenied, 'You are not authorized!')
    );
  }
};

export { verifyAdmin, verifyToken, verifyUser };
