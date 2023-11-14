import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwt';
import { checkSession } from '../../service/sessions';

const authAndRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization ?? '').replace(/^Bearer\s/, '');
  // For routes that do not require authentication
  if (!accessToken) return next();
  // Verify access token and get user information
  const { jwtPayload } = verifyToken(accessToken, 'accessTokenPublicKey');

  if (jwtPayload) {
    // Check if session is valid for the user
    const sessionIsValid = await checkSession(jwtPayload);
    if (sessionIsValid) {
      // Set user information to res.locals
      res.locals.user = jwtPayload;
    }
    return next();
  }
  return next();
};

export default authAndRefreshToken;
