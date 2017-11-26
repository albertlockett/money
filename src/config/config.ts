import { config } from 'dotenv';

// import configuration from .env file
config({ path: '.env' });

// export authentication constants
export const AMAZON_CLIENT_ID: string = process.env.AMAZON_CLIENT_ID;
export const AMAZON_CLIENT_SECRET: string = process.env.AMAZON_CLIENT_SECRET;

// app server config
export const SERVER_PORT = 9001;

// database config
export const DB_CXN_STRING: string = process.env.DB_CXN_STRING ||
  'mongodb://localhost:27017/money';
