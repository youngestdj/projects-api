import { check, validationResult } from 'express-validator';

export const returnValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
    .array()
    .map((error) => error.msg);
  if (!errors.length) return next();
  return res.status(422).json({ errors });
};

export const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom((value) => !/\s/.test(value))
    .withMessage('No spaces are allowed in the email.'),

  check('name')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long.')
    .isString()
    .withMessage('Name must be alphanumeric characters.'),

  check('surname')
    .isLength({ min: 2 })
    .withMessage('Surname must be at least 2 characters long.')
    .isString()
    .withMessage('Surname must be alphanumeric characters.'),
];
