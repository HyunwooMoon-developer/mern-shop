import mongoose from 'mongoose';
import { config } from './config.js';

const connectDB = async () => {
  try {
    const db = await mongoose.connect(config.server.DB_URI as string, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`Mongodb connected: ${db.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
