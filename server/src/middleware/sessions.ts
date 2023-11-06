import { body } from 'express-validator';

export const sessionValidator = [
  body('username', 'Username is required').notEmpty(),
  body('password', 'Password is required').notEmpty(),
];
