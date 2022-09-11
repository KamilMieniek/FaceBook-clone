import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
const newUserValidator = joi.object({
  username: joi.string().alphanum().min(3).max(20).required(true),
  password: joi.string(),
  repeat_password: Joi.ref('password'),
  birthday: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'pl'] },
  }),
});
