import { Dialect, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Load environment variables from the correct .env file based on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? 'src/.env.test' : 'src/.env',
});

// Log environment variables for debugging purposes (remove in production)
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Database Configuration:', {
  name: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  user: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_USER : process.env.DB_USER,
  host: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST || '127.0.0.1',
  port: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PORT : process.env.DB_PORT || 3306,
});

// Ensure environment variables are set or throw an error if undefined
const dbName: string = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME! : process.env.DB_NAME!;  // Non-null assertion
const dbUser: string = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_USER! : process.env.DB_USER!;  // Non-null assertion
const dbPassword: string = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PASSWORD! : process.env.DB_PASSWORD!;  // Non-null assertion
const dbHost: string = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST! : process.env.DB_HOST!;  // Non-null assertion
const dbPort: number = parseInt(process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PORT! : process.env.DB_PORT! || '3306', 10);

// Throw an error if any required environment variables are missing (for more robustness)
if (!dbName || !dbUser || !dbPassword) {
  throw new Error('Missing database configuration in environment variables.');
}

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort, // Ensure that port is a number
  dialect: 'mysql' as Dialect,
  dialectOptions: {
    charset: 'utf8mb4',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  },
  logging: process.env.NODE_ENV === 'development', // Enable logging in development only
});

// Export the Sequelize instance for use in your models
export { sequelize };

// JWT Configuration (Add JWT_SECRET and JWT_EXPIRATION here)
export const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

export default sequelize;
