import * as dotenv from 'dotenv';

// Load the appropriate .env file based on the current environment
dotenv.config({ path: `./src/.env.${process.env.NODE_ENV || 'development'}` });

// Export configuration constants
export const config = {
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret_key', // Secret key for JWT
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',         // Token expiration time
  
  // Database Configuration
  DB_USER: process.env.DB_USER || 'default_user',             // Database username
  DB_PASSWORD: process.env.DB_PASSWORD || 'default_password', // Database password
  DB_NAME: process.env.DB_NAME || 'default_database',         // Database name
  DB_HOST: process.env.DB_HOST || 'localhost',                // Database host
  DB_PORT: parseInt(process.env.DB_PORT || '3306'),           // Database port
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',              // Sequelize dialect

  // Application Configuration
  PORT: parseInt(process.env.PORT || '3000'),                 // Application port
  NODE_ENV: process.env.NODE_ENV || 'development',            // Environment

  // File Uploads or Caching Settings
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',          // Upload directory
};
