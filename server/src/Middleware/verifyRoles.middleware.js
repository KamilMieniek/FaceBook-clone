// ========================================================
// Imports
// ========================================================
import { AppError, commonErrors } from '../utils/AppError';

// ========================================================
// Middleware
// ========================================================
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return next(new AppError(commonErrors.unauthorized));
    const rolesArray = [...allowedRoles];

    const result = req.roles
      .map((role) => {
        rolesArray.includes(role);
      })
      .find((value) => value === true);
    if (!result) next(new AppError(commonErrors.unauthorized));
    next();
  };
};

// ========================================================
// Exports
// ========================================================

export { verifyRoles };
