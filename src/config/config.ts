import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Destructure environment variables
const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'fivver_doup',
  DB_PORT = '3306',
  NODE_ENV = 'development',
  JWT_SECRET = 'your-secret-key',
  JWT_EXPIRATION = '1h',
}: NodeJS.ProcessEnv = process.env;

// Ensure that DB_PORT is an integer
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
  console.error('DB_PORT must be a valid number.');
  process.exit(1);
}

// Config object for the application
const config = {
  db: {
    host: DB_HOST as string,
    user: DB_USER as string,
    password: DB_PASSWORD as string,
    database: DB_NAME as string,
    port: parsedDBPort,
  },
  nodeEnv: NODE_ENV as string,
  JWT_SECRET,
  JWT_EXPIRATION,
};

export default config;
