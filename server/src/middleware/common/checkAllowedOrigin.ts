import { NextFunction, Request, Response } from 'express';
import { allowedOrigins } from '../../constants';

const checkAllowedOrigins = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

export default checkAllowedOrigins;
