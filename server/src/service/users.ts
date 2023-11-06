import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import UserModel, { UserInput, UserDocument } from '../model/users';
import { omit } from '../utils/helpers';

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

export const validatePassword = async ({ username, password }: { username: string; password: string }) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return omit(user.toJSON(), 'password');
};
