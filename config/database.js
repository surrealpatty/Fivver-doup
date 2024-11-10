import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Destructure and type-check environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_SSL, NODE_ENV } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error('Missing required database environment variables');
}

// Ensure correct usage of the DB_DIALECT
const dialect = DB_DIALECT as Dialect;

// Optional: check if DB_SSL is a valid string for boolean conversion
const useSSL = DB_SSL === 'true';

// Create a new Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect,  // The dialect is passed directly from environment variable
  logging: NODE_ENV === 'development' ? console.log : false,  // Enable logging only in development
  dialectOptions: {
    ssl: useSSL,  // Use SSL if DB_SSL is 'true'
    rejectUnauthorized: false,  // Disable verification if using self-signed certs
  },
});

// Ensure the database connection works
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);  // Exit the process if the connection fails
  });

export { sequelize };
