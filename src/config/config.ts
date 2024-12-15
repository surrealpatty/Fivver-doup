import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'fivver_doup',
  DB_PORT = '3306',
  NODE_ENV = 'development',
  JWT_SECRET = 'your-secret-key', // JWT Secret key from .env or default
  JWT_EXPIRATION = '1h', // Default expiration time if not specified
} = process.env;

// Ensure that DB_PORT is an integer
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
  console.error('DB_PORT must be a valid number.');
  process.exit(1);
}

// Config object for the application
const config = {
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: parsedDBPort,
  },
  nodeEnv: NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRATION,
};

export default config;
