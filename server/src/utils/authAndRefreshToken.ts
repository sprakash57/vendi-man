import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import { getNewAccessToken } from '../service/sessions';

const authAndRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization ?? '').replace(/^Bearer\s/, '');
  const refreshToken = req.headers['x-refresh'];

  if (!accessToken) {
    return next();
  }

  const { verifiedToken, expired } = verifyToken(accessToken, 'accessTokenPublicKey');

  if (verifiedToken) {
    res.locals.user = verifiedToken;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await getNewAccessToken(refreshToken as string);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyToken(newAccessToken as string, 'accessTokenPublicKey');
    res.locals.user = result.verifiedToken;
    return next();
  }

  return next();
};

export default authAndRefreshToken;
