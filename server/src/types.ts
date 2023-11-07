export type UserCreationInput = Omit<
  {
    username: string;
    password: string;
    confirmPassword: string;
    role: 'buyer' | 'seller';
  },
  'confirmPassword'
>;

export type DepositValidatorInput = {
  depositAmount: number;
};

export type SessionInput = {
  username: string;
  password: string;
};
