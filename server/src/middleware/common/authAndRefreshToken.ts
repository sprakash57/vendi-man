import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwt';
import { checkSession, getNewAccessToken } from '../../service/sessions';

const authAndRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization ?? '').replace(/^Bearer\s/, '');
  const refreshToken = req.headers['x-refresh'];
  // For routes that do not require authentication
  if (!accessToken) return next();
  // Verify access token and get user information
  const { jwtPayload, expired } = verifyToken(accessToken, 'accessTokenPublicKey');

  if (jwtPayload) {
    // Check if session is valid for the user
    const sessionIsValid = await checkSession(jwtPayload);
    if (sessionIsValid) {
      // Set user information to res.locals
      res.locals.user = jwtPayload;
    }
    return next();
  }

  // If access token is expired, try to get a new access token using the refresh token
  if (expired && refreshToken) {
    const newAccessToken = await getNewAccessToken(refreshToken as string);
    const result = verifyToken(newAccessToken as string, 'accessTokenPublicKey');
    res.locals.user = result.jwtPayload;
    return next();
  }

  return next();
};

export default authAndRefreshToken;
