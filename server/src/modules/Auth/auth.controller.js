// ========================================================
// Imports
// ========================================================

import User from '../Users/users.mongo.js';
import bcrypt from 'bcryptjs';
import { AppError, commonErrors } from '../../utils/AppError.js';
import { asyncRouteHandler } from '../../Middleware/asyncRouteHandler.middleware.js';
import jwt from 'jsonwebtoken';
import { newTokens } from './refreshToken.js';
import jwtConfig from '../../config/jwt.config.js';
const { cookieDuration, refreshTokenDuration, accessTokenDuration } = jwtConfig;
// ========================================================
// Controllers
// ========================================================

//REGISTER
const register = asyncRouteHandler(async (req, res, next) => {
  //check if there is an User with this email,
  //email has to be unique, so return operational error with message to user
  const registeredEmail = await User.findOne({ email: req.body.email });
  if (registeredEmail) {
    return next(new AppError(commonErrors.emailIsUsed));
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPwd = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    birthday: req.body.birthday,
    password: hashedPwd,
  });

  const { accessToken, refreshToken } = newTokens(newUser);

  res
    .cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: cookieDuration,
    })
    .status(201)
    .json({
      accessToken,
    });
});

// LOGIN
const login = asyncRouteHandler(async (req, res, next) => {
  // IF user has valid refresh token, than just return it to him, it prevent creating multiple refresh token
  //but it  should not be possible from browser client
  if (req?.cookies?.jwt) {
    return jwt.verify(
      req.cookies.jwt,
      process.env.JWT_REFRESH,
      (err, decoded) => {
        if (err) {
          return next(new AppError(commonErrors.invalidRefreshToken));
        }
        return res
          .cookie('jwt', req.cookies.jwt, {
            httpOnly: true,
            secure: true,
            maxAge: cookieDuration,
          })
          .status(201)

          .json({
            description: 'Already got a token, no need for logging in ',
          });
      }
    );
  }
  //check if there is a user with this email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError(commonErrors.invalidEmailInputError));
  //check if passwords are matching
  const match = await bcrypt.compare(req.body.password, user.password);
  //if password is not correct. push operational AppError further to errorHandlerMiddleware
  if (!match) return next(new AppError(commonErrors.wrongPasswordError));
  const roles = Object.values(user.roles).filter((el) => {
    return el !== null;
  });
  const { accessToken, refreshToken } = newTokens(user);

  res
    .cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: cookieDuration,
    })
    .status(200)
    .json({ accessToken });
});

//LOGOUT
const logout = asyncRouteHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  //Check if there is that token in db
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }

  user.refreshToken = user.refreshToken.filter(
    (token) => token !== refreshToken
  );
  await user.save();

  res
    .clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    .sendStatus(204); //no content
});

// ========================================================
// Exports
// ========================================================
export { register, login, logout };
