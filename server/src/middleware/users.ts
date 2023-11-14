import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { Messages, VALID_COINS } from '../constants';

export const depositValidator = [
  body('depositAmount')
    .isInt({ min: 0, max: 100 })
    .withMessage('Deposit amount must be an integer between 0 and 100')
    .custom(value => {
      if (value % VALID_COINS[0] !== 0 && value !== 0) {
        throw new Error(`Deposit amount must be in multiple of ${VALID_COINS[0]}`);
      }
      return true;
    }),
];

export const userValidator = [
  body('username', 'Name is required').notEmpty(),
  body('password', 'Password is required').isLength({ min: 6 }).withMessage('Password is too short'),
  body('confirmPassword', 'Password confirmation is required').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('role', 'Invalid role').isIn(['buyer', 'seller']),
  ...depositValidator,
];

export const userVerification = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }
  return next();
};

export const buyerVerification = (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).json({ status: 'error', message: Messages.EXPIRED_SESSION });
  } else if (user.role !== 'buyer') {
    return res.status(403).json({ status: 'error', message: Messages.NO_BUYER });
  }
  return next();
};

export const sellerVerification = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).json({ status: 'error', message: Messages.EXPIRED_SESSION });
  } else if (user.role !== 'seller') {
    return res.status(403).json({ status: 'error', message: Messages.NO_SELLER });
  }
  return next();
};
