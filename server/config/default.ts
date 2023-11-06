import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  saltCost: process.env.SALT_COST,
};
