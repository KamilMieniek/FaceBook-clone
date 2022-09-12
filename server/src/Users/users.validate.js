import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
const newUserValidator = joi.object({
  username: joi.string().alphanum().min(3).max(20).required(true),
  password: passwordComplexity(),
  repeat_password: joi.ref('password'),
  birthday: joi.number().integer().min(1900).max(2013),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'pl'] },
  }),
});

// ========================================================
// Exports
// ========================================================
export { newUserValidator };
