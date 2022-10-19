// ========================================================
// Imports
// ========================================================
import User from '../Users/users.mongo.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { AppError, commonErrors } from '../../utils/AppError.js';
import jwtConfig from '../../config/jwt.config.js';
import { asyncRouteHandler } from '../../Middleware/asyncRouteHandler.middleware.js';
const { accessTokenDuration, cookieDuration, refreshTokenDuration } = jwtConfig;
// ========================================================
// Controllers
// ========================================================

// User have to use this endpoint to validate his refreshToken and get his new accessToken
const getNewAccessToken = asyncRouteHandler(async (req, res, next) => {
  //If User doesn't have a refresh token than send unauthorized status
  const refreshToken = req?.cookies?.jwt;
  if (!refreshToken) return next(new AppError(commonErrors.unauthorized));
  //Make sure user doesnt get old refresh token
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  const user = await User.findOne({ refreshToken: refreshToken });

  //Detected refresh token reuse
  if (!user) {
    jwt.verify(refreshToken, process.env.JWT_REFRESH, async (err, decoded) => {
      if (err) return next(new AppError(commonErrors.invalidRefreshToken));
      const hackedUser = await User.find({ username: decoded.username });
      hackedUser.refreshToken = [];
      await hackedUser.save();
    });
    //Token was used or deleted from db. If it was used by a hacker we are clearing all tokens from db
    return next(new AppError(commonErrors.refreshTokenNotConnected));
  }
  //filtered array without current used token
  const newRefreshTokenArray = user.refreshToken.filter(
    (token) => token !== refreshToken
  );
  //user has expired token,
  jwt.verify(refreshToken, process.env.JWT_REFRESH, async (err, decoded) => {
    //remove token from his tokes array
    if (err) {
      user.refreshToken = [...newRefreshTokenArray];
      await user.save();
    }
    //force him to login
    if (err || user.username !== decoded.username) {
      return next(new AppError(commonErrors.invalidRefreshToken));
    }

    // User's Refresh token IS still valid.

    const { accessToken, refreshToken } = newTokens(user);
    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: cookieDuration,
    });

    res.json({ accessToken });
  });
});

//Generate new Access and refresh tokens for login and register operations
//also save them in db
const newTokens = (user) => {
  const roles = Object.values(user.roles).filter((element) => {
    return element !== undefined && element !== null;
  });

  const accessToken = jwt.sign(
    { user: { id: user.id, roles: roles } },
    process.env.JWT_ACCESS,
    {
      expiresIn: accessTokenDuration,
    }
  );
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.JWT_REFRESH,
    {
      expiresIn: refreshTokenDuration,
    }
  );

  user.refreshToken.push(refreshToken);
  user.save();
  return { accessToken, refreshToken };
};
// ========================================================
// Exports
// ========================================================
export { getNewAccessToken, newTokens };
