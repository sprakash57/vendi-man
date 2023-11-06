import { Response, Request } from 'express';
import { createUser, findUser } from '../service/users';
import { Messages } from '../constants';
import { omit } from 'lodash';

export const newUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    const data = omit(user, ['password', '_id']);

    return res.status(201).json({
      status: 'success',
      message: Messages.USER_CREATION_SUCCESS,
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

export const getUserController = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const user = await findUser({ _id: userId });
    const data = omit({ ...user }, ['password', '_id']);

    return res.status(200).json({
      status: 'success',
      message: Messages.STATUS_200,
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
