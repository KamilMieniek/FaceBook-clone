// ========================================================
// Imports
// ========================================================

import mongoose from 'mongoose';
import { asyncRouteHandler } from '../../Middleware/asyncRouteHandler.middleware.js';
import { AppError, commonErrors } from '../../utils/AppError.js';
import User from './users.mongo.js';
import ROLES_LIST from '../../config/roles.config.js';
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
const deleteUser = asyncRouteHandler(async (req, res, next) => {
  //res user is assigned from accesstoken middleware
  //it has property id and roles
  const user = req.user;
  if (!user) {
    return next(new AppError(commonErrors.unauthorized));
  }
  const id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(id))
    return next(new AppError(commonErrors.badIdFormat));
  //this function is mentioned for user to delete only his own account or for admin to delete any account
  //check if id from params match id of user
  if (user.id === id || isAdmin(user)) {
    await User.deleteOne({ _id: id });
    return res.status(200).json({ status: 'ok' });
  } else {
    return next(new AppError(commonErrors.unauthorized));
  }
});

//check if user has admin role
//return boolean
function isAdmin(user) {
  const userRoles = user.roles;
  console.log(ROLES_LIST.Admin);
  const result = userRoles
    .map((role) => {
      return role === ROLES_LIST.Admin;
    })
    .find((value) => {
      return value === true;
    });

  return result;
}

// ========================================================
// Exports
// ========================================================

export { getUser, getUsers, updateUser, deleteUser };
