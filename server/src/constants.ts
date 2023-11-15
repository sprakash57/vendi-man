export enum Messages {
  USER_CREATED = 'Success! User created',
  USER_EXISTS = 'User already exists',
  USER_NOT_FOUND = 'Invalid credentials',
  LOGOUT_SUCCESS = 'Logout successful',
  ACCOUNT_DELETED = 'Account has been deleted',
  NO_BUYER = 'User is not a buyer',
  NO_SELLER = 'User is not a seller',
  NO_OWNER = 'User is not the owner of the product',
  EXPIRED_SESSION = 'Session expired',
  DUPLICATE_SESSION = 'There is already an active session using your account',
  INSUFFICIENT_DEPOSIT = 'Insufficient Deposit',
  INVALID_REFRESH_TOKEN = 'Invalid refresh token',
  NO_PRODUCT = 'Product Not Found',
  INVALID_PRODUCT_QUANTITY = 'Invalid Product Quantity',
  SUCCESS = 'Success',
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
