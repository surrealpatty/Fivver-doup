import { config } from 'dotenv';

// Load environment variables from .env
config();

export const development = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fivver_doup',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
};

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
