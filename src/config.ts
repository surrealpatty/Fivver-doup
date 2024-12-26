import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Extend the NodeJS.ProcessEnv interface to include custom properties
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
      DB_PORT?: string;
      NODE_ENV?: string;
      JWT_SECRET: string;
      JWT_EXPIRATION?: string;
    }
  }
}

// Destructure and validate environment variables with defaults
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

// Validate critical environment variables
if (
  NODE_ENV !== 'test' &&
  (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT || !JWT_SECRET)
) {
  console.error(
    'Missing required environment variables. Check your .env file.'
  );
  process.exit(1); // Exit the process if critical variables are missing
}

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

// Export the configuration
export default config;
