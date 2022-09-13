// ========================================================
// Imports
// ========================================================

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
      req.body.birthday = new Date(req.body.birthday);
      await joiSchema.validateAsync(req[reqProperty]);
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
export { validateRequestBody, validateRequestParams, validateRequestQuery };
