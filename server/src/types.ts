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
  deposit: number;
};

export type SessionInput = {
  username: string;
  password: string;
};
