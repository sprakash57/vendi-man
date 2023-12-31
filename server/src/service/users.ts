import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import UserModel, { UserInput, UserDocument } from '../model/users';
import { omit } from 'lodash';
import { SessionInput } from '../types';
import SessionModel from '../model/sessions';
import ProductModel from '../model/products';
import { Messages } from '../constants';

export const createUser = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
};

export const findAndUpdateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions,
) => {
  return UserModel.findOneAndUpdate(query, update, options);
};

export const deleteUser = async (userId: string) => {
  const existingUser = await findUser({ _id: userId });
  if (!existingUser) throw new Error(Messages.USER_NOT_FOUND);

  await SessionModel.deleteMany({ user: userId });
  await ProductModel.deleteMany({ user: userId });
  const userDeletionResult = await UserModel.deleteOne({ _id: userId });

  return userDeletionResult;
};

export const checkPassword = async ({ username, password }: SessionInput) => {
  const user = await UserModel.findOne({ username });
  if (!user) return null;
  const isValid = await user.comparePassword(password);
  if (!isValid) return null;
  return omit(user.toJSON(), 'password');
};
