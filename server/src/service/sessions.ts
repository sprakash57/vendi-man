import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../model/sessions';
import { signToken, verifyToken } from '../utils/jwt';
import { findUser } from './users';
import { get } from 'lodash';
import config from 'config';
import { JwtPayload } from 'jsonwebtoken';

export const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return SessionModel.find(query).lean();
};

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
  return SessionModel.updateOne(query, update);
}

export const getNewAccessToken = async (refreshToken: string) => {
  const { verifiedToken } = verifyToken(refreshToken as string, 'refreshTokenPublicKey');
  if (!verifiedToken || !get(verifiedToken, 'session')) return false;

  const session = await SessionModel.findById(get(verifiedToken, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const newAccessToken = signToken({ ...user, session: session._id }, 'accessTokenPrivateKey', {
    expiresIn: config.get('accessTokenValidity'),
  });

  return newAccessToken;
};

export const checkSession = async (verifiedToken: string | JwtPayload | null) => {
  const session = await SessionModel.findById(get(verifiedToken, 'session'));
  return session?.valid;
};
