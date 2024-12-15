import dotenv from 'dotenv';
dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'fivver_doup',
  DB_PORT = '3306',
  NODE_ENV = 'development',
} = process.env;

const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
  console.error('DB_PORT must be a valid number.');
  process.exit(1);
}

export default {
  [NODE_ENV]: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    port: parsedDBPort,
  },
};
