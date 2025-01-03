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

// Sequelize configuration for different environments
const config: Record<string, SequelizeConfig> = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*', // Replace with your secure value
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parsedDBPort,
    dialect: 'mysql',
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || 'test_password', // Replace with your secure test value
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: parsedDBPort,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*', // Replace with your secure value
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parsedDBPort,
    dialect: 'mysql',
  },
};

export default config;
