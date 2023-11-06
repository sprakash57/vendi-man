import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { createUser } from '../service/users';
import { omit } from '../utils/helpers';
import { Messages } from '../utils/constants';

export const createUserController = async (req: Request, res: Response) => {
  const validations = validationResult(req);
  if (validations.isEmpty()) {
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
  } else {
    return res.status(400).json({
      status: 'error',
      message: Messages.STATUS_400,
      errors: validations.array(),
    });
  }
};
