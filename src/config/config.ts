import dotenv from 'dotenv';
dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',  // Default empty string, it should be provided in the .env file
  DB_NAME = 'fivver_doup',
  DB_PORT = '3306',  // Default MySQL port
  NODE_ENV = 'development',  // Default to 'development' if not set
  JWT_SECRET = 'your-secret-key',  // Default JWT secret
  JWT_EXPIRATION = '1h',  // Default expiration time for JWT
} = process.env;

// Ensure DB_PORT is a valid number
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
  console.error('DB_PORT must be a valid number.');
  process.exit(1);
}

// Define the interface for configuration
export interface Config {
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
  port: number;
  logging: boolean | ((msg: string) => void);  // Updated to include function option for logging
}

// Common configuration object for shared properties
const commonConfig: Config = {
  JWT_SECRET,
  JWT_EXPIRATION,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: 'mysql',
  port: parsedDBPort,
  logging: true,  // Default to true for logging in development
};

// Explicitly define valid environment types for better type safety
type Env = 'development' | 'test' | 'production';

// Export different configurations based on the environment
const config: Record<Env, Config> = {
  development: {
    ...commonConfig,
    logging: true,  // Enable logging in development
  },
  test: {
    ...commonConfig,
    database: 'fivver_doup_test',  // Separate test database
    logging: false,  // Disable logging in tests
  },
  production: {
    ...commonConfig,
    database: 'fivver_doup_prod',  // Separate production database
    logging: false,  // Disable logging in production
  },
};

// Export the config based on the current environment (NODE_ENV)
export default config[NODE_ENV as Env];
