import { check, validationResult } from 'express-validator';
import { User } from '../models';

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

export const validateProject = [
  check('body').exists().withMessage('Project should have a body text.'),

  check('name')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long.')
    .isString()
    .withMessage('Name must be alphanumeric characters.'),
  check('userId')
    .exists()
    .withMessage('Please enter a userId.')
    .isInt()
    .withMessage('userId should be an integer.'),

  check('status')
    .exists()
    .withMessage('Project should have a status.')
    .custom(
      (value) =>
        ['active', 'inactive', 'declined', 'completed'].indexOf(value) !== -1
    )
    .withMessage(
      'Status should either be active, inactive, declined or completed'
    ),
];

export const validateUser = async (req, res, next) => {
  const {
    body: { userId },
  } = req;
  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        errors: ['User does not exist.'],
      });
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      errors: ['Something went wrong'],
    });
  }
};
