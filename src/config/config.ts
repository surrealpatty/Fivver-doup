import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

// Parse and validate DB_PORT environment variable
const parsedDBPort = parseInt(process.env.DB_PORT || '3306', 10);
if (isNaN(parsedDBPort)) {
  console.error('DB_PORT must be a valid number.');
  process.exit(1);
}

// Define the Sequelize configuration interface
interface SequelizeConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

// Define the JWT configuration interface
interface JwtConfig {
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
}

// Merge both the Sequelize and JWT configurations into one final config
const config: Record<string, SequelizeConfig & JwtConfig> = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*', // Replace with your secure value
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parsedDBPort,
    dialect: 'mysql',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // JWT_SECRET as string
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // JWT_EXPIRATION, default to '1h'
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || 'test_password', // Replace with your secure test value
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: parsedDBPort,
    dialect: 'mysql',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // JWT_SECRET as string
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // JWT_EXPIRATION, default to '1h'
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*', // Replace with your secure value
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parsedDBPort,
    dialect: 'mysql',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // JWT_SECRET as string
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // JWT_EXPIRATION, default to '1h'
  },
};

export default config;
