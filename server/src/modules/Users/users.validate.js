// ========================================================
// Imports
// ========================================================
import Joi from 'joi';
import passwordComplexity from 'Joi-password-complexity';
import objectIdValidator from 'Joi-objectid';
Joi.objectId = objectIdValidator(Joi);
// var Joi = require('Joi');
// Joi.objectId = require('Joi-objectid')(Joi);
// ========================================================
// Validators
// ========================================================
const newUserValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: passwordComplexity(),
  repeatPassword: Joi.ref('password'),
  birthday: Joi.date().less('12-31-2004'),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'pl'] },
  }),
});

const userUpdateValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(20),
  password: passwordComplexity(),
  birthday: Joi.date().less('12-31-2004'),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'pl'] },
  }),
});

const idValidate = Joi.object({
  id: Joi.objectId(),
});

// ========================================================
// Exports
// ========================================================
export { newUserValidator, idValidate, userUpdateValidator };
