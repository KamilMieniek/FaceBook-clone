// ========================================================
// Imports
// ========================================================

import User from '../Users/users.mongo.js';
import bcrypt from 'bcryptjs';
import AppError from '../../utils/AppError.js';
import { commonErrors } from '../../utils/errorTypes.js';
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
    next(
      new AppError(
        commonErrors.emailIsUsed,
        'An account is already using this email, use another mail or just log in.',
        true
      )
    );
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
  if (!user) return next(new AppError(commonErrors.emailIsUsed));

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect)
    return next(new AppError(commonErrors.wrongPasswordError));

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT
  );
  //TODO: i should change it after extending user model to store posts, messages , chat rooms?
  const { password, __v, updatedAt, createdAt, isAdmin, ...otherDetails } =
    user._doc;
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
