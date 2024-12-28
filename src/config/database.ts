import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables based on the current environment
const env = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development'; // Default to 'development' if NODE_ENV is not set
dotenv.config({ path: `./.env.${env}` }); // Load environment variables from the correct .env file based on the environment

// Define the Sequelize configuration for different environments
const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: true,
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.TEST_DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: true,
  },
} as const;

// Create and initialize the Sequelize instance based on the current environment
const sequelize = new Sequelize({
  username: config[env].username,
  password: config[env].password,
  database: config[env].database,
  host: config[env].host,
  port: config[env].port,
  dialect: config[env].dialect,
  logging: config[env].logging ?? true,
});

// Function to test the database connection
export async function testConnection(): Promise<boolean> {
  try {
    await sequelize.authenticate(); // Test the database connection
    console.log('Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

// Export the sequelize instance for use in other parts of the app
export default sequelize;
