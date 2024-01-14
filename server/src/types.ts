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

export interface FileMetadata {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: string;
  size: number;
}
