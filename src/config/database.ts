import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// List of required environment variables for validation
const requiredKeys = ['DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST'];

// Function to validate the presence of required environment variables
const validateEnvVars = () => {
  for (const key of requiredKeys) {
    if (!process.env[key]) {
      if (process.env.NODE_ENV !== 'test') {  // Avoid process exit during testing
        console.error(`Missing environment variable: ${key}`);
        process.exit(1);
      } else {
        console.warn(`Warning: Missing environment variable: ${key}`);
      }
    }
  }
};

// Validate environment variables unless in testing mode
if (process.env.NODE_ENV !== 'test') {
  validateEnvVars();
}

// Define the configuration object with settings for 'development', 'production', and 'test' environments
interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;  // Use the Dialect type here
  port: number;
  dialectOptions: {
    charset: string;
  };
  logging: boolean;
}

const config: { [key: string]: DBConfig } = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'fivver_doup_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql' as Dialect,  // Explicit cast to Dialect
    port: 3306,  // Explicitly define the port for development
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME || 'prod_user',
    password: process.env.DB_PASSWORD || 'prod_password',
    database: process.env.DB_NAME || 'prod_database',
    host: process.env.DB_HOST || 'prod_host',
    dialect: 'mysql' as Dialect,  // Explicit cast to Dialect
    port: 3306,  // Explicitly define the port for production
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME || 'test_user',
    password: process.env.DB_PASSWORD || 'test_password',
    database: process.env.DB_NAME || 'test_database',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql' as Dialect,  // Explicit cast to Dialect
    port: 3306,  // Explicitly define the port for testing
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: false,
  },
};

// Get the environment (default to 'development' if not set)
const env = process.env.NODE_ENV || 'development';

// Set up Sequelize instance with the environment-specific configuration
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,  // Now correctly typed as Dialect
    dialectOptions: config[env].dialectOptions,
    logging: config[env].logging,
    port: config[env].port,  // Ensure the port is included in the connection
  }
);

// Export the Sequelize instance and config
export { sequelize, config };
