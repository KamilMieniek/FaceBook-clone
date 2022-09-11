// ========================================================
// Imports
// ========================================================

import User from '../Users/users.mongo';
import { createError } from '../utils/error.js';

import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
//import jwt from 'jsonwebtoken';

// ========================================================
// Controllers
// ========================================================
const register = async (req, res, next) => {
  try {
    checkEmail();

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(201).send('User has been created.');
  } catch (err) {
    next(err);
  }
};

const checkEmail = (userEmail) => {
  try {
    const registeredUser = User.findOne({ email: userEmail });
    if (registeredUser) {
      return res.status(404).json({
        description:
          'An account is already using this email, use another mail or just log in.',
      });
    }
  } catch (error) {
    next(error);
  }
};

// ========================================================
// Exports
// ========================================================
export default { register };
