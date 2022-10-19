// ========================================================
// Imports
// ========================================================

import express from 'express';
import { register, login, logout } from './auth.controller.js';
import { validateRequestBody } from '../../Middleware/validateRequest.middleware.js';
import { newUserValidator } from '../Users/users.validate.js';
import { getNewAccessToken } from './refreshToken.js';
// ========================================================
// Routes
// ========================================================

const authRouter = express.Router();
//LOGIN
authRouter.post('/register', validateRequestBody(newUserValidator), register);
//REGISTER
authRouter.post('/login', login);
//LOGOUT
authRouter.get('/logout', logout);
//get new refresh&access token's
authRouter.get('/refresh', getNewAccessToken);

// ========================================================
// Exports
// ========================================================
export default authRouter;
