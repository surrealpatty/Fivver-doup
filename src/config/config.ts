import dotenv from 'dotenv'; // Load environment variables from .env file
dotenv.config(); // Ensure environment variables are loaded

// Define configuration for different environments
const config = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET || 'defaultDevelopmentSecret', // Fallback for dev environment
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // Fallback expiration time
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'fivver_doup',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_USE_SSL: process.env.DB_USE_SSL === 'true', // Convert to boolean
  },
  test: {
    JWT_SECRET: process.env.JWT_SECRET || 'defaultTestSecret', // Separate secret for tests
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.TEST_DB_NAME || 'fivver_doup_test', // Test database
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_USE_SSL: process.env.DB_USE_SSL === 'true',
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET || 'defaultProductionSecret', // Fallback for production
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'fivver_doup',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_USE_SSL: process.env.DB_USE_SSL === 'true',
  },
};

// Export the configuration based on the current environment
export default config;
