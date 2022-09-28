class AppError {
  //Here you can pass an object from commonErrors object or if needed write ur own
  // as {name:"", status:Number, isOperational:Boolean, description:""} all required
  constructor(obj) {
    Error.call(this);
    Error.captureStackTrace(this);
    (this.name = obj.name),
      (this.status = obj.status),
      (this.isOperational = obj.isOperational),
      (this.description = obj.description);
  }
}

//
const commonErrors = {
  invalidPasswordInputError: {
    name: 'invalidPasswordInputError',
    status: 400,
    isOperational: true,
    description: 'Password has invalid format',
  },

  invalidEmailInputError: {
    name: 'invalidEmailInputError',
    status: 400,
    isOperational: true,
    description: 'There is no account connected to this e-mail.',
  },
  wrongPasswordError: {
    name: 'wrongPasswordError',
    status: 400,
    isOperational: true,
    description: 'Wrong password!',
  },
  unauthorized: {
    name: 'Unauthorized',
    status: 401,
    isOperational: true,
    description: "No permission's",
  },
  invalidRefreshToken: {
    name: 'noRefreshToken',
    status: 403,
    isOperational: true,
    description: " You don't have a valid refresh Token",
  },
  emailIsUsed: {
    name: 'emailIsUsed',
    status: 409,
    isOperational: true,
    description:
      'An account is already using this email, use another mail or just log in.',
  },
  invalidToken: {
    name: 'invalidToken',
    status: 403,
    isOperational: true,
    description: 'Invalid Token',
  },
  accessDenied: {
    name: 'accessDenied',
    status: 403,
    isOperational: true,
    description: 'You have no power here',
  },
};
// ========================================================
// Exports
// ========================================================
export { AppError, commonErrors };
