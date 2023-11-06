import config from 'config';
import mongoose from 'mongoose';

const connectDb = async () => {
  const dbUrl = config.get<string>('dbUrl');

  try {
    await mongoose.connect(dbUrl);
    console.info('DB connected!');
  } catch (error) {
    console.error('DB connection error');
    process.exit(1);
  }
};
export default connectDb;
