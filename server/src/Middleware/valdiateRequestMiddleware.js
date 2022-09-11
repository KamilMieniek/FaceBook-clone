// ========================================================
// Imports
// ========================================================

import error from '../utils/error.js';

// ========================================================
// Middleware
// ========================================================

const validateRequestBody = (joiSchema) => {
  return validateRequest(joiSchema, 'body');
};

const validateRequestParams = (joiSchema) => {
  return validateRequest(joiSchema, 'params');
};

const validateRequestQuery = (joiSchema) => {
  return validateRequest(joiSchema, 'query');
};

const validateRequest = (joiSchema, reqProperty) => {
  return async (req, res, next) => {
    try {
      const { error } = await joiSchema.validateAsync(req[reqProperty]);
      next();
    } catch (error) {
      return next(error);
    }
  };
};

// ========================================================
// Exports
// ========================================================

// Export the middleware
export default {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
};
