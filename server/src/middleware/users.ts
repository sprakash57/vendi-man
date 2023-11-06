import { body } from 'express-validator';

export const userValidator = [
  body('username', 'Name is required').notEmpty(),
  body('password', 'Password is required').isLength({ min: 6 }).withMessage('Password is too short'),
  body('passwordConfirmation', 'Password confirmation is required').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('role', 'Invalid role').isIn(['buyer', 'seller']),
];
