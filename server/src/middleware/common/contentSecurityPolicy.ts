import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

const applySecurityHeaders = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Content Security Policy
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
      },
    })(req, res, () => {});

    // Hide X-Powered-By
    helmet.hidePoweredBy()(req, res, () => {});

    // HTTP Strict Transport Security
    helmet.hsts()(req, res, () => {});

    next();
  };
};

export default applySecurityHeaders;
