// ========================================================
// Imports
// ========================================================
import { AppError, commonErrors } from '../utils/AppError.js';

// ========================================================
// Middleware
// ========================================================

//Check if user has a role that was specified in param
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return next(new AppError(commonErrors.unauthorized));
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => {
        return rolesArray.includes(role);
      })
      .find((value) => value === true);
    if (!result) next(new AppError(commonErrors.unauthorized));
    next();
  };
};

// ========================================================
// Exports
// ========================================================

export { verifyRoles as default };
