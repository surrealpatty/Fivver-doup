import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

// Define the allowed environment keys
type Environment = 'development' | 'test' | 'production';

// Load environment variables based on the current NODE_ENV
const env = (process.env.NODE_ENV || 'development') as Environment;
dotenv.config({ path: `./src/.env.${env}` }); // Load .env.test, .env.development, or .env.production

// Database configurations for different environments
const config: Record<Environment, { 
  username: string; 
  password: string; 
  database: string; 
  host: string; 
  port: number; 
  dialect: Dialect; 
  logging?: boolean; 
}> = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.TEST_DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: false, // Disable logging in test environment
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
  },
};

// Export the appropriate environment configuration
export default config[env];
