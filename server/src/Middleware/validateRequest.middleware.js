// ========================================================
// Imports
// ========================================================

import { AppError, commonErrors } from '../utils/AppError.js';

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
      //TODO: move data parsing to client from string to date type - timestamps
      if (req.body.birthday) req.body.birthday = new Date(req.body.birthday);

      await joiSchema.validateAsync(req[reqProperty]);

      next();
    } catch (error) {
      console.log('validate middleware');
      console.log(error);
      return next(new AppError(commonErrors.invalidCredentialsInput));
    }
  };
};

// ========================================================
// Exports
// ========================================================

// Export the middleware
export { validateRequestBody, validateRequestParams, validateRequestQuery };
