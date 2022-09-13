// ========================================================
// Imports
// ========================================================
import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

// ========================================================
// Validators
// ========================================================
const newUserValidator = joi.object({
  username: joi.string().alphanum().min(3).max(20).required(),
  password: passwordComplexity(),
  repeatPassword: joi.ref('password'),
  //TODO: read docs joi date
  birthday: joi.date().less('12-31-2004'),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'pl'] },
  }),
});

// ========================================================
// Exports
// ========================================================
export { newUserValidator };
