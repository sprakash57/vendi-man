import { Request, Response } from 'express';
import { Messages } from '../constants';
import { checkPassword } from '../service/users';
import { createSession, findSessions, updateSession } from '../service/sessions';
import { signToken } from '../utils/jwt';
import config from 'config';

export const createSessionController = async (req: Request, res: Response) => {
  try {
    const user = await checkPassword(req.body);
    if (!user) return res.status(401).json({ status: 'error', message: Messages.USER_NOT_FOUND });

    const sessions = await findSessions({ user: user._id, valid: true });

    const session = await createSession(user._id, req.get('user-agent') || '');

    const accessToken = signToken({ ...user, session: session._id }, 'accessTokenPrivateKey', {
      expiresIn: config.get('accessTokenValidity'),
    });

    const refreshToken = signToken({ ...user, session: session._id }, 'refreshTokenPrivateKey', {
      expiresIn: config.get('refreshTokenValidity'),
    });

    return res.json({
      status: 'success',
      message: Messages.SUCCESS,
      data: { message: sessions.length ? Messages.DUPLICATE_SESSION : '', accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};

export const getSessionController = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const sessions = await findSessions({ user: userId, valid: true });
    return res.json({
      status: 'success',
      message: Messages.SUCCESS,
      data: sessions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};

export const deleteSessionController = async (_req: Request, res: Response) => {
  try {
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: false });
    res.locals = {};
    return res.status(201).json({
      status: 'success',
      message: Messages.LOGOUT_SUCCESS,
      data: {
        accessToken: null,
        refreshToken: null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};

export const deleteAllSessionController = async (_req: Request, res: Response) => {
  try {
    const sessions = await findSessions({ user: res.locals.user._id, valid: true });
    sessions.forEach(async session => {
      await updateSession({ _id: session._id }, { valid: false });
    });
    res.locals = {};
    return res.json({ status: 'success', message: Messages.LOGOUT_SUCCESS });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};
