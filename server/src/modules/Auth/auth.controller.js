// ========================================================
// Imports
// ========================================================

import User from '../Users/users.mongo.js';
import bcrypt from 'bcryptjs';
import { AppError, commonErrors } from '../../utils/AppError.js';
import { asyncRouteHandler } from '../../Middleware/asyncRouteHandler.middleware.js';
import jwt from 'jsonwebtoken';

// ========================================================
// Controllers
// ========================================================

//REGISTER
const register = asyncRouteHandler(async (req, res, next) => {
  //check if there is an User with this email,
  //email has to be unique, so return operational error with message to user
  const registeredEmail = await User.findOne({ email: req.body.email });
  if (registeredEmail) {
    next(new AppError(commonErrors.emailIsUsed));
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    birthday: req.body.birthday,
    password: hash,
  });

  await newUser.save();
  res.status(201).json({
    message: 'User successfully registered.',
  });
});

// LOGIN
const login = asyncRouteHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError(commonErrors.invalidEmailInputError));

  const match = await bcrypt.compare(req.body.password, user.password);
  //if password is not correct. push operational AppError further to errorHandlerMiddleware
  if (!match) return next(new AppError(commonErrors.wrongPasswordError));

  const roles = Object.values(user.roles);
  const accessToken = jwt.sign(
    { userInfo: { _id: user._id, username: user.username, roles: roles } },
    process.env.JWT,
    {
      expiresIn: '60s',
    }
  );
  const refreshToken = jwt.sign(
    { userInfo: { _id: user._id } },
    process.env.JWT,
    {
      expiresIn: '1d',
    }
  );

  //TODO:  should I change it after extending user model to store posts, messages , chat rooms?
  const {
    password,
    __v,
    updatedAt,
    createdAt,
    birthday,
    isAdmin,
    lastActiveAt,
    ...otherDetails
  } = user._doc;
  res
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .status(200)
    .json({ ...otherDetails });
});
// ========================================================
// Exports
// ========================================================
export { register, login };
