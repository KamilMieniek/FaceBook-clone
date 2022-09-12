// ========================================================
// Imports
// ========================================================

import express from 'express';
import { register, login } from './auth.controller.js';
import { validateRequestBody } from '../Middleware/valdiateRequest.middleware.js';
import { newUserValidator } from '../Users/users.validate.js';
// ========================================================
// Routes
// ========================================================

const authRouter = express.Router();
//LOGIN
authRouter.post('/register', validateRequestBody(newUserValidator), register);
//REGISTER
authRouter.post('/login', login);

export default authRouter;
