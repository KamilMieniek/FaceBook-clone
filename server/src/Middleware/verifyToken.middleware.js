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

//This function checks if user has sent token in Bearer header
//also is assigning values of id and roles from access token to req object
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError(commonErrors.unauthorized));
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_ACCESS, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    //user has property id and roles[]
    console.log(decoded.user);
    req.user = decoded.user;
    next();
  });
};
// ========================================================
// Exports
// ========================================================
export { verifyAccessToken as default };
