export enum Messages {
  USER_CREATED = 'Success! User created',
  USER_EXISTS = 'User already exists',
  USER_NOT_FOUND = 'Invalid credentials',
  LOGOUT_SUCCESS = 'Logout successful',
  ACCOUNT_DELETED = 'Account has been deleted',
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

export const allowedOrigins = [
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
  'http://localhost:4173',
  'http://localhost:5173',
];
