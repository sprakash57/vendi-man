import { Response, Request } from 'express';
import { createUser, findAndUpdateUser, findUser } from '../service/users';
import { Messages } from '../constants';
import { omit } from 'lodash';

export const newUserController = async (req: Request, res: Response) => {
  try {
    const existingUser = await findUser({ username: req.body.username });
    // Check if user already exists
    if (existingUser) return res.status(409).json({ status: 'error', message: Messages.USER_EXISTS });

    const user = await createUser(req.body);
    const data = omit(user, ['password', '_id']);

    return res.status(201).json({
      status: 'success',
      message: Messages.USER_CREATED,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: Messages.STATUS_500,
    });
  }
};

export const getUserController = async (_req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const user = await findUser({ _id: userId });
    const data = omit({ ...user }, ['password', '_id']);

    return res.status(200).json({
      status: 'success',
      message: Messages.SUCCESS,
      data,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: Messages.STATUS_500,
    });
  }
};

export const depositController = async (req: Request, res: Response) => {
  try {
    const user = await findUser({ _id: res.locals.user._id });
    const newDeposit = req.body.depositAmount + user?.deposit;
    const updatedUser = await findAndUpdateUser({ _id: user?._id }, { deposit: newDeposit }, { new: true });
    const data = omit(updatedUser?.toJSON(), ['password', '_id']);
    return res.json({ status: 'success', message: Messages.SUCCESS, data: data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};

export const resetDepositController = async (_: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const updatedUser = await findAndUpdateUser({ _id: userId }, { deposit: 0 }, { new: true });
    const data = omit(updatedUser?.toJSON(), ['password', '_id']);
    return res.status(201).json({ status: 'success', message: Messages.SUCCESS, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};
