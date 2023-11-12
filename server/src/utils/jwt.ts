import jwt from 'jsonwebtoken';
import config from 'config';
import { TOKEN_EXPIRED } from '../constants';

type KeyName = 'accessTokenPrivateKey' | 'refreshTokenPrivateKey' | 'accessTokenPublicKey' | 'refreshTokenPublicKey';

const getKey = (keyName: KeyName) => {
  return Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
};

export const signToken = (object: Object, keyName: KeyName, options?: jwt.SignOptions) => {
  const signingKey = getKey(keyName);

  return jwt.sign(object, signingKey, { ...options, algorithm: 'RS256' });
};

export const verifyToken = (token: string, keyName: KeyName) => {
  const publicKey = getKey(keyName);

  try {
    const jwtPayload = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      jwtPayload,
    };
  } catch (error) {
    return {
      valid: false,
      expired: (error as { message: string }).message === TOKEN_EXPIRED,
      jwtPayload: null,
    };
  }
};
