import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../model/sessions';
import { signToken, verifyToken } from '../utils/jwt';
import { findUser } from './users';
import { get } from 'lodash';
import config from 'config';
import { JwtPayload } from 'jsonwebtoken';
import { Messages } from '../constants';

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
  const { jwtPayload } = verifyToken(refreshToken as string, 'refreshTokenPublicKey');

  if (!jwtPayload || !get(jwtPayload, 'session')) return false;

  const session = await SessionModel.findById(get(jwtPayload, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const sessions = await findSessions({ user: user._id, valid: true });

  const accessToken = signToken({ ...user, session: session._id }, 'accessTokenPrivateKey', {
    expiresIn: config.get('accessTokenValidity'),
  });

  return { multiSessionAlert: sessions.length ? Messages.DUPLICATE_SESSION : '', accessToken };
};

export const checkSession = async (verifiedToken: string | JwtPayload | null) => {
  const session = await SessionModel.findById(get(verifiedToken, 'session'));
  return session?.valid;
};
