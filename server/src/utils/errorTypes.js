export const commonErrors = {
  invalidPasswordInputError: {
    status: 400,
    isOperational: true,
    description: 'Password has invalid format',
  },

  invalidEmailInputError: {
    status: 400,
    isOperational: true,
    description: 'Invalid email',
  },
  wrongPasswordError: {
    status: 400,
    isOperational: true,
    description: 'Wrong password!',
  },
  emailIsUsed: {
    status: 409,
    isOperational: true,
    description: 'This email is already used.',
  },
  invalidToken: {
    status: 403,
    isOperational: true,
    description: 'Invalid Token',
  },
  accessDenied: {
    status: 403,
    isOperational: true,
    description: 'You have no power here',
  },
};
