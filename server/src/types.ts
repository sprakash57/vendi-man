import { userValidator } from './middleware/users';

export type UserCreationInput = Omit<
  {
    username: string;
    password: string;
    passwordConfirmation: string;
    role: 'buyer' | 'seller';
  },
  'passwordConfirmation'
>;

export type UserDepositInput = {
  depositAmount: number;
};

export type SessionInput = {
  username: string;
  password: string;
};
