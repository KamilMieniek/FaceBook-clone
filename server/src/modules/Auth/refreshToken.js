import User from '../Users/users.mongo.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { AppError, commonErrors } from '../../utils/AppError.js';

// User have to use this endpoint to validate his refreshToken and get his new accessToken
const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return next(new AppError(commonErrors.unauthorized));
  const refreshToken = cookies.jwt;

  const user = User.findOne({ jwt: refreshToken });

  if (!user) return next(new AppError(commonErrors.invalidRefreshToken));

  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, decoded) => {
    if (err || user._id !== decoded._id)
      return next(new AppError(commonErrors.invalidRefreshToken));

    const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
      { UserInfo: { _id: user._id, username: user.username, roles: roles } },
      process.env.JWT,
      { expiresIn: '60s' }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
