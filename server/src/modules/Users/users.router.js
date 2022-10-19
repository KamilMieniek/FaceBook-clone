// ========================================================
// Imports
// ========================================================

import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './users.controller.js';
import verifyRoles from '../../Middleware/verifyRoles.middleware.js';
import ROLES_LIST from '../../config/roles.config.js';

// ========================================================
// Routes
// ========================================================
const userRouter = express.Router();
//UPDATE
userRouter.put('/:id', verifyRoles(ROLES_LIST.User), updateUser);
//DELETE
userRouter.delete('/:id', verifyRoles(ROLES_LIST.User), deleteUser);
//GET
userRouter.get('/:id', verifyRoles(ROLES_LIST.User), getUser);
//GET ALL
userRouter.get('/', verifyRoles(ROLES_LIST.Admin), getUsers);

// ========================================================
// Exports
// ========================================================
export default userRouter;
