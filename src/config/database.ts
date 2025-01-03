import { Sequelize } from 'sequelize-typescript';
import User from '../models/user'; // Ensure this path is correct
import Service from '../models/services'; // Ensure this path is correct
import Order from '../models/order'; // Ensure the Order model is correctly defined
import { Review } from '../models/review'; // Ensure the Review model is correctly defined

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'root', // Use environment variables for security
  password: process.env.DB_PASSWORD || 'password', // Replace 'password' with the actual password
  database: process.env.DB_NAME || 'fivver_doup',
  host: process.env.DB_HOST || '127.0.0.1', // '127.0.0.1' for localhost
  dialect: 'mysql',
  models: [User, Service, Order, Review], // Register all models here
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log queries in development
  define: {
    freezeTableName: true, // Prevent table name pluralization
  },
  pool: {
    max: 10, // Max connections in the pool
    min: 0,  // Min connections in the pool
    acquire: 30000, // Max wait time for connection (ms)
    idle: 10000,   // Max idle time before releasing connection (ms)
  },
  dialectOptions: {
    ssl: process.env.DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false } // Enable SSL if required
      : undefined,
  },
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Export the sequelize instance for use across the app
export { sequelize };
