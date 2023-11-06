import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  saltCost: process.env.SALT_COST,
  accessTokenValidity: process.env.ACCESS_TOKEN_VALIDITY,
  accessTokenPublicKey: process.env.ACCESS_PUBLIC_KEY,
  accessTokenPrivateKey: process.env.ACCESS_PRIVATE_KEY,
  refreshTokenValidity: process.env.REFRESH_TOKEN_VALIDITY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
};
