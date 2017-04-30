// app server config
export const SERVER_PORT = 9001;

// database config
export const DB_CXN_STRING: string = process.env.DB_CXN_STRING ||
  'mongodb://localhost:27017/money';
