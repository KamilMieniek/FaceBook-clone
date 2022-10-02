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
  const hashedPwd = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    birthday: req.body.birthday,
    roles: { User: '2001' },
    password: hashedPwd,
  });
  await newUser.save();
  const { accessToken, refreshToken } = newTokens(newUser);
  res
    .cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      accessToken,
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

  const { accessToken, refreshToken } = newTokens(user);
  res
    .cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ accessToken });
});

//Generate new Access and refresh tokens for login and register operations
const newTokens = (user) => {
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
  return { accessToken, refreshToken };
};
// ========================================================
// Exports
// ========================================================
export { register, login };
