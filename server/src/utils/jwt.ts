import jwt from 'jsonwebtoken';
import config from 'config';

type KeyName = 'accessTokenPrivateKey' | 'refreshTokenPrivateKey' | 'accessTokenPublicKey' | 'refreshTokenPublicKey';

const getKey = (keyName: KeyName) => {
  return Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
};

export const signToken = (object: Object, keyName: KeyName, options?: jwt.SignOptions) => {
  const signingKey = getKey(keyName);

  return jwt.sign(object, signingKey, {
    ...options,
    algorithm: 'RS256',
  });
};

export const verifyToken = (token: string, keyName: KeyName) => {
  const publicKey = getKey(keyName);

  try {
    const tokenVerified = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      tokenVerified,
    };
  } catch (e: any) {
    console.error(JSON.stringify(e));
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      tokenVerified: null,
    };
  }
};
