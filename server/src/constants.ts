export enum Messages {
  USER_CREATED = 'User created Successfully',
  USER_EXISTS = 'User already exists',
  USER_NOT_FOUND = 'Invalid credentials',
  NO_BUYER = 'User is not a buyer',
  NO_SELLER = 'User is not a seller',
  EXPIRED_SESSION = 'Session expired',
  DUPLICATE_SESSION = 'There is already an active session using your account',
  INSUFFICIENT_DEPOSIT = 'Insufficient Deposit',
  NO_PRODUCT = 'Product Not Found',
  SUCCESS = 'Success',
  STATUS_400 = 'Bad request',
  STATUS_401 = 'Not authorized',
  STATUS_403 = 'Forbidden',
  STATUS_500 = 'Internal server error',
}

export const TOKEN_EXPIRED = 'jwt expired';

export const VALID_COINS = [5, 10, 20, 50, 100];
