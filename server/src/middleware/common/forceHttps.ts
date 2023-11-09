import { Request, Response, NextFunction } from 'express';

const forceHttps = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.secure) {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  };
};

export default forceHttps;
