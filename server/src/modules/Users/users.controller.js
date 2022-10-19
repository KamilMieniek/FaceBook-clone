// ========================================================
// Imports
// ========================================================

import mongoose from 'mongoose';
import { asyncRouteHandler } from '../../Middleware/asyncRouteHandler.middleware.js';
import { AppError, commonErrors } from '../../utils/AppError.js';
import User from './users.mongo.js';

// ========================================================
// Controllers
// ========================================================

//READ
const getUser = asyncRouteHandler(async (req, res, next) => {
  const id = req?.params?.id;
  if (!id) {
    return next(new AppError(commonErrors.idRequired));
  }
  //TODO: move to validation middleware
  const ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(id))
    return next(new AppError(commonErrors.badIdFormat));
  const user = await User.findOne({ _id: id });
  if (!user) return next(new AppError(commonErrors.invalidUserId));
  res.status(200).json({ username: user.username, birthday: user.birthday });
});

const getUsers = asyncRouteHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new AppError(commonErrors.unauthorized));
  return res.status(200).json(users);
});

//UPDATE
const updateUser = asyncRouteHandler((req, res, next) => {
  const params = req.params;

  console.log(params);
});

//DELETE
const deleteUser = asyncRouteHandler((req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(commonErrors.unauthorized));
  }
  const userId = User.findOne({ username: user.username });
  if (req.user)
    // const user = User.findOne();
    console.log(params);
});

// ========================================================
// Exports
// ========================================================

export { getUser, getUsers, updateUser, deleteUser };
