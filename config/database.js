import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if required environment variables are defined
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error('Missing required database environment variables');
}

// Type checking for DB_DIALECT to ensure correct usage
const dialect = DB_DIALECT as Dialect;

// Create a new Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect,  // Directly using the variable since it's already typed
  logging: process.env.NODE_ENV === 'development' ? console.log : false,  // Enable logging only in development
  dialectOptions: {
    // Optional: For better performance and compatibility with certain DB engines
    // Ensure that SSL is not enabled unless needed (based on your DB config)
    ssl: process.env.DB_SSL === 'true',  // Use SSL if DB_SSL is 'true' in your .env
    rejectUnauthorized: false,  // Disable verification if connecting to self-signed certs
  },
});

// Ensure the database connection works
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the process if the connection fails
  });

export { sequelize };
