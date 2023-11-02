import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const config = {
  server: {
    port: PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.DB_URI,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    STRIPE_KEY: process.env.STRIPE_KEY,
  },
};
