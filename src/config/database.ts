import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript
import dotenv from 'dotenv';  // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// TypeScript type guard to ensure environment variables are set
const checkEnvVars = (): boolean => {
  const requiredVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  return true;
};

// Ensure environment variables are available
if (!checkEnvVars()) {
  process.exit(1);  // Exit if environment variables are missing
}

// Import the models after verifying environment variables
import { User } from '../models/user';  // Correct alias for User model
import Service from '../models/services';  // Correct alias for Service model

// Initialize Sequelize instance with database connection details
const sequelize = new Sequelize({
  dialect: 'mysql',  // Using MySQL dialect
  host: process.env.DB_HOST,  // Database host from .env
  username: process.env.DB_USER as string,  // Database user from .env (type assertion)
  password: process.env.DB_PASSWORD as string,  // Database password from .env (type assertion)
  database: process.env.DB_NAME as string,  // Database name from .env (type assertion)
  models: [User, Service],  // Register models explicitly here
  dialectOptions: {
    authPlugins: {
      mysql_native_password: () => {},  // Disable default auth plugin for MySQL 8
    },
  },
  logging: false,  // Disable Sequelize logging (optional)
});

// Test database connection
const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    return false;
  }
};

// Export sequelize instance and testConnection function
export { sequelize, testConnection };
