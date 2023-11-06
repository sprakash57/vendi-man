export enum Messages {
  USER_CREATION_SUCCESS = 'User created Successfully',
  USER_LOGOUT_SUCCESS = 'User logged out',
  FORBIDDEN_USER = 'Only sellers can create products',
  SUCCESS = 'Success',
  STATUS_500 = 'Something went wrong',
  STATUS_400 = 'Bad request',
  STATUS_401 = 'Unauthorized',
  EXPIRED_SESSION = 'Session expired',
  DUPLICATE_SESSION = 'There is already an active session using your account',
}

export const TOKEN_EXPIRED = 'jwt expired';

export const VALID_COINS = [5, 10, 20, 50, 100];
